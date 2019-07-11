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
    async getText () {
      let ret = ''
      // Firebaseからデータを取得する
      try {
        // FireStoreのデータ取得は非同期
        let doc = await firestore.collection('markdown-contents').doc(this.$route.params.id).get()
        if (doc.exists) {
          this.title = doc.data().title

          // 改行文字の置換
          ret = doc.data().content.replace(/\\n/g, '\n')
        } else {
          ret = 'データがありませんでした'
        }

        // 取得したテキストをMarkdownからパース
        this.contentsText = marked(ret)
      } catch (error) {
        console.log('Error getting documents: ', error)
      }
    }
  }
}
</script>
