import { get, post, put } from "utils/dataAccess/axios";
import { combineReducers } from "redux";

const LOGIN_AND_GET_USERINFO = 'LOGIN_AND_GET_USERINFO'

/**
  * actions START
**/
export function login(params, callback) {
  return post({
      url: '/dsp/account/login',
      bodyData: params,
      actionType: LOGIN_AND_GET_USERINFO,
      successConfig: {
        callback: callback
      },
      failConfig: {
          message: '登录失败'
      }
  })
}

export function setUserInfo(userInfo) {
  return dispatch => {
    dispatch({
      type: LOGIN_AND_GET_USERINFO,
      data: userInfo
    });
  };
};
/**
* actions END
**/

/**
* reducers START
**/
export function userInfo(previousState = {}, action){
  if(action.type === LOGIN_AND_GET_USERINFO){
      return action.data
  }else{
      return previousState
  }
}
/**
* reducers END
**/

const user = combineReducers({
  userInfo
});
export default user;
