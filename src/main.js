// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
export const eventBus = new Vue({
  methods: {
    getParallax (imageOffset) {
      var getOffset = window.pageYOffset
      imageOffset.style.top = (-getOffset * 1 / 4) + 'px'
    },
    getDataResponse (link) {
      return axios
        .get(link)
        .then(response => {
          this.$emit('getDataResponse', response.data)
        })
    },
    ClickOnTab (tabElement, tabBlock) {
      this.$emit('ClickOnTab', tabElement)
    }
  }
})


Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
