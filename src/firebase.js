import firebase from 'firebase/app'

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

firebase.initializeApp(firebaseConfig)

export default firebase
