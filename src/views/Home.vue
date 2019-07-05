<template>
  <!-- ログイン済：ログアウトボタンを表示 -->
  <div v-if="userStatus" key="login" class="navbar-item">
    <vs-button color="dark" type="border" @click="logout">
      <span class="">Logout</span>
    </vs-button>
  </div>
  <!-- 未ログイン：ログインボタンを表示 -->
  <div v-else key="logout">
    <div class="email-form">
      <vs-input label-placeholder="Default" type="text" placeholder="Email" v-model="email" />
      <vs-input label-placeholder="Default" type="password" placeholder="Password" v-model="password" />
      <vs-button color="primary" type="border" @click="login">
        <span class="">Login</span>
      </vs-button>
    </div>
  </div>
</template>

<script>
import auth from '@/auth'

export default {
  name: 'Home',
  data () {
    return {
      email: '',
      password: ''
    }
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
  },
  methods: {
    // ログイン処理
    login () {
      auth.login(this.email, this.password)
    },
    // ログアウト処理
    logout () {
      auth.logout()
    }
  }
}
</script>
