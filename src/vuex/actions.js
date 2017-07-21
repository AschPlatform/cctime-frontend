// 存储异步操作,获取数据用commit操作mutation
let loginurl = 'http://192.168.110.106:4096/api/dapps/059cb7cd23e6e1cde625119ea7f00f8c72c2bd0fce434bba8e0e640112f9bf81/login'
let posturl = 'http://192.168.110.106:4096/api/dapps/059cb7cd23e6e1cde625119ea7f00f8c72c2bd0fce434bba8e0e640112f9bf81/transactions/unsigned'
let articleslisturl = 'http://192.168.110.106:4096/api/dapps/059cb7cd23e6e1cde625119ea7f00f8c72c2bd0fce434bba8e0e640112f9bf81/articles'

const actions = {
  // 验证用户信息获取account
  getUserInfo: async ({ commit }, {secret, that}) => {
    console.log(secret)
    /* if (state.mock) { 延时传送来直接写入数据
      return setTimeout(()=> {
        commit('writeInuser', {secret: '', account: })
      }, 200)
    } */
    await that.$axios.post(loginurl, {
      secret: secret
    }).then((res) => {
      console.log(res)
      if (res.status === 200 && res.data.success) {
        commit('writeInuser', {secret: secret, account: res.data.account})
      } else {
        // TODO
      }
    })
  },
  // 获取文章列表
  getAllarticles: async ({ commit }, { sortBy, limit, offset, that }) => {
    console.log('that', that)
    await that.$axios.get(articleslisturl, {
      params: {
        sortBy: sortBy,
        limit: limit,
        offset: offset
      }
    }).then(({data}) => {
      if (sortBy !== 'timestamp') {
        commit('writeInToparticleslist', { data })
        console.log('getall Top res ' + sortBy, data)
      } else if (sortBy === 'timestamp') {
        commit('writeInNewarticleslist', { data })
        console.log('getall New res ' + sortBy, data)
      }
    })
  },

  // 获取某一篇文章详情
  getOnearticle: async ({commit}, {id, that}) => {
    console.log('GetOneArticle-id' + id)
    await that.$axios.get(articleslisturl + '/' + id)
      .then(({data}) => {
        console.log('现在写入详情')
        console.log(data)
        commit('writeInDetail', {data})
      })
  },
  // 获取某一篇文章的评论
  getOnearticleComment: async ({commit}, {id, that}) => {
    console.log('GetOneArticle-id' + id)
    await that.$axios.get(articleslisturl + '/' + id + '/comments')
      .then(({data}) => {
        console.log('现在写入评论', articleslisturl + '/' + id + '/comments')
        console.log(data)
        commit('writeInComment', {data})
      })
  },
  // 发布文章/投票/评论  履行合约
  invokeContract: async ({ commit }, {type, args, fee, that}) => {
    console.log('Action has been used!', type, args, fee, that)
    await that.$axios.put(posturl, {
      secret: that.$store.state.userInfo.secret,
      type: type,
      fee: fee,
      args: args
    }).then((res) => {
      console.log('We have a response!')
      // 返回成功判断
      console.log(res)
      if (res.status === 200 && res.data.success) {
         // 发布成功alert
        alert('发布成功')
        that.$router.push('top')
      } else {
        // 这里应该是返回错误信息
        alert(res.data.data)
      }
    })
  }
}

export default actions
