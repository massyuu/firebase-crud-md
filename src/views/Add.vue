<template>
  <div class="Add">
    <input v-model="formData.title" placeholder="title">
    <br>
    <input v-model="formData.category" placeholder="category">
    <br>
    <input v-model="formData.tags" placeholder="tags">
    <br>
    <textarea v-model="formData.content" placeholder="content"></textarea>
    <br>
    <button @click="create">registration</button>
  </div>
</template>

<script>
import firebase from '../firebase'
import moment from 'moment'

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
      firebase.collection('markdown-contents').add(this.formData).then((docRef) => {
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
