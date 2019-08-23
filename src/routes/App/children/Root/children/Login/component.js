import React from 'react'
import './component.scss'
import 'antd/dist/antd.css';
import Register from './children/Register'
import Login from './children/Login'
import ForgetPsw from './children/ForgetPsw'

import {
  Form
} from 'antd';


class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      isRegisterShow: false,
      isLoginShow: true,
      isModifierShow: false,
      isModifierComfirmShow: false,

      // 注册发送按钮
      registerSendSMSBtn: true
    }
    this.hash = ''
    this.tamp = ''
  }

  // 注册页面跳转登录页面
  goToLogin = e => {
    this.setState({
      isRegisterShow: false,
      isLoginShow: true,
    })
  }

  // 登录页面跳转注册页面
  goToRegister = e => {
    this.setState({
      isRegisterShow: true,
      isLoginShow: false
    })
  }

  // 忘记密码按钮
  modifierBtnHandle = e => {
    this.setState({
      sRegisterShow: false,
      isLoginShow: false,
      isModifierShow: true
    })
  }

  // 导航栏的点击切换
  tabsCallback = key => {
  }

  // 找回密码页面点击确定后跳转登录页面
  modifierHandleSubmit = e => {
    this.setState({
      isModifierShow: false,
      isLoginShow: true,
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isLoginShow, isRegisterShow, isModifierShow } = this.state

    return (
      <div className='login-component'>
        <div className={`register-div ${isRegisterShow ? '' : 'hide'}`}>
          <div className='register-div-top'>注册账号</div>
          <div className='register-div-content'>
            <Register goToLogin={this.goToLogin.bind(this)} />
          </div>
        </div>

        { /** 密码登录/短信登录表单 */}
        <div className={`login-div ${isLoginShow ? '' : 'hide'}`}>
          <Login
            goToRegister={this.goToRegister.bind(this)}
            modifierBtnHandle={this.modifierBtnHandle.bind(this)} />
        </div>

        { /** 密码登录/短信修改表单 */}
        <div className={`modifier-div ${isModifierShow ? '' : 'hide'}`}>
          <div className={`modifier-psw-content`}>
            <div className='modifier-div-top'>找回密码</div>
            <div className='modifier-div-content'>
              <ForgetPsw
                modifierHandleSubmit={this.modifierHandleSubmit.bind(this)}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(LoginForm);

export default WrappedRegistrationForm
