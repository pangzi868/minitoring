export const makeUrlString = (pathStr, paramObj) => {

  let str = ''
  if (typeof paramObj !== 'object') {
    return pathStr
  }
  for (let key in paramObj) {
    str += key + '=' + encodeURIComponent(paramObj[key]) + '&'
  }
  let result = pathStr + '?' + str.replace(/&$/, '')
  return result
}
export const getQS = (mapObj) => {
  let str = ''
  if (typeof mapObj !== 'object') {
    return ''
  }
  for (let key in mapObj) {
    str += key + '=' + mapObj[key] + '&'
  }
  return str.replace(/&$/, '')
}
/** 获取URL的某个参数 **/
/**
 * @example getQueryString('#/root/?name=params', name) => 'params'
 **/
export const getQueryString = (hashOrPath, name) => {
  var reg = new RegExp("(^|&|\\?)" + name + "=([^&]*)(&|$)")
  var r = hashOrPath.substr(1).match(reg)
  if (r != null) return decodeURI(r[2]);
  return null
}
export const getQueryObj = (hash) => {
  let queryString = hash.split('?')[1]
  let queryObj = {}
  if (queryString) {
    let queryArr = queryString.split('&')
    queryArr.forEach(item => {
      let keyValues = item.split('=')
      queryObj[keyValues[0]] = window.decodeURI(keyValues[1])
    })
  }

  return queryObj
}

