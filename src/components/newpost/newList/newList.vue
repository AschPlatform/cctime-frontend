<template>
  <li class="root_list">
      <div class="count_wrapper">
        <span class="readcount">
          <!--阅读计数器-->
          {{index}}
        </span>
      </div>
    <div class="list_container">
        <span class="title">
        <router-link :to="'articles/' + item.id" class="title-header">{{item.title}}</router-link>
        <a class="titlesuffix" :href="item.url" :title="item.url" v-show="item.url !== ''" target="_blank">{{this.getUrl}}</a>
        </span>
        <br/>
        <span class="meta">
        <span class="author meta_info">
            <img :src="'data:image/png;base64,' + item.photo"></img>
            <span to="user/" v-if="this.item.nickname !== undefined" :title='item.nickname'>{{item.nickname}}</span>
            <span to="user/" v-if="this.item.nickname === undefined" :title='item.authorId'>{{item.authorId}}</span>
        </span>
        <span class="timestamp meta_info">
            <img src="/static/img/time.png"></img>
            {{this.realT}}
        </span>
        <span class="comment meta_info">
            <img src="/static/img/comments.png"></img>
            <router-link :to="'articles/'+item.id">{{item.comments}} 评论</router-link>
        </span>
        <span class="vote meta_info" @click="voteBtn">
            <img src="/static/img/up.png"></img>
            {{item.votes}}票
        </span>
        </span>
    </div>
    <div class="reportIn" @click="reportBtn" v-if="this.$store.state.userInfo.info.isDelegate === true">举报该文章</div>
  </li>
</template>

<script>
export default {
  name: 'newList',
  props: ['item', 'that', 'index'],
  data: function () {
    return {
      awardNum: undefined,
      deToggle: false
    }
  },
  methods: {
    toggleAward: function (item) {
      this.deToggle = !this.deToggle
    },
    // 组织打赏arg
    pushAward: function (id, amount) {
      let arr = []
      arr.push(id)
      arr.push(amount)
      return arr
    },
    // 文章打赏
    voteBtn: function () {
      let that = this
      if (that.$store.state.isLogin === false) {
        that.$store.commit('callToast', {msgHeader: '注意!', msgContent: '仅当您登录后才能使用打赏功能', _confirmfunc: '去登录', _cancelfunc: '不了', deals: undefined, contract: 3})
        return
      }
      this.$store.commit('callInputToast', {msgHeader: '打赏', msgContent: '请输入打赏票数', _confirmfunc: null, _cancelfunc: null, deals: that.item.id, contract: 2})
      // 无反馈强制刷新
      setTimeout(function () {
        that.$emit('reFresh')
      }, 20000)
    },
    // 举报文章
    reportBtn: function () {
      let that = this
      if (that.$store.state.isLogin === false) {
        that.$store.commit('callToast', {msgHeader: '注意!', msgContent: '仅当您登录后才能使用举报功能', _confirmfunc: '去登录', _cancelfunc: '不了', deals: undefined, contract: 3})
        return
      }
      this.$store.commit('callToast', {msgHeader: '警告', msgContent: '是否对该文章进行举报？', _confirmfunc: '举报', _cancelfunc: '不了', deals: that.item.id, contract: 2})
    }
  },
  computed: {
    // 处理url显示
    getUrl: function () {
      return this.item.url.split('/')[2]
    },
    // 当即时间
    realT: function () {
      let pst = ''
      let t = Number(this.item.realTime)
      let ct = Number(new Date().getTime())
      let pt = ct - t
      let sec = Number(pt) / 1000
      let min = 0
      let hor = 0
      let day = 0
      let yea = 0
      if (sec < 60 && sec >= 0) {
        pst = Math.floor(sec) + '秒前'
      } else if (sec >= 60) {
        min = Math.floor(sec / 60)
        if (min < 60) {
          pst = Math.floor(min) + '分钟前'
        } else {
          hor = Math.floor(min / 60)
          if (hor < 24) {
            pst = hor + '小时前'
          } else {
            day = Math.floor(hor / 24)
            if (day < 360) {
              pst = day + '天前'
            } else {
              yea = Math.floor(day / 360)
              pst = yea + '年前'
            }
          }
        }
      } else {
        pst = '刚刚'
      }
      return pst
    }
  }
}
</script>

