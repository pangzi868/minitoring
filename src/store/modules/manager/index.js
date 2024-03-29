import { get, post, put } from "utils/dataAccess/axios";
import { combineReducers } from "redux";
import { mockClosure } from 'utils/mock'

const WARNING_VIDEOS = 'WARNING_VIDEOS'
const WARNING_VIDEOS_DETAIL = 'WARNING_VIDEOS_DETAIL'
const DOWNLOAD_WARNING_VIDEOS = 'DOWNLOAD_WARNING_VIDEOS'
const DENSITY_PICTURE = 'DENSITY_PICTURE'
const DENSITY_PICTURE_DATA = 'DENSITY_PICTURE_DATA'
const GET_LOG_LIST = 'GET_LOG_LIST'
const GET_ROOT_DEVICE_GROUP = 'GET_ROOT_DEVICE_GROUP'
const UPLOAD_ATTACH = 'UPLOAD_ATTACH'
const ADD_DEVICE = 'ADD_DEVICE'
const ADD_GROUP = 'ADD_GROUP'
const ADD_ROOT_GROUP = 'ADD_ROOT_GROUP'
const DELETE_GROUP_DEVICE = 'DELETE_GROUP_DEVICE'
const GET_DEVICE_GROUP = 'GET_DEVICE_GROUP'
const EDIT_GROUP_NAME = 'EDIT_GROUP_NAME'
const EDIT_ROOT_GROUP = 'EDIT_ROOT_GROUP'
const DELETE_GROUP_NAME = 'DELETE_GROUP_NAME'
const DELETE_ROOT_GROUP_NAME = 'DELETE_ROOT_GROUP_NAME'
const EDIT_EQUIPMENT_NAME = 'EDIT_EQUIPMENT_NAME'
const MODIFY_DEVICE_NAME = 'MODIFY_DEVICE_NAME'
const MOVE_EQUIPMENT_NAME = 'MOVE_EQUIPMENT_NAME'
const MOVE_ROOT_EQUIPMENT_NAME = 'MOVE_ROOT_EQUIPMENT_NAME'
const DELETE_EQUIPMENT_NAME = 'DELETE_EQUIPMENT_NAME'
const ADD_DEV_GROUP = 'ADD_DEV_GROUP'
const GET_FUZZY_DEVICE_LIST = 'GET_FUZZY_DEVICE_LIST'
const GET_DEVICE_LIST = 'GET_DEVICE_LIST'
const ADD_DEVICE_TO_SYSTEM = 'ADD_DEVICE_TO_SYSTEM'
const GET_DEVICE_DETAIL = 'GET_DEVICE_DETAIL'
const GET_USER_LIST = 'GET_USER_LIST'
const CHECK_SECOND_PSW = 'CHECK_SECOND_PSW'
const ADD_USER_DEVICE = 'ADD_USER_DEVICE'
const DEL_USER_DEVICE = 'DEL_USER_DEVICE'

const IS_MOCK_CURRENT_MODULE = false  // 控制当前模块的所有接口是否使用mock
const isMock = mockClosure(IS_MOCK_CURRENT_MODULE)

