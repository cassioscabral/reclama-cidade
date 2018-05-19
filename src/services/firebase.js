import firebase from 'firebase'

var config = {

}
firebase.initializeApp(config)

export default {
  database: firebase.database()
}
