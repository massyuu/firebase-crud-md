<template>
  <div class="InfoList">
    <h1>一覧など</h1>
    <ul>
      <li v-for="row in this.list" :key="row.id">
        <span v-if="row.id !== ''">
          <router-link :to="{ name: 'info', params: { id: row.id }}">{{ row.title }}</router-link> |
          <router-link :to="{ name: 'update', params: { id: row.id }}">【更新】</router-link>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import firebase from '../firebase'

export default {
  name: 'InfoList',
  data () {
    return {
      list: []
    }
  },
  created () {
    // Firesotreからの取得処理呼び出し
    this.getList()
  },
  methods: {
    getList () {
      // Firebaseから一覧を取得する
      var ref = firebase.collection('markdown-contents')

      // FireStoreのデータ取得は非同期
      ref.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // リストへ追加
          this.list.push({ id: doc.id, title: doc.data().title })
        })
      }).catch((error) => {
        console.log('Error getting documents: ', error)
      })
    }
  }
}
</script>
