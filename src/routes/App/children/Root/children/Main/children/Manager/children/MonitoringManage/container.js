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
  addDeviceToSystem
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
  addDeviceToSystem
}

const mapStateToProps = (state) => ({
  warningVideos: state.manager.warningVideos,
  warningVideosDetail: state.manager.warningVideosDetail,
  densityPicture: state.manager.densityPicture,
  densityPictureData: state.manager.densityPictureData,
  deviceList: state.manager.deviceList,
  fuzzyDeviceList : state.manager.fuzzyDeviceList
})
export default connect(mapStateToProps, mapDispatchToProps)(Component)
