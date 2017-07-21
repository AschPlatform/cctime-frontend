<template>
  <div class="outter">
    <header class="header">
      <nav class="nav-wrapper">
        <router-link to="/top" class="fl logo"></router-link>
        <router-link to="/top" class="fl btn_hot" active-class="active"><span></span></router-link>
        <router-link to="/new" class="fl btn_new" active-class="active"><span></span></router-link>
        <div class="right-part">
          <router-link to="/login" class="loginbtn btn" v-show="!this.isLogin">登陆</router-link>
          <span class="logoutbtn btn" @click="logout">注销</span>
          <!--测试存留副本<span class="logoutbtn btn" @click="logout" v-show="this.isLogin">注销</span>-->
          <router-link to="/account" class="accountbtn btn">我的账户</router-link>
          <!-- 测试存留副本<router-link to="/account" class="accountbtn btn" v-show="this.isLogin">我的账户</router-link>-->
          <span class="submitbtn btn"@click="showPublish">发布</span>
        </div>
      </nav>
    </header>
    <publishmodal v-show="this.isPublishShow"></publishmodal>
    <!--测试存留副本<publishmodal v-show="this.isPublishShow"></publishmodal>-->
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import publishmodal from './publishmodal/publishmodal'
  export default {
    name: 'topbar',
    components: {
      publishmodal
    },
    data: function () {
      return {
      }
    },
    methods: {
      logout: function () {
        this.$store.commit('logOut')
        this.$router.push('top')
      },
      showPublish: function () {
        if (this.isLogin === true) {
          this.$store.commit('toggleModal')
        } else {
          alert('请先登录！')
          this.$router.push('login')
        }
      }
    },
    computed: {
      ...mapState(['isLogin', 'isPublishShow'])
    }
  }
</script>

<style lang="" scoped>
  .header{
    background-color: rgb(255, 215, 1); 
    position: fixed;
    z-index: 999;
    height: 65px;
/*    padding: 0 1% 0 1%;*/
    top: 0;
    left: 0;
    right: 0;
  }
  .nav-wrapper{
    height: 65px;
    width: 80%;
    margin: auto;
    text-align: center;
  }
  .nav-wrapper>a{
    display: inline-block;
    color: rgba(255, 255, 255, .8);
    font-size: 24px;
    margin-top: 5px;
  }
  .nav-wrapper .btn_hot{
    background-size: 100% 100%;
    margin-top: 0;
    width: 5%;
    height: 100%;
  }
  .nav-wrapper .btn_new{
    background-size: 100% 100%;
    margin-top: 0;
    width: 5%;
    height: 100%;
  }
  .btn_hot span{
    display: inline-block;
    background: url(/static/img/hot.png) no-repeat;
    background-size: 100% 100%;
    margin-top: 8px;
    width: 27px;
    height: 45px;
  }
  .btn_new span{
    display: inline-block;
    background: url(/static/img/new.png) no-repeat;
    background-size: 100% 100%;
    margin-top: 8px;
    width: 27px;
    height: 45px;
  }
  .logo{
    display: inline-block;
    width: 137px;
    height: 55px;
    background-image: url(/static/img/logo.png);
    margin-right: 15px;
    background-size:100% 100%;
  }
  .fl{
    float: left;
  }
  .header .active{
    background-color: rgba(255, 255, 255, .6);
    font-size: 30px;
  }
  .header .btn{
    margin-top: 10px;
    display: inline-block;
    height: 18px;
    padding: 10px 15px;
    color: rgba(0, 0, 0, 1);
    display: inline-block;
    float: right;
    font-size: 25px;
    font-weight: 900;
    cursor: pointer;
    margin-right: 10px;
  }
  .nav-wrapper{

  }
</style>
