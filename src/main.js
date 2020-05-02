// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueChatScroll from 'vue-chat-scroll'
import firebase from 'firebase'

Vue.use(VueChatScroll)

Vue.config.productionTip = false

let app = null;

// wait for firebase auth to init before creating the app

firebase.auth().onAuthStateChanged(() => {  // u would only want to initialize the app once, so u wont have to 
/* eslint-disable no-new */                 // re-initialze the app whenever the user refresh the page or sign in with a new user
if(!app){ // <---- because of this, the app will not be run again when rendering again
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
}
})


