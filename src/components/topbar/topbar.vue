<template>
  <header class="header">
    <nav class="nav-wrapper">
      <router-link to="/top" class="fl" active-class="active">热门</router-link>
      <router-link to="/new" class="fl" active-class="active">最新</router-link>
      <span class="submitbtn">发布</span>
    </nav>
  </header>
</template>

<script>
  export default {
    name: 'topbar',
    components: {
    }
  }
</script>

<style lang="" scoped>
  .header{
    background-color: #f60; 
    position: fixed;
    z-index: 999;
    height: 55px;
    padding: 0 1vw 0 1vw;
    top: 0;
    left: 0;
    right: 0;
  }
  .header a{
    color: rgba(255, 255, 255, .8);
    font-size: 24px;
    line-height: 55px;
    margin-right: 15px;
    display: inline-block;
    vertical-align: middle;
    font-weight: 300;
    letter-spacing: 0.095em;
  }
  .fl{
    float: left;
  }
  .header .active{
    color: rgba(255, 255, 255, 1);
    font-size: 30px;
  }
  .header .submitbtn{
    margin-top: 10px;
    display: inline-block;
    height: 18px;
    width: 35px;
    padding: 10px 15px;
    color: rgba(255, 255, 255, 1);
    display: inline-block;
    float: right;
    font-size: 15px;
    font-weight: 150;
    border: 1px solid white;
    border-radius: 35px;
    cursor: pointer;
  }
  .nav-wrapper{

  }
</style>
