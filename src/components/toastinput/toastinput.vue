<template>
  <div class="mask">
    <div class="toastbox">
        <div class="toastmsg">
          <span class="msg-header">{{this.toastInputState.toastMsgHeader}}</span>
          <span class="msg-content">{{this.toastInputState.toastMsgContent}} 这将花费{{this.getAcccountLost}}时讯币</span>
          <input type="number" placeholder="  请输入奖赏金额" min="0" v-model="price" @blur="emitPrice">
        </div>
        <div class="toastctr">
          <span class="confirm" @click="todo()">确定</span>
          <span class="cancel" @click="callOff()">取消</span>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'toastinput',
  data: function () {
    return {
      price: 1,
      confirmFunction: null,
      cancelFunction: null
    }
  },
  methods: {
    todo: function () {
      if (String(this.price).indexOf('.') > 0) {
        this.$store.commit('callToast', {msgHeader: '注意！', msgContent: '打赏金额必须为整数！', _confirmfunc: '了解', _cancelfunc: '关闭', deals: undefined, contract: 4})
        this.toastInputState.isShowToast = false
        return
      }
      this.pickMethod(this.$store.state.toastInputState.contract)
      if (this.confirmFunction !== null) {
        this.confirmFunction()
        this.toastInputState.isShowToast = false
        this.$store.commit('toastReset')
        this.price = 1
      } else {
        this.toastInputState.isShowToast = false
        this.$store.commit('toastReset')
        this.price = 1
      }
    },
    callOff: function () {
      this.pickMethod(this.$store.state.toastInputState.contract)
      if (this.toastInputState.cancelFunction !== null) {
        this.cancelFunction()
        this.toastInputState.isShowToast = false
        this.$store.commit('toastReset')
        this.price = 1
        return
      } else {
        this.toastInputState.isShowToast = false
        this.$store.commit('toastReset')
        this.price = 1
      }
    },
    emitPrice: function () {
      this.$store.commit('toastWriteIn', this.price)
    },
    pickMethod: function (num) {
      num = Number(num)
      switch (num) {
        case 1:
        // 打赏评论
          this.confirmFunction = function () {
            let that = this
            let a = []
            // 需要传入一个deal对象,有1,有id, 有num
            a.push(this.toastInputState.deals)
            a.push(String(this.getPrice))
            that.$store.dispatch('invokeContract', {
              type: 1003,
              fee: '10000000',
              args: a,
              that: this,
              callback: function (err, msg) {
                if (err) {
                  return
                }
                that.$store.commit('callToast', {msgHeader: '成功！', msgContent: '打赏评论成功！', _confirmfunc: '确定', _cancelfunc: '关闭', deals: undefined, contract: 4})
              }
            })
          }
          // this.cancelFunction = function () {
          //   return
          // }
          this.cancelFunction = function () {
            this.toastInputState.isShowToast = false
          }
          break
        case 2:
            // 打赏文章
          this.confirmFunction = function () {
            let that = this
            let a = []
                // 需要传入一个deal对象,有2,有id, 有num
            a.push(this.toastInputState.deals)
            a.push(String(this.getPrice))
            this.$store.dispatch('invokeContract', {
              type: 1002,
              args: a,
              fee: '10000000',
              that: this,
              callback: function (err, msg) {
                if (err) {
                  return
                }
                that.$store.commit('callToast', {msgHeader: '成功！', msgContent: '打赏文章成功！', _confirmfunc: '了解', _cancelfunc: '关闭', deals: undefined, contract: 4})
              }
            })
          }
          this.cancelFunction = function () {
            this.toastInputState.isShowToast = false
          }
          break
      }
    }
  },
  computed: {
    ...mapState(['toastInputState']),
    getPrice: function () {
      return this.price * 100000000
    },
    getAcccountLost: function () {
      if (this.price > 0) {
        return Number(this.price) + 0.1
      } else {
        return 0
      }
    }
  }
}
</script>

<style scoped>
  .mask{
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .6);
    width: 100%;
    height: 100%;
    z-index: 9998;
  }
  .toastbox{
    min-width: 300px;
    min-height: 250px;
    position: fixed;
    top: 35%;
    left: 40%;
    width: 25%;
    height: 25%;
    background-color: rgba(237, 237, 237, .9);
    border-radius: 8px;
  }
  .toastmsg{
    height: 70%;
    border-bottom: 1px solid #c8c8c8;
  }
  .toastmsg span{
    display: block;
    font-size: 18px;
  }
  .toastmsg input{
    outline: none;
    display: inline-block;
    width: 80%;
    height: 30px;
    margin-top: 36px;
    border-radius: 6px;
  }
  .msg-header{
    font-weight: 800;
    margin: 0 auto;
    padding-top: 30px;
  }
  .msg-content{
    font-weight: 500;
    line-height: 18px;
    margin: 3% auto 0 auto;
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .toastctr{
    width: 100%;
    height: 30%;
  }
  .toastctr span{
    display: inline-block;
    height: 96%;
    line-height: 350%;
    width: 49%;
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
  }
  .toastctr span:hover{
    background-color: #cfc9a8;
    border-radius: 7px;
  }
  .toastctr .confirm{
    border-right: 1px solid #c8c8c8;
  }
  .toastctr .cancel{
  }

  @media screen and (max-width: 1441px) {
    .toastbox{
      position: fixed;
      top: 40%;
      left: 40%;
      width: 24%;
      height: 24%;
      background-color: rgba(237, 237, 237, .9);
      border-radius: 8px;
    }
    .toastmsg span{
      display: block;
      font-size: 16px;
    }
    .toastctr span{
      line-height: 200%;
    }
    .toastmsg input{
      width: 60%;
      height: 20px;
      margin-top: 36px;
      border-radius: 6px;
    }
    .toastctr span{
      display: inline-block;
      height: 96%;
      line-height: 350%;
      width: 49%;
      font-size: 18px;
      font-weight: 700;
      cursor: pointer;
    }
  }
</style>
