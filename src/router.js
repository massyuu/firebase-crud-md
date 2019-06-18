import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import InfoList from './views/InfoList.vue'
import Info from './views/Info.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/infoList',
      name: 'infoList',
      component: InfoList
    },
    {
      path: '/info',
      name: 'info',
      component: Info
    }
  ]
})
