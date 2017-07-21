<template>
  <div id="app">
    <!--顶部栏-->
    <top-bar></top-bar>
    <div class="shim"></div>
    <router-view></router-view>
    <foot-bar></foot-bar>
  </div>
</template>

<script>
import topBar from './components/topbar/topbar'
import footBar from './components/footbar/footbar'
export default {
  name: 'app',
  components: {
    topBar,
    footBar
  }
}
</script>

<style scoped>
#app {
  position: relative;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height:100%;
  height: auto !important;
}
.shim{
  top: 0;
  height: 65px;
}
</style>
