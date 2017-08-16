// 数据加工（filter/返回本身）

const getters = {
  topArticleList: (state) => {
    return state.articleTopList.articles
  },
  // 好像重复了
  newArticleList: (state) => {
    return state.articleNewList
  },
  // 评论详情更新
  detailCommentList: (state) => {
    return state.articleCommentList
  },
  // 最热主页更新
  detailTopList: (state) => {
    return state.articleTopList
  },
  // 最新主页更新
  detailNewList: (state) => {
    return state.articleNewList
  },
  newAccount: (state) => {
    return state.userInfo.info
  },
  // 交易记录表
  transactionListGetter: (state) => {
    return state.transactionList
  }
}

export default getters
