<template>
  <div class="article_wrapper">
    <!-- 文章页上部-->
    <!-- 测试存留副本<div class="main">
      <div class="headinfo">
        <h1 @click="showSS()">{{this.articleDetail.article.title}}</h1>
        <div class="inner-wrap">
          <router-link class="author" to="#">{{this.articleDetail.article.authorId}}</router-link>
          <span class="time">{{this.articleDetail.article.timestamp}}</span>
          <span class="tag">{{this.articleDetail.article.tags}}</span>
          <span><div class="votebtn" @click="voteForA()">投票</div><input type="number" v-model="awardNum"></span>
        </div>
      </div>
      <p>{{this.articleDetail.article.text}}</p>
    </div>-->
    <div class="main">
      <div class="head_info">
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
            <!--<span class="comment meta_info">
              <img src="/static/img/comments.png"></img>
              <router-link to="article/">90980 条评论</router-link>&nbsp;|&nbsp;
            </span>
            <span class="vote meta_info">
              <img src="/static/img/up.png"></img>
              192213123123123123022票
            </span>&nbsp;|&nbsp;-->
            <span class="price meta_info">
              <span>$</span>：8929
            </span>
          </span>
        </div>
      </div>
      <div class="article_comment">
        <div>
          <input type="text" v-model="awardNum" placeholder="  输入评论">
          <span>发布评论</span>
        </div>
      </div>
    </div>
    <!-- 文章页下部 评论-->
    <div class="comment_part">
      <ul>
        <li class="comment_list">
          <div class="user_id"><img src="/static/img/avatar.png"></img>asdasdasdasdasd</div>
          <p>这是我见过的最逗逼的一条新闻比特币昨天(7月19日)价格全天维持在反弹高位区15200--16500震荡整理，没有明确的运行方向，最终至收盘小幅收涨，已经连续三个交易日阳线报收。截止今日发稿前，币价依旧在此高位区间盘整，最新交投于15950附近。
          OKCoin币行分析师称，日内来看，4小时级别，均线系统(5、10、20)的MA5、MA10两条均线正在形成向下交叉比特币昨天(7月19日)价格全天维持在反弹高位区15200--16500震荡整理，没有明确的运行方向，最终至收盘小幅收涨，已经连续三个交易日阳线报收。截止今日发稿前，币价依旧在此高位区间盘整，最新交投于15950附近。
          OKCoin币行分析师称，日内来看，4小时级别，均线系统(5、10、20)的MA5、MA10两条均线正在形成向下交叉比特币昨天(7月19日)价格全天维持在反弹高位区15200--16500震荡整理，没有明确的运行方向，最终至收盘小幅收涨，已经连续三个交易日阳线报收。截止今日发稿前，币价依旧在此高位区间盘整，最新交投于15950附近。
          OKCoin币行分析师称，日内来看，4小时级别，均线系线系线系线系线系线系线系线系线系线系统(5、10、20)的MA5、MA10两条均线正在形成向下交叉</p>
          <div class="interaction_c">
            <span>回复</span>
            <span class="award_c">
              <div class="award_c_tool">
                <input type="number">
                <div class="award_confirm">确认</div>
              </div>
                <div @click="voteForA()">打赏</div></span>
            </span>
          </div>
          <div class="reply_container">
            <input type="text" v-model="awardNum" placeholder="  输入评论">
            <div class="interaction_c">
              <span @click="">取消</span><span>发布评论</span>
            </div>
          </div>
        </li>
        <li class="comment_list">
          <div class="user_id"><img src="/static/img/avatar.png"></img>asdasdasdasdasd</div>
          <p>同感</p>
          <div class="interaction_c">
            <span>回复</span><span>打赏</span>
          </div>
        </li>
        <li class="comment_list">
          <div class="user_id"><img src="/static/img/avatar.png"></img>asdasdasdasdasd</div>
          <p>比特币昨天(7月19日)价格全天维持在反弹高位区15200--16500震荡整理，没有明确的运行方向，最终至收盘小幅收涨，已经连续三个交易日阳线报收。截止今日发稿前，币价依旧在此高位区间盘整，最新交投于15950附近。
          OKCoin币行分析师称，日内来看，4小时级别，均线系统(5、10、20)的MA5、MA10两条均线正在形成向下交叉</p>
          <div class="interaction_c">
            <span>回复</span><span>打赏</span>
          </div>
        </li>
        <li class="comment_list">
          <div class="user_id"><img src="/static/img/avatar.png"></img>asdasdasdasdasd</div>
          <p>比特币昨天(7月19日)价格全天维持在反弹高位区15200--16500震荡整理，没有明确的运行方向，最终至收盘小幅收涨，已经连续三个交易日阳线报收。截止今日发稿前，币价依旧在此高位区间盘整，最新交投于15950附近。
          OKCoin币行分析师称，日内来看，4小时级别，均线系统(5、10、20)的MA5、MA10两条均线正在形成向下交叉</p>
          <div class="interaction_c">
            <span>回复</span><span>打赏</span>
          </div>
        </li>
      </ul>
      <!--未设置逻辑-->
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
    <!-- 测试存留副本<div class="comment">
        <h2>全部评论</h2>
        <ul>
          <li v-for="(item, index) in this.articleCommentList.comments">
            <span class="comment-name">{{item.authorId}}</span><span class="reply-target" v-if="item.pid != 0">回复 {{item.pid}}</span><span class="caward"><div class="votebtn" @click="voteForC(item.cid)"></div><input type="number" v-model="awardNum"></span>
            <p class="comment-content">{{item.content}}</p>
            <p>{{'#' + item.floor + ' > #' + item.replyFloor}}</p>
            <input class="reply-window" type="text" placeholder="回复" v-model="commmentContent" v-show="item.isSelected">
            <div class="reply" @click="reply(item.id, index)">回复</div>
          </li>
        </ul>
        <div class="comment-publish">
          <textarea cols="75" rows="10" class="comment-publish-input" v-model="commmentContent"></textarea>
          <div class="comment-publish-btn" @click="subCommment()">提交评论</div>
        </div>
    </div>-->
  </div>
