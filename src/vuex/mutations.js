// 临时方法
function getEpochTime (time) {
  if (time === undefined) {
    time = (new Date()).getTime()
  }
  var d = beginEpochTime()
  var t = d.getTime()
  return Math.floor((time - t) / 1000)
}

function beginEpochTime () {
  var d = new Date(Date.UTC(2016, 5, 27, 20, 0, 0, 0))
  return d
}

function getTime (time) {
  return getEpochTime(time)
}

function getRealTime (epochTime) {
  if (epochTime === undefined) {
    epochTime = getTime()
  }
  var d = beginEpochTime()
  var t = Math.floor(d.getTime() / 1000) * 1000
  return t + epochTime * 1000
}
const mutations = {
  // 写入用户信息事件
  writeInuser: (state, {secret, account}) => {
    state.userInfo.secret = secret
    state.userInfo.info = account
    state.isLogin = true
    /* window.localStorage.setItem('user_info', JSON.stringify(account))
    window.localStorage.setItem('secret', secret)
    window.localStorage.setItem('logStatus', Number(1)) */
  },
  // 模态框开关
  toggleModal: (state) => {
    state.isPublishShow = !state.isPublishShow
  },
  // 用户注销事件
  logOut: (state) => {
    state.isLogin = false
    state.userInfo = { secret: '', info: {} }
  },
  // 注册检查事件

  // 文章列表写入事件
  // 最热
  writeInToparticleslist: (state, data) => {
    state.articleTopList = data.data
    /* this.$set(state.articleTopList, 'articles', data.data) */
    for (let i = 0; i < state.articleTopList.articles.length; ++i) {
      let c = state.articleTopList.articles[i]
      let t = state.articleTopList.articles[i].timestamp
      c.realTime = getRealTime(t)
      c.isSelected = false
    }
  },
  // 最新
  writeInNewarticleslist: (state, data) => {
    state.articleNewList = data.data
    for (let i = 0; i < state.articleNewList.articles.length; ++i) {
      let c = state.articleNewList.articles[i]
      let t = state.articleNewList.articles[i].timestamp
      c.realTime = getRealTime(t)
      c.isSelected = false
    }
  },

  // 文章写入详细事件 (未证实)
  writeInDetail: (state, data) => {
    state.articleDetail = data.data
    state.articleDetail.article.realTime = getRealTime(state.articleDetail.article.timestamp)
  },
  // 评论列表写入事件 （未证实）
  writeInComment: (state, data) => {
    state.articleCommentList = data.data
    for (let i = 0; i < state.articleCommentList.comments.length; ++i) {
      let c = state.articleCommentList.comments[i]
      let t = state.articleCommentList.comments[i].t_timestamp
      c.realTime = getRealTime(t)
    }
  },
  // 转账记录写入事件
  writeRecord: (state, data) => {
    state.transactionList = data.data
    for (let i = 0; i < state.transactionList.transfers.length; i++) {
      let c = state.transactionList.transfers[i]
      let t = state.transactionList.transfers[i].t_timestamp
      c.tempTime = getRealTime(t)
      let ti = new Date(c.tempTime)
      let year = ti.getFullYear()
      let month = Number(ti.getMonth()) + 1
      let day = ti.getDate()
      let hour = ti.getHours()
      let minute = ti.getMinutes()
      let sec = ti.getSeconds()
      if (month < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }
      if (minute < 10) {
        minute = '0' + minute
      }
      if (sec < 10) {
        sec = '0' + sec
      }
      let timeAfterFac = year + '.' + month + '.' + day + ' ' + hour + ':' + minute + ':' + sec
      c.realTime = timeAfterFac
    }
  },
  // 合约编号写入事件
  writeInNum: (state, num) => {
    state.contractnum = num
  },
  // 吐司触发事件
  callToast: (state, {msgHeader, msgContent, _confirmfunc, _cancelfunc, deals, contract}) => {
    state.toastState.isShowToast = true
    state.toastState.toastMsgHeader = msgHeader
    state.toastState.toastMsgContent = msgContent
    state.toastState._confirmfunc = _confirmfunc
    state.toastState._cancelfunc = _cancelfunc
    state.toastState.deals = deals
    state.toastState.contract = contract
  },
  // 吐司互动触发事件
  callInputToast: (state, {msgHeader, msgContent, _confirmfunc, _cancelfunc, deals, contract}) => {
    state.toastInputState.isShowToast = true
    state.toastInputState.toastMsgHeader = msgHeader
    state.toastInputState.toastMsgContent = msgContent
    state.toastInputState._confirmfunc = _confirmfunc
    state.toastInputState._cancelfunc = _cancelfunc
    state.toastInputState.deals = deals
    state.toastInputState.contract = contract
  },
  // 土司互动价格写入事件
  toastWriteIn: (state, num) => {
    state.toastInputState.toastNum = num
  },
  // 土司重置事件
  toastReset: (state) => {
    // toastState
    console.log('toastState reset action')
    state.toastState.isShowToast = false
    state.toastState.toastMsgHeader = ''
    state.toastState.toastMsgContent = ''
    state.toastState.toastNum = undefined
    state.toastState.deals = ''
    state.toastState.contract = ''
    state.toastState._confirmfunc = null
    state.toastState._cancelfunc = null
    // toastInputState
    console.log('toastInputState reset action')
    state.toastInputState.isShowToast = false
    state.toastInputState.toastMsgHeader = ''
    state.toastInputState.toastMsgContent = ''
    state.toastInputState.toastNum = undefined
    state.toastInputState.deals = ''
    state.toastInputState.contract = ''
    state.toastInputState._confirmfunc = null
    state.toastInputState._cancelfunc = null
  },
  // page 更改方法
    // 现页数赋值
  toPlusCurrentPage: (state, num) => {
    state.currentPage = num
    state.articleNewList = {}
  },
  toPlusCurrentPage_a: (state, num) => {
    state.currentPage_account = num
  },
  toPlusCurrentPage_c: (state, num) => {
    state.currentPage_comment = num
  },
    // 现页数增加
  toAddCurrentPage: (state) => {
    state.currentPage = state.currentPage + 1
    state.articleNewList = {}
  },
  toAddCurrentPage_a: (state) => {
    state.currentPage_account = state.currentPage_account + 1
  },
  toAddCurrentPage_c: (state) => {
    state.currentPage_comment = state.currentPage_comment + 1
  },
    // 现页数减少
  toMinCurrentPage: (state) => {
    state.currentPage = state.currentPage - 1
    state.articleNewList = {}
  },
  toMinCurrentPage_a: (state) => {
    state.currentPage_account = state.currentPage_account - 1
  },
  toMinCurrentPage_c: (state) => {
    state.currentPage_comment = state.currentPage_comment - 1
  },
    // 重置页码
  toInitPage: (state) => {
    state.currentPage_account = 0
    state.currentPage_comment = 0
  },
  // article 清空
  clearArticleDetail: (state) => {
    state.articleDetail = {}
  }
  // 吐司指南
  /* compassToast: (state, {toastState}) => {
    let num = toastState.type
    let that = toastState.that
    switch (num) {
      // 举报事件
      case value: 1
        this.dispatch('invokeContract', {state: state.toastState})
        break;
      default:
        break;
    }
  } */
}

export default mutations
