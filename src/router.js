import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import InfoList from './views/InfoList.vue'
import Info from './views/Info.vue'
import Add from './views/Add.vue'
import Update from './views/Update.vue'

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
      path: '/info/:id',
      name: 'info',
      component: Info
    },
    {
      path: '/add/',
      name: 'add',
      component: Add
    },
    {
      path: '/update/:id',
      name: 'update',
      component: Update
    }
  ]
})
