<template>
  <div class="loginform">
    <div class="inner-wrap">
      <span class="title">用户登陆</span>
      <input type="password" class="password" v-model="secret" placeholder="  请输入密钥">
      <div class="loginbtn loginbtn1" @click="toLogin()">登陆</div>
      <div class="loginbtn loginbtn2" @click="toNotLogin()">取消</div>
    </div>
  </div>
</template>

<script>
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
        this.$store.dispatch('getUserInfo', {
          secret: this.secret,
          that: this
        })
        this.$router.push('top')
      },
      toNotLogin: function () {
        this.$router.push('top')
      }
    }
  }
</script>

<style lang="" scoped>
  .loginform{
    min-width: 600px;
    min-height: 100%;
    width: 80%;
    margin: 0 auto;
    background: url(/static/img/login_background3.png) no-repeat;
    background-size: 100% auto;
    overflow: hidden;
    padding-bottom: 210px;
  }
  .inner-wrap{
    padding: 30px;
    margin: 120px auto;
    width: 400px;
    height: 300px;
    text-align: center;
    border-radius: 5px;
  }
  .inner-wrap .title{
    display: block;
    color: rgb(255, 127, 0);
    font-size: 30px;
    font-weight: bold;
    margin: 40px auto;
  }
  .inner-wrap .password{
    font-size: 25px;
    width: 90%;
    margin: auto auto;
    background-color: #fff;
    border: 1px solid rgb(220, 220, 220);
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
    display: inline-block;
    margin: 40px 30px;
    width: 90px;
    height: 30px;
    line-height: 30px;
    vertical-align: baseline;
    border-radius: 8px;
    cursor: pointer;
  }
  .loginbtn1{
    border: 1px solid rgb(255, 127, 0);
    color: #fff;
    background-color: rgb(255, 127, 0);
    margin-right: 65px;
  }
  .loginbtn2{
    border: 1px solid rgb(255, 127, 0);
    color: rgb(255, 127, 0);
    background-color: #fff;
  }
</style>
