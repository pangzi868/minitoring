import { connect } from 'react-redux'
import Component from './component'
import {
  getWarningVideos,
  getWarningVideosDetail,
  getDensityPicture,
  getDensityPictureData,
  downloadWarningVideos,
  uploadAttach,
  getDeviceList,
  getFuzzyDeviceList,
  addDeviceToSystem,
  getDeviceDetails,
  getDeviceGroup,
  addGroup,
  editGroupName,
  deleteGroupName,
  editEquipmentName,
  moveEquipmentName,
  deleteDeviceByRelation,
  addDevGroup,
  getLogList,
  getUserList
} from 'store/modules/manager'

const mapDispatchToProps = {
  getWarningVideos,
  getWarningVideosDetail,
  getDensityPicture,
  getDensityPictureData,
  downloadWarningVideos,
  uploadAttach,
  getDeviceList,
  getFuzzyDeviceList,
  addDeviceToSystem,
  getDeviceDetails,
  getDeviceGroup,
  addGroup,
  editGroupName,
  deleteGroupName,
  editEquipmentName,
  moveEquipmentName,
  deleteDeviceByRelation,
  addDevGroup,
  getLogList,
  getUserList
}

const mapStateToProps = (state) => ({
  warningVideos: state.manager.warningVideos,
  warningVideosDetail: state.manager.warningVideosDetail,
  densityPicture: state.manager.densityPicture,
  densityPictureData: state.manager.densityPictureData,
  deviceList: state.manager.deviceList,
  fuzzyDeviceList: state.manager.fuzzyDeviceList,
  deviceDetails: state.manager.deviceDetails,
  deviceGroup: state.manager.deviceGroup,
  logList: state.manager.logList,
  userList: state.manager.userList,

})
export default connect(mapStateToProps, mapDispatchToProps)(Component)
