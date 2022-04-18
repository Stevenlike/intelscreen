/*
 * @Author: steven
 * @Github: https://github.com/Stevenlike
 * @Date: 2021-02-23 18:06:16
 * @LastEditors: steven
 * @LastEditTime: 2022-02-08 13:49:32
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store' // vuex
/* 自定义组件 */
import '@/components/index.js'
/* 外部组件 */
// elementUI
import 'element-ui/lib/theme-chalk/index.css'
import element from '@/components/element/index'
/* 初始化样式 */
import './assets/css/main.css' // 样式
// import * as uiKit from './components' // 组件

/**
 * 注册 -- 全局注册处
 **/
Vue.use(element)
// Vue.use(uiKit.wThree)
// Vue.use(uiKit.wEchart)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// console.log(process.env.VUE_APP_SRC)
