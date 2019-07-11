<template>
  <div class="Add display-width">
    <H1>Create</H1>
    <vs-input label-placeholder="title" class="title md-input" placeholder="title" v-model="formData.title"/>
    <vs-input label-placeholder="category" class="category md-input" placeholder="category" v-model="formData.category"/>
    <vs-input label-placeholder="tags" class="tags md-input" placeholder="tags" v-model="formData.tags"/>
    <p class="contents-header-label">contents</p>
    <div class="text-prev">
      <vs-textarea class="content md-input md-textarea" v-model="formData.content" @input="updatePreview"/>
      <div class="preview markdown-text" v-html="prevText">aaaaaa</div>
    </div>
    <vs-button color="primary" type="filled" @click="create">Create</vs-button>
  </div>
</template>

<script>
import marked from 'marked'
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
    async create () {
      // 現在日時
      this.formData.create = moment(new Date()).format('YYYY/MM/DD HH:mm:ss')

      try {
        // Firebaseへデータを登録する
        let docRef = await firestore.collection('markdown-contents').add(this.formData)
        this.$vs.dialog({
          color: 'primary',
          title: 'Create',
          text: 'データを登録しました。ID: ' + docRef.id,
          accept: () => {
            // 一覧へ
            this.$router.push('/infoList')
          }
        })
      } catch (error) {
        console.error('Error adding document: ', error)
      }
    },
    updatePreview () {
      this.prevText = marked(this.formData.content)
    }
  }
}
</script>
