import React from 'react'
import './component.scss'

import { Button, Radio, Icon, Modal, Input } from 'antd';


const { confirm } = Modal;

const searchListIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

class UserManager extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      size: 'small',
      additionVisible: false,
      additionConfirmLoading: false,
    }
  }

  showAdditionModal = (e) => {
    // var productSerialInput = document.getElementById('productSerialInput')
    // productSerialInput.value = ''
    // var verificationInput = document.getElementById('verificationInput')
    // verificationInput.nodeValue = ''
    this.setState({
      additionVisible: true,
    });
  };


  handleAdditionOk = e => {
    console.log(e);
    this.setState({
      confirmLoading: true,
    });

    this.refs.productSerialInput.value = ''

    this.refs.verificationInput.value = ''
    setTimeout(() => {
      this.setState({
        additionVisible: false,
        confirmLoading: false,
      });
    }, 2000);
  };

  handleAdditionCancel = e => {
    console.log(e);
    this.setState({
      additionVisible: false,
    });
  };

  showDeleteConfirm() {
    confirm({
      title: '确定删除该设备？',
      content: '设备删除后无法从列表中获取',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }


  render() {
    const { match } = this.props
    const { size, confirmLoading } = this.state;
    return (
      <div className="user-manager-component">
        <div className='user-manager-title'>用户管理</div>

        <div className='user-manager-middle'>
          <div className='user-manager-search'>
            <span className='user-manager-search-title'>用户查询</span>
            <input className='user-manager-search-input' placeholder='手机号码' ></input>
            <button className='user-manager-search-btn'>查询</button>
          </div>
          <div className='user-manager-search-list'>
            <div className='manager-search-list-title'>
              <span className='wd-span wd15'>编号</span>
              <span className='wd-span wd25'>手机号</span>
              <span className='wd-span wd30'>登录密码</span>
              <span className='wd-span wd30'>已绑定的设备</span>
            </div>
            <div className='manager-search-list-item'>
              {
                searchListIndex ? searchListIndex.map((item, index) => (
                  <div className='search-item'>
                    <span className='wd-span wd15 search-item-span'>{item}</span>
                    <span className='wd-span wd25 search-item-span'>188288388488{item}</span>
                    <span className='wd-span wd30 search-item-span'>sd8849878{item}</span>
                    <span className='wd-span wd30 search-item-span'>{item}qw988、qw6898、qwe56849、qwe55787</span>
                  </div>
                )) : ''
              }
            </div>
          </div>

        </div>
        <div className='user-manager-bottom'>
          <div className='user-manager-bottom-title'>当前用户信息</div>
          <div className='manager-detail'>
            <div className='detail-left-message'>
              <span className='detail-left-message-span'><span>用户名：</span><span>xicha</span></span>
              <span className='detail-left-message-span'><span>手机号：</span><span>1888888888</span></span>
              <span className='detail-left-message-span'><span>登录密码：</span><span>xicha20190808</span></span>
            </div>
            <div className='detail-right-list'>
              <div className='detail-right-list-title'>
                <span className='detail-title'>已绑定的设备</span>
                <Button type="link" size={size} onClick={this.showAdditionModal.bind(this)} className='monitoring-edit-btn detail-monitoring-addition' ghost>添加</Button>
                <Modal
                  title="添加设备"
                  visible={this.state.additionVisible}
                  footer={[
                    <Button key="back" onClick={this.handleAdditionCancel}>
                      取消
                    </Button>,
                    <Button key="submit" type="primary" loading={confirmLoading} onClick={this.handleAdditionOk}>
                      添加
                    </Button>,
                  ]}
                >
                  <Input className='addition-input' ref='productSerialInput' placeholder="请输入产品序列号" />
                  <Input className='addition-input' ref='verificationInput' placeholder="请输入验证码" />
                </Modal>
              </div>

              <div className='monitoring-list'>
                <span className='detail-right-item'>
                  <span className='monitoring-name'>q161</span>
                  <Button type="link" size={size} onClick={this.showDeleteConfirm} className='monitoring-edit-btn detail-monitoring-delete'>
                    删除
                  </Button>
                </span>
                <span className='detail-right-item'>
                  <span className='monitoring-name'>q161</span>
                  <Button type="link" size={size} onClick={this.showDeleteConfirm} className='monitoring-edit-btn detail-monitoring-delete'>
                    删除
                  </Button>
                </span>
                <span className='detail-right-item'>
                  <span className='monitoring-name'>q161</span>
                  <Button type="link" size={size} onClick={this.showDeleteConfirm} className='monitoring-edit-btn detail-monitoring-delete'>
                    删除
                  </Button>
                </span>

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default UserManager
