<template>
  <div class="Update">
    <H1>Update</H1>
    <vs-input label="title" class="title md-input" placeholder="title" v-model="formData.title"/>
    <vs-input label="category" class="category md-input" placeholder="category" v-model="formData.category"/>
    <vs-input label="tags" class="tags md-input" placeholder="tags" v-model="formData.tags"/>
    <vs-textarea label="content" class="content md-input" v-model="formData.content"/>
    <vs-button color="primary" type="filled" @click="update">update</vs-button>
    <vs-button color="danger" type="filled" @click="del">delete</vs-button>
  </div>
</template>

<script>
import firebase from '../firebase'

const firestore = firebase.firestore()

export default {
  name: 'Update',
  data () {
    return {
      // フォームのデータ
      formData: {},
      // Firebaseから取得したリファレンス
      docRef: firestore.collection('markdown-contents').doc(this.$route.params.id)
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
<style scoped>
.md-input {
  margin: 10px auto;
}
</style>
