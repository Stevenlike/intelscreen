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
import store from './store' // vuex
import * as uiKit from './components' // 组件
import './assets/css/main.css' // 样式

/**
 * 组册 -- 全局注册处
 **/
Vue.use(uiKit.wThree)
Vue.use(uiKit.wEchart)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

console.log(process.env.VUE_APP_SRC)
