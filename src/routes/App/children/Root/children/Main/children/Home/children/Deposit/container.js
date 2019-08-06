import { connect } from 'react-redux'
import Component from './component.js'
import { getDpsitInfo } from 'store/modules/home/index'

const mapDispatchToProps = {
  getDpsitInfo
}

const mapStateToProps = (state) => ({
  dpsitInfo: state.home.dpsitInfo

})

export default connect(mapStateToProps, mapDispatchToProps)(Component)
