<template>
  <div>
    <img src="/static/img/logo.png"></img>
    <h1>您访问的页面由于各种原因，总之消失了</h1>
    <router-link to="/top">点击这里返回主页，感谢您对CCTime的大力支持！</router-link>
  </div>
</template>

<script>
  export default {
    name: 'notfound',
    data: function () {
      return {}
    }
  }
</script>

<style scoped>
  div{
    position: absolute;
    display: block;
    height: 50%;
    width: 80%;
    left: 10%;
    top: 25%;
  }
  div h1{
    font-size: 35px;
    margin-top: 20px;
  }
  div a{
    display: inline-block;
    font-size: 25px;
    margin-top: 30px;
    cursor: pointer;
  }
  div a:hover{
    color: rgb(255, 60, 0);
  }
</style>
