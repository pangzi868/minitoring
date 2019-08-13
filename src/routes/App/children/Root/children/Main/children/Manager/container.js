import { connect } from 'react-redux'
import Component from './component'
import {
  getWarningVideos,
  getWarningVideosDetail,
  getDensityPicture,
  getDensityPictureData,
  downloadWarningVideos,
  uploadAttach
} from 'store/modules/manager'

const mapDispatchToProps = {
  getWarningVideos,
  getWarningVideosDetail,
  getDensityPicture,
  getDensityPictureData,
  downloadWarningVideos,
  uploadAttach
}

const mapStateToProps = (state) => ({
  warningVideos: state.manager.warningVideos,
  warningVideosDetail: state.manager.warningVideosDetail,
  densityPicture: state.manager.densityPicture,
  densityPictureData: state.manager.densityPictureData,
})
export default connect(mapStateToProps, mapDispatchToProps)(Component)
