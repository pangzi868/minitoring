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
  deleteDeviceByRelation,
  addDevGroup
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
  deleteDeviceByRelation,
  addDevGroup
}

const mapStateToProps = (state) => ({
  warningVideos: state.manager.warningVideos,
  warningVideosDetail: state.manager.warningVideosDetail,
  densityPicture: state.manager.densityPicture,
  densityPictureData: state.manager.densityPictureData,
  deviceList: state.manager.deviceList,
  fuzzyDeviceList: state.manager.fuzzyDeviceList,
  deviceDetails: state.manager.deviceDetails,
  deviceGroup: state.manager.deviceGroup
})
export default connect(mapStateToProps, mapDispatchToProps)(Component)