// 获取视频列表接口
export function getWarningVideos(params, cb) {
  return get({
    url: `/shungkon/video/getWarningInfoList?serial=${params.serial}&pageSize=999`,
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
    url: `/shungkon/picture/getDensityPicture?serial=${params.serial}&pageSize=999`,
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

// 密度分析图片详情接口
export function getLogList(params, cb) {
  return post({
    url: `/shungkon/logList`,
    bodyData: {
      serial: params.serial,
      startTime: params.startTime,
      endTime: params.endTime,
      pageNo: params.pageNo,
      pageSize: params.pageSize
    },
    actionType: GET_LOG_LIST,
    successConfig: {
      callback: cb
    },
    failConfig: {
      message: "获取日志列表失败",
    }
  });
}

const logList = (previousState = {}, action) => {
  if (action.type === GET_LOG_LIST) {
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

// 管理员登录设备管理二级密码
export function checkSecondPsw(params, cb) {
  return post({
    url: `/shungkon/rootInfo/validateSecPsw?isRoot=${params.isRoot}&rootPhone=${params.rootPhone}&secondPsw=${params.password}`,
    actionType: CHECK_SECOND_PSW,
    successConfig: {
      callback: cb
    },
    failConfig: {
      message: "管理员登录设备管理失败"
    }
  });
}


// 添加分组
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
    }
  })
}

// 添加分组
export function addGroup(params, cb) {
  return post({
    url: `${isMock()}/shungkon/device/addGroup?deviceGroupName=${params.groupName}&userId=${params.userId}`,
    actionType: ADD_GROUP,
    successConfig: {
      callback: cb
    },
    failConfig: {
      message: '添加分组失败'
    }
  })
}

// 添加管理员分组
export function addRootGroup(params, cb) {
  return post({
    url: `${isMock()}/shungkon/rootInfo/addRootGroup?rootDeviceGroupName=${params.groupName}`,
    actionType: ADD_ROOT_GROUP,
    successConfig: {
      callback: cb
    },
    failConfig: {
      message: '添加分组失败',
    }
  })
}


// 获取分组列表
export function getDeviceGroup(params, cb) {
  return get({
    url: `${isMock()}/shungkon/device/getDeviceByUserId?userId=${params.userId}`,
    actionType: GET_DEVICE_GROUP,
    successConfig: {
      callback: cb
    },
    failConfig: {
      message: '获取分组列表失败',
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

// 获取root用户的
export function getRootDeviceGroup(params, cb) {
  return get({
    url: `${isMock()}/shungkon/device/getRootAllDevices?isRoot=true`,
    actionType: GET_ROOT_DEVICE_GROUP,
    successConfig: {
      callback: cb
    },
    failConfig: {
      message: '获取管理员分组列表失败',
    }
  })
}


const rootDeviceGroup = (previousState = {}, action) => {
  if (action.type === GET_ROOT_DEVICE_GROUP) {
    return action.data
  } else {
    return previousState
  }
}

// 修改分组名称
export function editGroupName(params, cb) {
  return post({
    url: `${isMock()}/shungkon/device/modifyDeviceGroupName`,
    bodyData: {
      deviceGroupId: params.groupId,
      deviceGroupName: params.groupName,
    },
    actionType: EDIT_GROUP_NAME,
    successConfig: {
      callback: cb
    },
    failConfig: {
      message: '修改分组名称失败',
    }
  })
}

// 删除分组名称
export function deleteGroupName(params, cb) {
  return post({
    url: `${isMock()}/shungkon/device/deleteDeviceGroup?groupId=${params.groupId}`,
    actionType: DELETE_GROUP_NAME,
    successConfig: {
      callback: cb
    },
    failConfig: {
      message: '删除分组失败',
    }
  })
}

// 删除管理员分组
export function deletRootGroupName(params, cb) {
  return post({
    url: `${isMock()}/shungkon/rootInfo/deleteRootGroup`,
    bodyData: {
      rootDeviceGroupId: params.groupId
    },
    actionType: DELETE_ROOT_GROUP_NAME,
    successConfig: {
      callback: cb
    },
    failConfig: {
      message: '删除分组失败',
    }
  })
}

// 删除管理员设备
export function deleteGroupDevice(params, cb) {
  return post({
    url: `${isMock()}/shungkon/device/deleteDevice`,
    bodyData: {
      deviceId: params.deviceId,
      // rootDeviceGroupId: params.groupId
    },
    actionType: DELETE_GROUP_DEVICE,
    successConfig: {
      callback: cb
    },
    failConfig: {
      message: '删除设备失败',
    }
  })
}

// 修改分组名称
export function editRootGroup(params, cb) {
  return post({
    url: `${isMock()}/shungkon/rootInfo/modifyRootDeviceGroupName?rootDeviceGroupId=${params.groupId}&newDeviceGroupName=${params.groupName}&oldDeviceGroupName=${params.oldGroupName}`,
    actionType: EDIT_ROOT_GROUP,
    successConfig: {
      callback: cb
    },
    failConfig: {
      message: '修改分组名称失败',
    }
  })
}

// 修改分组名称
export function editEquipmentName(params, cb) {
  return post({
    url: `${isMock()}/shungkon/device/updateDevice`,
    bodyData: {
      deviceId: params.deviceId,
      deviceName: params.deviceName,
    },
    actionType: EDIT_EQUIPMENT_NAME,
    successConfig: {
      callback: cb
    },
    failConfig: {
      message: '修改设备名称失败',
    }
  })
}

// 修改设备名称
export function modifyDeviceName(params, cb) {
  return post({
    url: `${isMock()}/shungkon/device/modifyDeviceName`,
    bodyData: {
      deviceId: params.deviceId,
      deviceName: params.deviceName,
    },
    actionType: MODIFY_DEVICE_NAME,
    successConfig: {
      callback: cb
    },
    failConfig: {
      message: '修改设备名称失败',
    }
  })
}


// 移动设备
export function moveEquipmentName(params, cb) {
  return post({
    url: `${isMock()}/shungkon/device/moveDeviceGroup`,
    bodyData: {
      deviceId: params.deviceId,
      groupId: params.groupId,
      newGroupId: params.newGroupId,
    },
    actionType: MOVE_EQUIPMENT_NAME,
    successConfig: {
      callback: cb
    },
    failConfig: {
      message: '修改设备分组失败',
    }
  })
}

// 移动管理员设备
export function moveRootEquipmentName(params, cb) {
  return post({
    url: `${isMock()}/shungkon/rootInfo/moveRootGroup?deviceId=${params.deviceId}&oldGroupId=${params.groupId}&newGroupId=${params.newGroupId}`,
    actionType: MOVE_ROOT_EQUIPMENT_NAME,
    successConfig: {
      callback: cb
    },
    failConfig: {
      message: '修改设备分组失败',
    }
  })
}


// 删除分组中的设备
export function deleteDeviceByRelation(params, cb) {
  return post({
    url: `${isMock()}/shungkon/device/deleteDeviceGroupRelate`,
    bodyData: {
      deviceId: params.deviceId,
      groupId: params.groupId
    },
    actionType: DELETE_EQUIPMENT_NAME,
    successConfig: {
      callback: cb
    },
    failConfig: {
      message: '删除设备失败',
    }
  })
}

// 往分组中添加设备
export function addDevGroup(params, cb) {
  return post({
    url: `${isMock()}/shungkon/device/addDevGroup?serial=${params.serial}&deviceVerifyCode=${params.deviceVerifyCode}&groupId=${params.groupId}`,
    actionType: ADD_DEV_GROUP,
    successConfig: {
      callback: cb
    },
    failConfig: {
      message: '添加设备分组失败',
    }
  })
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
    url: `${isMock()}/shungkon/device/getDeviceLikeCondition?serial=${params.serial}&deviceType=${params.deviceType}&pageNo=${params.pageNo}&pageSize=${params.pageSize}&productDate=${params.productDate}`,
    actionType: GET_FUZZY_DEVICE_LIST,
    successConfig: {
      callback: cb
    },
    failConfig: {
      message: '获取模糊分组列表失败',
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

// 获取用户列表
export function getUserList(params, cb) {
  return post({
    url: `${isMock()}/shungkon/getUserInfo?pageNo=${params.pageNo}&pageSize=${params.pageSize}`,
    bodyData: {
      phoneNumber: params.phoneNumber
    },
    actionType: GET_USER_LIST,
    successConfig: {
      callback: cb
    },
    failConfig: {
      message: '获取用户列表失败',
    }
  })
}


const userList = (previousState = {}, action) => {
  if (action.type === GET_USER_LIST) {
    return action.data
  } else {
    return previousState
  }
}

// 添加用户设备
export function addUserDevice(params, cb) {
  return post({
    url: `${isMock()}/shungkon/addUserDevice`,
    bodyData: {
      phoneNumber: params.phoneNumber,
      serial: params.serial,
      deviceVerifyCode: params.deviceVertifyCode
    },
    actionType: ADD_USER_DEVICE,
    successConfig: {
      callback: cb
    },
    failConfig: {
      message: '添加用户设备失败',
    }
  })
}

// 删除用户设备
export function deleteUserDevice(params, cb) {
  return post({
    url: `${isMock()}/shungkon/delUserInfo`,
    bodyData: {
      userId: params.userId,
      deviceId: params.deviceId
    },
    actionType: DEL_USER_DEVICE,
    successConfig: {
      callback: cb
    },
    failConfig: {
      message: '删除用户设备失败',
    }
  })
}

// // 获取用户详情
// export function getDeviceDetails(params, cb) {
//   return get({
//     url: `${isMock()}/shungkon/device/getDeviceByDeviceId?deviceId=${params.deviceId}`,
//     actionType: GET_DEVICE_DETAIL,
//     successConfig: {
//       callback: cb
//     },
//     failConfig: {
//       message: '获取设备详情失败',
//     }
//   })
// }


// const deviceDetails = (previousState = {}, action) => {
//   if (action.type === GET_DEVICE_DETAIL) {
//     return action.data
//   } else {
//     return previousState
//   }
// }

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
    url: `${isMock()}/shungkon/attach/downloadFirmware?fileLocalPath=d://testPicture`,
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
    url: `${isMock()}/shungkon/device/addDevice`,
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
    url: `${isMock()}/shungkon/attach/upload`,
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
  deviceDetails,
  logList,
  userList,
  rootDeviceGroup
});
export default manager;
