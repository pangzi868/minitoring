import React from 'react'
import './component.scss'
import 'antd/dist/antd.css';

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

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      isRegisterShow: true,
      isLoginShow: false,
      isModifierShow: false,
      isModifierComfirmShow: false
    }
  }

  goToLogin = e => {
    e.preventDefault();
    this.setState({
      isRegisterShow: false,
      isLoginShow: true,
    })
  }

  goToRegister = e => {
    e.preventDefault();
    this.setState({
      isLoginShow: false,
      isRegisterShow: true,
    })
  }

  modifierBtnHandle = e => {
    e.preventDefault();
    this.setState({
      sRegisterShow: false,
      isLoginShow: false,
      isModifierShow: true
    })
  }

  // 发送验证码
  sendCheckNum = e => {
    e.preventDefault();
    alert('发送验证码')
  }

  // 导航栏的点击切换
  tabsCallback = key => {
    console.log(key)
  }

  // 注册按钮点击
  registerHandleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  // 找回密码下一步按钮点击
  modifierHandleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
    this.setState({
      isModifierShow: false,
      isLoginShow : true,
      // isModifierComfirmShow: true
    })
  }

  // 修改密码确认按钮点击
  modifierComfirmHandleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
    this.setState({
      // isModifierComfirmShow: false,
      isLoginShow: true
    })
  }


  // 登录按钮点击
  loginHandleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

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
        <Option value="87">+87</Option>
      </Select>,
    );

    return (
      <div className='login-component'>
        <div className={`register-div ${this.state.isRegisterShow ? '' : 'hide'}`}>
          <div className='register-div-top'>注册账号</div>
          <div className='register-div-content'>
            <Form {...formItemLayout} onSubmit={this.registerHandleSubmit}>
              <Form.Item label="">
                {getFieldDecorator('phone', {
                  rules: [{ required: true, message: '请输入你的手机号' }],
                })(<Input
                  addonBefore={prefixSelector}
                  style={{ width: '100%' }}
                  placeholder="手机号" />)}
              </Form.Item>

              <Form.Item label="">
                <Row gutter={8}>
                  <Col span={12}>
                    {getFieldDecorator('captcha', {
                      rules: [{ required: true, message: '请输入验证码' }],
                    })(<Input placeholder="验证码" />)}
                  </Col>
                  <Col span={12}>
                    <Button onClick={this.sendCheckNum}>发送验证码</Button>
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
              <Form.Item {...tailFormItemLayout}>
                已有账号？进行<a className='goto-login-button' onClick={this.goToLogin}>登录</a>
              </Form.Item>
            </Form>
          </div>
        </div>

        { /** 密码登录/短信登录表单 */}
        <div className={`login-div ${this.state.isLoginShow ? '' : 'hide'}`}>
          <Tabs defaultActiveKey="1" onChange={this.tabsCallback}>
            <TabPane tab="密码登录" key="1">
              <div className='psw-login-div'>
                <Form onSubmit={this.handleSubmit} className="login-form">
                  <Form.Item>
                    {getFieldDecorator('username', {
                      rules: [{ required: true, message: '请输入手机号码或邮箱!' }],
                    })(
                      <Input
                        placeholder="手机号/邮箱"
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
                      />,
                    )}
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                      登录
                  </Button>
                    {getFieldDecorator('remember', {
                      valuePropName: 'checked',
                      initialValue: true,
                    })(<Checkbox>下次自动登录</Checkbox>)}
                    <span className='login-operation'><a className="login-form-forgot" href="#" onClick={this.modifierBtnHandle}> 忘记密码 </a> | <a onClick={this.goToRegister} href="#"> 注册 </a></span>
                  </Form.Item>
                </Form>
              </div>
            </TabPane>
            <TabPane tab="短信登录" key="2">
              <div className='mail-login-div'>
                <Form onSubmit={this.handleSubmit} className="login-form">
                  <Form.Item label="">
                    {getFieldDecorator('phone', {
                      rules: [{ required: true, message: '请输入你的手机号' }],
                    })(<Input
                      addonBefore={prefixSelector}
                      style={{ width: '100%' }}
                      placeholder="手机号" />)}
                  </Form.Item>

                  <Form.Item label="">
                    <Row gutter={8}>
                      <Col span={12}>
                        {getFieldDecorator('captcha', {
                          rules: [{ required: true, message: '请输入验证码' }],
                        })(<Input placeholder="验证码" />)}
                      </Col>
                      <Col span={12}>
                        <Button>发送验证码</Button>
                      </Col>
                    </Row>
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                      登录
                  </Button>
                    {getFieldDecorator('remember', {
                      valuePropName: 'checked',
                      initialValue: true,
                    })(<Checkbox>下次自动登录</Checkbox>)}
                    <span className='login-operation'><a className="login-form-forgot" onClick={this.modifierBtnHandle} href=""> 忘记密码</a> | <a onClick={this.goToRegister} href=""> 注册 </a></span>
                  </Form.Item>
                </Form>
              </div>
            </TabPane>
          </Tabs>
        </div>

        { /** 密码登录/短信修改表单 */}
        <div className={`modifier-div ${this.state.isModifierShow || this.state.isModifierComfirmShow ? '' : 'hide'}`}>
          <div className={`modifier-psw-content ${this.state.isModifierShow ? '' : 'hide'}`}>
            <div className='modifier-div-top'>找回密码</div>
            <div className='modifier-div-content'>
              <Form {...formItemLayout} onSubmit={this.modifierHandleSubmit}>
                <Form.Item label="">
                  {getFieldDecorator('phone', {
                    rules: [{ required: true, message: '请输入你的手机号' }],
                  })(<Input
                    addonBefore={prefixSelector}
                    style={{ width: '100%' }}
                    placeholder="手机号/邮箱" />)}
                </Form.Item>

                <Form.Item label="">
                  <Row gutter={8}>
                    <Col span={12}>
                      {getFieldDecorator('captcha', {
                        rules: [{ required: true, message: '请输入验证码' }],
                      })(<Input placeholder="验证码" />)}
                    </Col>
                    <Col span={12}>
                      <Button>发送验证码</Button>
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
          </div>
          <div className={`comfirm-psw-content ${this.state.isModifierComfirmShow ? '' : 'hide'}`}>
            <div className='modifier-div-top'>修改密码</div>
            <div className='modifier-div-content'>
              <Form {...formItemLayout} onSubmit={this.modifierComfirmHandleSubmit}>
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
          </div>
        </div>
      </div>

    )
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(LoginForm);

export default WrappedRegistrationForm
