<template>
<!--此间内容摘鉴自热门页-->
  <div class="main-wrap" @click="showall">
    <ul>
      <new-list v-for="(item, index) in this.switchGroup.articles" :key="index" :item="item" :that="this" :index="realIndex + index + 1" v-on:reFresh="toReFresh"></new-list>
    </ul>
    <div class="pag">
      <div class="ctrbtn" @click="minPage" v-show="this.currentPage != 0">上一页</div>
      <div class="pagespot" v-for="(value, index) in this.page" @click="goto(Number(value) - 1)" :class="{'active':currentPage + 1 == Number(value)}" v-on:reFresh="toReFresh">{{Number(value)}}</div>
      <div class="ctrbtn" @click="addPage" v-show="this.allPage != this.currentPage + 1 && this.allPage != 0">下一页</div>
    </div>
    <div class="cursion" v-show="this.isCursion === true"></div>
  </div>
</template>

<script>
  import { mapGetters, mapState } from 'vuex'
  import newList from './newList/newList'
  export default {
    name: 'newpost',
    components: {
      newList
    },
    data: function () {
      return {
        // 分页初始量
        awardNum: undefined,
        pageSpots: 5,
        pageContent: 20,
        pageNum: 0,
        isCursion: false
      }
    },
    methods: {
      // test click
      showall: function () {
        console.log(this.currentPage)
      },
      // 跳到顶部
      jumpToTop: function () {
        let pos = document.querySelector('.main-wrap')
        document.body.scrollTop = pos.offsetTop - 100
      },
      // 刷新（重新拉取）事件
      toReFresh: function (start) {
        let that = this
        setTimeout(function () {
          that.$store.dispatch('getAllarticles', {
            sortBy: 'timestamp',
            limit: String(that.pageContent),
            offset: String(that.currentPage * that.pageContent + 1),
            that: that
          })
        }, 10000)
      },
      // 操作页面增减
      addPage: function () {
        if (this.currentPage < this.allPage - 1) {
          this.$store.commit('toAddCurrentPage')
          this.$store.dispatch('getAllarticles', {
            sortBy: 'timestamp',
            limit: String(this.pageContent),
            offset: String(this.offsetNum),
            that: this
          })
          this.jumpToTop()
        } else {
          this.$store.commit('toMinCurrentPage')
        }
      },
      minPage: function () {
        if (this.currentPage > 0) {
          this.$store.commit('toMinCurrentPage')
          // this.$store.state.currentPage = this.currentPage - 1
          this.$store.dispatch('getAllarticles', {
            sortBy: 'timestamp',
            limit: String(this.pageContent),
            offset: String(this.offsetNum),
            that: this
          })
          this.jumpToTop()
        } else {
          return
        }
      },
      // 页面跳转
      goto: function (index) {
        if (index === this.currentPage) return
        this.$store.commit('toPlusCurrentPage', index)
        // this.currentPage = index
        this.$store.dispatch('getAllarticles', {
          sortBy: 'timestamp',
          limit: String(this.pageContent),
          offset: String(this.offsetNum),
          that: this
        })
        this.jumpToTop()
      }
    },
    computed: {
      ...mapGetters(['newArticleList']),
      ...mapState(['articleNewList', 'currentPage']),
      // 以下是分页内容
      // 分页数组
      switchGroup: function () {
        return this.$store.getters['newArticleList']
      },
      // 构造页签数组
      page: function () {
        let pag = []
        if (this.currentPage < this.pageSpots) {
          let i = Math.min(this.pageSpots, this.allPage)
          while (i) {
            pag.unshift(i--)
          }
        } else if (this.currentPage >= this.pageSpots) {
          let middle = this.currentPage - Math.floor(this.pageSpots / 2)
          let i = this.pageSpots
          if (middle > (this.allPage - this.pageSpots)) {
            middle = (this.allPage - this.pageSpots) + 1
          }
          while (i--) {
            pag.push(middle++)
          }
        }
        return pag
      },
      // 页签总数
      allPage: function () {
        return Math.ceil(Number(this.switchGroup.count) / this.pageContent)
      },
      // 返回偏移量
      offsetNum: function () {
        return this.currentPage * this.pageContent
      },
      realIndex: function () {
        return this.currentPage * this.pageContent
      }
    },
    created: function () {
      let that = this
      // 定义轮询方法
      let func = function () {
        console.log('更新了一次')
        that.$store.dispatch('getAllarticles', {
          sortBy: 'timestamp',
          limit: String(that.pageContent),
          offset: Number(that.offsetNum),
          that: that
        })
      }
      console.log('created!!')
      // 以下是触发Action内容
      // 输出$state list内容
      this.$store.dispatch('getAllarticles', {
        sortBy: 'timestamp',
        limit: String(this.pageContent),
        offset: Number(this.offsetNum),
        that: this
      })
      setInterval(func(), 3000)
    },
    destroyed: function () {
    }
  }
