<template>
  <div class="main-wrap">
    <ul>
      <top-list v-for="(item, index) in this.topArticleList" :key="index" :item="item" :this="this" :index="index" v-on:reFresh="toReFresh"></top-list>
    </ul>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import topList from './topList/topList'
  export default {
    name: 'top',
    components: {
      topList
    },
    data: function () {
      return {
        awardNum: undefined
      }
    },
    methods: {
      // 刷新（重新拉取）事件
      toReFresh: function (data) {
        let that = this
        setTimeout(function () {
          that.$store.dispatch('getAllarticles', {
            sortBy: undefined,
            limit: '',
            offset: '',
            that: that
          })
        }, 10000)
      },
      // 实时修改对象片段
      shiftPiece: function (obj) {
        let newObj = {}
        newObj = obj
        newObj.isSelected = !newObj.isSelected
        return newObj
      },
      // 动画开关
      toggleAward: function (index, item) {
        this.switchGroup.splice(index, 1, this.shiftPiece(item))
      }
    },
    computed: mapGetters({
      topArticleList: 'topArticleList'
    }),
    created: function () {
      // 输出$state list内容
      this.$store.dispatch('getAllarticles', {
        sortBy: undefined,
        limit: '',
        offset: '',
        that: this
      })
    }
  }
</script>

<style scoped>
  .main-wrap{
    width: 65.5%;
    margin: auto auto;
    min-height: 900px;
    min-width: 1237px;
    height: 100%;
    overflow: hidden;
    padding-bottom: 150px;
  }
  .main-wrap ul{
    margin-top: 20px;
    list-style: none;
  }
  .main-wrap ul li{
    position: relative;
    min-width: 1237px;
    width: 100%;
    height: 75px;
    background-color: #fff;
    padding: 0px;
    text-align: left;
  }
   @media screen and (max-width: 1441px) {
    /* 1360屏幕下 */
    .main-wrap{
      width: 80%;
      min-height: 700px;
      padding-bottom: 75px;
      min-width: 1092px;
    }
    .main-wrap ul li{
      height: 68px;
      min-width: 860px;
    }
  }
</style>
