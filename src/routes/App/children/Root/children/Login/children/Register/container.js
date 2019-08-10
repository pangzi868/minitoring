import { connect } from 'react-redux'
import Component from './component'
import { getSMSMessage, ValidateCode } from 'store/modules/login'

const mapDispatchToProps = {
  getSMSMessage,
  ValidateCode
}

const mapStateToProps = (state) => ({
  SMSMessage: state.login.SMSMessage,
  Code: state.login.Code
})
export default connect(mapStateToProps, mapDispatchToProps)(Component)
