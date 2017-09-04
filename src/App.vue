<template>
  <div id="app">
    <!--顶部栏-->
    <top-bar></top-bar>
    <div class="shim"></div>
    <router-view></router-view>
    <toast-msg v-show="this.toastState.isShowToast == true"></toast-msg>
    <toast-input v-show="this.toastInputState.isShowToast == true"></toast-input>
    <foot-bar></foot-bar>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import topBar from './components/topbar/topbar'
import footBar from './components/footbar/footbar'
import toastMsg from './components/toastmsg/toastmsg'
import toastInput from './components/toastinput/toastinput'
export default {
  name: 'app',
  components: {
    topBar,
    footBar,
    toastMsg,
    toastInput
  },
  computed: {
    ...mapState(['toastState', 'toastInputState'])
  },
  beforeDestroy: function () {
    window.sessionStorage.clear()
  }
}
</script>

<style scoped>
#app {
  position: relative;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height:100%;
  height: auto !important;
}
.shim{
  top: 0;
  height: 60px;
}
@media screen and (max-width : 1441px) {
  .shim{
    height: 40px;
  }
}
</style>
