import React from 'react'
import './component.scss'
import { Switch, withRouter, HashRouter } from 'react-router-dom'
import AuthRouter from 'components/AuthRouter'
import Loadable from 'components/Loadable'

const WarningList = Loadable(import('./children/WarningList'))
const WarningDetail = Loadable(import('./children/WarningDetail'))

class Alarm extends React.Component {
  render() {
    const { match } = this.props
    return (
      <div className="alarm-component">
        <div className='alarm-component-router'>
          <HashRouter>
            <Switch>
              <AuthRouter
                path={`${match.url}/detail`}
                component={WarningDetail}
                permissionPath={[]}
              />
              <AuthRouter
                path={`${match.url}/`}
                component={WarningList}
                permissionPath={[]}
              />
            </Switch>
          </HashRouter>
        </div>
      </div>
    )
  }
}
export default Alarm
