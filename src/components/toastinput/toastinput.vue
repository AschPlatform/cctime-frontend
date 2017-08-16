<template>
  <div class="mask">
    <div class="toastbox">
        <div class="toastmsg">
          <span class="msg-header">{{this.toastInputState.toastMsgHeader}}</span>
          <span class="msg-content">{{this.toastInputState.toastMsgContent}}</span>
          <input type="number" placeholder="  请输入奖赏金额" v-model="price" @blur="emitPrice">
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
      price: 0,
      confirmFunction: null,
      cancelFunction: null
    }
  },
  methods: {
    todo: function () {
      this.pickMethod(this.$store.state.toastInputState.contract)
      console.log(this)
      if (this.confirmFunction !== null) {
        console.log(this)
        this.confirmFunction()
        this.toastInputState.isShowToast = false
        this.$store.commit('toastReset')
      } else {
        this.toastInputState.isShowToast = false
      }
    },
    callOff: function () {
      this.pickMethod(this.$store.state.toastInputState.contract)
      if (this.toastInputState.cancelFunction !== null) {
        this.cancelFunction()
        this.toastInputState.isShowToast = false
        this.$store.commit('toastReset')
        return
      } else {
        this.toastInputState.isShowToast = false
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
            // if (this.getPrice === 0) {
            //   console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
            //   that.$store.commit('callToast', {msgHeader: '注意！', msgContent: '你不能戏耍CCT！', _confirmfunc: null, _cancelfunc: null, deals: undefined, contract: 4})
            //   return
            // }
            let a = []
            // 需要传入一个deal对象,有1,有id, 有num
            a.push(this.toastInputState.deals)
            a.push(String(this.getPrice))
            this.$store.dispatch('invokeContract', {
              type: '1003',
              fee: '1000000000',
              args: a,
              that: this,
              callback: function (err, msg) {
                if (err) {
                  return
                }
                that.$store.commit('callToast', {msgHeader: '成功！', msgContent: '打赏评论成功！', _confirmfunc: null, _cancelfunc: null, deals: undefined, contract: 4})
              }
            })
          }
          this.cancelFunction = function () {
            return
          }
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
              type: '1002',
              fee: '1000000000',
              args: a,
              that: this,
              callback: function (err, msg) {
                if (err) {
                  return
                }
                that.$store.commit('callToast', {msgHeader: '成功！', msgContent: '打赏文章成功！', _confirmfunc: null, _cancelfunc: null, deals: undefined, contract: 4})
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
      return this.price * 100000
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
    z-index: 9999;
  }
  .toastbox{
    position: fixed;
    top: 35%;
    left: 40%;
    width: 20%;
    height: 20%;
    background-color: rgba(237, 237, 237, .9);
    border-radius: 8px;
  }
  .toastmsg{
    height: 70%;
    border-bottom: 1px solid #c8c8c8;
  }
  .toastmsg span{
    display: block;
    font-size: 16px;
  }
  .toastmsg input{
    margin-top: 15px;
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
    line-height: 200%;
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
      font-size: 14px;
    }
  }
</style>
