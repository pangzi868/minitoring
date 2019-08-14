import { get, post, put } from "utils/dataAccess/axios";
import { combineReducers } from "redux";
import { mockClosure } from 'utils/mock'

const WARNING_VIDEOS = 'WARNING_VIDEOS'
const WARNING_VIDEOS_DETAIL = 'WARNING_VIDEOS_DETAIL'
const DOWNLOAD_WARNING_VIDEOS = 'DOWNLOAD_WARNING_VIDEOS'
const DENSITY_PICTURE = 'DENSITY_PICTURE'
const DENSITY_PICTURE_DATA = 'DENSITY_PICTURE_DATA'
const UPLOAD_ATTACH = 'UPLOAD_ATTACH'
const ADD_DEVICE = 'ADD_DEVICE'
const ADD_GROUP = 'ADD_GROUP'
const GET_DEVICE_GROUP = 'GET_DEVICE_GROUP'
const GET_FUZZY_DEVICE_LIST = 'GET_FUZZY_DEVICE_LIST'
const GET_DEVICE_LIST = 'GET_DEVICE_LIST'
const ADD_DEVICE_TO_SYSTEM = 'ADD_DEVICE_TO_SYSTEM'
const GET_DEVICE_DETAIL = 'GET_DEVICE_DETAIL'

const IS_MOCK_CURRENT_MODULE = false  // 控制当前模块的所有接口是否使用mock
const isMock = mockClosure(IS_MOCK_CURRENT_MODULE)

// 获取视频列表接口
export function getWarningVideos(params, cb) {
  return get({
    url: `/shungkon/video/getWarningInfoList?serial=${params.serial}`,
    actionType: WARNING_VIDEOS,
    successConfig: {
      callback: cb
    },
    failConfig: {
      message: "获取视频列表失败"
    }
  });
}

const warningVideos = (previousState = {}, action) => {
  if (action.type === WARNING_VIDEOS) {
    return action.data
  } else {
    return previousState
  }
}

// 获取视频详情接口
export function getWarningVideosDetail(params) {
  return get({
    url: `/shungkon/video/getWarningInfoDesc?serial=QSZN001&eventId=QSZN001_2019-07-22T092312`,
    actionType: WARNING_VIDEOS_DETAIL,
    successConfig: {},
    failConfig: {
      message: "获取视频详情失败"
    }
  });
}

const warningVideosDetail = (previousState = {}, action) => {
  if (action.type === WARNING_VIDEOS_DETAIL) {
    return action.data
  } else {
    return previousState
  }
}

// 密度分析图片详情接口
export function getDensityPicture(params, cb) {
  return get({
    url: `/shungkon/picture/getDensityPicture?serial=${params.serial}`,
    actionType: DENSITY_PICTURE,
    successConfig: {
      callback: cb
    },
    failConfig: {
      message: "获取密度分析图片详情失败",
    }
  });
}

const densityPicture = (previousState = {}, action) => {
  if (action.type === DENSITY_PICTURE) {
    return action.data
  } else {
    return previousState
  }
}

// 密度分析图片数据集接口
export function getDensityPictureData(params) {
  return get({
    url: `/shungkon/picture/getDensityPictureData?serial=QSZN001`,
    actionType: DENSITY_PICTURE_DATA,
    successConfig: {},
    failConfig: {
      message: "获取密度分析图片数据集失败"
    }
  });
}

const densityPictureData = (previousState = {}, action) => {
  if (action.type === DENSITY_PICTURE_DATA) {
    return action.data
  } else {
    return previousState
  }
}


// 获取验证码
export function addDevice(params, cb) {
  return post({
    url: `${isMock()}/shungkon/addDevice`,
    bodyData: {
      serial: params.serial,
      groupId: params.groupId,
      devicePassword: params.devicePassword,
    },
    actionType: ADD_DEVICE,
    successConfig: {
      callback: cb
    },
    failConfig: {
      message: '添加分组失败',
      isForceShow: false
    }
  })
}

// 获取验证码
export function addGroup(params, cb) {
  return post({
    url: `${isMock()}/shungkon/login/smsSendCode`,
    bodyData: {
      phoneNumber: params.phoneNumber
    },
    actionType: ADD_GROUP,
    successConfig: {
      callback: cb
    },
    failConfig: {
      message: '添加分组失败',
      isForceShow: false
    }
  })
}


