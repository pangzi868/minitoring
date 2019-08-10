import React from "react";
import "./component.scss";

import LeftIcon from './images/1.4.png'

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


class Register extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
    }

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

  // 发送验证码
  sendCheckNum = e => {
    e.preventDefault();
    alert('已发送短信')
    this.props.getSMSMessage({ phoneNumber: '17875769971' }, data => {
      // 保存短信接口给的hash和tamp，用做校验的判断
      this.hash = data.hash
      this.tamp = data.tamp
      console.log(data, 'wangyinbin')
    })
  }

  // 注册按钮点击
  registerHandleSubmit = e => {
    e.preventDefault();
    var msgNum = document.getElementById('register_captcha').value
    this.props.ValidateCode({ msgNum: msgNum, hash: this.hash, tamp: this.tamp })
    // console.log(this.props.form)
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log('Received values of form: ', values);
      if (!err) {
      }
    });
  };

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
        <div className='register-div-top'>
          <div className='register-top-left'>
            <img src={LeftIcon} alt='register-left-icon' className='register-left-icon'></img>
          </div>
          <div className='register-top-center'>
            <span>注册账号</span>
          </div>
          <div className='register-top-right'></div>
        </div>

        {/** 注册账号表单 */}
        <div className='register-content'>
          <Form {...formItemLayout} onSubmit={this.registerHandleSubmit}>
            <Form.Item label="">
              {getFieldDecorator('phone', {
                rules: [{ required: true, message: '请输入你的手机号' }],
              })(<Input
                addonBefore={prefixSelector}
                style={{ width: '100%' }}
                placeholder="手机号"
                onKeyUp={this.inputPhoneNumHandle.bind(this)} />)}
            </Form.Item>

            <Form.Item label="">
              <Row gutter={8}>
                <Col span={12}>
                  {getFieldDecorator('captcha', {
                    rules: [{ required: true, message: '请输入验证码' }],
                  })(<Input placeholder="验证码" />)}
                </Col>
                <Col span={12}>
                  <Button disabled={this.state.registerSendSMSBtn} onClick={this.sendCheckNum}>发送验证码</Button>
                </Col>
              </Row>
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
              })(<Input.Password placeholder="8-20位密码，字母/数字/符号至少2种" />)}
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              {getFieldDecorator('agreement', {
                valuePropName: 'checked',
              })(
                <Checkbox>
                  我已阅读并接受<a href=""> 用户协议 </a>和<a href=""> 隐私政策 </a>
                </Checkbox>,
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                注册
                </Button>
            </Form.Item>
          </Form>
        </div>
      </div >
    )
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(Register);

export default WrappedRegistrationForm


