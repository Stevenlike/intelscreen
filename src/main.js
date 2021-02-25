/*
 * @Author: steven
 * @Github: https://github.com/Stevenlike
 * @Date: 2021-02-23 18:06:16
 * @LastEditors: steven
 * @LastEditTime: 2021-02-24 18:20:34
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as uiKit from './components'
import './assets/css/main.css'

Vue.use(uiKit.wThree)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
