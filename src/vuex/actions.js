
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
    console.log(secret)
    /* if (state.mock) { 延时传送来直接写入数据
      return setTimeout(()=> {
        commit('writeInuser', {secret: '', account: })
      }, 200)
    } */
    that.$axios.post(loginurl, {
      secret: secret
    }).then((res) => {
      console.log(res)
      if (res.status === 200 && res.data.success) {
        res.data.account.logo = getPhotoImage(res.data.account.address)
        commit('writeInuser', { secret: secret, account: res.data.account })
        window.sessionStorage.setItem('userInfo', JSON.stringify(res.data.account))
        window.sessionStorage.setItem('secret', secret)
        console.log(res.data.account)
      } else if (res.data.success === false) {
        // 统一alert，后期模态框调教
        that.$store.commit('callToast', {msgHeader: '发生错误', msgContent: '用户登录失败', _confirmfunc: null, _cancelfunc: null, deals: undefined, contract: 4})
      }
    })
  },
  // 获取文章列表
  getAllarticles: ({ commit }, { sortBy, limit, offset, that }) => {
    console.log('that', that)
    that.$axios.get(articleslisturl, {
      params: {
        sortBy: sortBy,
        limit: limit,
        offset: offset
      }
    }).then(({ data }) => {
      console.log(data)
      for (let i of data.articles) {
        i.photo = getPhotoImage(i.authorId)
      }
      if (sortBy !== 'timestamp') {
        commit('writeInToparticleslist', { data })
        console.log('getall Top res ' + sortBy, data)
      } else {
        commit('writeInNewarticleslist', { data })
        console.log('getall New res ' + sortBy, data)
      }
    })
  },

  // 获取某一篇文章详情
  getOnearticle: async ({ commit }, { id, that }) => {
    console.log('GetOneArticle-id' + id)
    that.$axios.get(articleslisturl + '/' + id)
      .then(({ data }) => {
        console.log(data)
        if (data.success === false) {
          commit('callToast', {msgHeader: '抱歉', msgContent: '您访问的这篇文章不存在,如出现问题我们的技术人员将及时解决', _confirmfunc: null, _cancelfunc: null, deals: 0, contract: 4})
          return
        }
        console.log('现在写入详情')
        console.log(data)
        commit('writeInDetail', { data })
        data.article.photo = getPhotoImage(data.article.authorId)
      })
  },
  // 获取某一篇文章的评论
  getOnearticleComment: async ({ commit }, { id, limit, offset, that }) => {
    console.log('GetOneArticle-id' + id)
    that.$axios.get(articleslisturl + '/' + id + '/comments', {
      params: {
        sortBy: 'timestamp:desc',
        limit: limit,
        offset: offset
      }
    })
      .then(({ data }) => {
        console.log(data)
        console.log('现在写入评论', articleslisturl + '/' + id + '/comments')
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
        console.log(data)
        console.log('记录读取成功！限' + limit + '初始' + offset + '查询人' + that.$store.state.userInfo.info.address + '金额' + currency)
        console.log(that.$store.state.userInfo.info.address)
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
    console.log('Action has been used!', args, a)
    that.$axios.put(posturl, a, { headers: { 'magic': '594fe0f3', 'version': '' } }).then((res) => {
      console.log('We have a response!')
      // 返回成功判断
      console.log(res)
      if (res.status === 200 && res.data.success) {
        callback(null, '这是在action里面的回调信息')
        // 发布成功alert
        /* alert('发布成功') */
      } else {
        // 这里应该是返回错误信息
        /* alert(res.data.error) */
        // 报错处理
        commit('callToast', {msgHeader: '发生错误', msgContent: res.data.error, _confirmfunc: null, _cancelfunc: null, deals: undefined, contract: 4})
      }
    })
  }
}

export default actions
