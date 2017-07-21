<template>
<!--此间内容摘鉴自热门页-->
  <div class="main-wrap">
    <ul>
      <!--测试存留副本<li v-for="item in this.articleNewList.articles">
        <span class="readcount">
          {{item.votes}}
        </span>
        <span class="title">
          <router-link :to="'articles/' + item.id">{{item.title}}</router-link>
          <span class="titlesuffix">{{item.url}}</span>
        </span>
        <br/>
        <span class="meta">
          <span class="author">
            <router-link to="user/">{{item.authorId}}</router-link>
          </span>
          <span class="time">
            {{item.timestamp}}
          </span>&nbsp;|&nbsp;
          <router-link to="article/">{{item.votes}} 条评论</router-link>
        </span>
      </li>-->
      <li>
        <div class="count_wrapper">
          <span class="readcount">
            <!--阅读计数器-->
            9090
          </span>
        </div>
        <div class="list_container">
          <span class="title">
            <router-link :to="articles/11">HeroKu has been repicked its 'False alarm' plan</router-link>
            <span class="titlesuffix">www.baidu.com</span>
          </span>
          <br/>
          <span class="meta">
            <span class="author meta_info">
              <img src="/static/img/avatar.png"></img>
              <router-link to="user/">acxaljdwljdiajwia1</router-link>
            </span>
            <span class="timestamp meta_info">
              <img src="/static/img/time.png"></img>
              2017-09-09
            </span>&nbsp;|&nbsp;
            <span class="comment meta_info">
              <img src="/static/img/comments.png"></img>
              <router-link to="article/">90980 条评论</router-link>&nbsp;|&nbsp;
            </span>
            <span class="vote meta_info">
              <img src="/static/img/up.png"></img>
              192213123123123123022票
            </span>&nbsp;|&nbsp;
            <span class="price meta_info">
              <span>$</span>：8929
            </span>
          </span>
        </div>
      </li>
      <li>
        <div class="count_wrapper">
          <span class="readcount">
            <!--阅读计数器-->
            9090
          </span>
        </div>
        <div class="list_container">
          <span class="title">
            <router-link :to="articles/11">HeroKu has been repicked its 'False alarm' plan</router-link>
            <span class="titlesuffix">www.baidu.com</span>
          </span>
          <br/>
          <span class="meta">
            <span class="author meta_info">
              <router-link to="user/">awawx123cq2awcxa1</router-link>
            </span>
            <span class="timestamp meta_info">
              <img src="/static/img/time.png"></img>
              2017-09-09
            </span>&nbsp;|&nbsp;
            <span class="comment meta_info">
              <img src="/static/img/comments.png"></img>
              <router-link to="article/">999 条评论</router-link>&nbsp;|&nbsp;
            </span>
            <span class="vote meta_info">
              <img src="/static/img/up.png"></img>
              192022票
            </span>&nbsp;|&nbsp;
            <span class="price meta_info">
              <span>$</span>：8929
            </span>
          </span>
        </div>
      </li>
      <li>
        <div class="count_wrapper">
          <span class="readcount">
            <!--阅读计数器-->
            9090
          </span>
        </div>
        <div class="list_container">
          <span class="title">
            <router-link :to="articles/11">HeroKu has been repicked its 'False alarm' plan</router-link>
            <span class="titlesuffix">www.baidu.com</span>
          </span>
          <br/>
          <span class="meta">
            <span class="author meta_info">
              <img src="/static/img/avatar.png"></img>
              <router-link to="user/">acxaljdwljdiajwia1</router-link>
            </span>
            <span class="timestamp meta_info">
              <img src="/static/img/time.png"></img>
              2017-09-09
            </span>&nbsp;|&nbsp;
            <span class="comment meta_info">
              <img src="/static/img/comments.png"></img>
              <router-link to="article/">90980 条评论</router-link>&nbsp;|&nbsp;
            </span>
            <span class="vote meta_info">
              <img src="/static/img/up.png"></img>
              192213123123123123022票
            </span>&nbsp;|&nbsp;
            <span class="price meta_info">
              <span>$</span>：8929
            </span>
          </span>
        </div>
      </li>
      <li>
        <div class="count_wrapper">
          <span class="readcount">
            <!--阅读计数器-->
            9090
          </span>
        </div>
        <div class="list_container">
          <span class="title">
            <router-link :to="articles/11">HeroKu has been repicked its 'False alarm' plan</router-link>
            <span class="titlesuffix">www.baidu.com</span>
          </span>
          <br/>
          <span class="meta">
            <span class="author meta_info">
              <router-link to="user/">awawx123cq2awcxa1</router-link>
            </span>
            <span class="timestamp meta_info">
              <img src="/static/img/time.png"></img>
              2017-09-09
            </span>&nbsp;|&nbsp;
            <span class="comment meta_info">
              <img src="/static/img/comments.png"></img>
              <router-link to="article/">999 条评论</router-link>&nbsp;|&nbsp;
            </span>
            <span class="vote meta_info">
              <img src="/static/img/up.png"></img>
              192022票
            </span>&nbsp;|&nbsp;
            <span class="price meta_info">
              <span>$</span>：8929
            </span>
          </span>
        </div>
      </li>
      <li>
        <div class="count_wrapper">
          <span class="readcount">
            <!--阅读计数器-->
            9090
          </span>
        </div>
        <div class="list_container">
          <span class="title">
            <router-link :to="articles/11">HeroKu has been repicked its 'False alarm' plan</router-link>
            <span class="titlesuffix">www.baidu.com</span>
          </span>
          <br/>
          <span class="meta">
            <span class="author meta_info">
              <img src="/static/img/avatar.png"></img>
              <router-link to="user/">acxaljdwljdiajwia1</router-link>
            </span>
            <span class="timestamp meta_info">
              <img src="/static/img/time.png"></img>
              2017-09-09
            </span>&nbsp;|&nbsp;
            <span class="comment meta_info">
              <img src="/static/img/comments.png"></img>
              <router-link to="article/">90980 条评论</router-link>&nbsp;|&nbsp;
            </span>
            <span class="vote meta_info">
              <img src="/static/img/up.png"></img>
              192213123123123123022票
            </span>&nbsp;|&nbsp;
            <span class="price meta_info">
              <span>$</span>：8929
            </span>
          </span>
        </div>
      </li>
      <li>
        <div class="count_wrapper">
          <span class="readcount">
            <!--阅读计数器-->
            9090
          </span>
        </div>
        <div class="list_container">
          <span class="title">
            <router-link :to="articles/11">HeroKu has been repicked its 'False alarm' plan</router-link>
            <span class="titlesuffix">www.baidu.com</span>
          </span>
          <br/>
          <span class="meta">
            <span class="author meta_info">
              <router-link to="user/">awawx123cq2awcxa1</router-link>
            </span>
            <span class="timestamp meta_info">
              <img src="/static/img/time.png"></img>
              2017-09-09
            </span>&nbsp;|&nbsp;
            <span class="comment meta_info">
              <img src="/static/img/comments.png"></img>
              <router-link to="article/">999 条评论</router-link>&nbsp;|&nbsp;
            </span>
            <span class="vote meta_info">
              <img src="/static/img/up.png"></img>
              192022票
            </span>&nbsp;|&nbsp;
            <span class="price meta_info">
              <span>$</span>：8929
            </span>
          </span>
        </div>
      </li>
    </ul>
    <!--测试存留副本<div class="pag">
      <div class="ctrbtn" @click="goto(currentPage--)" v-show="this.currentPage != 1">上一页</div>
      <div class="pagespot" v-for="index in page" :class="{'active':this.currentPage == index}" :key="index">{{index}}</div>
      <div class="ctrbtn" @click="goto(currentPage++)" v-show="this.currentPage == this.allPage && this.allPage != 0">下一页</div>
    </div>-->
    <div class="pag">
      <div class="ctrbtn" @click="goto(currentPage--)">上一页</div>
      <div class="pagespot">1</div>
      <div class="pagespot">2</div>
      <div class="pagespot">3</div>
      <div class="pagespot">4</div>
      <div class="pagespot active">5</div>
      <div class="ctrbtn" @click="goto(currentPage++)">下一页</div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'newpost',
    components: {
    },
    data: function () {
      return {
        // 分页初始量
        currentPage: 1,
        pageSpots: 5,
        pageContent: 20,
        pageNum: 0
      }
    },
    methods: {
      // 页面跳转
      goto: function (index) {
        if (index === this.current) return
        this.currentPage = index
        this.$store.dispatch('getAllarticles', {
          sortBy: 'timestamp',
          limit: '',
          offset: this.offsetNum,
          that: this
        })
      }
    },
    computed: {
      ...mapState(['articleNewList']),
      // 以下是分页内容
      // 分页数组
      page: function () {
        let pag = []
        if (this.currentPage < this.pageSpots) {
          let i = Math.min(this.pageSpots, this.allPage)
          while (i) {
            pag.unshift(i--)
          }
        } else {
          let middle = this.currentPage - Math.floor(this.pageSpots / 2)
          let i = this.pageSpots
          if (middle > (this.allPage - this.pageSpots)) {
            middle = (this.allPage - this.pageSpots + 1)
          }
          while (i--) {
            pag.push(middle++)
          }
        }
        return pag
      },
      // 页签总数
      allPage: function () {
        console.log(this.articleNewList.count)
        return Math.floor(this.articleNewList.count / this.pageContent)
      },
      // 返回偏移量
      offsetNum: function () {
        return this.currentPage * this.pageContent + 1
      }
    },
    created: function () {
      // 以下是触发Action内容
      // 输出$state list内容
      console.log(this)
      this.$store.dispatch('getAllarticles', {
        sortBy: 'timestamp',
        limit: '',
        offset: '',
        that: this
      })
    }
  }
</script>

<style lang="" scoped>
  .main-wrap{
    width: 80%;
    background-color: rgb(253, 253, 253);
    min-height: 700px;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;
    padding-bottom: 210px;
  }
  .main-wrap ul{
    list-style: none;
  }
  .main-wrap ul li{
    position: relative;
    margin: auto auto;
    min-width: 760px;
    width: 70%;
    height: 60px;
    background-color: #fff;
    padding: 60px 30px 20px 80px;
    border-bottom: 1px solid #eee;
    text-align: left;
  }
  .count_wrapper{
    display: inline-block;
    height: 60px;
    width: 7%;
    text-align: center;
  }
  .readcount{
    position: relative;
    top: -8px;
    display: inline-block;
    min-width: 35px;
    width: auto;
    line-height: 35px;
    height: 35px;
    color: #fff;
    padding-right:3px;
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    background-color: rgb(255, 127, 1);
    border-radius: 11px;
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
    background-size: 22% 68%;
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
    margin-top: 50px;
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
  .ctrbtn{
    border: 1px solid rgb(255, 127, 1);
    color: rgb(255, 127, 1);
    padding: 0 10px;
  }
  .active{
    background-color: rgb(255, 127, 1);
  }
</style>  
