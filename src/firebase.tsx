
import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCdAV_htutzSVbH_Dv5gN8poktlbhiB78c",
    authDomain: "not-slack-297ae.firebaseapp.com",
    databaseURL: "https://not-slack-297ae.firebaseio.com",
    projectId: "not-slack-297ae",
    storageBucket: "not-slack-297ae.appspot.com",
    messagingSenderId: "481350093906",
    appId: "1:481350093906:web:68c254863281a3f414a38b",
    measurementId: "G-06FCCTVD2J"
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }
export default db