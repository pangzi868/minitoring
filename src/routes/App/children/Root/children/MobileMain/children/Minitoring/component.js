import React from 'react'
import './component.scss'

import { Menu, Icon, Select, Dropdown, Modal } from 'antd';

import AddEquipment from './images/upper-bg.png'
import EgVideos from './images/videos.png'
import GroupAddition from './images/blue_add.png'
import EquipmentAddition from './images/yellow_add.png'
import Setting from './images/1.9.png'
import RightBtn from './images/4.3.png'
import DownloadBtn from './images/3.4.png'
import InnerPage from 'components/hz/InnerPage'
import { PullToRefresh, ListView, Toast } from 'antd-mobile';
import WarningList from './children/Warning/children/WarningList/component'
import DensityList from './children/Density/component'

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


let addGroupId = -1;
class Minitoring extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isShowHandle: {
        isAdditionEquipmentShow: false,
        isAdditionGroupShow: false
      },

      isAdditionShow: true,
      isRealTimeShow: false,
      isEmergencyShow: false,
      isAnalysisShow: false,


      // 告警信息
      warningMessageDetails: [],
      warningDetailIndex: 0,

      myMinitoringGroup: [],

    }

    this.warningVideosList = null
    this.densityList = null
    this.getBusinessInfoPage = React.createRef()
    this.getDensityInfoPage = React.createRef()
    this.secondMenuHandle = this.secondMenuHandle.bind(this)
    this.addEquipmentHandle = this.addEquipmentHandle.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.additionShow = this.additionShow.bind(this)
    this.addGroupHandle = this.addGroupHandle.bind(this)

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
        // userid 后期维护删除
        this.props.getDeviceGroup({ userId: '3' })
        addGroupId = -1
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

  additionShow = (type, e) => {
    var temp = this.state.isShowHandle
    switch (type) {
      case 'equipment':
        if (temp.isAdditionGroupShow) {
          return
        }
        temp.isAdditionEquipmentShow = !temp.isAdditionEquipmentShow
        this.setState({
          isShowHandle: temp
        })
        break;
      case 'group':
        if (temp.isAdditionEquipmentShow) {
          return
        }
        temp.isAdditionGroupShow = !temp.isAdditionGroupShow
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
    // userId 后期维护删除
    this.props.addGroup({ groupName: groupName, userId: '3' }, data => {
      Toast.success('添加分组成功', 1)
      this.props.getDeviceGroup({ userId: '3' })
    })
    var temp = this.state.isShowHandle
    temp.isAdditionGroupShow = false
    this.setState({
      isShowHandle: temp
    })
  }


  secondMenuHandle(item, e) {
    console.log(e, item)
  }

  editMinitoring(item, e) {
    console.log(item)
  }

  handleClick(e) {
    console.log('click', e);
    // this.setState({
    //   isAdditionShow: false
    // })
    var contentType = e.item.props.children
    var key = e.key
    var serial = key.split('-')[1]
    switch (contentType) {
      case '实时视频':
        this.props.history.push('/root/main/videos')
        break;
      case '告警信息':
        this.props.getWarningVideos({ serial: serial }, data => {
          if (data.uglyData) {
            var temp = data.uglyData
            var detailsTemp = []
            temp.map((item, index) => {
              detailsTemp.push(Object.assign({}, item, { 'validDate': '一个月' }))
            })
            this.warningVideosList = JSON.parse(JSON.stringify(detailsTemp))
            this.setState({})
            // this.setState({
            //   warningMessageDetails: detailsTemp
            // })
          }
          this.getBusinessInfoPage.current.show()
        })
        // this.props.history.push('/root/main/warning?serial=' + serial)
        break;
      case '密度分析':
        // 请求密度分析数据
        this.props.getDensityPicture({ serial: serial }, data => {
          if (data.uglyData) {
            var temp = data.uglyData
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

        // this.props.history.push('/root/main/density?serial=' + serial)
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
    console.log(`selected ${value}`);
  }

  onBlur() {
    console.log('blur');
  }

  onFocus() {
    console.log('focus');
  }

  onSearch(val) {
    console.log('search:', val);
  }
  /** 添加分组列表下拉操作end */
  UNSAFE_componentWillMount() {
    // userid 后期维护删除
    this.props.getDeviceGroup({ userId: '3' })
  }

  UNSAFE_componentWillReceiveProps(props, state) {
    if (props.deviceGroup.devGroupList !== state.myMinitoringGroup) {
      this.setState({
        myMinitoringGroup: props.deviceGroup.devGroupList
      })
    }
  }

  render() {
    const { match } = this.props
    const {
      myMinitoringGroup, } = this.state
    return (
      <div className="minitoring-mobile-component">
        <div className='minitoring-left-nav'>
          <div className='left-nav-mine'>
            <div className='nav-mine-title'>
              <div className='left-icon'><img className='setting-icon' alt='setting-icon' src={Setting}></img></div>
              <span className='center-title'>我的设备</span>
              <div className='right-icon'></div>
            </div>
            <div className='nav-mine-list'>
              <div className='nav-mine-item'>
                <Menu onClick={this.handleClick} style={{ width: 256 }} mode="inline">
                  {
                    myMinitoringGroup && myMinitoringGroup.length !== 0 ? myMinitoringGroup.map((item, index) => {
                      return (
                        item.devGroup !== undefined ?
                          <SubMenu
                            key={index}
                            title={
                              <span style={{ width: '85%', overflow: 'hidden' }}>
                                <span title={item.devGroup.groupName} className=''>{` + ` + item.devGroup.groupName}</span>
                                {/* <Dropdown overlay={
                                  <Menu onClick={this.onGroupMenuClick.bind(this, item.devGroup)}>
                                    <Menu.Item key="0">修改分组名称</Menu.Item>
                                    <Menu.Item key="1">删除</Menu.Item>
                                  </Menu>
                                } trigger={['click']}>
                                  <span className='group-right-btn' defineGroupId={`1`} defineGroupName={`ww`}><img className='group-right-img' alt='group-right-img' src={ViewMore}></img></span>
                                </Dropdown> */}
                              </span>
                            }

                          >
                            {
                              item.deviceList && item.deviceList.length !== 0 ? item.deviceList.map((items, indexs) => {
                                return (
                                  items !== null ?
                                    <SubMenu
                                      key={item.devGroup.groupName + items.deviceName}
                                      title={
                                        <span onClick={this.secondMenuHandle.bind(this, items)} style={{ height: '100%', display: 'block', width: '85%', overflow: 'hidden' }}>
                                          {/* <Icon type="appstore" /> */}
                                          <span title={items.deviceName}>{` + ` + items.deviceName}</span>
                                          {/* <Dropdown overlay={
                                            <Menu onClick={this.onEquipmentMenuClick.bind(this, items, item.devGroup)}>
                                              <Menu.Item key="0">修改设备名称</Menu.Item>
                                              <Menu.Item key="1">移动分组</Menu.Item>
                                              <Menu.Item key="2">删除</Menu.Item>
                                            </Menu>
                                          } trigger={['click']}>
                                            <span className='group-right-btn'><img className='group-right-img' alt='group-right-img' src={ViewMore}></img></span>
                                          </Dropdown> */}
                                        </span>
                                      }
                                    >
                                      {/* <Menu.Item key={`${item.devGroup.groupName + '-' + items.serial}-1`}>实时视频</Menu.Item> */}
                                      <Menu.Item key={`${item.devGroup.groupName + '-' + items.serial}-2`}>告警信息</Menu.Item>
                                      <Menu.Item key={`${item.devGroup.groupName + '-' + items.serial}-3`}>密度分析</Menu.Item>
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
        <div className={`addition-model ${this.state.isShowHandle.isAdditionEquipmentShow || this.state.isShowHandle.isAdditionGroupShow ? '' : 'hide'}`}>
          <div className={`add-equipment-comfirm ${this.state.isShowHandle.isAdditionGroupShow ? '' : 'hide'}`}>
            <div className='add-equipment-form'>
              <span className='add-equipment-title'>添加分组</span>
              <input id='add-group-input' className='product-serial-number' placeholder='请输入分组名称'></input>
              <span className='add-equipment-sure-btn' onClick={this.addGroupHandle.bind(this)}>确认</span>
            </div>
          </div>

          <div className={`add-equipment-comfirm ${this.state.isShowHandle.isAdditionEquipmentShow ? '' : 'hide'}`}>
            <div className='add-equipment-form'>
              <span className='add-equipment-title'>添加设备</span>
              <input id='add-equipment-product-num' className='product-serial-number' placeholder='请输入产品序列号'></input>
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
                      item.devGroup !== undefined ?
                        <Option value={item.devGroup.groupId} key={index}>{item.devGroup.groupName}</Option>
                        : null
                    )
                  }) : ''
                }
              </Select>
              <input id='add-equipment-psw' className='product-psw' placeholder='请输入密码'></input>
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
