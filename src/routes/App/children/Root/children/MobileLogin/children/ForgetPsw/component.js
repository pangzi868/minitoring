import React from "react";
import "./component.scss";

import LeftIcon from './images/1.4.png'
import {
  Form,
  Input,
  Select,
  Row,
  Col,
  Button,
} from 'antd';
import { Toast } from 'antd-mobile'
import history from 'history.js'

const { Option } = Select;
let maxTime = 60

class ForgetPsw extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      btnText: '获取验证码',
      permission: {
        pswPhoneNum: true
      }
    }

    this.timer = null
    this.hash = null
    this.tamp = null
    this.inputPhoneNumHandle = this.inputPhoneNumHandle.bind(this)
  }



  // 手机号码输入事件
  inputPhoneNumHandle = e => {
    var phoneNum = document.getElementById('forgetPsw_phone').value

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

  // 找回密码下一步按钮点击
  modifierHandleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        var phoneNum = document.getElementById('forgetPsw_phone').value
        var code = document.getElementById('forgetPsw_captcha').value
        var password = document.getElementById('forgetPsw_password').value
        var passwordAgain = document.getElementById('forgetPsw_password-confirm').value

        var phoneNumberReg = /^[1][0-9]{10}$/

        var passwordReg = /(?!^\d+$)(?!^[A-Za-z]+$)(?!^[^A-Za-z0-9]+$)(?!^.*[\u4E00-\u9FA5].*$)^\S{8,20}$/
        // var forbiddenPhone = /^(166|188)/
        // if (forbiddenPhone.test(phoneNum)) {
        //   alert('请输入正确的手机号码')
        //   return
        // }

        if (!phoneNumberReg.test(phoneNum)) {
          Toast.fail('请输入正确的手机号码', 1)
          return
        }
        if (!passwordReg.test(password)) {
          Toast.fail('请输入8-20位密码，字母/数字/符号至少2种', 1)
          return
        }
        if (password !== passwordAgain) {
          Toast.fail('请输入两次相同的密码', 1)
          return
        }

        // 验证成功后登录
        this.props.retrievePassword({
          phoneNumber: phoneNum,
          msgNum: code,
          newPassword: password,
          hash: this.hash,
          tamp: this.tamp
        }, data => {
          Toast.success('密码修改成功', 1, history.push('/root/login'))
        })
      }
    });
  }

  // 发送验证码
  sendCheckNum = e => {
    e.preventDefault();
    var phoneNum = document.getElementById('forgetPsw_phone').value
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
        var temp = this.state.permission
        temp.pswPhoneNum = true
        this.setState({
          btnText: '重新获取 ' + maxTime + 's',
          permission: temp
        })
      } else {
        window.clearInterval(this.timer)
        maxTime = 60
        var deTemp = this.state.permission
        deTemp.pswPhoneNum = false
        this.setState({
          btnText: '发送验证码',
          permission: deTemp
        })
      }
    }, 1000)
    this.props.getSMSMessage({ phoneNumber: phoneNum }, data => {
      // 保存短信接口给的hash和tamp，用做校验的判断
      this.hash = data.hash
      this.tamp = data.tamp
    })
  }

  backToLogin = e => {
    history.push('/root/login')
  }

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
      < div className="forget-psw-component" >
        <div className='forget-div-top'>
          <div className='forget-top-left'>
            <img onClick={this.backToLogin} src={LeftIcon} alt='forget-left-icon' className='forget-left-icon'></img>
          </div>
          <div className='forget-top-center'>
            <span>忘记密码</span>
          </div>
          <div className='forget-top-right'></div>
        </div>


        {/** 忘记密码表单 */}
        <div className='forget-psw-content'>
          <Form {...formItemLayout} onSubmit={this.modifierHandleSubmit.bind(this)}>
            <Form.Item label="">
              {getFieldDecorator('phone', {
                rules: [{ required: true, message: '请输入你的手机号' }],
              })(<Input
                addonBefore={prefixSelector}
                style={{ width: '100%' }}
                placeholder="手机号/邮箱"
                onChange={this.inputPhoneNumHandle.bind(this)} />)}
            </Form.Item>

            <Form.Item label="">
              <Row gutter={8}>
                <Col span={12}>
                  {getFieldDecorator('captcha', {
                    rules: [{ required: true, message: '请输入验证码' }],
                  })(<Input placeholder="验证码" />)}
                </Col>
                <Col span={12}>
                  <Button
                    disabled={this.state.permission.pswPhoneNum}
                    onClick={this.sendCheckNum}>{this.state.btnText}</Button>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码!' }],
              })(
                <Input
                  type="password"
                  placeholder="设置密码密码"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password-confirm', {
                rules: [{ required: true, message: '两次密码输入不一致' }],
              })(
                <Input
                  type="password"
                  placeholder="请再次输入密码"
                />,
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                确定
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div >
    )
  }
}

const WrappedRegistrationForm = Form.create({ name: 'forgetPsw' })(ForgetPsw);

export default WrappedRegistrationForm


