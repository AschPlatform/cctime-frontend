import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

// 注册vuex
Vue.use(Vuex)

let state = {
  // 登陆状态
  isLogin: false,
  // 用户状态
  userInfo: { secret: '', info: {} },
  // 发布模态框状态控制
  isPublishShow: false,
  // 混合的合约状态
  contractArgs: [],
  // 状态代码
  contractType: undefined,
  // 拉取的热门消息队列
  articleTopList: {},
  // 拉取的最新消息队列
  articleNewList: {},
  // 拉取的文章详情
  articleDetail: {},
  // 拉取的文章评论
  articleCommentList: {}
}

// export
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
