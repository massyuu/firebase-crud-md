<template>
  <div class="Update display-width">
    <H1>Update</H1>
    <vs-input label-placeholder="title" class="title md-input" placeholder="title" v-model="formData.title"/>
    <vs-input label-placeholder="category" class="category md-input" placeholder="category" v-model="formData.category"/>
    <vs-input label-placeholder="tags" class="tags md-input" placeholder="tags" v-model="formData.tags"/>
    <vs-textarea label="content" class="content md-input md-textarea" v-model="formData.content"/>
    <vs-button color="primary" type="filled" @click="update">update</vs-button>
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

          // 改行文字の置換
          this.formData.content = this.formData.content.replace(/\\n/g, '\n')
        } else {
          this.$vs.dialog({
            color: 'error',
            title: 'Error No Data',
            text: 'データがありませんでした。',
            accept: () => {
              // 一覧へ
              this.$router.push('/infoList')
            }
          })
        }
      })
    },
    update () {
      // Firebaseのデータを更新する
      this.docRef.set(this.formData).then(() => {
        this.$vs.dialog({
          color: 'primary',
          title: 'Update',
          text: 'データを更新しました。',
          accept: () => {
            // 一覧へ
            this.$router.push('/infoList')
          }
        })
      }).catch((error) => {
        console.error('Error adding document: ', error)
      })
    }
  }
}
</script>
