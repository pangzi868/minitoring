import React from 'react'

import styles from './component.module.scss'
import {withRouter} from "react-router"
class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isHome: false,
      navList: [],
      isClicked: false,
    }
  }
  clickFadeHandler(e) {
    e.nativeEvent.stopImmediatePropagation();
    this.newOperationHandler()
  }
  newOperationHandler() {
    this.setState({
      isClicked: !this.state.isClicked,
    })
  }

  componentWillMount() {
    this.props.getLoginUserInfo()
  }

  UNSAFE_componentWillReceiveProps({ userPermission }) {
  }

  render() {
    return (
      <div className={styles['header-component']}>
      </div>
    )
  }
}

export default withRouter(Header)
