import { connect } from 'react-redux'
import Component from './component.js'
import { getAssetInfo } from 'store/modules/home/index'

const mapDispatchToProps = {
  getAssetInfo
}

const mapStateToProps = (state) => ({
  assetInfo: state.home.assetInfo

})

export default connect(mapStateToProps, mapDispatchToProps)(Component)
