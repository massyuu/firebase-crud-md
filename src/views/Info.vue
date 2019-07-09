<template>
  <div class="Info">
    <div class="title">{{ title }}</div>
    <div class="markdown-text" v-html="contentsText"/>
  </div>
</template>

<script>
import marked from 'marked'
import firebase from '../firebase'

const firestore = firebase.firestore()

export default {
  name: 'Info',
  data () {
    return {
      title: '',
      contentsText: ''
    }
  },
  created () {
    // Firesotreからの取得処理呼び出し
    this.getText()
    marked.setOptions({ breaks: true })
  },
  methods: {
    getText () {
      // Firebaseからデータを取得する
      var docRef = firestore.collection('markdown-contents').doc(this.$route.params.id)
      var ret = ''

      // FireStoreのデータ取得は非同期
      docRef.get().then((doc) => {
        if (doc.exists) {
          this.title = doc.data().title

          // 改行文字の置換
          ret = doc.data().content.replace(/\\n/g, '\n')
        } else {
          ret = 'データがありませんでした'
        }

        // 取得したテキストをMarkdownからパース
        this.contentsText = marked(ret)
      })
    }
  }
}
</script>

<style>
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