<style scoped>
   .count_wrapper{
    display: inline-block;
    width: 70px;
    text-align: right;
  }
  .readcount{
    position: relative;
    min-width: 70px;
    width: auto;
    line-height: 18px;
    color: #000;
    font-size: 18px;
    text-align: center;
    top: -29px;
  }
  .list_container{
    position:  relative;
    margin-top: 19px;
    padding-left: 8px;
    display: inline-block;
  }
  .list_container .title{
    display: inline-block;
    padding-left: 10px;
    border-left: 1px solid rgb(87, 97, 106);
  }
  .list_container .titlesuffix{
    font-size: 12px;
    font-weight: bold;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
  }
  .title a{
    height:20px;
    line-height:20px;
    font-size: 18px;
    font-weight: bold;
    color: #000;
    display: inline-block;
    max-width: 900px;
    text-overflow: clip;
    overflow: hidden;
    white-space: nowrap;
  }
  .title span{
    font-size: 14px;
  }
  /*.title .title-header{
    width: 60%;
  }*/
  .title .titlesuffix{
    color: rgb(87, 97, 106);
    margin-left: 10px;
    width: 120px;
  }
  .meta{
    display: inline-block;
    height: 20px;
    color: rgb(87, 97, 106);
    font-size: 14px;
    font-weight: bold;
    margin-left: 10px;
  }
  .meta .meta_info{
    position: relative;
    display: inline-block;
    height: 40px;
    margin-left: 20px;
    line-height: 40px;
  }
  .meta .author{
    margin-left: 0px;
    cursor: default;
  }
  .meta_info img{
    display: inline-block;
    height: 20px;
    position: relative;
    top: 4px;
  }
  .meta .author a{
    display: inline-block;
    width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    height: 14px;
    line-height: 14px;
  }
  .meta .author span{
    display: inline-block;
    width: 90px;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 20px;
    line-height: 28px;
  }
  .meta .author img{
    margin-left: 0;
  }
  .meta .timestamp{
    width: 85px;
    background-size: 22% 68%;
    cursor: default;
  }
  .meta .comment{
    width: 110px;
    background-size: 18% 63%;
  }
  .comment a{
    color: rgb(87, 97, 106);
  }
  .meta .vote{
    cursor: pointer;
    background-size: 22% 68%;
  }
  .meta .vote:hover{
    color: #f60;
  }
  .award_c_tool{
    display: block;
    width: 220px;
    height: 30px;
    top: -25px;
    right: 170px;
    background-color: #fff;
    border: 5px solid rgb(205, 223, 237);
    position: absolute;
  }
  .award_c_tool .award_confirm{
    cursor: pointer;
    padding-bottom: 30px;
    padding-left: 10px;
    color: rgb(116, 176, 236);
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
    border-top-color: rgb(205, 223, 237);
  }
  .award_c_tool input{
    border-radius: 3px;
    height: 30px;
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
  .reportIn{
    display: none;
  }
  .root_list:hover>.reportIn{
    display: inline-block;
    text-align: center;
    border-radius: 6px;
    font-size: 12px;
    font-weight: bold;
    background-color: rgb(207, 231, 243);
    color: rgb(109, 152, 221);
    cursor: pointer;
    height:20px;
    width: 80px;
    line-height: 20px;
    top: -12px;
    margin-left: 40px;
  }
  @media screen and (max-width: 1441px) {
    .list_container{
      padding-top: 10px;
      margin-top: 0px;
    }
    .readcount{
      line-height: 14px;
      font-size: 14px;
      top: -28px;
    }
    .list_container .titlesuffix{
      font-size: 9px;
      width: 100px;
    }
    .title a{
      max-width: 500px;
    }
    .title span{
      font-size: 9px;
    }
    .meta{
      margin-top: 2px;
      height: 20px;
      font-size: 12px;
   }
   .meta .meta_info{
      height: 20px;
      margin-left: 15px;
      line-height: 20px;
    }
    .meta .timestamp{
      width:70px;
    }
    .meta .comment{
      width: 85px;
    }
    .meta .author{
      margin-left: 0px;
    }
    .meta .author span{
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 50px;
      height: 20px;
      line-height: 30px;
    }
    .meta_info img{
      height: 14px;
      top: 2px;
    }
    .meta .author a{
      width: 100px;
      font-size: 9px;
      height: 9px;
      line-height: 9px;
    }
    .root_list:hover>.reportIn{
      height:20px;
      width: 80px;
      line-height: 20px;
      top: -12px;
      margin-left: 40px;
    }
  }
</style>
