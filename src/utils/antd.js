export const commonChangeHandler = (obj, key, value) => {
  if (typeof value === 'object') {
    if (value === null) {
      obj[key] = value
    } else {

      // datepicker的值也是value，但是它没有target属性，所以要区分出来
      if (Array.isArray(value) === true || value._isAMomentObject === true) {
        obj[key] = value
      } else {
        obj[key] = value.target.value
      }
    }
  } else {
    obj[key] = value
  }
}
