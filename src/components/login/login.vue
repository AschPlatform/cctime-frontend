<template>
  <div class="loginform">
    <div class="inner-wrap">
      <span class="title">用户登录</span>
      <input type="password" class="password" v-model="secret" minlength="20"  placeholder="  请输入密钥">
      <a class="signUp" href="http://mainnet.asch.so/#/login" target="_blank">尚未拥有账户？</a>
      <div class="loginbtn loginbtn1" @click="toLogin()">登录</div>
      <div class="loginbtn loginbtn2" @click="toNotLogin()">取消</div>
    </div>
  </div>
</template>

<script>
  var Mnemonic = Mnemonic = require('bitcore-mnemonic')
  export default {
    name: 'loginform',
    components: {
    },
    data: function () {
      return {
        secret: ''
      }
    },
    methods: {
      toLogin: function () {
        let that = this
        let reg = '^[ ]+$'
        let regu = new RegExp(reg)
        let result = regu.test(this.secret)
        if (this.secret === '' || result === true) {
          that.$store.commit('callToast', {msgHeader: '注意!', msgContent: '秘钥不能为空呦', _confirmfunc: '了解', _cancelfunc: '关闭', deals: undefined, contract: 4})
          return
        }
        if (!Mnemonic.isValid(this.secret)) {
          that.$store.commit('callToast', {msgHeader: '注意!', msgContent: '秘钥不符合规则', _confirmfunc: '了解', _cancelfunc: '关闭', deals: undefined, contract: 4})
          return
        }
        this.$store.dispatch('getUserInfo', {
          secret: this.trimSecret,
          that: this
        })
        this.$router.push('/top')
      },
      toNotLogin: function () {
        this.$router.push('/top')
      }
    },
    computed: {
      trimSecret: function () {
        return this.secret.trim()
      }
    }
  }
</script>

<style lang="" scoped>
  .loginform{
    min-width: 600px;
    min-height: 100%;
    margin: 0 auto;
    background: url(/static/img/login_background3.png) no-repeat;
    background-size: 60% auto;
    background-position: 50% 30%;
    overflow: hidden;
  }
  .inner-wrap{
    padding: 30px;
    margin: 180px auto;
    width: 400px;
    height: 300px;
    text-align: center;
    border-radius: 5px;
  }
  .inner-wrap .title{
    display: block;
    color: #000;
    font-size: 30px;
    font-weight: 500;
    margin: 40px auto;
  }
  .inner-wrap .password{
    display:  inline-block;
    height: 35px;
    font-size: 16px;
    width: 90%;
    margin: auto auto;
    background-color: #fff;
    border: 2px solid rgb(220, 220, 220);
    border-radius: 6px;
  }
 .inner-wrap .password::-webkit-input-placeholder{
   letter-spacing: 2px;
   font-style: italic;
   color: rgb(204, 204, 204);
 }
  .inner-wrap .password:focus{
    outline: none;
  }
  .inner-wrap .loginbtn{
    font-size: 20px;
    display: inline-block;
    margin: 40px 30px;
    width: 90px;
    height: 35px;
    line-height: 35px;
    vertical-align: baseline;
    border-radius: 8px;
    cursor: pointer;
  }
  .loginbtn1{
    border: 1px solid rgb(100, 147, 217);
    color: #fff;
    background-color: rgb(100, 147, 217);
    margin-right: 65px;
  }
  .loginbtn2{
    border: 2px solid rgb(100, 147, 217);
    color: rgb(100, 147, 217);
    background-color: #fff;
  }
  .signUp{
    display: block;
    font-weight: 500;
    margin-top: 30px;
    text-align: right;
    width: 96%;
    color: rgb(100, 147, 217);
  }

   @media screen and (max-width: 1441px) {
    .loginform{
      background-size: 100%;
    }
    .inner-wrap{
      padding: 30px;
      margin: 100px auto;
    }
  }
</style>
