import React from 'react'
import './component.scss'
import { Switch, withRouter, HashRouter } from 'react-router-dom'
import AuthRouter from 'components/AuthRouter'
import Loadable from 'components/Loadable'

const Minitoring = Loadable(import('./children/Minitoring'))
const RealtimeVideos = Loadable(import('./children/Minitoring/children/RealtimeVideos'))
const Warning = Loadable(import('./children/Minitoring/children/Warning'))
const Density = Loadable(import('./children/Minitoring/children/Density'))
const Manager = Loadable(import('./children/Manager'))

class Main extends React.Component {
  render() {
    const { match } = this.props
    return (
      <div className="main-component">
        <div className='main-component-router'>
          <HashRouter>
            <Switch>
              <AuthRouter
                path={`${match.url}/minitoring`}
                component={Minitoring}
                permissionPath={[]}
              />
              <AuthRouter
                path={`${match.url}/videos`}
                component={RealtimeVideos}
                permissionPath={[]}
              />
              <AuthRouter
                path={`${match.url}/warning`}
                component={Warning}
                permissionPath={[]}
              />
              <AuthRouter
                path={`${match.url}/density`}
                component={Density}
                permissionPath={[]}
              />
              <AuthRouter
                path={`${match.url}/manager`}
                component={Manager}
                permissionPath={[]}
              />
            </Switch>
          </HashRouter>
        </div>
      </div>
    )
  }
}
export default Main
