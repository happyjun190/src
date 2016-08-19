import md5 from 'md5'

// 加密
const encryption = function (val) {
  val = md5(val).toUpperCase()
  let code = 256
  let result = ''
  for (let i in val) {
    result += String.fromCharCode(val.charCodeAt(i) ^ code)
  }
  return result
}

module.exports = encryption
