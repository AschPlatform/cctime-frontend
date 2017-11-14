<template>
  <li class="comment_list">
    <div class="user_id">
      <img :src="'data:image/png;base64,' + item.photo"></img>{{item.nickname || item.authorId}}
      <span class="reply_msg" v-if="!!item.replyAuthorName">回复&nbsp;&nbsp;&nbsp;&nbsp;{{item.replyAuthorName}}</span>
      <span class="reply_msg" v-else-if="!!item.replyAuthorId">回复&nbsp;&nbsp;&nbsp;&nbsp;{{item.replyAuthorId}}</span>
      <span class="reply_time">{{this.realT}}</span>
    </div>
    <p>{{item.content}}</p>
    <div class="interaction_c">
      <span @click="reportBtn" v-if="this.$store.state.userInfo.info.isDelegate === true">举报</span>
      <span @click="toggleReply()">回复</span>
      <span class="award_c">
        <div class="award_c_tool" v-show="isAwardToggle == true">
          <input type="number" placeholder="请输入打赏票数" v-model="awardNum">
          <div class="award_confirm" @click="voteBtn">确认</div>
        </div>
        <div @click="voteBtn">打赏</div>
      </span>
    </div>
    <div class="reply_container" v-show="isReplyToggle == true">
      <input type="text" v-model="replyContent" placeholder="  输入评论">
      <div class="interaction_c">
        <span @click="toggleReply()">取消</span><span @click="reply(item.id)">发布评论</span>
      </div>
    </div>
  </li>  
</template>

<script>
export default {
  name: 'detailList',
  props: ['item', 'that'],
  data: function () {
    return {
      replyContent: '',
      awardNum: '',
      isAwardToggle: false,
      isReplyToggle: false
    }
  },
  created () {
    console.log(this, 'hahahaahahahahahahah')
  },
  computed: {
    getId: function () {
      return this.$route.params.id
      // return window.location.hash.split('/')[2]
    },
    // getUrl: function () {
    //   return window.location.hash.split('/')[1]
    // },
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
      if (sec < 60) {
        pst = Math.floor(sec) + '秒前'
      } else {
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
      }
      return pst
    }
  },
  methods: {
    // 动画开关
    toggleReply: function () {
      console.log(this.item)
      let that = this
      if (that.$store.state.isLogin === false) {
        that.$store.commit('callToast', {msgHeader: '注意!', msgContent: '仅当您登录后才能使用回复功能', _confirmfunc: '去登录', _cancelfunc: '不了', deals: undefined, contract: 3})
        return
      }
      this.replyContent = ''
      this.isReplyToggle = !this.isReplyToggle
    },
    toggleAward: function () {
      this.isAwardToggle = !this.isAwardToggle
    },
    // 组织回复arg
    pushInEvent: function (isReply, pid, commentCotent) {
      let arr = []
      if (isReply) {
        arr.push(this.getId)
        arr.push(pid)
        arr.push(commentCotent)
        return arr
      } else {
        arr.push(this.getId)
        arr.push('')
        arr.push(commentCotent)
        return arr
      }
    },
    // 组织打赏arg
    pushAward: function (id, amount) {
      let arr = []
      arr.push(id)
      arr.push('')
      arr.push(amount)
      return arr
    },
    voteForC: function (cid, num) {
      let that = this
      let awArg = this.pushAward(cid, num)
      this.$store.dispatch('invokeContract', {
        type: 1003,
        fee: '10000000',
        args: awArg,
        that: this,
        callback: function (err, msg) {
          if (err) {
            return
          }
          that.$store.commit('callToast', {msgHeader: '成功！', msgContent: '打赏评论成功！', _confirmfunc: '确定', _cancelfunc: '关闭', deals: undefined, contract: 4})
        }
      })
      // 重新初始化
    },
    // 调用投票  调用toastinput里的方法
    voteBtn: function () {
      let that = this
      if (that.$store.state.isLogin === false) {
        that.$store.commit('callToast', {msgHeader: '注意!', msgContent: '仅当您登录后才能使用打赏功能', _confirmfunc: '去登录', _cancelfunc: '不了', deals: undefined, contract: 3})
        return
      }
      this.$store.commit('callInputToast', {msgHeader: '打赏', msgContent: '请输入打赏票数', _confirmfunc: null, _cancelfunc: null, deals: that.item.id, contract: 1})
    },
    // 举报评论
    reportBtn: function () {
      let that = this
      if (that.$store.state.isLogin === false) {
        that.$store.commit('callToast', {msgHeader: '注意!', msgContent: '仅当您登录后才能使用举报功能', _confirmfunc: '去登录', _cancelfunc: '不了', deals: undefined, contract: 3})
        return
      }
      this.$store.commit('callToast', {msgHeader: '警告', msgContent: '是否对该评论进行举报？', _confirmfunc: '举报', _cancelfunc: '不了', deals: that.item.id, contract: 1})
    },
    // 回复评论
    reply: function (pid, num) {
      let that = this
      let reg = '^[ ]+$'
      let regu = new RegExp(reg)
      let result = regu.test(this.commentContent)
      if (this.replyContent === '' || result === true) {
        that.$store.commit('callToast', {msgHeader: '注意!', msgContent: '输入的内容不能为空呦', _confirmfunc: '了解', _cancelfunc: '关闭', deals: undefined, contract: 4})
        return
      }
      let reArg = this.pushInEvent(true, pid, this.replyContent)
      this.toggleReply()
      this.$store.dispatch('invokeContract', {
        type: 1001,
        args: reArg,
        fee: '10000000',
        that: this,
        callback: function (err, msg) {
          if (err) {
            return
          }
          that.$store.commit('callToast', {msgHeader: '成功！', msgContent: '回复评论成功！大约十秒后看到更新', _confirmfunc: '了解', _cancelfunc: '关闭', deals: undefined, contract: 4})
          that.$emit('reFresh')
        }
      })
      this.replyContent = ''
      /* setTimeout(function () { return window.history.go(0) }, 3000) */
    },
    // 举报评论
    reportC: function () {
      let that = this
      this.$store.commit('callInputToast', {msgHeader: '警告', msgContent: '是否举报该评论', _confirmfunc: '举报', _cancelfunc: '不了', deals: that.item.id, contract: 3})
    }
  }
}
</script>

