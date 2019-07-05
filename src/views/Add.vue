<template>
  <div class="Add display-width">
    <H1>Create</H1>
    <vs-input label-placeholder="title" class="title md-input" placeholder="title" v-model="formData.title"/>
    <vs-input label-placeholder="category" class="category md-input" placeholder="category" v-model="formData.category"/>
    <vs-input label-placeholder="tags" class="tags md-input" placeholder="tags" v-model="formData.tags"/>
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
        this.$vs.dialog({
          color: 'primary',
          title: 'Create',
          text: 'データを登録しました。ID: ' + docRef.id,
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
