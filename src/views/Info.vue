<template>
  <div class="Info">
    <div class="title">{{ title }}</div>
    <div v-html="contentsText"/>
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
