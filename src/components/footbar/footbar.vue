<template>
  <div class="footbar">
    <div class="link_box">
      <a href="https://www.asch.so">阿希官网</a>&nbsp;|&nbsp;
      <a href="https://www.asch.so">阿希生态社区</a>&nbsp;|&nbsp;
      <p>官方QQ群1：485979564</p>&nbsp;|&nbsp;
      <p>官方QQ群1：545183438</p>
    </div>
    <span>&copy;Asch</span>
  </div>
</template>

<script>
  export default {
    name: 'footbar',
    components: {
    }
  }
</script>

<style lang="" scoped>
  .footbar{
      position: absolute;
      left: 50%;
      bottom: 0;
      margin-left: -40%;
      border-top: 1px solid rgb(222, 222, 222);
      background-color: rgb(252, 252, 252);
      width: 80%;
      height: 200px;
  }
  .footbar span{
      display: inline-block;
      margin-top: 30px;
  }
  .link_box{
      margin-top: 40px;
      width: 100%;
      color: #000;
  }
  .link_box p{
      display: inline-block;
  }
</style>
