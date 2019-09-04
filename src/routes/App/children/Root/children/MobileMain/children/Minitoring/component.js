import React from 'react'
import './component.scss'

import { Menu, Select, Dropdown, Modal } from 'antd';

import ViewMore from './images/sidebar-viewmore.svg'
import GroupAddition from './images/blue_add.png'
import EquipmentAddition from './images/yellow_add.png'
import Setting from './images/1.9.png'
import InnerPage from 'components/hz/InnerPage'
import { Toast } from 'antd-mobile';
import WarningList from './children/Warning/children/WarningList/component'
import DensityList from './children/Density/component'
import history from 'history.js'

const { SubMenu } = Menu;

const { Option } = Select;


// 格式化日期，如月、日、时、分、秒保证为2位数
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n;
}
// 参数number为毫秒时间戳，format为需要转换成的日期格式
function formatTime(number, format) {
  let time = new Date(number)
  let newArr = []
  let formatArr = ['Y', 'M', 'D', 'h', 'm', 's']
  newArr.push(time.getFullYear())
  newArr.push(formatNumber(time.getMonth() + 1))
  newArr.push(formatNumber(time.getDate()))

  newArr.push(formatNumber(time.getHours()))
  newArr.push(formatNumber(time.getMinutes()))
  newArr.push(formatNumber(time.getSeconds()))

  for (let i in newArr) {
    format = format.replace(formatArr[i], newArr[i])
  }
  return format;
}


