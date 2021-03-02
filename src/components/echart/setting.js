/**
 * Created by steven on 2021/3/2
 */

import $ from 'jquery'

/**
 * 适配分辨率的echarts
 * user: steven
 */
export const getAdapterFont = e => {
  e = e || 0
  const wid = $(window).width()
  if (wid < 3000) {
    return (document.body.clientWidth / 1000) * e > 12
      ? (document.body.clientWidth / 1000) * e
      : 12
  } else {
    return (1920 / 1000) * e * 1.5 > 12 ? (1920 / 1000) * e * 1.5 : 12
  }
}
/**
 * 适配分辨率的echarts左右对称
 * user: steven
 */
export const getEchartedge = e => {
  e = e || 0
  const wid = $(window).width()
  if (wid < 3000) {
    return (40 * e > 12 ? 40 * e : 12) + 'px'
  } else {
    return (55 * e > 12 ? 55 * e : 12) + 'px'
  }
}

/**
 * echarts颜色
 */
export const echartColor = [
  '#3B9FFF',
  '#4CCB73',
  '#FBD336',
  '#F1637B',
  '#975FE4',
  '#FF8F65',
  '#00FFF5',
  '#C7FF60'
]
