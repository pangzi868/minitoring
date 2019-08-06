import {combineReducers} from 'redux'

/** 天威 START**/
import user from './modules/user'
import minitoring from './modules/minitoring'
/** 天威 END **/

import global from './modules/global'
import account from './modules/account'
import loginOut from './modules/loginOut'
export const injectReducer = (store, {key, reducer}) => {

  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export const makeRootReducer = (asyncReducers) => {
  const appReducer = combineReducers({
    //天威
    user,
    minitoring,
    //
    account,
    loginOut,
    global,
    ...asyncReducers
  })
  return (state, action) => {
    if (action.type === 'LOGOUT') {
      state = undefined
    }
    return appReducer(state, action)
  }
}

export default makeRootReducer
