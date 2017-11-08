import Vue from 'vue'
import Router from 'vue-router'
import top from '@/components/top/top'
import newPost from '@/components/newpost/newpost'
import detail from '@/components/detail/detail'
import login from '@/components/login/login'
import account from '@/components/account/account'
import publish from '@/components/publish/publish'
import recharge from '@/components/recharge/recharge'
import withdraw from '@/components/withdraw/withdraw'
import notfound from '@/components/notfound/notfound'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  // scrollBehavior: function (to, from, savedPosition) {
  //   return savedPosition || { x: 0, y: 0 }
  // },
  mode: 'history',
  // base: __dirname,
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
      path: '/publish',
      name: 'publish',
      component: publish
    },
    {
      path: '/recharge',
      name: 'recharge',
      component: recharge
    },
    {
      path: '/withdraw',
      name: 'withdraw',
      component: withdraw
    },
    {
      path: '/',
      name: 'top',
      component: top
    },
    {
      path: '*',
      name: 'notfound',
      component: notfound
    }
  ]
})