</template>
  
<script>
  import {mapState} from 'vuex'
  export default {
    name: 'detailcomment',
    components: {
    },
    data: function () {
      return {
        commmentContent: '',
        awardNum: '',
        isAwardToggle: 'false',
        isReplyToggle: 'false'
      }
    },
    computed: {
      ...mapState(['articleDetail', 'articleCommentList']),
      // 获取当前文章ID
      getId: function () {
        return window.location.hash.split('/')[2]
      },
      // 组织评论状态表
      commentStatus: function () {
        let isCselected = []
        for (var i = 0; i <= this.articleCommentList.comments.length - 1; i++) {
          isCselected[i] = {}
          isCselected[i].isSelected = false
          isCselected[i].floor = i + 1
        }
        return isCselected
      }
    },
    methods: {
      // 测试用
      showSS: function () {
        console.log(this.commentStatus)
      },
      // 文章大赏
      voteForA: function () {
        let awArg = this.pushAward(this.getId, this.awardNum)
        console.log(awArg)
        this.$store.dispatch('invokeContract', {
          type: '1002',
          fee: '1000000000',
          args: awArg,
          that: this
        })

        // 重新初始化
        this.awardNum = undefined
      },
      // 评论大赏
      voteForC: function (cid) {
        let awArg = this.pushAward(cid, this.awardNum)
        this.$store.dispatch('invokeContract', {
          type: '1003',
          fee: '1000000000',
          args: awArg,
          that: this
        })
        // 重新初始化
        this.awardNum = undefined
      },
      // 开关全部关闭
      toggleAll: function () {
        for (var i = 0; i <= this.isCommentSelected.length; i++) {
          this.isCommentSelected[i].isSelected = false
        }
      },
      // 回复评论
      reply: function (pid, index) {
        // V层逻辑
        if (this.isCommentSelected[index].isSelected === false) {
          this.isCommentSelected = this.commentStatus
          this.toggleAll()
          this.isCommentSelected[index].isSelected = true
        } else {
          let reArg = this.pushInEvent(true, pid, this.commmentContent)
          this.$store.dispatch('invokeContract', {
            type: '1001',
            fee: '1000000000',
            args: reArg,
            that: this
          })
        }
      },
      // 发布评论
      subCommment: function () {
        let reArg = this.pushInEvent(false, null, this.commmentContent)
        this.$store.dispatch('invokeContract', {
          type: '1001',
          fee: '1000000000',
          args: reArg,
          that: this
        })
      },
      // 组织回复arg
      pushInEvent: function (isReply, pid, commentCotent) {
        console.log(isReply, pid, commentCotent)
        let arr = []
        if (isReply) {
          arr.push(this.getId)
          arr.push(toString(pid))
          arr.push(commentCotent)
          return arr
        } else {
          arr.push(this.getId)
          arr.push(commentCotent)
          return arr
        }
      },
      // 组织打赏arg
      pushAward: function (id, amount) {
        let arr = []
        arr.push(id)
        arr.push(amount)
        return arr
      }
    },
    beforeMount: function () {
      this.$store.dispatch('getOnearticle', {
        id: this.getId,
        that: this
      })
      this.$store.dispatch('getOnearticleComment', {
        id: this.getId,
        that: this
      })
    }
  }
</script>

