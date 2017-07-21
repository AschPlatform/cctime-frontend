import Vue from 'vue'
import Router from 'vue-router'
import top from '@/components/top/top'
import newPost from '@/components/newpost/newpost'
import detail from '@/components/detail/detail'
import login from '@/components/login/login'
import account from '@/components/account/account'
import publish from '@/components/publish/publish'
import detailcomment from '@/components/detailcomment/detailcomment'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/top',
      name: 'top',
      component: top
    },
    {
      path: '/new',
      name: 'new',
      component: newPost
    },
    {
      path: '/articles/:id',
      name: 'detail',
      component: detail
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/account',
      name: 'account',
      component: account
    },
    {
      path: '/aaa',
      name: 'publish',
      component: publish
    },
    {
      path: '/bbb',
      name: 'detailcomment',
      component: detailcomment
    }
  ]
})
