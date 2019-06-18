import firebase from 'firebase'
import 'firebase/firestore'

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  authDomain: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  databaseURL: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  projectId: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  storageBucket: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  messagingSenderId: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  appId: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
export default firebaseApp.firestore()