<style scoped>
  .comment_list{
    position: relative;
    font-size: 18px;
    width: 100%;
    margin: 50px auto 0 auto;
    border-left: 2px solid rgb(238, 238, 238);
    padding-left: 18px;
  }
  .comment_list .user_id{
    text-align: left;
    line-height: 0px;
  }
  .comment_list .reply_msg{
    font-size: 14px;
    color: rgb(87, 97, 106);
    display: inline-block;
    margin-right: 10px;
  }
  .comment_list .reply_time{
    font-size: 12px;
    color: rgb(87, 97, 106);
    display: inline-block;
  }
  .comment_list .interaction_c{
    margin-right: 2%;
    position: absolute;
    right: 0;
  }
  .comment_list p{
    position: relative;
    font-size: 14px;
    text-align: left;
    line-height: 28px;
    bottom: -7px;
  }
  .interaction_c span{
    display: inline-block;
    color: #9f9f9f;
    font-size: 16px;
    margin-left: 12px;
    cursor: pointer;
  }
  .interaction_c span:hover{
    color:rgb(102, 146, 217);
  }
  .award_c{
    position: relative;
  }
  .award_c .award_c_tool{
    display: block;
    width: 220px;
    height: 30px;
    top: -40px;
    left: -190px;
    background-color: #fff;
    border: 5px solid rgb(116, 176, 236);
    position: absolute;
  }
  .award_c_tool .award_confirm{
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
    border-top-color: rgb(116, 176, 236);
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
    height: 30px;
    position: relative;
    margin-right: 10px;
    top: 4px;
  }
  .reply_container{
    margin-top: 70px;
    position: relative;
    width: 100%;
  }
  .reply_container input{
    border-radius: 3px;
    border: 1px solid #9f9f9f;
    outline: none;
    background-color: rgb(238, 238, 238);
    margin-top: 10px;
    display: block;
    height: 35px;
    width: 100%;
  }
  .reply_container>.interaction_c{
    bottom: -30px;
  }
  @media screen and (max-width: 1441px){
    .comment_list{
      font-size: 13px;
      width: 100%;
      margin: 50px auto 0 auto;
      border-left: 2px solid rgb(220, 220, 220);
      padding-left: 18px;
    }
    .comment_list .user_id{
      font-size: 13px;
    }
    .interaction_c span{
      font-size: 13px;
    }
    .award_c .award_c_tool{
      left: -190px;
    }
    .reply_container input{
      height: 40px;
    }
    .comment_list .reply_msg{
      font-size: 10px;
    }
  }
</style>
