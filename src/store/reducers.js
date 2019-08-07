import { combineReducers } from 'redux'


import minitoring from './modules/minitoring'
import manager from './modules/manager'
import login from './modules/login'
export const injectReducer = (store, { key, reducer }) => {

  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export const makeRootReducer = (asyncReducers) => {
  const appReducer = combineReducers({
    minitoring,
    manager,
    login,
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
