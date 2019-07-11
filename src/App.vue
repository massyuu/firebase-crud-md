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

/**
  Markdown Preview
*/
.contents-header-label {
  margin-top: 20px;
  margin-bottom: 0;
}
.text-prev {
  display: flex;
}
.text-prev .md-textarea.content {
  width: 50%;
}
.text-prev .preview {
  text-align: left;
  margin: 10px auto;
  padding-left:10px;
  scroll-behavior: auto;
  max-height: 300px;
  width: 50%;
  overflow-x: hidden;
  overflow-y: auto;
}

/**
  Markdown Page
*/
.markdown-text {
  margin: 10px auto;
  padding: 10px;
  font-family: Georgia, Palatino, serif;
  color: #444444;
  max-width: 960px;
  text-align: left;
}
h1, h2, h3, h4 {
  color: #111111;
  font-weight: 400;
}
h1, h2, h3, h4, h5, table {
  margin-bottom: 16px;
  padding: 0;
}
p {
  margin-bottom: 8px;
  padding: 0;
}
.markdown-text h1 {
  font-size: 48px;
}
.markdown-text h2 {
  font-size: 36px;
  margin: 24px 0 6px;
}
.markdown-text h3 {
  font-size: 24px;
}
.markdown-text h4 {
  font-size: 21px;
}
.markdown-text h5 {
  font-size: 18px;
}
.markdown-text a {
  color: #0099ff;
  margin: 0;
  padding: 0;
  vertical-align: baseline;
}

/* リスト */
.markdown-text ul {
  padding-left : 40px;
  margin: 8px 0;
}
.markdown-text ol {
  padding-left : 40px;
  margin: 8px 0;
}
.markdown-text li {
  line-height: 24px;
}
.markdown-text p
, .markdown-text ul
, .markdown-text ol {
  font-size: 16px;
  line-height: 24px;
  max-width: 540px;
}

/* テーブル */
.markdown-text table{
  border-collapse:collapse;
}
.markdown-text td, .markdown-text th{
  border-top:1px solid #666;
  padding:10px;
}
.markdown-text tr:last-child td,
.markdown-text tr:last-child th{
  border-bottom:1px solid #666;
}

/* 引用 */
.markdown-text blockquote {
    position: relative;
    padding: 30px 15px 8px 15px;
    box-sizing: border-box;
    font-style: italic;
    background: #efefef;
    color: #555;
}
.markdown-text blockquote:before {
  display: inline-block;
  position: absolute;
  top: 13px;
  left: 15px;
  content: open-quote;
  font-family: 'FontAwesome';
  color: #cfcfcf;
  font-size: 28px;
  line-height: 1;
  font-weight: 900;
}
.markdown-text blockquote:after {
  content: close-quote;
  font-family: 'FontAwesome';
  color: #cfcfcf;
  font-size: 28px;
  line-height: 1;
  font-weight: 900;
}
.markdown-text blockquote p {
  padding: 0;
  margin: 10px 0;
  line-height: 1.7;
}
.markdown-text blockquote cite {
  display: block;
  text-align: right;
  color: #888888;
  font-size: 0.9em;
}

.markdown-text pre {
  padding: 0px 24px;
  max-width: 800px;
  white-space: pre-wrap;
  background-color: #F6F6F6;
}
.markdown-text code {
  font-family: Consolas, Monaco, Andale Mono, monospace;
  line-height: 1.5;
  font-size: 13px;
}

</style>
