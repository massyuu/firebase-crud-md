<template>
  <div class="Info">
    <div class="title">{{ title }}</div>
    <div v-html="contentsText"/>
  </div>
</template>

<script>
import marked from 'marked'
import firebase from '../firebase'

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
  },
  methods: {
    getText () {
      // Firebaseからデータを取得する
      var docRef = firebase.collection('markdown-contents').doc('1')
      var ret = ''

      // FireStoreのデータ取得は非同期
      docRef.get().then((doc) => {
        if (doc.exists) {
          this.title = doc.data().title
          ret = doc.data().content
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
