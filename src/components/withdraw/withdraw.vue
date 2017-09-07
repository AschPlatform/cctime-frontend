<template>
  <div class="withdraw_container">
    <div class="header">
        <h1>站内转账</h1>
    </div>
    <div class="deal_part">
        <span>输入转账信息</span>
        <div class="deal_form">
        <select type="text" v-model="trans_type">
          <option disabled selected>转账币种</option>
          <option v-for="item in this.userInfo.info.balances">{{item.currency}}</option>
        </select>
          <input style="display:none" type="text" name="fakeusernameremembered"/>
          <input style="display:none" type="password" name="fakepasswordremembered"/>
          <input type="number" placeholder="转账数量" v-model="trans_num">
          <input type="text" placeholder="转账地址" v-model="trans_address">
          <input type="text" class="calculate" placeholder="手续费0.01" disabled>
          <!-- <input type="password" class="psd" v-model="trans_password" autocomplete="off" placeholder="请输入二级密码，如果未设置请略过"> -->
        </div>
    </div>
    <p>请确保您所填的对方地址是否正确，本操作无法撤销</p>
    <div class="confirm_btn">
      <span class="btn" @click="toWithdraw">确认转账</span>
    </div>
    <div class="record_title">
      <h3>转账记录</h3>
      <select type="text" v-model="trans_query_type" @change="toQuery">
        <option disabled selected>币种筛选</option>
        <option v-for="item in this.userInfo.info.balances">{{item.currency}}</option>
      </select>
    </div>
    <div class="record">
      <table>
        <tr class="table_header">
          <th>记录ID</th>
          <th>转出方</th>
          <th>转入方</th>
          <th>转移数量</th>
          <th>发送时间</th>
          <th>币种</th>
        </tr>
        <tr v-for="(item, index) in this.switchGroup">
          <td>{{index + 1}}</td>
          <td>{{item.senderId}}</td>
          <td>{{item.recipientId}}</td>
          <td>{{Number(item.amount)/1e8}}</td>
          <td>{{item.realTime}}</td>
          <td>{{item.currency}}</td>
        </tr>
      </table>
    </div>
    <div class="pag">
      <div class="ctrbtn" @click="minPage" v-show="this.currentPage != 0">上一页</div>
      <div class="pagespot" v-for="(value, index) in this.page" @click="goto(index)" :class="{'active':currentPage + 1 == Number(value)}">{{Number(value)}}</div>
      <div class="ctrbtn" @click="addPage" v-show="this.allPage != this.currentPage + 1 && this.allPage != 0">下一页</div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: 'withdraw',
    components: {
    },
    data: function () {
      return {
        trans_type: '',
        trans_num: undefined,
        trans_address: '',
        trans_password: '',
        trans_query_type: '',
        // 分页初始量 引入公共state
        // currentPage: 0,
        pageSpots: 5,
        pageContent: 5,
        pageNum: 0
      }
    },
    methods: {
      // 转账
      toWithdraw: function () {
        // 整数检测
        if (String(this.trans_num).indexOf('.') > 0) {
          this.$store.commit('callToast', {msgHeader: '注意！', msgContent: '转账金额必须为整数！', _confirmfunc: '了解', _cancelfunc: '关闭', deals: undefined, contract: 4})
          this.init()
          return
        }
        if (this.trans_type === '') {
          this.$store.commit('callToast', {msgHeader: '注意！', msgContent: '请先选择交易内容！', _confirmfunc: '了解', _cancelfunc: '关闭', deals: undefined, contract: 4})
          return
        }
        if (this.trans_address === '') {
          this.$store.commit('callToast', {msgHeader: '注意！', msgContent: '请先选择交易对象地址！', _confirmfunc: '了解', _cancelfunc: '关闭', deals: undefined, contract: 4})
          return
        }
        if (this.trans_address.indexOf(' ') !== -1) {
          this.$store.commit('callToast', {msgHeader: '注意！', msgContent: '交易地址不得有空格/回车', _confirmfunc: '了解', _cancelfunc: '关闭', deals: undefined, contract: 4})
          return
        }
        if (this.trans_num <= 0) {
          this.$store.commit('callToast', {msgHeader: '注意！', msgContent: '请确认交易数额大于零！', _confirmfunc: '了解', _cancelfunc: '关闭', deals: undefined, contract: 4})
          return
        }
        // 组织args
        let that = this
        let a = []
        a.push(this.trans_type)
        a.push(this.trans_unit)
        a.push(this.trans_address)
        this.$store.dispatch('invokeContract', {
          type: 3,
          fee: '10000000',
          args: a,
          that: this,
          callback: function (err, res) {
            if (err) {
              return
            }
            // 增加转账后更新
            setTimeout(function () {
              that.$store.dispatch('getTransactionInfo', {
                limit: String(that.pageContent),
                offset: 0,
                currency: that.trans_type,
                that: that
              })
            }, 10000)
            // 初始化本地state
            that.$store.commit('callToast', {msgHeader: '成功！', msgContent: '转账成功，根据环境原因转账时间可能会略有延长', _confirmfunc: '了解', _cancelfunc: '关闭', deals: undefined, contract: 4})
            that.init()
          }
        })
      },
      init: function () {
        this.trans_type = ''
        this.trans_num = undefined
        this.trans_address = ''
        this.trans_password = ''
        // 分页初始量
        this.currentPage = 0
      },
      // 操作页面增减
      addPage: function () {
        let that = this
        if (that.currentPage < that.allPage - 1) {
          that.$store.commit('toAddCurrentPage')
          // that.currentPage = that.currentPage + 1
          that.$store.dispatch('getTransactionInfo', {
            limit: String(that.pageContent),
            offset: that.offsetNum,
            currency: that.trans_query_type,
            that: that
          })
        } else {
          // that.currentPage = that.allPage - 1
          this.$store.commit('toMinCurrentPage')
        }
      },
      minPage: function () {
        let that = this
        if (that.currentPage > 0) {
          this.$store.commit('toMinCurrentPage')
          // that.currentPage = that.currentPage - 1
          that.$store.dispatch('getTransactionInfo', {
            limit: String(that.pageContent),
            offset: that.offsetNum,
            currency: that.trans_query_type,
            that: that
          })
        } else {
          return
        }
      },
      // 页面跳转
      goto: function (index) {
        let that = this
        if (index === this.current) return
        this.$store.commit('toPlusCurrentPage', index)
        // that.currentPage = index
        that.$store.dispatch('getTransactionInfo', {
          limit: String(that.pageContent),
          offset: that.offsetNum,
          currency: that.trans_query_type,
          that: that
        })
      },
      // 切换选项表主动查询
      toQuery: function () {
        let that = this
        // 以下是触发Action内容
        // 输出$state list内容
        this.$store.dispatch('getTransactionInfo', {
          limit: String(that.pageContent),
          offset: 0,
          currency: this.trans_query_type,
          that: that
        })
      }
    },
    computed: {
      ...mapState(['userInfo', 'currentPage']),
      // 计算手续费
      trans_fee: function () {
        if (this.trans_num === undefined) {
          return 0
        }
        return this.trans_num * 0.005
      },
      // 计算费用传入单位
      trans_unit: function () {
        return String(this.trans_num * 1e8)
      },
      // 计算交易时间
      // trans_realTime: function () {
      //   // 填写日期
      //   let t = new Date(item.realTime)
      //   let year = t.getFullYear()
      //   let month = Number(t.getMonth()) + 1
      //   let day = t.getDate()
      //   let hour = t.getHours()
      //   let minute = t.getMinutes()
      //   let sec = t.getSeconds()
      //   if (month < 10) {
      //     month = '0' + month
      //   }
      //   if (day < 10) {
      //     day = '0' + day
      //   }
      //   if (minute < 10) {
      //     minute = '0' + minute
      //   }
      //   if(sec < 10) {
      //     sec = '0' + sec
      //   }
      //   return year + '.' + month + '.' + day + ' ' + hour + ':' + minute + ':' + 'sec'
      // },
      // 分页数组
      switchGroup: function () {
        return this.$store.getters['transactionListGetter'].transfers
      },
      // 构造页签数组
      page: function () {
        let pag = []
        if (this.currentPage < this.pageSpots) {
          let i = Math.min(this.pageSpots, this.allPage)
          while (i) {
            pag.unshift(i--)
          }
        } else if (this.currentPage >= this.pageSpots) {
          let middle = this.currentPage - Math.floor(this.pageSpots / 2)
          let i = this.pageSpots
          if (middle > (this.allPage - this.pageSpots)) {
            middle = (this.allPage - this.pageSpots) + 1
          }
          while (i--) {
            pag.push(middle++)
          }
        }
        return pag
      },
      // 页签总数
      allPage: function () {
        return Math.ceil(Number(this.$store.getters['transactionListGetter'].count) / this.pageContent)
      },
      // 返回偏移量
      offsetNum: function () {
        return this.currentPage * this.pageContent
      }
    },
    created: function () {
      let that = this
      // 以下是触发Action内容
      // 输出$state list内容
      this.$store.dispatch('getTransactionInfo', {
        limit: String(that.pageContent),
        offset: 0,
        currency: 'XAS',
        that: that
      })
    },
    destroyed: function () {
      this.$store.commit('toInitPage')
    }
  }
