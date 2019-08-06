import React from 'react'
import './component.scss'
import axios from 'axios'
import { ActivityIndicator } from 'antd-mobile'

export default class Loading extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isShow: false,
    }
  }

  show() {
    this.setState({
      isShow: true,
    })
  }
  hide() {
    this.setState({
      isShow: false,
    })
  }

  componentWillMount() {
    const that = this
    axios.interceptors.request.use(function (config) {
      that.show()
      return config
    })
    axios.interceptors.response.use(function (response) {
      that.hide()
      return response
    }, function (error) {
      // 两类错误，一类错误是
      that.hide()
      // error包含3个字段，分别为config、request和reponse，仅response有用
      return Promise.reject(error);
    })
  }

  render() {
    return (
      <div className={`loadding-component ${this.state.isShow ? '' : 'hide'}`}>
        <ActivityIndicator className="loading" text="Loading..." />
      </div>
    )
  }
}
