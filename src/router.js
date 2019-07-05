import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

import Home from './views/Home.vue'
import InfoList from './views/InfoList.vue'
import Info from './views/Info.vue'
import Add from './views/Add.vue'
import Update from './views/Update.vue'
import 'firebase/auth'

Vue.use(Router)

const router = new Router({
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
      component: InfoList,
      meta: { requiresAuth: true }
    },
    {
      path: '/info/:id',
      name: 'info',
      component: Info,
      meta: { requiresAuth: true }
    },
    {
      path: '/add/',
      name: 'add',
      component: Add,
      meta: { requiresAuth: true }
    },
    {
      path: '/update/:id',
      name: 'update',
      component: Update,
      meta: { requiresAuth: true }
    }
  ]
})

/**
 * 未ログインの場合、ログインページへ遷移する
 */
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLogin) {
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
