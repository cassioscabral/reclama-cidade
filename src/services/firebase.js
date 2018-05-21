import firebase from 'firebase'

var config = {

}
firebase.initializeApp(config)
const database = firebase.database()
const storage = firebase.storage()

export {
  firebase,
  database,
  storage
}
