import { makeUrlString, getQS, getQueryString, getQueryObj } from './url'
import { formatMsgDate } from './timeFormat/index.js'
import { findChildById } from './traverseTree'
import { getCookie } from './cookie'
import { isEmptyValue } from './common'
const px2rem = (width, pxValue) => {
  return pxValue *  (1 / (width / 10)) + 'rem'
}

export  {
    makeUrlString,
    getQS,
    getQueryObj,
    formatMsgDate,
    getQueryString,
    findChildById,
    getCookie,
    px2rem,
    isEmptyValue
}
