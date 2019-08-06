import { connect } from 'react-redux'

import Component from './component'
import { setReduxStore } from 'store/modules/global'
import { login, setUserInfo } from 'store/modules/user'

const mapDispatchToProps = {
  setReduxStore,
  login,
  setUserInfo
}

const mapStateToProps = (state) => ({
})
export default connect(mapStateToProps, mapDispatchToProps)(Component)
