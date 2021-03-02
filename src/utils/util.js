/**
 * Created by steven on 2021/3/2
 */

/**
 * 生成guid
 * user: steven
 */
export const guid = function() {
  let guid = ''
  for (let i = 1; i <= 32; i++) {
    var n = Math.floor(Math.random() * 16.0).toString(16)
    guid += n
  }
  return guid
}
