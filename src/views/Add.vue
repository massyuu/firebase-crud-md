<template>
  <div class="Add">
    <H1>Create</H1>
    <vs-input label="title" class="title md-input" placeholder="title" v-model="formData.title"/>
    <vs-input label="category" class="category md-input" placeholder="category" v-model="formData.category"/>
    <vs-input label="tags" class="tags md-input" placeholder="tags" v-model="formData.tags"/>
    <vs-textarea label="content" class="content md-input" v-model="formData.content"/>
    <vs-button color="primary" type="filled" @click="create">Create</vs-button>
  </div>
</template>

<script>
import firebase from '../firebase'
import moment from 'moment'

const firestore = firebase.firestore()

export default {
  name: 'Add',
  data () {
    return {
      formData: {}
    }
  },
  methods: {
    create () {
      // 現在日時
      this.formData.create = moment(new Date()).format('YYYY/MM/DD HH:mm:ss')

      // Firebaseへデータを登録する
      firestore.collection('markdown-contents').add(this.formData).then((docRef) => {
        alert('データを登録しました。ID: ' + docRef.id)
        // フォームクリア
        this.formData = {}
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
