<template>
  <div class="account_container">
    <div class="header">
      <p>我的账户</p>
      <img src="/static/img/refresh.png" alt="刷新" title="刷新" @click="clickRefresh">
    </div>
    <div class="content">
      <div class="content_header">
        <img class="logo" :src="'data:image/png;base64,' + this.$store.state.userInfo.info.logo">
        <div class="info_contain">
          <div class="info_username">
            用户名：<span v-show="this.isSetNickToggle == false">{{this.accountName}}</span>
            <!--设置收缩框-->
            <div class="setNickBox" v-show="this.isSetNickToggle == true">
              <input type="text" placeholder="  输入昵称" v-model="nickName"/>
              <div class="check" @click="setNickName">确认</div>
              <div class="check" @click="toggleNickBox">取消</div>
            </div>
            <img src="/static/img/rewrite.png" @click="toggleNickBox" v-show="!isSetNickToggle" :class="{ hidebox: isHide }">
          </div>
          <div class="info_address">地&nbsp;&nbsp;址：<span>{{this.address}}</span></div>
          <span v-if="this.isEmpty" class="warning">{{accountInfo}}</span>
        </div>
      </div>
      <div class="ctr_group">
        <router-link to="withdraw/">站内转账</router-link>
        <router-link to="recharge/">充/提币</router-link>
      </div>
      <div class="content_table">
        <table cellspacing="10">
          <tr>
            <th>币种</th>
            <th>数量</th>
          </tr>
          <tr v-for="cash in this.$store.getters['newAccount'].balances">
            <td>{{cash.currency}}</td>
            <td>{{cash.balance / 1e8}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div> 
</template>

<script>
  export default {
    name: 'account',
    components: {
    },
    data: function () {
      return {
        account: {},
        accountInfo: '',
        address: '',
        isEmpty: true,
        isSetNickToggle: false,
        nickName: ''
      }
    },
    methods: {
      toggleNickBox: function () {
        this.nickName = ''
        this.isSetNickToggle = !this.isSetNickToggle
      },
      setNickName: function () {
        // this.toggleNickBox()
        let that = this
        let nick = this.nickName
        if (nick.trim() === '') {
          this.$store.commit('callToast', {msgHeader: '发生错误', msgContent: '昵称不能为空', _confirmfunc: '了解', _cancelfunc: '关闭', deals: undefined, contract: 4})
          return
        }
        if (this.nickName.length > 20) {
          this.$store.commit('callToast', {msgHeader: '发生错误', msgContent: '昵称必须小于等于20个字节', _confirmfunc: '了解', _cancelfunc: '关闭', deals: undefined, contract: 4})
          this.nickName = ''
          return
        } else {
          console.log('gonna change your name')
          this.$store.dispatch('invokeContract', {
            type: 4,
            fee: '10000000',
            args: [this.nickName],
            that: this,
            callback: function (err, res) {
              if (err) {
                return
              }
              that.$store.commit('callToast', {msgHeader: '成功！', msgContent: '修改昵称成功！(大约十秒后您的信息将被更新)', _confirmfunc: '了解', _cancelfunc: '关闭', deals: undefined, contract: 4})
              // 先仅仅commit测试下
              setTimeout(function () {
                that.$store.dispatch('getUserInfo', {
                  secret: that.$store.state.userInfo.secret,
                  that: that
                })
                // 刷新判断是否要显示名称修改
                console.log(that.$store.state.userInfo)
                if (that.$store.state.userInfo.info.extra === null) {
                  that.isHide = true
                } else {
                  that.isHide = false
                }
              }, 10000)
            }
          })
        }
        this.toggleNickBox()
      },
      clickRefresh: function () {
        this.$store.dispatch('getUserInfo', {
          secret: window.sessionStorage.secret,
          that: this
        })
        // 刷新判断是否还有余额
        if (this.$store.state.userInfo.info.balances.length === 0) {
          this.isEmpty = false
        } else {
          this.isEmpty = true
        }
        this.$store.commit('callToast', {msgHeader: '成功！', msgContent: '刷新成功(不推荐使用F5)', _confirmfunc: '我看见了', _cancelfunc: '关闭', deals: undefined, contract: 4})
        // window.history.go(0)
      }
    },
    computed: {
      accountName: function () {
        if (this.$store.state.userInfo.info.extra === null) {
          return '个人信息未设置'
        } else {
          return this.$store.state.userInfo.info.extra.str1
        }
      }
    },
    created: function () {
      this.$store.dispatch('getUserInfo', {
        secret: window.sessionStorage.secret,
        that: this
      })
      this.account = this.$store.state.userInfo.info.balances
      this.address = this.$store.state.userInfo.info.address
      if (this.account.length === 0) {
        this.accountInfo = '未查询到您账户下的余额信息！可能是新建用户或者输入密钥有误'
        this.isEmpty = true
      } else {
        this.isEmpty = false
      }
      // 判断是否要显示名称修改
      if (this.$store.state.userInfo.info.extra === null) {
        this.isHide = false
      } else {
        this.isHide = true
      }
    }
  }
</script>

<style lang="" scoped>
  .account_container{
    width: 50%;
    min-height: 700px;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;
    padding-bottom: 160px;
  }
  .header{
    width: 100%;
    margin: 40px auto 20px auto;
    border-bottom: 6px solid rgb(238, 238, 238);
    padding-bottom: 15px;
    text-align: left;
    line-height: 20px;
  }
  .header p{
    display: inline-block;
    text-align: left;
    font-size: 20px;
  }
  .header img{
    height: 20px;
    cursor: pointer;
    float: right;
  }
  .content{
    position: relative;
    width: 100%;
    margin: auto auto;
  }
  .info_contain{
    display: inline-block;
    width: 70%;
    margin-left: 20px;
  }
  .content_header{
    text-align: left;
    position: relative;
    width: 90%;
    margin-left: 10px;
    margin-top: 35px;
  }
  .content_header .logo{
    float: left;
    height: 70px;
    border-radius: 50px;
  }
  .info_username{
    height: 21px;
    line-height: 21px;
  }
  .info_contain .info_username span{
    margin-top: 0px;
  }
  .info_contain img{
    height: 16px;
    margin-left: 10px;
  }
  .setNickBox{
    display: inline-block;
    text-align: left;
  }
  .content_header .setNick{
    position: absolute;
    font-size: 16px;
    display: inline-block;
    right: 215px;
    width: 70px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: rgb(102, 146, 217);
    background-color: rgb(210, 229, 244);
    border-radius: 3px;
    cursor: pointer;
  }
  .setNickBox input{
    display: inline-block;
    border-bottom: 1px solid black;
    outline: none;
    width: 230px;
  }
  .setNickBox div{
    display: inline-block;
    width: 70px;
    line-height: 20px;
    height: 20px;
    text-align: center;
    border-radius: 3px;
    cursor: pointer;
  }
  .setNickBox :-moz-input-placeholder{
    font-size: 18px;
  }
  .warning{
    display: block;
    font-size: 18px;
    font-weight: bold;
    color: red;
  }
  .warning{
    clear: both;
  }
  .content_header span{
    display: inline-block;
    text-align: left; 
    font-size: 20px;
    margin-top: 10px;
  }
  .content_table{
    width: 100%;
    margin-top: 50px;
  }
  .content_table table{
    overflow:hidden;
    cellspacing: 10;
    font-size: 20px;
    vertical-align: center;
    width: 100%;
    border: solid transparent;
    border-radius: 20px;
    margin: auto auto;
  }
  .content_table tr{
    line-height: 20px;
    height: 70px;
  }
  .content_table th:nth-child(1){
    width: 30%;
  }
  .content_table th,tr,td{
    vertical-align: middle;
  }
  .content_table th{
    color: #fff;
    border: 5px solid #fff;
    background-color: rgb(102, 146, 217);
  }
  .content_table td{
    max-width: 40%;
    background-color: rgb(210, 229, 244);
    border: 5px solid #fff;
  }
  .ctr_group{
    position: absolute;
    right: 0;
  }
  .ctr_group a{
    display: inline-block;
    font-size: 16px;
    margin: auto auto;
    width: 90px;
    height: 30px;
    line-height: 30px;
    color: rgb(102, 146, 217);
    background-color: rgb(210, 229, 244);
    border-radius: 3px;
    cursor: pointer;
  }
  .info_address > span{
  }
  @media screen and (max-width: 1441px){
    .account_container{
      width: 80%;
    }
    .header{
      width: 100%;
      margin: 30px auto 10px auto;
      border-bottom: 2px solid rgb(238, 238, 238);
      padding-bottom: 15px;
    }
    .header p{
      font-size: 16px;
    }
    .header img{
      height: 16px;
      cursor: pointer;
      float: right;
    }
    .content_header .logo{
      height: 40px;
    }
    .setNickBox{
      text-align: right;
      margin-top: -30px;
      margin-right: 123px;
      margin-bottom: 10px;
    }
    .content_header .setNick{
      font-size: 12px;
      right: 453px;
      width: 55px;
      height: 20px;
      line-height: 20px;
    }
    .setNickBox input{
      width: 90px;
    }
    .setNickBox :-moz-input-placeholder{
      font-size: 18px;
    }
    .setNickBox div{
      width: 50px;
      font-size: 12px;
      line-height: 20px;
      height: 20px;
    }
    .content_header span{
      font-size: 14px;
      margin-top: 10px;
    }
    .content_table table{
      font-size: 12px;
      width: 70%;
      border-radius: 20px;
    }
    .content_table tr{
      line-height: 24px;
      height: 40px;
    }
    .info_contain{
      display: inline-block;
      margin-top: -5px;
      width: 70%;
      margin-left: 10px;
    }
    .ctr_group a{
      font-size: 12px;
      width: 60px;
      height: 20px;
      line-height: 20px;
    }
  }
  .hidebox{
    display: none;
  }
</style>
