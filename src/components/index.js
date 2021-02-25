/**
 * Created by steven on 2021/2/23
 */
import three from './ThreeJs'

export const wThree = {
  install: function(Vue) {
    Vue.component('three', three)
  }
}
