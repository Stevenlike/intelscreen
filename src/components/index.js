/*
 * @Author: steven
 * @Github: https://github.com/Stevenlike
 * @Date: 2021-02-23 18:06:16
 * @LastEditors: steven
 * @LastEditTime: 2021-08-02 00:03:38
 */

import Vue from 'vue'

const componentsContext = require.context('@/components/', true, /index.vue/)
componentsContext.keys().forEach(component => {
  // 获取文件中的 default 模块
  const componentConfig = componentsContext(component)
  /**
  * 兼容 import export 和 require module.export 两种规范
  * // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
  */
  const ctrl = componentConfig.default || componentConfig
  const a = 'wjf-' + ctrl.name //（wjf-）是添加统一的否根（可以不使用）。
  const b = ctrl
  console.log(a, b)
  Vue.component(a, b)
})

// import three from './threeJs'
// import echart from './echart'

// export const wThree = {
//   install: function(Vue) {
//     Vue.component('three', three)
//   }
// }

// export const wEchart = {
//   install: function(Vue) {
//     Vue.component('echart', echart)
//   }
// }
