export const isEmptyValue = (value) => {
    if (value === '' || value === null || value === undefined) {
        return true
    } else {
        return false
    }
}
export const isNullOrUndefined = (params) => {
  const isUndefined = typeof params === 'undefined'
  const isNull = params === null
  return isUndefined || isNull
}

export const hideMiddleData = (value, start = 3, end = 4) => {
  const reg = new RegExp(`^(\\d{${start}}).*(\\d{${end}})$`)
  if (typeof value === 'string') {
    return value.replace(reg, '$1****$2')
  }else{
    return ''
  }
}
