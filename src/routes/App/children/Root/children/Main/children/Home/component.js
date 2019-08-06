import React from 'react'
import './component.scss'
import Header from 'components/Header'
import { Link } from 'react-router-dom'
import Navbar from 'components/Navbar'
import BankLogo from './images/bank@2x.png'
import { cacheAuth, auth } from 'utils/auth'
import { Route, Switch, withRouter, HashRouter } from 'react-router-dom'

class Home extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    }

    this.goSearchPageHandler = this.goSearchPageHandler.bind(this)
  }
  goSearchPageHandler() {
    console.log('这里跳转到搜索页', this.props)
    // this.props.history.push('/root/main/search')
    console.log(this.props.history)
  }
  componentWillMount() {

  }
  render() {
    const { match } = this.props
    return (
      <div className="home-component">
        <Header />
        <div className="space-board" />
        <div className="search-board">
          <i className="search-icon iconfont icon-sousuo" />
          <input
            className="search-input"
            placeholder="请输入客户名称、客户卡号、证件号码关键字"
            readOnly="readOnly"
            onClick={this.goSearchPageHandler}
          />
        </div>
        <Navbar activeIndex={0} />
      </div>
    )
  }
}
export default Home