//时间戳转换为 普通日期格式
function formatDate(now) {
  var year = now.getFullYear();   //获取获取当前年份
  var month = now.getMonth() + 1;   //获取获取当前月份
  var date = now.getDate();       //获取获取当前日期
  var hour = now.getHours();      //获取时
  var minute = now.getMinutes();  //获取分
  var second = now.getSeconds();  //获取秒
  //时间格式 ：年-月-日
  return year + "-" + month + "-" + date;
}
//计算时间差
function GetDateDiff(startDate, endDate) {
  var startTime = new Date(Date.parse(startDate.replace(/-/g, "/"))).getTime();
  var endTime = new Date(Date.parse(endDate.replace(/-/g, "/"))).getTime();
  var dates = Math.floor((startTime - endTime)) / (1000 * 60 * 60 * 24);
  return dates;
}
let addGroupId = -1;
let moveGroupId = -1;
class Minitoring extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isShowHandle: {
        isAdditionEquipmentShow: false,
        isAdditionGroupShow: false,
        isSettingPswShow: false
      },

      isAdditionShow: true,
      isRealTimeShow: false,
      isEmergencyShow: false,
      isAnalysisShow: false,


      // 分组操作数据
      editGroupVisibled: false,
      editGroupItem: null,
      deleteGroupVisibled: false,
      deleteGroupItem: null,

      // 设备操作数据
      editEquipmentVisibled: false,
      editEquipmentItem: null,
      deleteEquipmentVisibled: false,
      deleteEquipmentItem: null,
      moveEquipmentVisibled: false,
      moveEquipmentItem: null,


      // 告警信息
      warningMessageDetails: [],
      warningDetailIndex: 0,

      myMinitoringGroup: [],

    }
    this.userId = null;

    this.phoneNumber = null
    this.password = null
    this.warningVideosList = null
    this.densityList = null
    this.getBusinessInfoPage = React.createRef()
    this.getDensityInfoPage = React.createRef()
    this.logOut = this.logOut.bind(this)
    this.secondMenuHandle = this.secondMenuHandle.bind(this)
    this.addEquipmentHandle = this.addEquipmentHandle.bind(this)
    this.cancelAddEquipmentHandle = this.cancelAddEquipmentHandle.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.additionShow = this.additionShow.bind(this)
    this.addGroupHandle = this.addGroupHandle.bind(this)
    this.cancelAddGroupHandle = this.cancelAddGroupHandle.bind(this)
    this.checkSettingPsw = this.checkSettingPsw.bind(this)
    this.cancelCheckSettingPsw = this.cancelCheckSettingPsw.bind(this)
    this.onGroupMenuClick = this.onGroupMenuClick.bind(this)
    this.onEquipmentMenuClick = this.onEquipmentMenuClick.bind(this)

  }
  // menu的点击事件
  clickSubMenu = e => {
    var dom = e.domEvent.currentTarget.children[0].children[0].children[0]
    dom.innerText = dom.innerText === '+ ' ? '- ' : '+ '
  }

  logOut = e => {
    localStorage.setItem('userId', '')
    history.push('/root/login')
  }

  // 修改密码确定按钮
  checkSettingPsw = e => {
    var oldPassword = document.getElementById('setting-old-psw').value
    var newPassword = document.getElementById('setting-new-psw').value
    var phoneNumber = this.phoneNumber

    var passwordReg = /(?!^\d+$)(?!^[A-Za-z]+$)(?!^[^A-Za-z0-9]+$)(?!^.*[\u4E00-\u9FA5].*$)^\S{8,20}$/

    if (oldPassword !== this.password) {
      Toast.fail('请输入正确的旧密码', 1)
      return
    }
    if (oldPassword === newPassword) {
      Toast.fail('请勿输入与旧密码相同的密码', 1)
      return
    }
    if (!passwordReg.test(newPassword)) {
      Toast.fail('请输入8-20位密码，字母/数字/符号至少2种', 1)
      return
    }

    // 验证成功后登录
    this.props.modifyPassword({
      phoneNumber: phoneNumber,
      oldPassword: oldPassword,
      newPassword: newPassword,
    }, data => {
      Toast.success('修改密码成功', 1)

      document.getElementById('setting-old-psw').value = ''
      document.getElementById('setting-new-psw').value = ''
      var temp = this.state.isShowHandle
      temp.isSettingPswShow = !temp.isSettingPswShow
      this.setState({
        isShowHandle: temp
      })
    })
  }

  cancelCheckSettingPsw = e => {

    document.getElementById('setting-old-psw').value = ''
    document.getElementById('setting-new-psw').value = ''
    var temp = this.state.isShowHandle
    temp.isSettingPswShow = !temp.isSettingPswShow
    this.setState({
      isShowHandle: temp
    })
  }


  // 分组菜单按钮
  onGroupMenuClick = (item, e) => {
    e.domEvent.stopPropagation();
    switch (e.key) {
      case '0':
        this.showEditGroupModal(item);
        break;
      case '1':
        this.showDeleteGroupModal(item);
        break;
      default:
        break;
    }
  };

  // 设备菜单按钮
  onEquipmentMenuClick = (item, group, e) => {
    e.domEvent.stopPropagation();
    switch (e.key) {
      case '0':
        this.showEditEquipmentModal(item);
        break;
      case '1':
        this.showMoveEquipmentModal(item, group)
        break;
      case '2':
        this.showDeleteEquipmentModal(item, group)
        break;
      default:
        break;
    }
  };

  // 修改分组名称弹窗
  showEditGroupModal = (item, e) => {
    var groupId = item.deviceGroupId
    this.setState({
      editGroupVisibled: true,
      editGroupItem: { groupId: groupId }
    });
  };

  // 隐藏修改分组名称弹窗
  hideEditGroupModal = (item, bool, e) => {
    e.preventDefault();
    if (bool) {
      var groupName = document.getElementById('edit-group-name').value
      this.props.editGroupName({ groupId: item.groupId, groupName: groupName },
        data => {
          this.props.getDeviceGroup({ userId: this.userId })
        }
      )
    }
    this.setState({
      editGroupVisibled: false,
      editGroupItem: null
    });
  };

  // 删除分组弹窗
  showDeleteGroupModal = (item, e) => {
    var groupId = item.deviceGroupId
    this.setState({
      deleteGroupVisibled: true,
      deleteGroupItem: { groupId: groupId }
    });
  };

  // 删除修改分组弹窗
  hideDeleteGroupModal = (item, bool, e) => {
    e.preventDefault();
    if (bool) {
      this.props.deleteGroupName({ groupId: item.groupId },
        data => {
          this.props.getDeviceGroup({ userId: this.userId })
        }
      )
    }
    this.setState({
      deleteGroupVisibled: false,
      deleteGroupItem: null
    });
  };


  // 修改设备名称弹窗
  showEditEquipmentModal = (item, e) => {
    var deviceId = item.deviceId
    this.setState({
      editEquipmentVisibled: true,
      editEquipmentItem: { deviceId: deviceId }
    });
  };

  // 隐藏设备名称弹窗
  hideEditEquipmentModal = (item, bool, e) => {
    e.preventDefault();
    if (bool) {
      var deviceName = document.getElementById('edit-equipment-name').value
      this.props.editEquipmentName({ deviceId: item.deviceId, deviceName: deviceName },
        data => {
          this.props.getDeviceGroup({ userId: this.userId })
        }
      )
    }
    this.setState({
      editEquipmentVisibled: false,
      editEquipmentItem: null
    });
  };

  // 移动分组弹窗
  showMoveEquipmentModal = (item, group, e) => {
    var deviceId = item.deviceId
    var groupId = group.deviceGroupId
    this.setState({
      moveEquipmentVisibled: true,
      moveEquipmentItem: { deviceId: deviceId, groupId: groupId }
    });
  };

  // 隐藏移动分组弹窗
  hideMoveEquipmentModal = (item, bool, e) => {
    e.preventDefault();
    if (bool) {
      if (item.deviceId !== moveGroupId) {
        this.props.moveEquipmentName({ deviceId: item.deviceId, groupId: item.groupId, newGroupId: moveGroupId },
          data => {
            this.props.getDeviceGroup({ userId: this.userId })
          }
        )
      } else {
        Toast.fail('请选择不同分组', 1)
      }
    }
    this.setState({
      moveEquipmentVisibled: false,
      moveEquipmentItem: null
    });
  };

  // 删除设备弹窗
  showDeleteEquipmentModal = (item, group, e) => {
    var deviceId = item.deviceId
    var groupId = group.deviceGroupId
    this.setState({
      deleteEquipmentVisibled: true,
      deleteEquipmentItem: { deviceId: deviceId, groupId: groupId }
    });
  };

  // 删除修改设备弹窗
  hideDeleteEquipmentModal = (item, bool, e) => {
    e.preventDefault();
    if (bool) {
      this.props.deleteDeviceByRelation({ deviceId: item.deviceId, groupId: item.groupId },
        data => {
          Toast.success('删除设备成功', 1)
          this.props.getDeviceGroup({ userId: this.userId })
        }
      )
    }
    this.setState({
      deleteEquipmentVisibled: false,
      deleteEquipmentItem: null
    });
  };


  /** 移动设备分组列表下拉操作start */
  onMoveDeviceChange(value) {
    if (value) {
      moveGroupId = JSON.parse(JSON.stringify(value))
    }
  }

  onMoveDeviceBlur() {
  }

  onMoveDeviceFocus() {
  }

  onMoveDeviceSearch(val) {
  }
  /** 移动设备分组列表下拉操作end */



  // 添加设备确定按钮
  addEquipmentHandle = e => {
    var serial = document.getElementById('add-equipment-product-num').value
    var code = document.getElementById('add-equipment-psw').value
    var groupId = addGroupId
    if (groupId !== -1) {
      this.props.addDevGroup({
        serial: serial,
        deviceVerifyCode: code,
        groupId: groupId
      }, data => {
        Toast.success('添加设备成功', 1)
        document.getElementById('add-equipment-product-num').value = ''
        document.getElementById('add-equipment-psw').value = ''
        this.props.getDeviceGroup({ userId: this.userId })
      })
    } else {
      Toast.fail('请选择分组', 1)
      return
    }
    var temp = this.state.isShowHandle
    temp.isAdditionEquipmentShow = false
    this.setState({
      isShowHandle: temp
    })

  }


  cancelAddEquipmentHandle = e => {
    var temp = this.state.isShowHandle
    temp.isAdditionEquipmentShow = false
    this.setState({
      isShowHandle: temp
    })
  }

  additionShow = (type, e) => {
    var temp = this.state.isShowHandle
    switch (type) {
      case 'equipment':
        if (temp.isAdditionGroupShow || temp.isSettingPswShow) {
          return
        }
        temp.isAdditionEquipmentShow = !temp.isAdditionEquipmentShow
        this.setState({
          isShowHandle: temp
        })
        break;
      case 'group':
        if (temp.isAdditionEquipmentShow || temp.isSettingPswShow) {
          return
        }
        temp.isAdditionGroupShow = !temp.isAdditionGroupShow
        this.setState({
          isShowHandle: temp
        })
        break;
      case 'setting':
        if (temp.isAdditionEquipmentShow || temp.isAdditionGroupShow) {
          return
        }
        temp.isSettingPswShow = !temp.isSettingPswShow
        this.setState({
          isShowHandle: temp
        })
        break;
      default:
        break;
    }
  }


  // 添加分组确定按钮
  addGroupHandle = e => {
    var groupName = document.getElementById('add-group-input').value
    this.props.addGroup({ groupName: groupName, userId: this.userId }, data => {
      Toast.success('添加分组成功', 1)
      this.props.getDeviceGroup({ userId: this.userId })
    })
    var temp = this.state.isShowHandle
    temp.isAdditionGroupShow = false
    this.setState({
      isShowHandle: temp
    })
  }

  cancelAddGroupHandle = e => {
    var temp = this.state.isShowHandle
    temp.isAdditionGroupShow = false
    this.setState({
      isShowHandle: temp
    })
  }


  secondMenuHandle(item, e) {
  }

  editMinitoring(item, e) {
  }

  handleClick(e) {
    // this.setState({
    //   isAdditionShow: false
    // })
    var contentType = e.item.props.children
    var key = e.key
    var serial = key.split('-')[1]
    switch (contentType) {
      case '实时视频':
        history.push('/root/main/videos')
        break;
      case '告警信息':
        this.props.getWarningVideos({ serial: serial }, data => {
          if (data.data.uglyData) {
            var temp = data.data.uglyData
            var detailsTemp = []
            temp.map((item, index) => {
              var current_time = new Date();  //当前时间戳
              var old_time = new Date(item.createTime);
              var current_time = formatDate(current_time);
              var old_time = formatDate(old_time);
              //计算时间差
              var validDate = 30 - GetDateDiff(current_time, old_time);
              detailsTemp.push(Object.assign({}, item, { 'validDate': validDate + '天' }))
            })
            this.warningVideosList = JSON.parse(JSON.stringify(detailsTemp))
            this.setState({})
            // this.setState({
            //   warningMessageDetails: detailsTemp
            // })
          }
          this.getBusinessInfoPage.current.show()
        })
        // history.push('/root/main/warning?serial=' + serial)
        break;
      case '密度分析':
        // 请求密度分析数据
        this.props.getDensityPicture({ serial: serial }, data => {
          if (data.data.uglyData) {
            var temp = data.data.uglyData
            var densityListTemp = []
            temp.map((item, index) => {
              densityListTemp.push({ 'path': item.densityPicturePath, 'validDate': formatTime(item.createTime, 'Y-M-D h:m:s') })
            })
            this.densityList = JSON.parse(JSON.stringify(densityListTemp))
            this.setState({})
            // this.setState({
            //   densityList: densityListTemp
            // })
          }
          this.getDensityInfoPage.current.show()
        })

        // history.push('/root/main/density?serial=' + serial)
        break;
      default:
        break;
    }
  }

  /** 添加分组列表下拉操作start */
  onChange(value) {
    if (value) {
      addGroupId = JSON.parse(JSON.stringify(value))
    }
  }

  onBlur() {
  }

  onFocus() {
  }

  onSearch(val) {
  }
  /** 添加分组列表下拉操作end */


  UNSAFE_componentWillMount() {
    this.userId = localStorage.getItem('userId')
    if (this.userId === '' || this.userId === null || this.userId === '123456789') {
      Toast.fail('请进行登录', 1)
      history.push('/root/login')
      return
    } else {
      this.props.getDeviceGroup({ userId: this.userId })
    }
  }

  UNSAFE_componentWillReceiveProps(props, state) {
    if (props.deviceGroup.devGroupList !== state.myMinitoringGroup) {
      this.phoneNumber = props.deviceGroup.user.phoneNumber
      this.password = props.deviceGroup.user.password
      this.setState({
        myMinitoringGroup: props.deviceGroup.devGroupList
      })
    }
  }

  render() {
    const {
      myMinitoringGroup, } = this.state

    return (
      <div className="minitoring-mobile-component">
        <div className='minitoring-left-nav'>
          <div className='left-nav-mine'>
            <div className='nav-mine-title'>
              <div className='left-icon'><img onClick={this.additionShow.bind(this, 'setting')} className='setting-icon' alt='setting-icon' src={Setting}></img></div>
              <span className='center-title'>我的设备</span>
              <div className='right-icon'><span className='log-out' onClick={this.logOut.bind(this)}>退出</span></div>
            </div>
            <div className='nav-mine-list'>
              <div className='nav-mine-item'>
                <Menu onClick={this.handleClick} style={{ width: 256 }} mode="inline">
                  {
                    myMinitoringGroup && myMinitoringGroup.length !== 0 ? myMinitoringGroup.map((item, index) => {
                      return (
                        item.deviceGroup !== null && item.deviceGroup !== undefined ?
                          <SubMenu
                            key={index}
                            onTitleClick={this.clickSubMenu.bind(this)}
                            title={
                              <span style={{ width: '85%', overflow: 'hidden' }}>
                                <span title={item.deviceGroup ? item.deviceGroup.deviceGroupName : ''} className=''><span className='menu-left-icon'>+ </span>{item.deviceGroup.deviceGroupName}</span>
                                <Dropdown overlay={
                                  <Menu onClick={this.onGroupMenuClick.bind(this, item.deviceGroup)}>
                                    <Menu.Item key="0">修改分组名称</Menu.Item>
                                    <Menu.Item key="1">删除</Menu.Item>
                                  </Menu>
                                } trigger={['click']}>
                                  <span className='group-right-btn' defineGroupId={`1`} defineGroupName={`ww`}><img className='group-right-img' alt='group-right-img' src={ViewMore}></img></span>
                                </Dropdown>
                              </span>
                            }

                          >
                            {
                              item.deviceList && item.deviceList.length !== 0 ? item.deviceList.map((items, indexs) => {
                                return (
                                  items !== null && item.deviceGroup !== null && item.deviceGroup !== undefined ?
                                    <SubMenu
                                      key={item.deviceGroup.id + items.deviceName}
                                      onTitleClick={this.clickSubMenu.bind(this)}
                                      title={
                                        <span onClick={this.secondMenuHandle.bind(this, items)} style={{ height: '100%', display: 'block', width: '85%', overflow: 'hidden' }}>
                                          <span title={items.deviceName}><span className='menu-left-icon'>+ </span>{items.deviceName}</span>
                                          <span className={`group-device-status ${items.isOnline === '0' ? 'off-line-status' : ''}`}></span>
                                          <Dropdown overlay={
                                            <Menu onClick={this.onEquipmentMenuClick.bind(this, items, item.deviceGroup)}>
                                              <Menu.Item key="0">修改设备名称</Menu.Item>
                                              <Menu.Item key="1">移动分组</Menu.Item>
                                              <Menu.Item key="2">删除</Menu.Item>
                                            </Menu>
                                          } trigger={['click']}>
                                            <span className='group-right-btn'><img className='group-right-img' alt='group-right-img' src={ViewMore}></img></span>
                                          </Dropdown>
                                        </span>
                                      }
                                    >
                                      <Menu.Item key={`${item.deviceGroup.id + '-' + items.serial}-2`}>告警信息</Menu.Item>
                                      <Menu.Item key={`${item.deviceGroup.id + '-' + items.serial}-3`}>密度分析</Menu.Item>
                                    </SubMenu> : null
                                )
                              }) : ''
                            }
                          </SubMenu> : null
                      )
                    }) : ''
                  }
                </Menu>
              </div>
              <Modal
                title="修改分组名称"
                visible={this.state.editGroupVisibled}
                onOk={this.hideEditGroupModal.bind(this, this.state.editGroupItem, true)}
                onCancel={this.hideEditGroupModal.bind(this, this.state.editGroupItem, false)}
                okText="确认"
                cancelText="取消"
              >
                <input autoComplete="off" placeholder='请输入分组名称' id='edit-group-name' className='ant-modal-input'></input>
              </Modal>
              <Modal
                title="删除分组"
                visible={this.state.deleteGroupVisibled}
                onOk={this.hideDeleteGroupModal.bind(this, this.state.deleteGroupItem, true)}
                onCancel={this.hideDeleteGroupModal.bind(this, this.state.deleteGroupItem, false)}
                okText="确认"
                cancelText="取消"
              >
                <p>若删除该分组，您将删除该分组下的所有设备，确定删除该分组？</p>
              </Modal>
              <Modal
                title="修改设备名称"
                visible={this.state.editEquipmentVisibled}
                onOk={this.hideEditEquipmentModal.bind(this, this.state.editEquipmentItem, true)}
                onCancel={this.hideEditEquipmentModal.bind(this, this.state.editEquipmentItem, false)}
                okText="确认"
                cancelText="取消"
              >
                <input autoComplete="off" placeholder='请输入设备名称' id='edit-equipment-name' className='ant-modal-input'></input>
              </Modal>
              <Modal
                title="移动分组"
                visible={this.state.moveEquipmentVisibled}
                onOk={this.hideMoveEquipmentModal.bind(this, this.state.moveEquipmentItem, true)}
                onCancel={this.hideMoveEquipmentModal.bind(this, this.state.moveEquipmentItem, false)}
                okText="确认"
                cancelText="取消"
              >
                <Select
                  showSearch
                  style={{ width: '100%' }}
                  placeholder="请选择分组"
                  optionFilterProp="children"
                  onChange={this.onMoveDeviceChange}
                  onFocus={this.onMoveDeviceFocus}
                  onBlur={this.onMoveDeviceBlur}
                  onSearch={this.onMoveDeviceSearch}
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {
                    myMinitoringGroup && myMinitoringGroup.length !== 0 ? myMinitoringGroup.map((item, index) => {
                      return (
                        item.deviceGroup !== null && item.deviceGroup !== undefined ?
                          <Option value={item.deviceGroup.deviceGroupId} key={index}>{item.deviceGroup.deviceGroupName}</Option>
                          : ''
                      )
                    }) : ''
                  }
                </Select>
              </Modal>
              <Modal
                title="删除设备"
                visible={this.state.deleteEquipmentVisibled}
                onOk={this.hideDeleteEquipmentModal.bind(this, this.state.deleteEquipmentItem, true)}
                onCancel={this.hideDeleteEquipmentModal.bind(this, this.state.deleteEquipmentItem, false)}
                okText="确认"
                cancelText="取消"
              >
                <p>确定删除该设备？</p>
              </Modal>
            </div>
          </div>
          <div className='left-nav-bottom-btn'>
            <div className='left-add-group-btn' onClick={this.additionShow.bind(this, 'group')}>
              <img className='left-add-img' src={GroupAddition} alt='left-add-img'></img>
              <span className='left-add-group-title'>添加分组</span>
            </div>
            <div className='left-add-equipment-btn' onClick={this.additionShow.bind(this, 'equipment')}>
              <img className='left-add-img' src={EquipmentAddition} alt='left-add-img'></img>
              <span className='left-add-equipment-title'>添加设备</span>
            </div>
          </div>
        </div>

        {/** 添加设备/分组div */}
        <div className={`addition-model ${this.state.isShowHandle.isAdditionEquipmentShow || this.state.isShowHandle.isAdditionGroupShow || this.state.isShowHandle.isSettingPswShow ? '' : 'hide'}`}>
          <div className={`add-equipment-comfirm ${this.state.isShowHandle.isSettingPswShow ? '' : 'hide'}`}>
            <div className='add-equipment-form'>
              <span className='add-equipment-title'>修改密码</span>
              <input autoComplete="off" type='password' id='setting-old-psw' className='product-serial-number' placeholder='请输入旧密码'></input>
              <input autoComplete="off" type='password' id='setting-new-psw' className='product-serial-number' placeholder='请输入新密码'></input>
              <span className='cancel-btn' onClick={this.cancelCheckSettingPsw.bind(this)}>取消</span>
              <span className='add-equipment-sure-btn' onClick={this.checkSettingPsw.bind(this)}>确认</span>
            </div>
          </div>
          <div className={`add-equipment-comfirm ${this.state.isShowHandle.isAdditionGroupShow ? '' : 'hide'}`}>
            <div className='add-equipment-form'>
              <span className='add-equipment-title'>添加分组</span>
              <input autoComplete="off" id='add-group-input' className='product-serial-number' placeholder='请输入分组名称'></input>
              <span className='cancel-btn' onClick={this.cancelAddGroupHandle.bind(this)}>取消</span>
              <span className='add-equipment-sure-btn' onClick={this.addGroupHandle.bind(this)}>确认</span>
            </div>
          </div>

          <div className={`add-equipment-comfirm ${this.state.isShowHandle.isAdditionEquipmentShow ? '' : 'hide'}`}>
            <div className='add-equipment-form'>
              <form autocomplete="off" style={{ width: '100%' }}>
                <span className='add-equipment-title'>添加设备</span>
                <input autoComplete="off" id='add-equipment-product-num' className='product-serial-number' placeholder='请输入产品序列号'></input>
                <input autoComplete="off" id='add-equipment-psw' className='product-psw' placeholder='请输入设备验证码'></input>
                <Select
                  showSearch
                  style={{ width: '100%' }}
                  placeholder="请选择分组"
                  optionFilterProp="children"
                  onChange={this.onChange}
                  onFocus={this.onFocus}
                  onBlur={this.onBlur}
                  onSearch={this.onSearch}
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {
                    myMinitoringGroup && myMinitoringGroup.length !== 0 ? myMinitoringGroup.map((item, index) => {
                      return (
                        item.deviceGroup !== null && item.deviceGroup !== undefined ?
                          <Option value={item.deviceGroup.deviceGroupId} key={index}>{item.deviceGroup.deviceGroupName}</Option>
                          : ''
                      )
                    }) : ''
                  }
                </Select>
              </form>
              <span className='cancel-btn' onClick={this.cancelAddEquipmentHandle.bind(this)}>取消</span>
              <span className='add-equipment-sure-btn' onClick={this.addEquipmentHandle.bind(this)}>确认</span>
            </div>
          </div>


        </div>


        <InnerPage from="right" ref={this.getBusinessInfoPage} title='告警信息'>
          <WarningList getBusinessInfoPage={this.getBusinessInfoPage} warningVideos={this.warningVideosList} />
        </InnerPage>

        <InnerPage from="right" ref={this.getDensityInfoPage} title='密度分析'>
          <DensityList getDensityInfoPage={this.getDensityInfoPage} densityList={this.densityList} />
        </InnerPage>
      </div >
    )

  }
}
export default Minitoring
