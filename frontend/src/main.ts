import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueAxios from 'vue-axios'
import { plainAxiosInstance, securedAxiosInstance } from './backend/axios'
import './main.css'

Vue.config.productionTip = false

Vue.use(VueAxios, {
  plain: plainAxiosInstance,
  secured: securedAxiosInstance
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
