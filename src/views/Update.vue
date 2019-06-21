<template>
  <div class="Update">
    <input v-model="formData.title" placeholder="title">
    <br>
    <input v-model="formData.category" placeholder="category">
    <br>
    <input v-model="formData.tags" placeholder="tags">
    <br>
    <textarea v-model="formData.content" placeholder="content"></textarea>
    <br>
    <button @click="update">update</button>
    <button @click="del">delete</button>
  </div>
</template>

<script>
import firebase from '../firebase'

export default {
  name: 'Update',
  data () {
    return {
      // フォームのデータ
      formData: {},
      // Firebaseから取得したリファレンス
      docRef: firebase.collection('markdown-contents').doc(this.$route.params.id)
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      // FireStoreのデータ取得は非同期
      this.docRef.get().then((doc) => {
        if (doc.exists) {
          this.formData = doc.data()
          console.log(this.formData)

          // 改行文字の置換
          this.formData.content = this.formData.content.replace(/\\n/g, '\n')
        } else {
          alert('データがありませんでした')
        }
      })
    },
    update () {
      // Firebaseのデータを更新する
      this.docRef.set(this.formData).then(() => {
        alert('データを更新しました。')

        // 一覧へ
        this.$router.push('/infoList')
      }).catch((error) => {
        console.error('Error adding document: ', error)
      })
    },
    del () {
      // Firebaseのデータを削除する
      this.docRef.delete().then(() => {
        alert('データを削除しました。')

        // 一覧へ
        this.$router.push('/infoList')
      }).catch((error) => {
        console.error('Error adding document: ', error)
      })
    }
  }
}
</script>
