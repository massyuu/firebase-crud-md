<template>
  <div class="Update display-width">
    <H1>Update</H1>
    <vs-input label-placeholder="title" class="title md-input" placeholder="title" v-model="formData.title"/>
    <vs-input label-placeholder="category" class="category md-input" placeholder="category" v-model="formData.category"/>
    <vs-input label-placeholder="tags" class="tags md-input" placeholder="tags" v-model="formData.tags"/>
    <p class="contents-header-label">contents</p>
    <div class="text-prev">
      <vs-textarea class="content md-input md-textarea" v-model="formData.content" @input="updatePreview"/>
      <div class="preview markdown-text" v-html="prevText">aaaaaa</div>
    </div>
    <vs-button color="primary" type="filled" @click="update">update</vs-button>
  </div>
</template>

<script>
import marked from 'marked'
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
    async getData () {
      try {
        // FireStoreのデータ取得は非同期
        let doc = await this.docRef.get()
        if (doc.exists) {
          this.formData = doc.data()

          // 改行文字の置換
          this.formData.content = this.formData.content.replace(/\\n/g, '\n')
          this.updatePreview()
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
      } catch (error) {
        console.log('Error getting documents: ', error)
      }
    },
    async update () {
      try {
        // Firebaseのデータを更新する
        await this.docRef.set(this.formData)

        this.$vs.dialog({
          color: 'primary',
          title: 'Update',
          text: 'データを更新しました。',
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

<style scoped>

</style>
