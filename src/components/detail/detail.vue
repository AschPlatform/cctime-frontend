<template>
  <div class="main">
    <div class="headinfo">
      <h1>Hacker School's Secret Strategy for Being Super Productive (or: Help.)</h1>
      <div class="inner-wrap">
        <router-link class="author" to="#">abise</router-link>
        <span class="time">2017.08.01</span>
      </div>
    </div>
    <p>This story begins, as they so often do, when I noticed that my machine was behaving poorly. My Windows 10 work machine has 24 cores (48 hyper-threads) and they were 50% idle. It has 64 GB of RAM and that was less than half used. It has a fast SSD that was mostly idle. And yet, as I moved the mouse around it kept hitching – sometimes locking up for seconds at a time.
    So I did what I always do – I grabbed an ETW trace and analyzed it. The result was the discovery of a serious process-destruction performance bug in Windows 10.
    The ETW trace showed UI hangs in multiple programs. I decided to investigate a 1.125 s hang in Task Manager.
    </p>
  </div>
</template>
  
<script>
  export default {
    name: 'detail',
    components: {
    }
  }
</script>

<style scoped>
  .main{
    margin: 30px auto auto auto;
    padding: 30px 10px 10px 10px;
    background-color: #fff;
    min-width: 760px;
    max-width:960px;
    width: 80%;
  }
  .headinfo{
    text-align: center;
  }
  .headinfo a:hover{
    color: #f60;
  }
  .inner-wrap{
    margin: 30px 30px 0 0;
  }
  .main h1{
    font-size: 2em;
  }
</style>
