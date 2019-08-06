import { connect } from 'react-redux'
import Component from './component.js'
import { login, setUserInfo } from 'store/modules/user'

const mapDispatchToProps = {
  login,
  setUserInfo
}

const mapStateToProps = (state) => ({
  // loginAllResourceInfo: state.account.loginAllResourceInfo,
  // loginResourceInfo: state.account.loginResourceInfo,
  // userPermission: state.account.userPermission
})

export default connect(mapStateToProps, mapDispatchToProps)(Component)
