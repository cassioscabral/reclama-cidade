import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Vuefire from 'vuefire'
import firebase from './services/firebase'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.use(Vuefire)

Vue.config.productionTip = false

new Vue({
  router,
  firebase: {
    complain: firebase.database.ref('complain').orderByChild('created_at')
  },
  store,
  render: h => h(App)
}).$mount('#app')
