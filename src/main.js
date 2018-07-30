import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { faPause } from '@fortawesome/free-solid-svg-icons'
import { faStop } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.config.devtools = true

library.add(faPlay, faPause, faStop)
Vue.component('font-awesome-icon',FontAwesomeIcon)

Vue.use(BootstrapVue)

Vue.filter('leftpad', (value) => {
  if (value >= 10) {
  return value
  }
  return '0' + value
})

new Vue({
  el: '#app',
  render: h => h(App)
})
