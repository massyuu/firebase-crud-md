import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import auth from './auth'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'
import 'material-icons/iconfont/material-icons.css';

auth.init()

Vue.config.productionTip = false

Vue.use(Vuesax)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
