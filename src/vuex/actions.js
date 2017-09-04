
import Identicon from 'Identicon'
// 存储异步操作,获取数据用commit操作mutation
let baseUrl = 'http://101.200.123.124:4096/api/dapps/c81c42a26d3c7a575991c86abed7fe089fc0665ac92c6e3dd959e16459233d7a'
let loginurl = baseUrl + '/login'
let posturl = baseUrl + '/transactions/unsigned'
let articleslisturl = baseUrl + '/articles'
let transRecord = baseUrl + '/transfers'

function stringToHex (str) {
  var hex = ''
  for (var i = 0; i < str.length; i++) {
    hex += '' + str.charCodeAt(i).toString(16)
  }
  return hex
}

function getPhotoImage (id) {
  return new Identicon(stringToHex(id)).toString()
}
const actions = {
  // 验证用户信息获取account
  getUserInfo: async ({ commit }, { secret, that }) => {
    /* if (state.mock) { 延时传送来直接写入数据
      return setTimeout(()=> {
        commit('writeInuser', {secret: '', account: })
      }, 200)
    } */
    that.$axios.post(loginurl, {
      secret: secret
    }).then((res) => {
      if (res.status === 200 && res.data.success) {
        res.data.account.logo = getPhotoImage(res.data.account.address)
        commit('writeInuser', { secret: secret, account: res.data.account })
        window.sessionStorage.setItem('userInfo', JSON.stringify(res.data.account))
        window.sessionStorage.setItem('secret', secret)
      } else if (res.data.success === false) {
        // 统一alert，后期模态框调教
        that.$store.commit('callToast', {msgHeader: '发生错误', msgContent: '用户登录失败', _confirmfunc: null, _cancelfunc: null, deals: undefined, contract: 4})
      }
    })
  },
  // 获取文章列表
  getAllarticles: ({ commit }, { sortBy, limit, offset, that }) => {
    that.$axios.get(articleslisturl, {
      params: {
        sortBy: sortBy,
        limit: limit,
        offset: offset
      }
    }).then(({ data }) => {
      for (let i of data.articles) {
        i.photo = getPhotoImage(i.authorId)
      }
      if (sortBy !== 'timestamp') {
        commit('writeInToparticleslist', { data })
      } else {
        commit('writeInNewarticleslist', { data })
      }
    })
  },

  // 获取某一篇文章详情
  getOnearticle: async ({ commit }, { id, that }) => {
    that.$axios.get(articleslisturl + '/' + id)
      .then(({ data }) => {
        if (data.success === false) {
          console.log(data)
          commit('callToast', {msgHeader: '抱歉', msgContent: '您访问的这篇文章不存在,如出现问题我们的技术人员将及时解决', _confirmfunc: null, _cancelfunc: null, deals: 0, contract: 4})
          return
        }
        commit('writeInDetail', { data })
        data.article.photo = getPhotoImage(data.article.authorId)
      })
  },
  // 获取某一篇文章的评论
  getOnearticleComment: async ({ commit }, { id, limit, offset, that }) => {
    that.$axios.get(articleslisturl + '/' + id + '/comments', {
      params: {
        sortBy: 'timestamp:desc',
        limit: limit,
        offset: offset
      }
    })
      .then(({ data }) => {
        for (let i = 0; i < data.comments.length; ++i) {
          let c = data.comments[i]
          c.photo = getPhotoImage(c.authorId)
        }
        commit('writeInComment', { data })
      })
  },
  // 获取交易信息  (待完成)
  getTransactionInfo: async ({ commit }, { limit, offset, currency, that }) => {
    that.$axios.get(transRecord, {
      params: {
        limit: limit,
        offset: offset,
        ownerId: that.$store.state.userInfo.info.address,
        currency: currency
      }
    })
      .then(({ data }) => {
        commit('writeRecord', { data })
      })
  },
  // 发布文章/投票/评论  履行合约
  invokeContract: async ({ commit }, {type, args, fee, that, callback}) => {
    /* let typed = Number(type) */
    let a = {
      secret: that.$store.state.userInfo.secret,
      fee: fee,
      type: type,
      args: JSON.stringify(args)
    }
    /* let fees = String(fee) */
    that.$axios.put(posturl, a, { headers: { 'magic': '594fe0f3', 'version': '' } }).then((res) => {
      // 返回成功判断
      if (res.status === 200 && res.data.success) {
        callback(null, '这是在action里面的回调信息')
        // 发布成功alert
        /* alert('发布成功') */
      } else {
        // 这里应该是返回错误信息
        /* alert(res.data.error) */
        // 报错处理
        if (res.data.error.indexOf('Insufficient balance') > -1) {
          commit('callToast', {msgHeader: '发生错误', msgContent: '余额不足', _confirmfunc: '了解', _cancelfunc: '关闭', deals: undefined, contract: 4})
        }
        if (res.data.error.indexOf('tags size') > -1) {
          commit('callToast', {msgHeader: '发生错误', msgContent: 'tag太长喽！', _confirmfunc: '了解', _cancelfunc: '关闭', deals: undefined, contract: 4})
        }
        if (res.data.error.indexOf('provide tags') > -1) {
          commit('callToast', {msgHeader: '发生错误', msgContent: '我们需要你填写一些tag', _confirmfunc: '了解', _cancelfunc: '关闭', deals: undefined, contract: 4})
        }
        if (res.data.error.indexOf('amount range') > -1) {
          commit('callToast', {msgHeader: '发生错误', msgContent: '数额要大于0', _confirmfunc: '了解', _cancelfunc: '关闭', deals: undefined, contract: 4})
        }
        if (res.data.error.indexOf('String is too long') > -1) {
          commit('callToast', {msgHeader: '发生错误', msgContent: '您在登录时的秘钥过长或者输入的数值过大', _confirmfunc: '了解', _cancelfunc: '关闭', deals: undefined, contract: 4})
        }
        if (res.data.error.indexOf('Nickname already exists') > -1) {
          commit('callToast', {msgHeader: '发生错误', msgContent: '您输入的昵称已被使用', _confirmfunc: '了解', _cancelfunc: '关闭', deals: undefined, contract: 4})
        }
        if (res.data.error.indexOf('should be integer') > -1) {
          commit('callToast', {msgHeader: '发生错误', msgContent: '您输入的数额过长或不为整数，请再次确认', _confirmfunc: '了解', _cancelfunc: '关闭', deals: undefined, contract: 4})
        }
        if (res.data.error.indexOf('content size') > -1) {
          commit('callToast', {msgHeader: '发生错误', msgContent: '您输入的内容因为(过长/敏感)而被拒绝', _confirmfunc: '了解', _cancelfunc: '关闭', deals: undefined, contract: 4})
        }
        if (res.data.error.indexOf('already set') > -1) {
          commit('callToast', {msgHeader: '发生错误', msgContent: '用户名只能设置一次', _confirmfunc: '了解', _cancelfunc: '关闭', deals: undefined, contract: 4})
        }
        // commit('callToast', {msgHeader: '发生错误', msgContent: res.data.error, _confirmfunc: null, _cancelfunc: null, deals: undefined, contract: 4})
      }
    })
  }
}

export default actions
