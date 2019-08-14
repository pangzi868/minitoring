import React from 'react'
import './component.scss'
import AuthRouter from 'components/AuthRouter'
import { Route, Switch, withRouter, HashRouter } from 'react-router-dom'
import Loadable from 'components/Loadable'
const ForgetPsw = Loadable(import('./children/ForgetPsw'))
const Register = Loadable(import('./children/Register'))
const Login = Loadable(import('./children/Login'))

class MobileLogin extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  UNSAFE_componentWillMount() {
  }
  render() {
    const { match } = this.props
    return (
      <div className="login-mobile-component">
        <HashRouter>
          <Switch>
            <AuthRouter path={`${match.url}/forgetPsw`} component={ForgetPsw} />
            <AuthRouter path={`${match.url}/register`} component={Register} />
            <AuthRouter path={`${match.url}/`} component={Login} />
          </Switch>
        </HashRouter>
      </div >
    )

  }
}
export default MobileLogin
