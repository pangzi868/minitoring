import React from 'react'
import './component.scss'

import { Menu, Select, Dropdown, Modal } from 'antd';

import ReactDOM from 'react-dom'
import {
  Player, ControlBar, ReplayControl,
  ForwardControl, CurrentTimeDisplay,
  TimeDivider, PlaybackRateMenuButton, VolumeMenuButton
} from 'video-react';
import history from 'history.js'
// import reqwest from 'reqwest';

import UserManager from './children/UserManager'
import LogListManage from './children/LogListManage'
import MonitoringManage from './children/MonitoringManage'

import AddEquipment from './images/upper-bg.png'
import GroupAddition from './images/blue_add.png'
import DownloadBtn from './images/3.4.png'
import ViewMore from './images/sidebar-viewmore.svg'
import File from './images/4.1.png'
import Company from './images/company.png'
import { renderToString } from "react-dom/server";
import jsPDF from "jspdf";

const { SubMenu } = Menu;

const { Option } = Select;
const FILE_UPLOAD_ADDRESS = 'http://112.74.77.11:2019/shungkon/attach/upload'
const IMG_DOWNLOAD_ADDRESS = 'http://112.74.77.11:2019'

const SRC_PATH = 'http://112.74.77.11:2019/shungkon'


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
      iFrameHeight: '0px',
      isWindowShow: {
        isRealTimeShow: false,
        isEmergencyShow: false,
        isAnalysisShow: false,
        isLogListShow: false,
        isUpdateFirmwareShow: false,
        isUserManagerShow: false,
        isMinitoringManagerShow: false,

        isAdditionShow: true,
        isSecondPsw: false,

        isAdditionEquipmentShow: false,
        isAdditionGroupShow: false,
      },

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

      fileList: [],
      uploading: false,
      clickMinitoring: {},
      isMinitoringClick: false,

      // 告警信息
      warningMessageDetails: [],
      warningDetailIndex: 0,

      // 密度分析
      densityList: [],
      densityDetailIndex: 0,


      myMinitoringGroup: [],
    }
    this.serial = null;
    this.userId = null;
    this.tempDeviceList = null;
    this.deviceDetail = null;
    this.tempUserList = null;
    this.tempLogList = null;
    this.rootPhone = null;

    this.fileInput = React.createRef();
    this.myForm = React.createRef();

    this.logOut = this.logOut.bind(this)
    this.secondMenuHandle = this.secondMenuHandle.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.leftBottomShowOrHideHandle = this.leftBottomShowOrHideHandle.bind(this)
    this.additionShowHandle = this.additionShowHandle.bind(this)
    this.addGroupHandle = this.addGroupHandle.bind(this)
    this.cancelAddGroupHandle = this.cancelAddGroupHandle.bind(this)
    this.addEquipmentHandle = this.addEquipmentHandle.bind(this)
    this.cancelAddEquipmentHandle = this.cancelAddEquipmentHandle.bind(this)
    this.enterDeviceToSystem = this.enterDeviceToSystem.bind(this)
    this.getDeviceListByCondition = this.getDeviceListByCondition.bind(this)
    this.getDeviceDetail = this.getDeviceDetail.bind(this)
    this.checkSettingPsw = this.checkSettingPsw.bind(this)
    this.cancelCheckSettingPsw = this.cancelCheckSettingPsw.bind(this)
    this.densityDetailHandle = this.densityDetailHandle.bind(this)
    this.getUserListByPhoneNum = this.getUserListByPhoneNum.bind(this)
    this.addUserInfo = this.addUserInfo.bind(this)
    this.checkSecondPsw = this.checkSecondPsw.bind(this)
    this.deleteUserInfo = this.deleteUserInfo.bind(this)
    this.onGroupMenuClick = this.onGroupMenuClick.bind(this)
    this.changeLogList = this.changeLogList.bind(this)
    this.onEquipmentMenuClick = this.onEquipmentMenuClick.bind(this)
    this.densityImgDown = this.densityImgDown.bind(this)
  }

  // menu的点击事件
  clickSubMenu = e => {
    var dom = e.domEvent.currentTarget.children[0].children[0].children[0]
    dom.innerText = dom.innerText === '+ ' ? '- ' : '+ '
  }

  // 二级按钮确定按钮
  checkSecondPsw = e => {
    var isWindowShowCopy = this.state.isWindowShow
    var password = document.getElementById('second-psw').value
    if (password === '') {
      alert('请输入密码!')
      return
    }
    this.props.checkSecondPsw({
      rootPhone: this.rootPhone,
      isRoot: true,
      password: password
    }, data => {
      this.props.getFuzzyDeviceList({
        // serial: "w4324",
        serial: "",
        deviceType: "",
        productDate: "",
        pageNo: 1,
        pageSize: 10
      }, data => {
        this.tempDeviceList = JSON.parse(JSON.stringify(data))
        document.getElementById('second-psw').value = ''
        this.setState({})
      })

      Object.keys(isWindowShowCopy).map((items, index) => {
        switch (items) {
          case 'isMinitoringManagerShow':
            isWindowShowCopy[items] = true
            break;
          default:
            isWindowShowCopy[items] = false
            break;
        }
      })
      this.setState({
        isMinitoringClick: true,
        isWindowShow: isWindowShowCopy
      })
    })

  }

  logOut = e => {
    localStorage.setItem('userId', '')
    history.push('/root/login')
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

  imgDownLoad = e => {
    e.preventDefault();
  }

  // 修改密码确定按钮
  checkSettingPsw = e => {
    var oldPassword = document.getElementById('setting-old-psw').value
    var newPassword = document.getElementById('setting-new-psw').value
    var phoneNumber = this.phoneNumber

    var passwordReg = /(?!^\d+$)(?!^[A-Za-z]+$)(?!^[^A-Za-z0-9]+$)(?!^.*[\u4E00-\u9FA5].*$)^\S{8,20}$/

    if (oldPassword !== this.password) {
      alert('请输入正确的旧密码')
      return
    }
    if (oldPassword === newPassword) {
      alert('请勿输入与旧密码相同的密码')
      return
    }
    if (!passwordReg.test(newPassword)) {
      alert('请输入8-20位密码，字母/数字/符号至少2种')
      return
    }

    // 验证成功后登录
    this.props.modifyPassword({
      phoneNumber: phoneNumber,
      oldPassword: oldPassword,
      newPassword: newPassword,
    }, data => {
      alert('修改密码成功')

      var temp = this.state.isWindowShow
      temp.isSettingPswShow = !temp.isSettingPswShow
      this.setState({
        isWindowShow: temp
      })
    })
  }

  // 修改密码取消按钮
  cancelCheckSettingPsw = e => {
    var temp = this.state.isWindowShow
    temp.isSettingPswShow = !temp.isSettingPswShow
    this.setState({
      isWindowShow: temp
    })
  }

  // 修改分组名称弹窗
  showEditGroupModal = (item, e) => {
    var groupId = item.rootDeviceGroupId
    var groupName = item.rootDeviceGroupName
    this.setState({
      editGroupVisibled: true,
      editGroupItem: { groupId: groupId, oldGroupName: groupName }
    });
  };

  // 隐藏修改分组名称弹窗
  hideEditGroupModal = (item, bool, e) => {
    e.preventDefault();
    if (bool) {
      var groupName = document.getElementById('edit-group-name').value
      var oldGroupName = item.oldGroupName
      if (!groupName) {
        alert('请输入新的分组名称！')
        return
      }
      this.props.editRootGroup({ groupId: item.groupId, groupName: groupName, oldGroupName: oldGroupName },
        data => {
          this.props.getRootDeviceGroup({ userId: this.userId })
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
    var groupId = item.rootDeviceGroupId
    this.setState({
      deleteGroupVisibled: true,
      deleteGroupItem: { groupId: groupId }
    });
  };

  // 删除修改分组弹窗
  hideDeleteGroupModal = (item, bool, e) => {
    e.preventDefault();
    if (bool) {
      this.props.deletRootGroupName({ groupId: item.groupId },
        data => {
          this.props.getRootDeviceGroup({ userId: this.userId })
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
          this.props.getRootDeviceGroup({ userId: this.userId })
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
    var groupId = group.rootDeviceGroupId
    this.setState({
      moveEquipmentVisibled: true,
      moveEquipmentItem: { deviceId: deviceId, groupId: groupId }
    });
  };

  // 隐藏移动分组弹窗
  hideMoveEquipmentModal = (item, bool, e) => {
    e.preventDefault();
    if (bool) {
      if (item.groupId !== moveGroupId) {
        this.props.moveRootEquipmentName({ deviceId: item.deviceId, groupId: item.groupId, newGroupId: moveGroupId },
          data => {
            this.props.getRootDeviceGroup({ userId: this.userId })
          }
        )
      } else {
        alert('请选择不同分组')
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
    var groupId = group.rootDeviceGroupId
    this.setState({
      deleteEquipmentVisibled: true,
      deleteEquipmentItem: { deviceId: deviceId, groupId: groupId }
    });
  };

  // 删除修改设备弹窗
  hideDeleteEquipmentModal = (item, bool, e) => {
    e.preventDefault();
    if (bool) {
      this.props.deleteGroupDevice({ deviceId: item.deviceId, groupId: item.groupId },
        data => {
          this.props.getRootDeviceGroup({ userId: this.userId })
        }
      )
    }
    this.setState({
      deleteEquipmentVisibled: false,
      deleteEquipmentItem: null
    });
  };

  // 录入设备信息
  enterDeviceToSystem = (params) => {
    this.props.addDeviceToSystem(params, data => {
      alert('设备录入成功')
      this.props.getFuzzyDeviceList({
        // serial: "w4324",
        serial: "",
        deviceType: "",
        productDate: "",
        pageNo: 1,
        pageSize: 10
      }, data => {
        this.tempDeviceList = JSON.parse(JSON.stringify(data))
        this.setState({})
      })
    })
  }

  // 根据条件查询设备信息
  getDeviceListByCondition = (params) => {
    this.props.getFuzzyDeviceList({
      // serial: "w4324",
      serial: params.serial,
      deviceType: params.deviceType,
      productDate: params.productDate,
      pageNo: params.pageNo,
      pageSize: params.pageSize
    }, data => {
      this.tempDeviceList = JSON.parse(JSON.stringify(data))
      this.setState({})
    })
  }

  // 根据手机号码查询用户信息
  getUserListByPhoneNum = (params) => {
    this.props.getUserList({
      phoneNumber: params.phoneNumber || '',
      pageNo: params.pageNo,
      pageSize: params.pageSize
    }, data => {
      this.tempUserList = JSON.parse(JSON.stringify(data))
      this.setState({})
    })
  }

  // 用户管理添加设备
  addUserInfo = (params) => {
    this.props.addUserDevice({
      phoneNumber: params.phoneNumber,
      serial: params.serial,
      deviceVertifyCode: params.deviceVertifyCode
    }, data => {

      this.props.getUserList({
        phoneNumber: params.phoneNumber || '',
        pageNo: params.pageNo,
        pageSize: params.pageSize
      }, data => {

        this.tempUserList = JSON.parse(JSON.stringify(data))
        this.setState({})
      })
    })
  }

  // 用户管理删除设备
  deleteUserInfo = (params) => {
    this.props.deleteUserDevice({
      userId: params.userId,
      deviceId: params.deviceId,
    }, data => {
      this.props.getUserList({
        phoneNumber: '',
        pageNo: params.pageNo,
        pageSize: params.pageSize
      }, data => {
        this.tempUserList = JSON.parse(JSON.stringify(data))
        this.setState({})
      })
    })
  }

  getDeviceDetail = (deviceId) => {
    this.props.getDeviceDetails({ deviceId: deviceId }, data => {
      this.deviceDetail = JSON.parse(JSON.stringify(data))
      this.setState({})
    })
  }

  secondMenuHandle(item, e) {
  }

  editMinitoring(item, e) {
  }

  densityImgDown = (path) => {
    debugger
    var params = JSON.stringify({
      key: 'value'
    })
    let formElement = document.createElement('form');
    formElement.style.display = "display:none;";
    formElement.method = 'post';
    formElement.action = SRC_PATH + path;
    formElement.target = 'callBackTarget';
    let inputElement = document.createElement('input');
    inputElement.type = 'hidden';
    inputElement.name = "params";
    inputElement.value = params;
    formElement.appendChild(inputElement);
    document.body.appendChild(formElement);
    formElement.submit();
    document.body.removeChild(formElement);
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

  // 添加分组确定按钮
  addGroupHandle = e => {
    var groupName = document.getElementById('add-group-input').value
    this.props.addRootGroup({ groupName: groupName, userId: this.userId }, data => {
      alert('添加成功')
      this.props.getRootDeviceGroup({ userId: this.userId })
    })
    var temp = this.state.isWindowShow
    temp.isAdditionGroupShow = false
    this.setState({
      isWindowShow: temp
    })
  }

  // 添加分组取消按钮
  cancelAddGroupHandle = e => {
    var temp = this.state.isWindowShow
    temp.isAdditionGroupShow = false
    this.setState({
      isWindowShow: temp
    })
  }

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
        alert('添加设备成功')
        document.getElementById('add-equipment-product-num').value = ''
        document.getElementById('add-equipment-psw').value = ''
        this.props.getRootDeviceGroup({ userId: this.userId })
      })
    } else {
      alert('请选择分组')
      return
    }
    var temp = this.state.isWindowShow
    temp.isAdditionEquipmentShow = false
    this.setState({
      isWindowShow: temp
    })

  }

  // 添加设备取消按钮
  cancelAddEquipmentHandle = e => {
    var temp = this.state.isWindowShow
    temp.isAdditionEquipmentShow = false
    this.setState({
      isWindowShow: temp
    })
  }

  // 控制添加设备/分组显示;修改密码显示
  additionShowHandle = (type, e) => {
    var temp = this.state.isWindowShow
    switch (type) {
      case 'group':
        temp.isAdditionGroupShow = !temp.isAdditionGroupShow;
        temp.isAdditionEquipmentShow = false;
        temp.isSettingPswShow = false;
        this.setState({
          isWindowShow: temp
        })
        break;
      case 'equipment':
        temp.isAdditionEquipmentShow = !temp.isAdditionEquipmentShow;
        temp.isAdditionGroupShow = false;
        temp.isSettingPswShow = false;
        this.setState({
          isWindowShow: temp
        })
        break;
      case 'setting':
        temp.isSettingPswShow = !temp.isSettingPswShow
        temp.isAdditionGroupShow = false;
        temp.isAdditionEquipmentShow = false;
        this.setState({
          isWindowShow: temp
        })
        break;
      default:
        break;
    }
  }

  // 告警信息详细信息切换
  warningDetailChangeHandle = index => {
    if (this.state.warningDetailIndex !== index) {
      this.setState({
        warningDetailIndex: index
      })
    }
  }

  // 密度分析详细信息切换
  densityDetailHandle = index => {
    if (this.setState.densityDetailIndex !== index) {
      this.setState({
        densityDetailIndex: index
      })
    }
  }

  handleClick(e) {
    var contentType = e.item.props.children
    var monitoringName = e.key
    var serial = monitoringName.split('-')[1]
    this.serial = serial
    var isWindowShowCopy = this.state.isWindowShow
    switch (contentType) {
      case '实时视频':
        Object.keys(isWindowShowCopy).map((items, index) => {
          switch (items) {
            case 'isRealTimeShow':
              isWindowShowCopy[items] = true
              break;
            default:
              isWindowShowCopy[items] = false
              break;
          }
        })
        isWindowShowCopy.isAdditionGroupShow = false
        isWindowShowCopy.isAdditionEquipmentShow = false
        isWindowShowCopy.isSettingPswShow = false
        this.setState({
          isWindowShow: isWindowShowCopy
        })
        break;
      case '告警信息':

        // 请求告警信息数据
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
            this.setState({
              warningDetailIndex: 0,
              warningMessageDetails: detailsTemp
            })
          } else {
            this.setState({
              warningDetailIndex: 0,
              warningMessageDetails: []
            })
          }
        })
        Object.keys(isWindowShowCopy).map((items, index) => {
          switch (items) {
            case 'isEmergencyShow':
              isWindowShowCopy[items] = true
              break;
            default:
              isWindowShowCopy[items] = false
              break;
          }
        })
        isWindowShowCopy.isSettingPswShow = false
        isWindowShowCopy.isAdditionGroupShow = false
        isWindowShowCopy.isAdditionEquipmentShow = false
        this.setState({
          isWindowShow: isWindowShowCopy
        })
        break;
      case '密度分析':
        // 请求密度分析数据
        this.props.getDensityPicture({ serial: serial }, data => {
          if (data.data.uglyData) {
            var temp = data.data.uglyData
            var densityTempList = []
            temp.map((item, index) => {
              densityTempList.push({ 'path': item.densityPicturePath, 'validDate': formatTime(item.createTime, 'Y-M-D h:m:s') })
            })
            this.setState({
              densityDetailIndex: 0,
              densityList: densityTempList
            })
          } else {
            this.setState({
              densityDetailIndex: 0,
              densityList: []
            })
          }
        })
        Object.keys(isWindowShowCopy).map((items, index) => {
          switch (items) {
            case 'isAnalysisShow':
              isWindowShowCopy[items] = true
              break;
            default:
              isWindowShowCopy[items] = false
              break;
          }
        })
        isWindowShowCopy.isAdditionGroupShow = false
        isWindowShowCopy.isSettingPswShow = false
        isWindowShowCopy.isAdditionEquipmentShow = false
        this.setState({
          isWindowShow: isWindowShowCopy
        })
        break;
      case '日志列表':
        // 请求密度分析数据
        this.props.getLogList({
          serial: serial,
          startTime: "",
          endTime: "",
          pageNo: 1,
          pageSize: 15
        }, data => {
          try {
            this.tempLogList = JSON.parse(JSON.stringify(data))
            this.setState({})
            // Do something that could throw
          } catch (error) {
            console.log(error)
          }

          // if (data.uglyData) {
          //   var temp = data.uglyData
          //   var LogListTemp = []
          //   temp.map((item, index) => {
          //     LogListTemp.push({ 'item': item })
          //   })
          //   this.setState({
          //     logList: LogListTemp
          //   })
          // }
        })
        Object.keys(isWindowShowCopy).map((items, index) => {
          switch (items) {
            case 'isLogListShow':
              isWindowShowCopy[items] = true
              break;
            default:
              isWindowShowCopy[items] = false
              break;
          }
        })
        this.setState({
          isWindowShow: isWindowShowCopy
        })
        break;
      default:
        break;
    }
  }

  changeLogList = (params) => {
    this.props.getLogList({
      serial: this.serial,
      startTime: params.startTime,
      endTime: params.endTime,
      pageNo: params.pageNo,
      pageSize: params.pageSize
    }, data => {
      try {
        this.tempLogList = JSON.parse(JSON.stringify(data))
        this.setState({})
        // Do something that could throw
      } catch (error) {
        console.log(error)
      }
    })
  }

  // 导航栏下栏按钮操作
  leftBottomShowOrHideHandle(index) {
    var isWindowShowCopy = this.state.isWindowShow
    switch (index) {
      case '1':
        this.props.getUserList({
          phoneNumber: '',
          pageNo: 1,
          pageSize: 10
        }, data => {
          this.tempUserList = JSON.parse(JSON.stringify(data))
          this.setState({})
        })
        Object.keys(isWindowShowCopy).map((items, index) => {
          switch (items) {
            case 'isUserManagerShow':
              isWindowShowCopy[items] = true
              break;
            default:
              isWindowShowCopy[items] = false
              break;
          }
        })
        this.setState({
          isWindowShow: isWindowShowCopy
        })
        break;
      case '2':
        if (isWindowShowCopy.isMinitoringManagerShow) {
          return
        }
        Object.keys(isWindowShowCopy).map((items, index) => {
          switch (items) {
            case 'isSecondPsw':
              isWindowShowCopy[items] = true
              break;
            case 'isAdditionShow':
              break;
            default:
              isWindowShowCopy[items] = false
              break;
          }
        })
        this.setState({
          isWindowShow: isWindowShowCopy
        })
        break;
      case '3':
        Object.keys(isWindowShowCopy).map((items, index) => {
          switch (items) {
            case 'isUpdateFirmwareShow':
              isWindowShowCopy[items] = true
              break;
            default:
              isWindowShowCopy[items] = false
              break;
          }
        })
        this.setState({
          isWindowShow: isWindowShowCopy

        })
        break;
      default:
        break;
    }
  }

  //上传文件
  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('files[]', file);
    });

    this.setState({
      uploading: true,
    });
  };


  upload = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("file", this.fileInput.current.files[0]);
    let request = new Request(FILE_UPLOAD_ADDRESS, {
      method: 'POST',
      // credentials: 'include',
      headers: {
        'Accept': '*',
      },
      contentType: 'multipart/form-data',
      body: formData,
      mode: 'cors'
    });
    fetch(request).then(res => res.text()).then(res =>
      JSON.parse(res).message ? alert(JSON.parse(res).message) : alert('上传失败'))
  };

  componentDidUpdate(_prevProps, _prevState) {
    if (this.refs.videos) {
      ReactDOM.findDOMNode(this.refs.videos.video).load();
    }
  }


  UNSAFE_componentWillMount() {
    this.userId = localStorage.getItem('userId')
    this.rootPhone = localStorage.getItem('phoneNum')
    if (this.userId === '' || this.userId === null || this.userId !== '123456789') {
      alert('请进行登录')
      history.push('/root/login')
      return
    }
    this.props.getRootDeviceGroup({ userId: this.userId })
  }

  UNSAFE_componentWillReceiveProps(props, state) {
    if (props.rootDeviceGroup.uglyData !== state.myMinitoringGroup) {
      this.setState({
        myMinitoringGroup: props.rootDeviceGroup.uglyData
      })
    }
  }

  render() {
    const { match, warningVideos } = this.props
    const { fileList,
      myMinitoringGroup,
      warningDetailIndex,
      densityList,
      densityDetailIndex } = this.state
    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };
    return (
      <div className="manager-component">
        <div className='log-out' onClick={this.logOut.bind(this)}>退出</div>
        <div className='minitoring-left-nav'>
          <div className='left-nav-mine'>
            <div className='nav-mine-title'>所有设备</div>
            <div className='nav-mine-list'>
              <div className='nav-mine-item'>
                <Menu
                  onClick={this.handleClick}
                  style={{ width: 256 }}
                  mode="inline"
                >
                  {
                    myMinitoringGroup && myMinitoringGroup.length !== 0 ? myMinitoringGroup.map((item, index) => {
                      return (
                        item.rootDeviceGroup !== null && item.rootDeviceGroup !== undefined ?
                          <SubMenu
                            key={index}
                            onTitleClick={this.clickSubMenu.bind(this)}
                            title={
                              <span style={{ width: '85%', overflow: 'hidden' }}>
                                <span title={item.rootDeviceGroup.rootDeviceGroupName} className=''><span className='menu-left-icon'>+ </span>{item.rootDeviceGroup.rootDeviceGroupName}</span>
                                <Dropdown overlay={
                                  <Menu onClick={this.onGroupMenuClick.bind(this, item.rootDeviceGroup)}>
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
                                  items !== null && item.rootDeviceGroup !== null && item.rootDeviceGroup !== undefined ?
                                    <SubMenu
                                      key={item.rootDeviceGroup.id + items.deviceId}
                                      onTitleClick={this.clickSubMenu.bind(this)}
                                      title={
                                        <span onClick={this.secondMenuHandle.bind(this, items)} style={{ height: '100%', display: 'block', width: '85%', overflow: 'hidden' }}>
                                          {/* <Icon type="appstore" /> */}
                                          <span title={items.deviceName}><span className='menu-left-icon'>+ </span>{items.deviceName}</span>
                                          <span className={`group-device-status ${items.isOnline === '0' ? 'off-line-status' : ''}`}></span>
                                          <Dropdown overlay={
                                            <Menu onClick={this.onEquipmentMenuClick.bind(this, items, item.rootDeviceGroup)}>
                                              {/* <Menu.Item key="0">修改设备名称</Menu.Item> */}
                                              <Menu.Item key="1">移动分组</Menu.Item>
                                              <Menu.Item key="2">删除</Menu.Item>
                                            </Menu>
                                          } trigger={['click']}>
                                            <span className='group-right-btn'><img className='group-right-img' alt='group-right-img' src={ViewMore}></img></span>
                                          </Dropdown>
                                        </span>
                                      }
                                    >
                                      {/* <Menu.Item key={`${item.rootDeviceGroup.id + '-' + items.serial}-1`}>实时视频</Menu.Item> */}
                                      <Menu.Item key={`${item.rootDeviceGroup.id + '-' + items.serial}-2`}>告警信息</Menu.Item>
                                      <Menu.Item key={`${item.rootDeviceGroup.id + '-' + items.serial}-3`}>密度分析</Menu.Item>
                                      <Menu.Item key={`${item.rootDeviceGroup.id + '-' + items.serial}-4`}>日志列表</Menu.Item>
                                    </SubMenu> : null
                                )
                              }) : ''
                            }
                          </SubMenu> : null
                      )
                    }) : ''
                  }
                </Menu>
                {/* </div> */}
              </div>
              <Modal
                title="修改分组名称"
                visible={this.state.editGroupVisibled}
                onOk={this.hideEditGroupModal.bind(this, this.state.editGroupItem, true)}
                onCancel={this.hideEditGroupModal.bind(this, this.state.editGroupItem, false)}
                okText="确认"
                cancelText="取消"
              >
                <input placeholder='请输入分组名称' id='edit-group-name' className='ant-modal-input'></input>
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
                <input placeholder='请输入设备名称' id='edit-equipment-name' className='ant-modal-input'></input>
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
                        item.rootDeviceGroup !== null && item.rootDeviceGroup !== undefined ?
                          <Option value={item.rootDeviceGroup.rootDeviceGroupId} key={index}>{item.rootDeviceGroup.rootDeviceGroupName}</Option>
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
          <div className='left-bottom-nav'>
            <div className='left-nav-bottom-btn'>
              <div className='left-add-group-btn'>
                <img className='left-add-img' src={GroupAddition} alt='left-add-img' onClick={this.additionShowHandle.bind(this, 'group')}></img>
                <span className='left-add-group-title'>添加分组</span>
              </div>
              {/* <div className='left-add-equipment-btn'>
                <img className='left-add-img' src={EquipmentAddition} alt='left-add-img' onClick={this.additionShowHandle.bind(this, 'equipment')}></img>
                <span className='left-add-equipment-title'>添加设备</span>
              </div> */}
              {/* <img className='user-setting' alt='user-setting' src={Setting} onClick={this.additionShowHandle.bind(this, 'setting')}></img> */}
            </div>

            <div className='manager-left-btn'>
              <div className={`nav-manager-title ${this.state.isWindowShow.isUserManagerShow ? 'nav-manager-title-active' : ''}`} onClick={this.leftBottomShowOrHideHandle.bind(this, '1')}>用户管理</div>
              <div className={`nav-manager-title ${this.state.isWindowShow.isMinitoringManagerShow ? 'nav-manager-title-active' : ''}`} onClick={this.leftBottomShowOrHideHandle.bind(this, '2')}>设备管理</div>
              <div className={`nav-manager-title ${this.state.isWindowShow.isUpdateFirmwareShow ? 'nav-manager-title-active' : ''}`} onClick={this.leftBottomShowOrHideHandle.bind(this, '3')}>更新固件</div>
            </div>
          </div>
        </div>

        <div className='minitoring-right-content'>

          {/** 添加设备div
            *  isAdditionShow控制
            */}
          <div className={`add-equipment-content ${this.state.isWindowShow.isAdditionShow ? '' : 'hide'}`}>
            <img alt='add-equipment-img' className='add-equipment-img' src={AddEquipment}></img>
          </div>
          <div className='add-equipment-content'>
            <div className={`add-equipment-comfirm ${this.state.isWindowShow.isAdditionEquipmentShow ? '' : 'hide'}`}>
              <div className='add-equipment-form'>
                <span className='add-equipment-title'>添加设备</span>
                <input id='add-equipment-product-num' className='product-serial-number' placeholder='请输入产品序列号'></input>
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
                        item.rootDeviceGroup !== null && item.rootDeviceGroup !== undefined ?
                          <Option value={item.rootDeviceGroup.rootDeviceGroupId} key={index}>{item.rootDeviceGroup.rootDeviceGroupName}</Option>
                          : ''
                      )
                    }) : ''
                  }
                </Select>
                <span className='cancel-btn' onClick={this.cancelAddEquipmentHandle.bind(this)}>取消</span>
                <span className='add-equipment-sure-btn' onClick={this.addEquipmentHandle.bind(this)}>确认</span>
              </div>
            </div>
            <div className={`add-equipment-comfirm ${this.state.isWindowShow.isAdditionGroupShow ? '' : 'hide'}`}>
              <div className='add-equipment-form'>
                <span className='add-equipment-title'>添加分组</span>
                <input id='add-group-input' className='product-serial-number' placeholder='请输入分组名称'></input>
                <span className='cancel-btn' onClick={this.cancelAddGroupHandle.bind(this)}>取消</span>
                <span className='add-equipment-sure-btn' onClick={this.addGroupHandle.bind(this)}>确认</span>
              </div>
            </div>
            <div className={`add-equipment-comfirm ${this.state.isWindowShow.isSettingPswShow ? '' : 'hide'}`}>
              <div className='add-equipment-form'>
                <span className='add-equipment-title'>修改密码</span>
                <input type='password' id='setting-old-psw' className='product-serial-number' placeholder='请输入旧密码'></input>
                <input type='password' id='setting-new-psw' className='product-serial-number' placeholder='请输入新密码'></input>
                <span className='cancel-btn' onClick={this.cancelCheckSettingPsw.bind(this)}>取消</span>
                <span className='add-equipment-sure-btn' onClick={this.checkSettingPsw.bind(this)}>确认</span>
              </div>
            </div>
            <div className={`add-equipment-comfirm ${this.state.isWindowShow.isSecondPsw ? '' : 'hide'}`}>
              <div className='add-equipment-form'>
                <span className='add-equipment-title'>请输入二级密码</span>
                <input type='password' id='second-psw' className='product-serial-number' placeholder='请输入二级密码'></input>
                <span className='add-equipment-sure-btn' onClick={this.checkSecondPsw.bind(this)}>确认</span>
              </div>
            </div>
          </div>

          {/** 实时视频div
            *  isRealTimeShow控制
            */}
          <div className={`monitoring-detail-content real-time-content ${this.state.isWindowShow.isRealTimeShow ? '' : 'hide'}`}>
            <div className='minitoring-real-time-videos'>
              <div className='minitoring-real-time-videos-title'>
                <span className='real-time-title left-title'>设备1</span>
                <span className='real-time-title center-title'>实时视频</span>
                <span className='real-time-title right-title'></span>

              </div>

              <img className='real-time-videos-img' src={AddEquipment} alt='real-time-videos-img'></img>
            </div>
            <div className='minitoring-real-time-list'>
              <div className='real-time-list'>
                <div className='real-time-item'>
                  <img className='real-time-item-img' alt='real-time-item-img' src={AddEquipment}></img>
                  <span className='real-time-item-date'>2019-0730-17:30:00</span>
                  <img className='real-time-download-img' alt='real-time-download-img' src={DownloadBtn}></img>
                </div>
                <div className='real-time-item'>
                  <img className='real-time-item-img' alt='real-time-item-img' src={AddEquipment}></img>
                  <span className='real-time-item-date'>2019-0730-17:30:00</span>
                  <img className='real-time-download-img' alt='real-time-download-img' src={DownloadBtn}></img>
                </div>
                <div className='real-time-item'>
                  <img className='real-time-item-img' alt='real-time-item-img' src={AddEquipment}></img>
                  <span className='real-time-item-date'>2019-0730-17:30:00</span>
                  <img className='real-time-download-img' alt='real-time-download-img' src={DownloadBtn}></img>
                </div>
                <div className='real-time-item'>
                  <img className='real-time-item-img' alt='real-time-item-img' src={AddEquipment}></img>
                  <span className='real-time-item-date'>2019-0730-17:30:00</span>
                  <img className='real-time-download-img' alt='real-time-download-img' src={DownloadBtn}></img>
                </div>
                <div className='real-time-item'>
                  <img className='real-time-item-img' alt='real-time-item-img' src={AddEquipment}></img>
                  <span className='real-time-item-date'>2019-0730-17:30:00</span>
                  <img className='real-time-download-img' alt='real-time-download-img' src={DownloadBtn}></img>
                </div>
                <div className='real-time-item'>
                  <img className='real-time-item-img' alt='real-time-item-img' src={AddEquipment}></img>
                  <span className='real-time-item-date'>2019-0730-17:30:00</span>
                  <img className='real-time-download-img' alt='real-time-download-img' src={DownloadBtn}></img>
                </div>
              </div>
              {/* <img alt='real-time-right-btn' className='real-time-right-btn' src={RightBtn}></img> */}
            </div>
          </div>

          {/** 告警信息div
            *  isEmegencyShow控制
          */}
          <div className={`monitoring-detail-content emegency-message-content ${this.state.isWindowShow.isEmergencyShow ? '' : 'hide'}`}>

            <div className='emegency-left-content'>
              <div className='emegency-left-title'>告警信息</div>
              <div className='emegency-left-list'>
                <div className='emegency-left-list-box'>
                  {
                    warningVideos.data && warningVideos.data.uglyData && warningVideos.data.uglyData.length > 0 ? warningVideos.data.uglyData.map((item, index) => (
                      <div className={`emegency-left-item ${warningDetailIndex === index ? 'emegency-left-item-focus' : ''}`} key={index} onClick={this.warningDetailChangeHandle.bind(this, index)}>
                        <span className='wd-span wd33'>{item.serial}</span>
                        {/* <span className='wd-span wd44'>{formatTime(item.createTime, 'Y-M-D h:m:s')}</span> */}
                        <span className='wd-span wd44'>{item.warningTime}</span>
                        <img src={Company} className='emegency-left-item-img' alt='emegency-left-item-img'></img>
                      </div>
                    ))
                      : <div className='no-list'>此设备暂无告警信息</div>
                  }
                </div>
              </div>
            </div>
            {
              this.state.warningMessageDetails.length > 0 ?
                <div>
                  <div className='emegency-right-top-videos'>
                    <div style={{ width: '100%', height: '100%' }}>
                      <Player ref='videos'>
                        <source src={SRC_PATH + this.state.warningMessageDetails[warningDetailIndex]['warningVideoPath']} />
                        <ControlBar>
                          <ReplayControl seconds={10} order={1.1} />
                          <ForwardControl seconds={30} order={1.2} />
                          <CurrentTimeDisplay order={4.1} />
                          <TimeDivider order={4.2} />
                          <PlaybackRateMenuButton
                            rates={[5, 2, 1, 0.5, 0.1]}
                            order={7.1}
                          />
                          <VolumeMenuButton disabled />
                        </ControlBar>
                      </Player>
                    </div>
                  </div>
                  <div className='emegency-right-bottom-message'>
                    <span className='right-bottom-message right-bottom-message-1'>详细信息： </span>
                    <span className='right-bottom-message right-bottom-message-2'>{this.state.warningMessageDetails[warningDetailIndex]['warningMessage']}</span>
                    <span className='right-bottom-message right-bottom-message-3'>保存时间：{this.state.warningMessageDetails[warningDetailIndex]['validDate']}</span>
                  </div>
                </div> :
                <div>
                  <div className='emegency-right-top-videos'>
                    <img src={Company} className='emegency-right-top-img' alt='emegency-right-top-img'></img>
                  </div>
                  <div className='emegency-right-bottom-message'>
                    <span className='right-bottom-message right-bottom-message-1'>详细信息： </span>
                    <span className='right-bottom-message right-bottom-message-2'>暂无</span>
                    <span className='right-bottom-message right-bottom-message-3'>保存时间：--</span>
                  </div>
                </div>
            }
          </div>

          {/** 密度分析div
            *  isAnalysisShow控制
          */}
          <div className={`monitoring-detail-content density-analysis-content ${this.state.isWindowShow.isAnalysisShow ? '' : 'hide'}`}>

            <div className='minitoring-density-analysis-videos'>
              <div className='minitoring-density-analysis-videos-title'>
                <span className='density-analysis-title left-title'></span>
                <span className='density-analysis-title center-title'>密度分析</span>
                <span className='density-analysis-title right-title'></span>
              </div>
              {
                densityList.length !== 0 ?
                  <img className='density-analysis-videos-img' src={SRC_PATH + densityList[densityDetailIndex].path} alt='density-analysis-videos-img'></img>
                  : ''
              }
            </div>
            <div className='minitoring-density-analysis-list'>
              <div className='mimitoring-density-list'>
                {
                  densityList && densityList.length !== 0 ? densityList.map((item, index) => (
                    <div className='density-analysis-item' key={index} onClick={this.densityDetailHandle.bind(this, index)}>
                      <img className='density-analysis-item-img' alt='density-analysis-item-img' src={SRC_PATH + item.path}></img>
                      <span className='density-analysis-item-date'>{item.validDate}</span>
                      {/* <a download href={SRC_PATH + item.path} ><img className='density-analysis-download-img' alt='density-analysis-download-img' src={DownloadBtn}></img></a> */}
                    </div>
                  )) : <div className='no-list'>此设备暂无密度图片信息</div>
                }
              </div>
              <div id='downloadDiv' style={{ display: 'none' }}></div>
            </div>
          </div>

          {/** 日志管理div
            *  isLogListShow控制
           */}
          <div className={`monitoring-detail-content log-list-content ${this.state.isWindowShow.isLogListShow ? '' : 'hide'}`}>
            <LogListManage
              logManageList={this.tempLogList}
              changeLogList={this.changeLogList.bind(this)} />
          </div>

          {/** 更新固件
            *  isUpdateFirmwareShow控制
          */}
          <div className={`monitoring-detail-content update-firmware-content ${this.state.isWindowShow.isUpdateFirmwareShow ? '' : 'hide'}`}>
            <div className='firmware-title'>更新固件</div>
            <div className='firmware-content'>
              <img src={File} alt='firmware-content-file' className='firmware-content-file'></img>
              <span className='firmware-content-filename'>shangkang-2019.0731</span>
            </div>
            <div className='upload-content'>
              <form ref={this.myForm} method="post">
                <input type="file" name='file' ref={this.fileInput} />
                <input type="submit" value="上传" onClick={this.upload} />
              </form>
            </div>
          </div>


          {/** 用户管理
            *  isUserManagerShow控制
          */}
          <div className={`monitoring-detail-content user-manager-content ${this.state.isWindowShow.isUserManagerShow ? '' : 'hide'}`}>
            <UserManager
              userManagerList={this.tempUserList}
              getUserListByPhoneNum={this.getUserListByPhoneNum.bind(this)}
              addUserInfo={this.addUserInfo.bind(this)}
              deleteUserInfo={this.deleteUserInfo.bind(this)}
            />
          </div>


          {/** 设备管理
            *  isMinitoringManagerShow控制
          */}
          <div className={`monitoring-detail-content minitoring-manager-content ${this.state.isWindowShow.isMinitoringManagerShow ? '' : 'hide'}`}>
            <MonitoringManage
              clickMinitoring={this.tempDeviceList}
              deviceDetail={this.deviceDetail}
              enterDeviceToSystem={this.enterDeviceToSystem.bind(this)}
              getDeviceListByCondition={this.getDeviceListByCondition.bind(this)}
              getDeviceDetail={this.getDeviceDetail.bind(this)} />
          </div>
        </div>
      </div >
    )

  }
}
export default Minitoring
