<template>
  <div class="InfoList">
    <h1>一覧など</h1>
    <ul>
      <li v-for="row in this.list" :key="row.id">
        <router-link :to="{ name: 'info', params: { id: row.id }}">{{ row.title }}</router-link>
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
      list: [{}]
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
          console.log(this.list)
        })
      }).catch((error) => {
        console.log('Error getting documents: ', error)
      })
    }
  }
}
</script>
