import React from "react";
import "./component.scss";
import {
  Form,
  Input,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  Tabs
} from 'antd';


import history from 'history.js'

const { Option } = Select;

const { TabPane } = Tabs;
class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      permission: {
        // 短信登录按钮”禁止“判断
        smsLoginSendCode: true,
        smsLoginCode: true,

        //密码登录按钮“禁止”判断
        pswPhoneNum: true,
        pswPassword: true,

      }
    }
    this.hash = ''
    this.tamp = ''

    this.inputPhoneNumHandle = this.inputPhoneNumHandle.bind(this)
    this.inputSMSHandle = this.inputSMSHandle.bind(this)
    this.pswInputAccountHandle = this.pswInputAccountHandle.bind(this)
    this.pswInputPasswordHandle = this.pswInputPasswordHandle.bind(this)
  }

  /**
   * 短信验证
   * 手机号码输入事件
   */
  inputPhoneNumHandle = e => {
    var phoneNum = document.getElementById('login_phone').value
    var temp = this.state.permission
    if (phoneNum.length === 11) {
      temp.smsLoginSendCode = false
      this.setState({
        permission: temp
      })
    } else {
      this.setState({
        permission: temp
      })
    }
  }

  /**
   * 短信验证
   * 验证码输入判断
   */
  inputSMSHandle = e => {
    var SMS = document.getElementById('login_captcha').value
    var temp = this.state.permission
    if (SMS.length >= 4 && SMS.length <= 6) {
      temp.smsLoginCode = false
      this.setState({
        permission: temp
      })
    } else {
      this.setState({
        permission: temp
      })
    }
  }
  /**
   * 账号密码登录
   * 手机号码输入事件
   */
  pswInputAccountHandle = e => {
    var phoneNum = document.getElementById('login_username').value
    var temp = this.state.permission
    if (phoneNum.length === 11) {
      temp.pswPhoneNum = false
      this.setState({
        permission: temp
      })
    } else {
      this.setState({
        permission: temp
      })
    }
  }

  /**
   * 账号密码登录
   * 密码输入事件
   */
  pswInputPasswordHandle = e => {
    var password = document.getElementById('login_password').value
    var temp = this.state.permission
    if (password.length > 0) {
      temp.pswPassword = false
      this.setState({
        permission: temp
      })
    } else {
      this.setState({
        permission: temp
      })
    }
  }


  loginGoToRegister = e => {
    e.preventDefault();
    // 访问父组件的方法，并修改视图层
    this.props.goToRegister && this.props.goToRegister()
  }

  loginGoToModifierBtnHandle = e => {
    e.preventDefault();
    // 访问父组件的方法，并修改视图层
    this.props.modifierBtnHandle && this.props.modifierBtnHandle()
  }

  // 导航栏的点击切换
  tabsCallback = key => {
    console.log(key)
  }

  // 密码登录按钮点击
  pswLoginHandleSubmit = e => {
    e.preventDefault();
    var phoneNum = document.getElementById('login_username').value
    var password = document.getElementById('login_password').value
    var phoneNumberReg = /^[1][34578][0-9]{9}$/

    if (!phoneNumberReg.test(phoneNum)) {
      alert('请输入正确的手机号码')
      return
    }
    this.props.passWordLogin({
      phoneNumber: phoneNum,
      pwd: password
    }, data => {
      // 根据后端返回判断管理员还是非管理员页面
      console.log(history, 'wangyinbin')
      data.isRoot === '0000' ? history.push('/root/main/manager') :
        history.push('/root/main/minitoring')
      data.isRoot === '0000' ? localStorage.setItem('userId', '123456789') :
        localStorage.setItem('userId', data.userId)
    })
    this.props.form.validateFieldsAndScroll((err, values) => {

      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };


  // 短信登录按钮点击
  smsLoginHandleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      var phoneNum = document.getElementById('login_phone').value
      var captcha = document.getElementById('login_captcha').value
      var phoneNumberReg = /^[1][34578][0-9]{9}$/

      if (!phoneNumberReg.test(phoneNum)) {
        alert('请输入正确的手机号码')
        return
      }
      this.props.SMSLogin({
        phoneNumber: phoneNum,
        hash: this.hash,
        tamp: this.tamp,
        msgNum: captcha
      }, data => {
        // 根据后端返回判断管理员还是非管理员页面
        data.isRoot === '0000' ? history.push('/root/main/manager') :
          history.push('/root/main/minitoring')
        data.isRoot === '0000' ? localStorage.setItem('userId', '123456789') :
          localStorage.setItem('userId', data.userId)
      })
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  // 发送验证码
  sendCheckNum = e => {
    e.preventDefault();
    var phoneNum = document.getElementById('login_phone').value
    var phoneNumberReg = /^[1][34578][0-9]{9}$/

    if (!phoneNumberReg.test(phoneNum)) {
      alert('请输入正确的手机号码')
      return
    }
    this.props.getSMSMessage({ phoneNumber: phoneNum }, data => {
      // 保存短信接口给的hash和tamp，用做校验的判断
      this.hash = data.hash
      this.tamp = data.tamp
    })
  }

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };


  render() {
    const { getFieldDecorator } = this.props.form;

    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
      </Select>,
    );

    return (
      < div className="login-div-component" >
        <Tabs defaultActiveKey="1" onChange={this.tabsCallback}>
          <TabPane tab="密码登录" key="1">
            <div className='psw-login-div'>
              <Form onSubmit={this.pswLoginHandleSubmit} className="login-form">
                <Form.Item>
                  {getFieldDecorator('username', {
                    rules: [{ required: true, message: '请输入手机号码或邮箱!' }],
                  })(
                    <Input
                      placeholder="手机号/邮箱"
                      onKeyUp={this.pswInputAccountHandle.bind(this)}
                    />,
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入密码!' }],
                  })(
                    <Input
                      type="password"
                      placeholder="密码"
                      onKeyUp={this.pswInputPasswordHandle.bind(this)}
                    />,
                  )}
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    disabled={this.state.permission.pswPassword || this.state.permission.pswPhoneNum}>
                    登录
                  </Button>
                  {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                  })(<Checkbox>下次自动登录</Checkbox>)}
                  <span className='login-operation'><a className="login-form-forgot" href="#" onClick={this.loginGoToModifierBtnHandle.bind(this)}> 忘记密码 </a> |<a onClick={this.loginGoToRegister.bind(this)}> 注册 </a></span>
                </Form.Item>
              </Form>
            </div>
          </TabPane>
          <TabPane tab="短信登录" key="2">
            <div className='mail-login-div'>
              <Form onSubmit={this.smsLoginHandleSubmit} className="login-form">
                <Form.Item label="">
                  {getFieldDecorator('phone', {
                    rules: [{ required: true, message: '请输入你的手机号' }],
                  })(<Input
                    addonBefore={prefixSelector}
                    style={{ width: '100%' }}
                    placeholder="手机号"
                    onKeyUp={this.inputPhoneNumHandle.bind(this)}
                    autocomplete="off" />)}
                </Form.Item>

                <Form.Item label="">
                  <Row gutter={8}>
                    <Col span={12}>
                      {getFieldDecorator('captcha', {
                        rules: [{ required: true, message: '请输入验证码' }],
                      })(<Input
                        placeholder="验证码"
                        onKeyUp={this.inputSMSHandle.bind(this)} />)}
                    </Col>
                    <Col span={12}>
                      <Button disabled={this.state.permission.smsLoginSendCode} onClick={this.sendCheckNum}>发送验证码</Button>
                    </Col>
                  </Row>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    disabled={this.state.permission.smsLoginSendCode || this.state.permission.smsLoginCode}>
                    登录
                  </Button>
                  {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                  })(<Checkbox>下次自动登录</Checkbox>)}
                  <span className='login-operation'><a className="login-form-forgot" href="#" onClick={this.loginGoToModifierBtnHandle.bind(this)}> 忘记密码 </a> |<a onClick={this.loginGoToRegister.bind(this)}> 注册 </a></span>
                </Form.Item>
              </Form>
            </div>
          </TabPane>
        </Tabs>
      </div >
    )
  }
}

const WrappedRegistrationForm = Form.create({ name: 'login' })(Login);

export default WrappedRegistrationForm


