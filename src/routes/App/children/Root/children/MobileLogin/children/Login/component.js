import React from "react";
import "./component.scss";
import {
  Form,
  Input,
  Icon,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  Tabs
} from 'antd';

import Logo from './images/logo.png'

const { Option } = Select;

const { TabPane } = Tabs;
class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
    }

  }

  loginGoToRegister = e => {
    e.preventDefault();
    // 访问父组件的方法，并修改视图层
    // this.props.goToRegister && this.props.goToRegister()
    this.props.history.push('/root/login/register')
  }

  loginGoToModifierBtnHandle = e => {
    e.preventDefault();
    // 访问父组件的方法，并修改视图层
    // this.props.modifierBtnHandle && this.props.modifierBtnHandle()
    this.props.history.push('/root/login/forgetPsw')
  }

  // 导航栏的点击切换
  tabsCallback = key => {
    console.log(key)
  }

  // 找回密码下一步按钮点击
  modifierHandleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
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

    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
      </Select>,
    );

    return (
      < div className="login-mobile-div-component" >
        <div className='login-top-header'>
          <img src={Logo} alt='company-logo' className='company-logo'></img>
          <span className='company-name'>熵康科技</span>
          <span className='company-slogan'>聚焦边缘计算，防制有害生物</span>
        </div>
        { /** 密码登录/短信登录表单 */}
        <div className={`login-div`}>
          <Tabs defaultActiveKey="1" onChange={this.tabsCallback}>
            <TabPane tab="密码登录" key="1">
              <div className='psw-login-div'>
                <Form onSubmit={this.loginHandleSubmit} className="login-form">
                  <Form.Item>
                    {getFieldDecorator('username', {
                      rules: [{ required: true, message: '请输入手机号码或邮箱!' }],
                    })(
                      <Input
                        placeholder="账号/手机号"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      />,
                    )}
                  </Form.Item>
                  <Form.Item hasFeedback>
                    {getFieldDecorator('password', {
                      rules: [{ required: true, message: '请输入密码!' }],
                    })(
                      <Input.Password
                        type="password"
                        placeholder="密码"
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      />,
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator('remember', {
                      valuePropName: 'checked',
                      initialValue: true,
                    })(<Checkbox>自动登录</Checkbox>)}
                    <span className='login-operation'><a className="login-form-forgot" href="#" onClick={this.loginGoToModifierBtnHandle.bind(this)}> 忘记密码 </a> |<a onClick={this.loginGoToRegister.bind(this)}> 注册 </a></span>
                  </Form.Item>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    登录
                  </Button>
                </Form>
              </div>
            </TabPane>
            <TabPane tab="短信登录" key="2">
              <div className='mail-login-div'>
                <Form onSubmit={this.loginHandleSubmit} className="login-form">
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
                    {getFieldDecorator('remember', {
                      valuePropName: 'checked',
                      initialValue: true,
                    })(<Checkbox>自动登录</Checkbox>)}
                    <span className='login-operation'><a className="login-form-forgot" href="#" onClick={this.loginGoToModifierBtnHandle.bind(this)}> 忘记密码 </a> |<a onClick={this.loginGoToRegister.bind(this)}> 注册 </a></span>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                      登录
                  </Button>
                  </Form.Item>
                </Form>
              </div>
            </TabPane>
          </Tabs>
        </div>

      </div >
    )
  }
}

const WrappedRegistrationForm = Form.create({ name: 'login' })(Login);

export default WrappedRegistrationForm


