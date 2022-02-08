/*
 * @Author: steven
 * @Github: https://github.com/Stevenlike
 * @Date: 2021-08-09 20:53:51
 * @LastEditors: steven
 * @LastEditTime: 2021-08-09 22:31:40
 * @Description: 有问题，找我
 */
// import { rough } from 'roughjs'
export function init(canva) {
  /* globals rough */
  const rc = rough.canvas(canva)
  const ctx = rc.ctx
  ctx.translate(256, 256)
  ctx.scale(1, -1)

  const hillOpts = { roughness: 2.8, strokeWidth: 2, fill: 'blue' }

  rc.path('M-180 0L-80 100L20 0', hillOpts)
  rc.path('M-20 0L80 100L180 0', hillOpts)

  rc.circle(0, 150, 105, {
    stroke: 'red',
    strokeWidth: 4,
    fill: 'rgba(255,255, 0, 0.4)',
    fillStyle: 'solid'
  })
}
