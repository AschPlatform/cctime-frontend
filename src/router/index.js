import Vue from 'vue'
import Router from 'vue-router'
import top from '@/components/top/top'
import detail from '@/components/detail/detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/top',
      name: 'top',
      component: top
    },
    {
      path: '/article/14668',
      name: 'detail',
      component: detail
    }
  ]
})
