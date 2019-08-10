import React from "react";
import "./component.scss";

import {
  Form,
  Input,
  Select,
  Row,
  Col,
  Button,
} from 'antd';

const { Option } = Select;

class ForgetPsw extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
    }

    this.inputPhoneNumHandle = this.inputPhoneNumHandle.bind(this)
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

  // 找回密码下一步按钮点击
  modifierHandleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
    this.props.modifierHandleSubmit && this.props.modifierHandleSubmit()
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
        <Form {...formItemLayout} onSubmit={this.modifierHandleSubmit.bind(this)}>
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
      </div >
    )
  }
}

const WrappedRegistrationForm = Form.create({ name: 'forgetPsw' })(ForgetPsw);

export default WrappedRegistrationForm


