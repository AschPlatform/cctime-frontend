import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

// 注册vuex
Vue.use(Vuex)

let state = {
  // 吐司状态组
  toastState: {
    isShowToast: false,
    toastMsgHeader: '',
    toastMsgContent: '',
    toastNum: undefined,
    deals: '',
    contract: '',
    _confirmfunc: null,
    _cancelfunc: null
  },
  // 吐司互动状态组
  toastInputState: {
    isShowToast: false,
    toastMsgHeader: '',
    toastNum: undefined,
    toastMsgContent: '',
    deals: '',
    contract: '',
    _confirmfunc: null,
    _cancelfunc: null
  },
  // NEW/转账记录/评论列表分页公共数据
  currentPage: 0,
  currentPage_account: 0,
  currentPage_comment: 0,
  // 登录状态 (转用topbar内部判定)
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
  articleCommentList: {},
  // 转账记录列表
  transactionList: {}
}

// export
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
