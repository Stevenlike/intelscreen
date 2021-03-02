/**
 * Created by steven on 2021/2/23
 */
import three from './ThreeJs'
import echart from './echart'

export const wThree = {
  install: function(Vue) {
    Vue.component('three', three)
  }
}

export const wEchart = {
  install: function(Vue) {
    Vue.component('echart', echart)
  }
}
