<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <span v-if="userStatus"> | </span>
      <router-link to="/infoList" v-if="userStatus">InfoList</router-link>
      <span v-if="userStatus"> | </span>
      <router-link to="/add" v-if="userStatus">Create</router-link>
      <p id="login-info" v-if="userStatus">
        login as {{ user.displayName }}
      </p>
    </div>
    <router-view/>
  </div>
</template>
<script>
import auth from '@/auth'

export default {
  name: 'App',
  created: function () {
    // インスタンス生成時にログイン情報を取得
    auth.onAuth()
  },
  computed: {
    // ユーザー情報を算出
    user () {
      return this.$store.getters.user
    },
    // ログイン情報を算出
    userStatus () {
      // ログインするとtrue
      return this.$store.getters.isLogin
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.display-width {
  width: 70%;
  margin: 0 auto;
}

.md-input {
  margin: 10px auto;
}

.md-input > .vs-textarea {
  height: 300px;
  font-size: 14px;
}
#login-info {
  text-align: right;
}
</style>
