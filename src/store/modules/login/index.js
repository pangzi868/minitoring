import { get, post, put } from "utils/dataAccess/axios";
import { combineReducers } from "redux";
import { mockClosure } from 'utils/mock'

const GET_SMS = 'GET_SMS'
const VALIDATE_SMS = 'VALIDATE_SMS'
const PHONENUMBER_REGISTER = 'PHONENUMBER_REGISTER'
const PASSWORD_LOGIN = 'PASSWORD_LOGIN'
const SMS_LOGIN = 'SMS_LOGIN'

const IS_MOCK_CURRENT_MODULE = false  // 控制当前模块的所有接口是否使用mock
const isMock = mockClosure(IS_MOCK_CURRENT_MODULE)


/**
 * action start
 */

// 获取验证码
export function getSMSMessage(params, cb) {
  return post({
    url: `${isMock()}/shungkon/login/smsSendCode`,
    bodyData: {
      phoneNumber: params.phoneNumber
    },
    actionType: GET_SMS,
    successConfig: {
      callback: cb
    },
    failConfig: {
      message: '获取验证码失败',
      isForceShow: false
    }
  })
}

// 校验验证码
export function ValidateCode(params) {
  return post({
    url: `${isMock()}/login/smsValidate`,
    bodyData: {
      hash: params.hash,
      tamp: params.tamp,
      msgNum: params.msgNum
    },
    actionType: VALIDATE_SMS,
    failConfig: {
      message: '校验验证码失败',
      isForceShow: false
    }
  })
}

// 注册手机账号
export function phoneNumRegister(params, cb) {
  return post({
    url: `${isMock()}/shungkon/shungkon/toRegister`,
    bodyData: {
      tamp: params.tamp,
      hash: params.hash,
      msgNum: params.msgNum,
      phoneNumber: params.phoneNumber,
      password: params.password
    },
    actionType: PHONENUMBER_REGISTER,
    successConfig: {
      callback: cb
    },
    failConfig: {
      message: '注册账号密码失败',
      isForceShow: false
    }
  })
}

// 账号密码登录
export function passWordLogin(params) {
  return post({
    url: `${isMock()}/shungkon/login/logOnByPwd`,
    bodyData: {
      phoneNumber: params.phoneNumber,
      pwd: params.pwd,
    },
    actionType: PASSWORD_LOGIN,
    failConfig: {
      message: '账号/密码错误，登录失败',
      isForceShow: false
    }
  })
}

// 账号密码登录
export function retrievePassword(params,cb) {
  return post({
    url: `${isMock()}/shungkon/forgetPwd`,
    bodyData: {
      phoneNumber: params.phoneNumber,
      msgNum: params.msgNum,
      newPassword: params.newPassword,
      hash: params.hash,
      tamp: params.tamp
    },
    actionType: PASSWORD_LOGIN,
    successConfig : {
      callback: cb
    },
    failConfig: {
      message: '修改密码失败',
      isForceShow: false
    }
  })
}

// 短信登录
export function SMSLogin(params) {
  return post({
    url: `${isMock()}/shungkon/login/logOnByMsg`,
    bodyData:
    {
      phoneNumber: params.phoneNumber,
      hash: params.hash,
      tamp: params.tamp,
      msgNum: params.msgNum
    },
    actionType: SMS_LOGIN,
    failConfig: {
      message: '短信登录失败',
      isForceShow: false
    }
  })
}

/**
 * action end
 */


/**
 * reducers start
 */
const SMSMessage = (previousState = {}, action) => {
  if (action.type === GET_SMS) {
    return action.data
  } else {
    return previousState
  }
}
const Code = (previousState = {}, action) => {
  if (action.type === VALIDATE_SMS) {
    return action.data
  } else {
    return previousState
  }
}
/**
 * reducers end
 */

const login = combineReducers({
  SMSMessage,
  Code
});
export default login;
