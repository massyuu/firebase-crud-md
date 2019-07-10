import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    status: false
  },
  mutations: {
    // Firebaseからのユーザー情報を保持する
    onAuthStateChanged (state, user) {
      state.user = user
    },
    // ログイン状態（ログイン or 未ログイン）
    onUserStatusChanged (state, status) {
      state.status = status
    },
    // userコレクションの表示名をセット
    onLoginedDisplayName (state, name) {
      state.user.displayName = name
    }
  },
  getters: {
    // ユーザー情報を返す
    user (state) {
      return state.user
    },
    // ログイン状態を返す
    isLogin (state) {
      return state.status
    }
  }
})
