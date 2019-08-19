import React from 'react'
import './component.scss'

import { Button, Radio, Icon, Modal, Input, Pagination } from 'antd';


const { confirm } = Modal;
class UserManager extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      size: 'small',
      additionVisible: false,
      deleteVisible: false,
      additionConfirmLoading: false,
      userList: {}
    }
    this.delSerial = null
    this.params = {
      pageNo: 1,
      pageSize: 10
    }
    this.userIndex = 0
    this.userInfo = null
    this.getPhoneNumberSearch = this.getPhoneNumberSearch.bind(this)
    this.changeUserIndex = this.changeUserIndex.bind(this)
  }

  // 通过手机号模糊搜索
  getPhoneNumberSearch = e => {
    var phoneNumber = document.getElementById('user-manager-phone-number').value
    this.props.getUserListByPhoneNum && this.props.getUserListByPhoneNum({
      phoneNumber: phoneNumber,
      pageSize: this.params.pageSize,
      pageNo: this.params.pageNo
    })
  }

  changeUserIndex = (index) => {
    if (this.userIndex !== index) {
      this.userIndex = index
      this.setState({})
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

  showDeleteModal = (serial) => {
    // var productSerialInput = document.getElementById('productSerialInput')
    // productSerialInput.value = ''
    // var verificationInput = document.getElementById('verificationInput')
    // verificationInput.nodeValue = ''
    this.delSerial = serial
    this.setState({
      deleteVisible: true,
    });
  };

  handleAdditionOk = e => {
    var serial = document.getElementById('productSerialInput').value
    var vertifyCode = document.getElementById('verificationInput').value
    // var serial = this.refs.productSerialInput.value
    // var vertifyCode = this.refs.verificationInput.value
    // 写死的参数，该参数需修改成访问用户详情的手机好吗
    var phoneNumber = this.state.userList.data.uglyData[this.userIndex].phoneNumber

    this.props.addUserInfo && this.props.addUserInfo({
      serial: serial,
      deviceVertifyCode: vertifyCode,
      phoneNumber: phoneNumber,
      pageNo: this.params.pageNo,
      pageSize: this.params.pageSize,
    })

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
    this.setState({
      additionVisible: false,
    });
  };

  handleDeleteOk = e => {
    var serial = this.delSerial ? this.delSerial : ''
    var phoneNumber = this.state.userList.data.uglyData[this.userIndex].phoneNumber

    if (serial === '') {
      alert('选择设备出错')
      return
    }
    this.props.deleteUserInfo && this.props.deleteUserInfo({
      serial: serial,
      phoneNumber: phoneNumber,
      pageNo: this.params.pageNo,
      pageSize: this.params.pageSize,
    })

    this.setState({
      confirmLoading: true,
    });

    setTimeout(() => {
      this.setState({
        deleteVisible: false,
        confirmLoading: false,
      });
    }, 1000);
  };

  handleDeleteCancel = e => {
    this.setState({
      deleteVisible: false,
    });
  };

  UNSAFE_componentWillReceiveProps(nextProps, prevState) {
    if (nextProps.userManagerList !== prevState.userList) {
      this.setState({
        userList: nextProps.userManagerList
      })
    }
  }


  render() {
    const { match } = this.props
    const { size, confirmLoading, userList } = this.state;
    return (
      <div className="user-manager-component">
        <div className='user-manager-title'>用户管理</div>

        <div className='user-manager-middle'>
          <div className='user-manager-search'>
            <span className='user-manager-search-title'>用户查询</span>
            <input id='user-manager-phone-number' className='user-manager-search-input' placeholder='手机号码' ></input>
            <button className='user-manager-search-btn' onClick={this.getPhoneNumberSearch.bind(this)}>查询</button>
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
                userList && userList.total !== 0 && userList.data !== undefined ? userList.data.uglyData.map((item, index) => (
                  <div className='search-item' key={index} onClick={this.changeUserIndex.bind(this, index)}>
                    <span className='wd-span wd15 search-item-span'>{index + 1}</span>
                    <span className='wd-span wd25 search-item-span'>{item.phoneNumber}</span>
                    <span className='wd-span wd30 search-item-span'>{item.password}</span>
                    <span className='wd-span wd30 search-item-span'>{
                      item.deviceList.map((items, indexs) => (
                        <span>{items.deviceName}、</span>
                      ))
                    }</span>
                  </div>
                )) : ''
              }
            </div>
          </div>

        </div>

        <Pagination
          total={userList ? userList.total : 0}
          showTotal={total => `总共 ${total} 条数据`}
          pageSize={userList ? userList.pageSize : 10}
          defaultCurrent={1}
          size='small'
          className='pagination-div'
          onChange={(pageNo, pageSize) => {
            this.params.pageNo = pageNo
            this.getPhoneNumberSearch()
          }}
        />

        <div className='user-manager-bottom'>
          <div className='user-manager-bottom-title'>当前用户信息</div>
          <div className='manager-detail'>
            {
              userList && userList.total !== 0 && userList.data !== undefined ?
                <div className='detail-left-message'>
                  <span className='detail-left-message-span'><span>用户名：</span><span>{userList.data.uglyData[this.userIndex].nickName}</span></span>
                  <span className='detail-left-message-span'><span>手机号：</span><span>{userList.data.uglyData[this.userIndex].phoneNumber}</span></span>
                  <span className='detail-left-message-span'><span>登录密码：</span><span>{userList.data.uglyData[this.userIndex].password}</span></span>
                </div> :
                <div className='detail-left-message'>
                  <span className='detail-left-message-span'><span>用户名：</span><span>--</span></span>
                  <span className='detail-left-message-span'><span>手机号：</span><span>--</span></span>
                  <span className='detail-left-message-span'><span>登录密码：</span><span>--</span></span>
                </div>
            }
            <div className='detail-right-list'>
              <div className='detail-right-list-title'>
                <span className='detail-title'>已绑定的设备</span>
                {/* <Button type="link" size={size} onClick={this.showAdditionModal.bind(this)} className='monitoring-edit-btn detail-monitoring-addition' ghost>添加</Button> */}
                <Modal
                  title="添加设备"
                  visible={this.state.additionVisible}
                  footer={[
                    <Button key="back" onClick={this.handleAdditionCancel.bind(this, this.userInfo)}>
                      取消
                    </Button>,
                    <Button key="submit" type="primary" loading={confirmLoading} onClick={this.handleAdditionOk.bind(this, this.userInfo)}>
                      添加
                    </Button>,
                  ]}
                >
                  <Input className='addition-input' id='productSerialInput' ref='productSerialInput' placeholder="请输入产品序列号" />
                  <Input className='addition-input' id='verificationInput' ref='verificationInput' placeholder="请输入验证码" />
                </Modal>
              </div>

              <div className='monitoring-list'>

                {
                  userList && userList.total !== 0 && userList.data !== undefined ? userList.data.uglyData[this.userIndex].deviceList.map((item, index) => {
                    return (
                      <span className='detail-right-item'>
                        <span className='monitoring-name'>{item.deviceName}</span>
                        <Button type="link" size={size} onClick={this.showDeleteModal.bind(this, item.serial)} className='monitoring-edit-btn detail-monitoring-delete'>
                          删除
                        </Button>
                      </span>
                    )
                  }) : null
                }
                <Modal
                  title="删除设备设备"
                  visible={this.state.deleteVisible}
                  footer={[
                    <Button key="back" onClick={this.handleDeleteCancel.bind(this, this.userInfo)}>
                      取消
                    </Button>,
                    <Button key="submit" type="primary" loading={confirmLoading} onClick={this.handleDeleteOk.bind(this, this.userInfo)}>
                      确定
                    </Button>
                  ]}
                >
                  <span>确定删除该设备？</span>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default UserManager