<style scoped>
  .article_wrapper{
    width: 80%;
    background-color: rgb(253, 253, 253);
    min-height: 700px;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;
    padding-bottom: 210px;
  }
  .main{
    position: relative;
    margin: auto auto;
    min-width: 760px;
    width: 100%;
    padding: 60px 30px 20px 50px;
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
    top: -16px;
    display: inline-block;
    min-width: 35px;
    width: auto;
    line-height: 35px;
    padding-left:3px;
    padding-right:3px;
    height: 35px;
    color: #fff;
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    background-color: rgb(255, 127, 1);
    border-radius: 11px;
  }
  .list_container{
    margin-left: 0px;
    padding-left: 18px;
    display: inline-block;
    border-left: 7px solid rgb(220, 220, 220);
  }
  .list_container a{
    color: #9f9f9f;
  }
  .title a{
    font-size: 24px;
    color: #000;
    text-decoration: none;
  }
  .title span{
    color: #9f9f9f;
  }
  .meta{
    display: inline-block;
    height: 30px;
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
  .main .article_comment{
    height: 60px;
    width:75%;
    margin: auto auto;
  }
  .article_comment>div{
    position: relative;
    margin-left: -7%;
  }
  .article_comment input{
    border: 1px solid #9f9f9f;
    font-size: 18px;
    outline: none;
    background-color: rgb(238, 238, 238);
    margin-top: 10px;
    display: block;
    height: 45px;
    width: 100%;
    border-radius: 3px;
  }
  .article_comment span{
    cursor: pointer;
    position: absolute;
    bottom: -34px;
    right: 0;
  }
  /*评论块*/
  .comment_part{
    line-height: 30px;
    margin-top: 10px;
    width: 100%;
    min-width: 760px;
    padding: 50px 30px 0 50px;

  }
  .comment_part ul{
    width: 100%;
    margin-left: -2%;
  }
  .comment_list{
    position: relative;
    font-size: 18px;
    width: 80%;
    margin: auto auto;
    border-left: 7px solid rgb(220, 220, 220);
    padding-left: 18px;
  }
  .comment_list .user_id{
    position: absolute;
    left: 18px;
    font-size: 20px;
  }
  .comment_list .interaction_c{
    margin-right: 2%;
    position: absolute;
    right: 0;
  }
  .interaction_c span{
    display: inline-block;
    color: #9f9f9f;
    font-size: 18px;
    margin-left: 12px;
    cursor: pointer;
  }
  .award_c{
    position: relative;
  }
  .award_c .award_c_tool{
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
  .user_id img{
    display: inline-block;
    height: 20px;
    position: relative;
    top: 4px;
  }
  .comment_list p{
    padding-top: 37px;
    margin-top: 97px;
    text-align: left;
    margin-bottom: 20px;
  }
  .reply_container{
    margin-top: 70px;
    position: relative;
    width: 100%;
    height: 80px;
  }
  .reply_container input{
    border-radius: 3px;
    border: 1px solid #9f9f9f;
    outline: none;
    background-color: rgb(238, 238, 238);
    margin-top: 10px;
    display: block;
    height: 45px;
    width: 100%;
  }
  .reply_container>.interaction_c{
    bottom: 0;
  }
  /*分页*/
  .pag{
    margin-left: -75px;
    margin-top: 100px;
    margin-bottom: 40px;
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
  /*Origin info*/
  /*.headinfo{
    text-align: center;
  }
  .headinfo a:hover{
    color: #f60;
  }
  .inner-wrap{
    margin: 30px 30px 0 0;
    font-size: .9em;
  }
  .main h1{
    font-size: 2em;
  }
  p{
    text-indent: 50px;
    text-align: left;
    margin: 30px auto;
    line-height: 27px;
  }
  .comment{
    width: 80%;
    min-width: 760px;
    max-width:960px;
    background-color: #fff;
    padding: 30px 10px 10px 10px;
    margin: 30px auto auto auto;
    text-align: left;
  }
  .comment h2{
    font-size: 1.5em;
  }
  .comment ul{
    margin-top: 25px;
  }
  .comment li{
    position: relative;
    margin-top: 10px;
    border-bottom: 1px dashed #999999;
  }
  .comment-name{
    font-size: 1.3em;
  }
  .reply-target{
    color: grey;
    margin-left: 15px;
  }
  .comment-content{
    line-height: 16px;
    font-size: .7em;
    text-indent: 0;
    margin: 15px auto 44px auto;
  }
  .reply-window{
    width: 69%;
    margin: -55px auto 55px auto;
    font-size:1.5em;
    border-bottom: 1px solid #999;
    outline: medium;
  }
  .reply-window-name{
    width: 27%;
    margin: -55px auto 55px 10px;
    font-size:1.5em;
    border-bottom: 1px solid #999;
    outline: medium;
  }
  .reply{
    position: absolute;
    right: 0;
    bottom: 5px;
    width: 60px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 1.1em;
    cursor: pointer;
    border-radius: 5px;
    background-color: #5eb95f;
    float: right;
  }
  .comment-publish{
    position: relative;
    margin-top: 65px;
  }
  textarea{
    resize: none;
  }
  .comment-publish input{
    display: block;
    border: 1px solid #999;
    margin-bottom: 20px;
    font-size: 1.2em;
    width: 20%;
  }
  .comment-publish-btn{
    position: absolute;
    display: inline-block;
    bottom: 10px;
    right: 10px;
    width: 120px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 1.1em;
    cursor: pointer;
    border-radius: 5px;
    background-color: #5eb95f;
  }*/
</style>
