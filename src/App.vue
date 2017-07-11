<template>
  <div id="app">
    <!--顶部栏-->
    <top-bar></top-bar>
    <div class="shim"></div>
    <router-view></router-view>
  </div>
</template>

<script>
import topBar from './components/topbar/topbar'
export default {
  name: 'app',
  components: {
    topBar
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.shim{
  position: fixed;
  top: 0;
  height: 55px;
}
</style>
