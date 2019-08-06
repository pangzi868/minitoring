import React from 'react'
import './component.scss'
import { Switch, withRouter, HashRouter } from 'react-router-dom'
import AuthRouter from 'components/AuthRouter'
import Loadable from 'components/Loadable'

const Home = Loadable(import('./children/Home'))
const Minitoring = Loadable(import('./children/Minitoring'))

class Main extends React.Component {
  render() {
    const { match } = this.props
    return (
      <div className="main-component">
        <div className='main-component-router'>
          <HashRouter>
            <Switch>
              <AuthRouter
                path={`${match.url}/home`}
                component={Home}
                permissionPath={[]}
              />
              <AuthRouter
                path={`${match.url}/minitoring`}
                component={Minitoring}
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
