import { connect } from 'react-redux'
import Component from './component'
import { getSMSMessage, ValidateCode, phoneNumRegister } from 'store/modules/login'

const mapDispatchToProps = {
  getSMSMessage,
  ValidateCode,
  phoneNumRegister
}

const mapStateToProps = (state) => ({
  SMSMessage: state.login.SMSMessage,
  Code: state.login.Code
})
export default connect(mapStateToProps, mapDispatchToProps)(Component)
