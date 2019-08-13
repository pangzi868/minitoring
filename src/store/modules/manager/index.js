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


// 获取验证码
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
  deviceGroup
});
export default manager;
