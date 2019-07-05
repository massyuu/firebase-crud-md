<template lang="html">
  <div class="InfoList">
    <h1>投稿一覧</h1>
    <vs-table stripe max-items="10" pagination :data="this.list">
      <template slot-scope="{data}">
        <vs-tr v-for="row in data" :key="row.id">
          <vs-td class="title" :data="row.title">
            <router-link :to="{ name: 'info', params: { id: row.id }}">{{ row.title }}</router-link>
          </vs-td>
          <vs-td class="action" :data="row.id">
            <vs-button color="primary" type="filled" @click="updateInfo(row.id)">
              update
            </vs-button>
            <vs-button color="danger" type="filled" @click="deleteConfirm(row.id)">
              delete
            </vs-button>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </div>
</template>

<script>
import firebase from '../firebase'
import 'firebase/firestore'

const firestore = firebase.firestore()
const collection = firestore.collection('markdown-contents')

export default {
  name: 'InfoList',
  data () {
    return {
      list: [],
      activeConfirm: false,
      deleteId: 0
    }
  },
  created () {
    // Firesotreからの取得処理呼び出し
    this.getList()
  },
  methods: {
    deleteConfirm (deleteId) {
      // 削除対象ID
      this.deleteId = deleteId
      console.log(this.deleteId)

      // 確認ダイアログ
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: 'Confirm',
        text: '投稿を削除します。\nよろしいですか？',
        accept: this.deleteInfo
      })
    },
    getList () {
      // Firebaseから一覧を取得する
      collection.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // リストへ追加
          this.list.push({ id: doc.id, title: doc.data().title })
        })
      }).catch((error) => {
        console.log('Error getting documents: ', error)
      })
    },
    updateInfo (contentsId) {
      // 更新画面へ遷移
      this.$router.push({ name: 'update', params: { id: contentsId } })
    },
    deleteInfo () {
      // Firestoreのデータを削除
      collection.doc(this.deleteId).delete().then(() => {
        // 削除通知
        this.$vs.notify({
          color: 'primary',
          title: 'Deleted contents',
          text: '投稿を削除しました。'
        })
        // リストの再描画
        this.contentsId = 0
        this.list = []
        this.getList()
      }).catch((error) => {
        console.error('Error adding document: ', error)
      })
    }
  }
}
</script>
<style scoped>
.InfoList {
  width: 70%;
  margin: 0 auto;
}
.title {
  width: 70%;
}
.action {
  width: 30%;
  text-align: right;
}
.action button{
  margin:0 5px;
}
</style>