// 获取分组列表
export function getDeviceGroup(params, cb) {
  return post({
    url: `${isMock()}/shungkon/getDeviceGroup`,
    bodyData: {},
    actionType: GET_DEVICE_GROUP,
    successConfig: {
      callback: cb
    },
    failConfig: {
      message: '获取分组列表失败',
      isForceShow: false
    }
  })
}


const deviceGroup = (previousState = {}, action) => {
  if (action.type === GET_DEVICE_GROUP) {
    return action.data
  } else {
    return previousState
  }
}


// 获取设备列表
export function getDeviceList(params, cb) {
  return get({
    url: `${isMock()}/shungkon/device/getDeviceByCondition?deviceType=${params.deviceType}&isValid=${params.isValid}`,
    actionType: GET_DEVICE_LIST,
    successConfig: {
      callback: cb
    },
    failConfig: {
      message: '获取分组列表失败',
      isForceShow: false
    }
  })
}


const deviceList = (previousState = {}, action) => {
  if (action.type === GET_DEVICE_LIST) {
    return action.data
  } else {
    return previousState
  }
}

// 获取设备列表
export function getFuzzyDeviceList(params, cb) {
  return post({
    url: `${isMock()}/shungkon/device/getDeviceLikeCondition?serial=${params.serial}&deviceType=${params.deviceType}&pageNo=${params.pageNo}&pageSize=${params.pageSize}&produceDate=${params.produceDate}`,
    actionType: GET_FUZZY_DEVICE_LIST,
    successConfig: {
      callback: cb
    },
    failConfig: {
      message: '获取模糊分组列表失败',
      isForceShow: false
    }
  })
}


const fuzzyDeviceList = (previousState = {}, action) => {
  if (action.type === GET_FUZZY_DEVICE_LIST) {
    return action.data
  } else {
    return previousState
  }
}

// 获取设备详情
export function getDeviceDetails(params, cb) {
  return get({
    url: `${isMock()}/shungkon/device/getDeviceByDeviceId?deviceId=${params.deviceId}`,
    actionType: GET_DEVICE_DETAIL,
    successConfig: {
      callback: cb
    },
    failConfig: {
      message: '获取设备详情失败',
      isForceShow: false
    }
  })
}


const deviceDetails = (previousState = {}, action) => {
  if (action.type === GET_DEVICE_DETAIL) {
    return action.data
  } else {
    return previousState
  }
}

// // 获取验证码
// export function getSMSMessage(params, cb) {
//   return post({
//     url: `${isMock()}/shungkon/login/smsSendCode`,
//     bodyData: {
//       phoneNumber: params.phoneNumber
//     },
//     actionType: GET_SMS,
//     successConfig: {
//       callback: cb
//     },
//     failConfig: {
//       message: '获取验证码失败',
//       isForceShow: false
//     }
//   })
// }


// const SMSMessage = (previousState = {}, action) => {
//   if (action.type === GET_SMS) {
//     return action.data
//   } else {
//     return previousState
//   }
// }

// 获取视频详情接口
export function downloadWarningVideos(params) {
  return get({
    url: `/shungkon/attach/downloadFirmware?fileLocalPath=d://testPicture`,
    actionType: DOWNLOAD_WARNING_VIDEOS,
    successConfig: {},
    failConfig: {
      message: "下载固件视频失败"
    }
  });
}

// 管理员录入设备
export function addDeviceToSystem(params, cb) {
  return post({
    url: `/shungkon/device/addDevice`,
    actionType: ADD_DEVICE_TO_SYSTEM,
    bodyData: {
      serial: params.serial,
      deviceVerifyCode: params.deviceVerifyCode,
      deviceType: params.deviceType,
      softVersion: params.softVersion,
      productDate: params.productDate,
    },
    successConfig: {
      callback: cb
    },
    failConfig: {
      message: "录入设备失败"
    }
  });
}

// 获取视频详情接口
// 备注：前端一个表单，选择文件，form的enctype为multipart/form-data 报文头不需要设置Content-Type
export function uploadAttach(params) {
  return post({
    url: `/shungkon/attach/upload`,
    bodyData: params.file,
    actionType: UPLOAD_ATTACH,
    contentType: 'multipart/form-data',
    successConfig: {},
    failConfig: {
      message: "固件上传失败"
    }
  });
}


const manager = combineReducers({
  warningVideos,
  warningVideosDetail,
  densityPicture,
  densityPictureData,
  deviceGroup,
  deviceList,
  fuzzyDeviceList,
  deviceDetails
});
export default manager;