</script>

<style lang="" scoped>
  .withdraw_container{
    width: 60%;
    min-height: 700px;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;
    padding-bottom: 210px;
  }
  .withdraw_container > p{
    text-align: left;
    width: 68%;
    margin: 15px auto 15px auto;
    color: rgb(146, 176, 230);
  }
  .header{
    margin: 30px auto 0 auto;
    height: 20px;
    width: 70%;
    border-left: 5px solid rgb(238, 238, 238);
  }
  .header h1{
    margin-left: 15px;
    text-align: left;
    font-size: 20px;
    line-height: 20px;
    font-weight: 600;
  }
  .deal_part{
    width: 70%;
    height: 200px;
    margin: 30px auto 0 auto;
    border-left: 5px solid rgb(238, 238, 238);
  }
  .deal_part>span{
    display: block;
    font-size: 16px;
    margin-left: 15px;
    font-weight: 600;
    text-align: left;
  }
  .deal_form{
    margin-left: 15px;
    text-align: left;
    width: 40%;
  }
  .deal_form select, .deal_form input{
    border: 1px solid #999;
    margin: 10px 0 5px 0;
    height: 30px;
    display: inline-block;
    font-size: 13px;
    line-height: 30px;
    width: 60%;
    border-radius: 5px;
    padding-left: 5px;
  }
  .deal_form span{
    margin-left: 25px;
    color: rgb(146, 176, 230);
    font-size: 16px;
  }
  .deal_form .psd{
    background-color: rgb(210, 229, 244);
  }
  .confirm_btn{
    width:70%;
    margin: 10px auto 0 auto;
  }
  .btn{
    display: block;
    height:35px;
    width: 80px;
    line-height: 35px;
    color: rgb(146, 176, 230);
    border-radius: 5px;
    background-color: rgb(210, 229, 244);
    margin-left: 19%;
    cursor: pointer;
  }
  .record_title{
    display: block;
    width: 70%;
    font-size: 20px;
    font-weight: 500;
    text-align: left;
    margin: 20px auto 0 auto;
    border-left: 5px solid rgb(238, 238, 238);
  }
  .record_title th{
    min-width: 100px;
  }
  .record_title h3{
    display: inline-block;
    margin-left: 15px;
    font-size: 20px;
  }
  .record_title select{
    margin-right: 3%;
    float: right;
  }
  .record{
    height: 105px;
    width: 66%;
    margin: auto auto
  }
  .record table{
    margin-top: 15px;
    min-width: 900px;
    width: 100%;
  }
  .record h3{
    font-size: 20px;
  }
  .table_header{
    font-size: 14px;
    line-height: 30px;
    background-color: rgb(238, 238, 238);
    border: 1px solid rgb(191, 191, 191);
  }
  .record td{
    line-height: 26px;
    font-size: 14px;
    max-width: 180px;
    overflow: overlay;
    padding: 6px 2px;
  }
  .pag{
    position: absolute;
    margin-top: 30px;
    bottom: 120px;
    left: 45%;
    display: block;
  }
  .pag div{
    display: inline-block;
    cursor: pointer;
    height: 35px;
    line-height: 35px;
    min-width: 35px;
    font-size: 12px;
    border-radius: 6px;
  }
  .ctrbtn{
    border: 1px solid rgb(102, 146, 217);
    color: rgb(102, 146, 217);
    padding: 0 10px;
  }
  .active{
    background-color: rgb(102, 146, 217);
    color: #fff;
  }
  @media screen and (max-width: 1441px) {
    .withdraw_container{
      width: 80%;
      min-height: 600px;
      padding-bottom: 210px;
    }
    .withdraw_container > p{
      font-size: 14px;
    }
    .header{
      margin: 25px auto 0 auto;
      height: 20px;
      width: 70%;
      border-left: 2px solid rgb(238, 238, 238);
    }
    .deal_part{
      width: 70%;
      height: 200px;
      margin: 20px auto 0 auto;
      border-left: 2px solid rgb(238, 238, 238);
    }
    .deal_form{
      margin-left: 10px;
      width: 60%;
    }
    .deal_form span{
      margin-left: 25px;
      color: rgb(146, 176, 230);
      font-size: 14px;
    }
    .header h1{
      margin-left: 10px;
      font-size: 16px;
      line-height: 16px;
    }
    .deal_part>span{
      font-size: 14px;
      margin-left: 10px;
      font-weight: 500;
    }
    .record_title{
      display: block;
      width: 70%;
      font-size: 20px;
      font-weight: 500;
      text-align: left;
      margin: 20px auto 0 auto;
      border-left: 2px solid rgb(238, 238, 238);
    }
    .record_title th{
      min-width: 100px;
    }
    .record_title h3{
      margin-left: 15px;
      font-size: 16px;
    }
    .record{
      height: 105px;
      width: 66%;
      margin: auto auto
    }
    .record table{
      margin-top: 15px;
      min-width: 700px;;
      width: 100%;
    }
    .table_header{
      font-size: 14px;
      line-height: 30px;
      background-color: rgb(238, 238, 238);
      border: 1px solid rgb(191, 191, 191);
    }
    .record td{
      text-align: center;
      font-size: 12px;
      overflow: overlay;
    }
    .pag{
      margin-top: 30px;
      bottom: 90px;
      left: 45%;
    }
    .pag div{
      height: 30px;
      line-height: 30px;
      min-width: 30px;
      font-size: 10px;
    }
  }
</style>
