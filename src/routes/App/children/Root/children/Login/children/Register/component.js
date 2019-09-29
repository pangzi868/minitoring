import React from "react";
import "./component.scss";

// 滑块组件 暂时屏蔽
// import SlideCaptcha from 'react-slide-captcha';
// import 'react-slide-captcha/dist/styles.css';

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

const { Option } = Select;

const { TabPane } = Tabs;

let maxTime = 60

class Register extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      btnText: '发送验证码',
      registerSendSMSBtn: true,
      registerPermission: true,
    }

    this.timer = null
    this.CheckboxHandle = this.CheckboxHandle.bind(this)

  }

  // 同意checkbox事件
  CheckboxHandle = e => {
    this.setState({
      registerPermission: !this.state.registerPermission
    })
  }

  // 手机号码输入事件
  inputPhoneNumHandle = e => {
    var phoneNum = document.getElementById('register_phone').value
    if (phoneNum.length === 11) {
      this.setState({
        registerSendSMSBtn: false
      })
    } else {
      this.setState({
        registerSendSMSBtn: true
      })
    }
  }

  // 用户名输入事件
  inputUserNameHandle = e => {

  }

  // 发送验证码
  sendCheckNum = e => {
    e.preventDefault();
    var phoneNum = document.getElementById('register_phone').value
    var phoneNumberReg = /^[1][0-9]{10}$/
    // var forbiddenPhone = /^(166|188)/
        // if (forbiddenPhone.test(phoneNum)) {
        //   alert('请输入正确的手机号码')
        //   return
        // }
    if (!phoneNumberReg.test(phoneNum)) {
      alert('请输入正确的手机号码')
      return
    }
    this.timer = setInterval(() => {
      if (maxTime > 0) {
        --maxTime
        this.setState({
          btnText: '重新获取 ' + maxTime + 's',
          registerSendSMSBtn: true
        })
      } else {
        window.clearInterval(this.timer)
        maxTime = 60
        this.setState({
          btnText: '发送验证码',
          registerSendSMSBtn: false
        })
      }
    }, 1000)
    this.props.getSMSMessage({ phoneNumber: phoneNum }, data => {
      // 保存短信接口给的hash和tamp，用做校验的判断
      this.hash = data.hash
      this.tamp = data.tamp
    })
  }

  // 注册按钮点击
  registerHandleSubmit = e => {
    e.preventDefault();
    // this.props.ValidateCode({ msgNum: 'msgNum', hash: this.hash, tamp: this.tamp })
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        var msgNum = document.getElementById('register_captcha').value
        var phoneNumber = document.getElementById('register_phone').value
        var userName = document.getElementById('register_username').value
        var password = document.getElementById('register_password').value
        var passwordReg = /(?!^\d+$)(?!^[A-Za-z]+$)(?!^[^A-Za-z0-9]+$)(?!^.*[\u4E00-\u9FA5].*$)^\S{8,20}$/
        var phoneNumberReg = /^[1][0-9]{10}$/
       // var forbiddenPhone = /^(166|188)/
        // if (forbiddenPhone.test(phoneNum)) {
        //   alert('请输入正确的手机号码')
        //   return
        // }
        if (!phoneNumberReg.test(phoneNumber)) {
          alert('请输入正确的手机号码！')
          return
        }

        if (userName === '') {
          alert('请输入用户名！')
          return
        }

        if (!passwordReg.test(password)) {
          alert('请输入8-20位密码，字母/数字/符号至少2种！')
          return
        }

        this.props.phoneNumRegister({
          tamp: this.tamp,
          hash: this.hash,
          msgNum: msgNum,
          userName: userName,
          phoneNumber: phoneNumber,
          password: password
        }, data => {
          alert('注册账号成功！')
          this.props.goToLogin && this.props.goToLogin()
        })
      }
    });
  };


  // 滑块向右滑动事件
  resultCallback = e => {
  }

  // 登录跳转链接
  registerGoToLogin = e => {
    e.preventDefault();
    // 访问父组件的方法，改变视图层显示
    this.props.goToLogin && this.props.goToLogin()
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

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
      </Select>,
    );

    return (
      < div className="register-div-component" >
        {/** 注册账号表单 */}
        <Form {...formItemLayout} onSubmit={this.registerHandleSubmit} autoComplete="off">
          <Form.Item label="">
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: '请输入你的手机号' }],
            })(<Input
              addonBefore={prefixSelector}
              style={{ width: '100%' }}
              placeholder="手机号"
              onKeyUp={this.inputPhoneNumHandle.bind(this)} autoComplete="off" />)}
          </Form.Item>

          <Form.Item label="">
            <Row gutter={8}>
              <Col span={12}>
                {getFieldDecorator('captcha', {
                  rules: [{ required: true, message: '请输入验证码' }],
                })(<Input placeholder="验证码" autoComplete="off" />)}
              </Col>
              <Col span={12}>
                <Button disabled={this.state.registerSendSMSBtn} onClick={this.sendCheckNum}>{this.state.btnText}</Button>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item label="">
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入用户名' }],
            })(<Input
              style={{ width: '100%' }}
              placeholder="用户名"
              onKeyUp={this.inputUserNameHandle.bind(this)} autoComplete="off" />)}
          </Form.Item>

          <Form.Item label="" hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '密码长度8-20位',
                },
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(<Input.Password placeholder="8-20位密码，字母/数字/符号至少2种" autoComplete="off" />)}
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            {getFieldDecorator('agreement', {
              valuePropName: 'checked',
            })(
              <Checkbox onChange={this.CheckboxHandle.bind(this)}>
                我已阅读并接受<a href=""> 用户协议 </a>和<a href=""> 隐私政策 </a>
              </Checkbox>,
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" disabled={this.state.registerPermission}>
              注册
                </Button>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            已有账号？进行<a className='goto-login-button' onClick={this.registerGoToLogin.bind(this)}>登录</a>
          </Form.Item>
        </Form>
      </div >
    )
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(Register);

export default WrappedRegistrationForm


