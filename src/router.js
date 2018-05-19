import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Ranking from './views/Ranking.vue'
import Complain from './views/Complain.vue'
import ComplainInput from './views/ComplainInput.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: Ranking
    },
    {
      path: '/complain/:id',
      name: 'complain',
      component: Complain
    },
    {
      path: '/complainInput',
      name: 'complainInput',
      component: ComplainInput
    }
  ]
})