</script>

<style lang="" scoped>
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
    list-style: none;
    margin-top: 20px;
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
  .list_container{
    margin-left: 28px;
    padding-left: 18px;
    display: inline-block;
    border-left: 5px solid rgb(220, 220, 220);
  }
  .title a{
    color: #000;
    text-decoration: none;
  }
  .title span{
    color: #9f9f9f;
  }
  .meta{
    display: inline-block;
    height: 20px;
    color: #9f9f9f;
    font-size: 0.8em;
  }
  .meta .meta_info{
    position: relative;
    display: inline-block;
    height: 40px;
    line-height: 40px;
  }
  .meta_info img{
    display: inline-block;
    height: 20px;
    position: relative;
    top: 6px;
    margin-left: 10px;
  }
  .meta .author img{
    margin-left: 0;
  }
  .meta .timestamp{
    background-size: 22% 68%;
  }
  .meta .comment{
    background-size: 18% 63%;
  }
  .meta .vote{
    cursor: pointer;
    display: relative;
    background-size: 22% 68%;
  }
   .vote .award_c_tool{
    display: block;
    width: 220px;
    height: 30px;
    top: -40px;
    left: -150px;
    background-color: #fff;
    border: 5px solid rgb(255, 127, 1);
    position: absolute;
  }
  .award_c_tool .award_confirm{
    cursor: pointer;
    padding-bottom: 30px;
    padding-left: 10px;
    color: rgb(255, 127, 1);
  }
  .award_c_tool:after{
    position: absolute;
    content: ' ';
    width: 0;
    height:0;
    top: 110%;
    left: 70%;
    border: solid transparent;
    border-width: 9px;
    border-top-color: rgb(255, 127, 1);
  }
  .award_c_tool input{
    border-radius: 3px;
    outline: none;
    display: inline-block;
    width: 75%;
  }
  .award_c_tool div{
    display: inline-block;
  }
  .meta .price span{
    display: inline-block;
    position: relative;
    top: 1px;
    font-size: 17px;
  }
  .meta a:hover{
    color: #ff6600;
  }
  .pag{
    position: absolute;
    margin-top: 30px;
    bottom: 90px;
    left: 42%;
    display: block;
  }
  .pag div{
    display: inline-block;
    cursor: pointer;
    height: 35px;
    line-height: 35px;
    min-width: 35px;
    font-size: 12px;
    border-radius: 6px;
  }
  .pag div:hover{
    background-color: gainsboro;
  }
  .ctrbtn{
    border: 1px solid rgb(102, 146, 217);
    color: rgb(102, 146, 217);
    padding: 0 10px;
  }
  .active{
    background-color: rgb(102, 146, 217) !important;
    color: #fff;
  }
  .cursion{
    display: block;
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: black;
    z-index: 99999;
  }
  @media screen and (max-width: 1441px) {
    /* 1360屏幕下 */
    .main-wrap{
      width: 80%;
      min-height: 700px;
      padding-bottom: 175px;
      min-width: 1092px;
    }
    .main-wrap ul li{
      height: 68px;
      min-width: 860px;
    }
    .pag{
      position: absolute;
      margin-top: 30px;
      bottom: 90px;
      left: 42%;
      display: block;
    }
    .pag div{
      display: inline-block;
      cursor: pointer;
      height: 25px;
      line-height: 25px;
      min-width: 25px;
      font-size: 10px;
      border-radius: 6px;
    }
  }
</style>  
