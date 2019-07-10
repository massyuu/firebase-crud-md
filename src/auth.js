import store from './store'
import firebase from './firebase'
import 'firebase/auth'
import 'firebase/firestore'

export default {
  // 初期化
  init () {
    // 認証状態の永続化
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  },
  // Emailログイン処理
  login (email, password) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(
        user => {
          this.setDisplayName(email)
        },
        err => {
          alert(err.message)
        }
      )
  },
  // ログアウト処理
  logout () {
    firebase.auth().signOut()
  },
  // 認証状態の設定
  onAuth () {
    firebase.auth().onAuthStateChanged(user => {
      user = !user ? {} : user
      store.commit('onAuthStateChanged', user)
      store.commit('onUserStatusChanged', Boolean(user.uid))
      this.setDisplayName(user.email)
    })
  },
  async setDisplayName (email) {
    let querySnapshot = await firebase.firestore().collection('user').where('user_id', '==', email).get()
    if (querySnapshot.docs[0].exists) {
      store.commit('onLoginedDisplayName', querySnapshot.docs[0].data().name)
    }
  }
}
