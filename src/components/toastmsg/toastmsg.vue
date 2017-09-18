<template>
  <div class="mask">
    <div class="toastbox">
        <div class="toastmsg">
          <span class="msg-header">{{this.toastState.toastMsgHeader}}</span>
          <span class="msg-content">{{this.toastState.toastMsgContent}}</span>
        </div>
        <div class="toastctr">
          <span class="confirm" @click="todo()">{{this.$store.state.toastState._confirmfunc}}</span>
          <span class="cancel" @click="callOff()">{{this.$store.state.toastState._cancelfunc}}</span>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'toastmsg',
  data: function () {
    return {
      confirmFunction: null,
      cancelFunction: null
    }
  },
  methods: {
    todo: function () {
      this.pickMethod(this.$store.state.toastState.contract)
      if (this.confirmFunction !== null) {
        this.confirmFunction()
        this.toastState.isShowToast = false
        this.$store.commit('toastReset')
        this.reset()
        return
      } else {
        this.toastState.isShowToast = false
      }
    },
    callOff: function () {
      this.pickMethod(this.$store.state.toastState.contract)
      if (this.toastState.cancelFunction !== null) {
        this.cancelFunction()
        this.toastState.isShowToast = false
        this.$store.commit('toastReset')
        this.reset()
        return
      } else {
        this.toastState.isShowToast = false
      }
    },
    // 本地状态重置
    reset: function () {
      this.confirmFunction = null
      this.cancelFunction = null
    },
    pickMethod: function (num) {
      num = Number(num)
      switch (num) {
        case 1:
          // 举报评论
          this.confirmFunction = function () {
            let that = this
            let a = []
            // 传入两个值： deal=1  idr
            a.push('2')
            a.push(this.toastState.deals)
            this.$store.dispatch('invokeContract', {
              type: 1004,
              fee: '10000000',
              args: a,
              that: this,
              callback: function (err, msg) {
                if (err) {
                  return
                }
                that.$store.commit('callToast', {msgHeader: '成功！', msgContent: '举报评论成功！请等待负责人核实', _confirmfunc: '了解', _cancelfunc: '关闭', deals: 0, contract: 4})
              }
            })
          }
          this.cancelFunction = function () {
            this.toastState.isShowToast = false
          }
          break
        case 2:
          // 举报文章
          this.confirmFunction = function () {
            let that = this
            let a = []
            // 传入 deals = 2 id
            a.push('1')
            a.push(this.toastState.deals)
            this.$store.dispatch('invokeContract', {
              type: 1004,
              fee: '10000000',
              args: a,
              that: this,
              callback: function (err, msg) {
                if (err) {
                  return
                }
                that.$store.commit('callToast', {msgHeader: '成功！', msgContent: '举报文章成功！请等待负责人核实', _confirmfunc: '了解', _cancelfunc: '关闭', deals: 0, contract: 4})
              }
            })
          }
          this.cancelFunction = function () {
            this.toastState.isShowToast = false
          }
          break
        case 3:
          // 返回首页
          this.confirmFunction = function () {
            // 不用传入任何参数
            this.$router.push('/login')
          }
          this.cancelFunction = function () {
            this.toastState.isShowToast = false
          }
          break
        case 4:
          // 错误处理
          this.confirmFunction = function () {
            this.toastState.isShowToast = false
          }
          this.cancelFunction = function () {
            this.toastState.isShowToast = false
          }
          break
        case 5:
          // 注销确认
          console.log(this)
          this.confirmFunction = function () {
            this.$store.commit('logOut')
            this.$router.push('/top')
            window.sessionStorage.clear()
            this.toastState.isShowToast = false
          }
          this.cancelFunction = function () {
            this.toastState.isShowToast = false
          }
      }
    }
  },
  computed: {
    ...mapState(['toastState'])
  }
  /* methods: {
    todo: function () {w
      this.$store.commit('callOffToast')
      await global.hooks[this.$store.toastStateHeader.type].aggree(store.toastStateContent.topic, )
    }
  } */
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
    min-height: 200px;
    font-size: 16px;
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
    font-size: 17px;
    line-height: 22px;
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
    font-size: 1.2em;
    line-height: 350%;
    width: 49%;
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
      font-size: 12px;
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
    }
  }
</style>
