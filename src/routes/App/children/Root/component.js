import React from 'react'
import PropTypes from 'prop-types'
import './component.scss'
import AuthRouter from 'components/AuthRouter'
import { Switch, withRouter, HashRouter } from 'react-router-dom'
import Loading from "components/hz/Loading"
import Loadable from 'components/Loadable'

const Login = Loadable(import('./children/Login'))
const Main = Loadable(import('./children/Main'))
const MobileLogin = Loadable(import('./children/MobileLogin'))
const MobileMain = Loadable(import('./children/MobileMain'))

class Root extends React.Component {
  // 声明需要使用的Context属性
  static contextTypes = {
    reduxStore: PropTypes.object,
  }

  UNSAFE_componentWillMount() { }

  render() {
    const { match } = this.props
    return (
      <div className="root-component">
        {/*
          todo 切换路由的时候会初始化header，导致权限接口重复调用
        */}
        <Loading />
        <div className="root-component-router">
          <HashRouter>
            <Switch>
              <AuthRouter path={`${match.url}/login`} component={/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) ? MobileLogin : Login} />
              <AuthRouter path={`${match.url}/main`} component={/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) ? MobileMain : Main} />
              <AuthRouter path={'/'} component={/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) ? MobileLogin : Login} />
            </Switch>
          </HashRouter>
        </div>
      </div>
    )
  }
}

Root.propTypes = {
  children: PropTypes.node,
}

export default Root
