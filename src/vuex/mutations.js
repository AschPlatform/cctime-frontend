const mutations = {
  // 写入用户信息事件
  writeInuser: (state, {secret, account}) => {
    state.userInfo.secret = secret
    state.userInfo.info = account
    state.isLogin = true
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
  writeInToparticleslist: (state, data) => {
    state.articleTopList = data.data
    console.log(state.articleTopList)
  },
  writeInNewarticleslist: (state, data) => {
  },

  // 文章写入详细事件 (未证实)
  writeInDetail: (state, data) => {
    state.articleDetail = data.data
  },
  // 评论列表写入事件 （未证实）
  writeInComment: (state, data) => {
    state.articleCommentList = data.data
    let replyFloorMap = {}
    let page = 11
    let pageSize = 50
    for (let i = 0; i < state.articleCommentList.comments.length; ++i) {
      let c = state.articleCommentList.comments[i]
      let floor = i + 1 + (page - 1) * pageSize
      replyFloorMap[c.id] = floor
      c.isSelected = false
      c.floor = floor
      c.replyFloor = replyFloorMap[c.pid]
    }
    console.log(state.articleCommentList.comments, '-----')
  },
  // 合约编号写入事件
  writeInNum: (state, num) => {
    state.contractnum = num
  }
}

export default mutations
