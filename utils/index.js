/* 常用的工具库方法 */
/* 邮箱校验 */
export const isEmail = (s) => {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}
/* 手机号码 */
export const isMobile = (s) => {
  return /^1[0-9]{10}$/.test(s)
}
/* 电话号码 */
export const isPhone = (s) => {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}
/* 是否url地址 */
export const isURL = (s) => {
  return /^http[s]?:\/\/.*/.test(s)
}
/* 是否字符串 */
export const isString = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'String'
}
/* 是否数字 */
export const isNumber = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Number'
}
/* 是否boolean */
export const isBoolean = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Boolean'
}
/* 是否函数 */
