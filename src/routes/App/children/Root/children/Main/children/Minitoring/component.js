import React from 'react'
import './component.scss'
import {
  Player, ControlBar, ReplayControl,
  ForwardControl, CurrentTimeDisplay,
  TimeDivider, PlaybackRateMenuButton, VolumeMenuButton
} from 'video-react';
// import "node_modules/video-react/dist/video-react.css"; // import css
// import '~video-react/dist/video-react.css';

import { Menu, Icon, Dropdown, Modal } from 'antd';

import AddEquipment from './images/upper-bg.png'
import EgVideos from './images/videos.png'
import GroupAddition from './images/blue_add.png'
import EquipmentAddition from './images/yellow_add.png'
import RightBtn from './images/4.3.png'
import ViewMore from './images/sidebar-viewmore.svg'
import DownloadBtn from './images/3.4.png'
import WarningPicture from './images/warning.png'

const { SubMenu } = Menu;

const SRC_PATH = 'http://112.74.77.11/shungkon'

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

class Minitoring extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      editGroupVisibled: false,
      editEquipmentVisibled: false,
      isAdditionShow: true,
      isRealTimeShow: false,
      isEmergencyShow: false,
      isAnalysisShow: false,
      isAdditionEquipmentShow: true,
      isAdditionGroupShow: false,

      warningMessageDetails: [],
      densityList: [],
      warningDetailIndex: 0,
      densityDetailIndex: 0,

      // 模拟列表数据
      myMinitoringList: [
        {
          minitoringName: '南山分店',
          childrenList: [
            {
              'name': '设备1',
              'id': '1',
              'status': true
            },
            {
              'name': '设备2',
              'id': '2',
              'status': false
            },
            {
              'name': '设备3',
              'id': '3',
              'status': false
            },
          ]
        },
        {
          minitoringName: '龙华分店',
          childrenList: [
            {
              'name': '设备1',
              'id': '4',
              'status': true
            },
            {
              'name': '设备2',
              'id': '5',
              'status': false
            },
            {
              'name': '设备3',
              'id': '6',
              'status': false
            },
          ]
        },
        {
          minitoringName: '宝安分店',
          childrenList: [
            {
              'name': '设备1',
              'id': '7',
              'status': true
            },
            {
              'name': '设备2',
              'id': '8',
              'status': false
            },
            {
              'name': '设备3',
              'id': '9',
              'status': false
            },
          ]
        },
      ]
    }

    this.secondMenuHandle = this.secondMenuHandle.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.additionShowHandle = this.additionShowHandle.bind(this)
    this.addGroupHandle = this.addGroupHandle.bind(this)
    this.addEquipmentHandle = this.addEquipmentHandle.bind(this)
    this.warningDetailChangeHandle = this.warningDetailChangeHandle.bind(this)
    this.onGroupMenuClick = this.onGroupMenuClick.bind(this)
    this.onEquipmentMenuClick = this.onEquipmentMenuClick.bind(this)
  }

  // 分组菜单按钮
  onGroupMenuClick = (e) => {
    e.domEvent.stopPropagation();
    console.log(e, 'wangyinbin')
    console.log(document.getElementById('groupDropdown-1'))
    console.log(document.getElementById('groupDropdown-1').defineGroupId)
    console.log(document.getElementById('groupDropdown-1').defineGroupName)
    switch (e.key) {
      case '0':
        this.showEditGroupModal();
        break;
      case '1':
        Modal.confirm({
          title: '删除分组',
          content: '是否删除该分组？',
          okText: '确认',
          cancelText: '取消',
        });
        break;
      default:
        break;
    }
  };
  // 设备菜单按钮
  onEquipmentMenuClick = (e) => {
    e.domEvent.stopPropagation();
    switch (e.key) {
      case '0':
        this.showEditEquipmentModal();
        break;
      case '1':
        Modal.confirm({
          title: '删除分组',
          content: '是否删除该分组？',
          okText: '确认',
          cancelText: '取消',
        });
        break;
      case '2':
        Modal.confirm({
          title: '删除分组',
          content: '是否删除该分组？',
          okText: '确认',
          cancelText: '取消',
        });
        break;
      default:
        break;
    }
  };

  // 修改分组名称弹窗
  showEditGroupModal = (e) => {
    this.setState({
      editGroupVisibled: true,
    });
  };

  // 隐藏修改分组名称弹窗
  hideEditGroupModal = (e) => {
    e.preventDefault();
    this.setState({
      editGroupVisibled: false,
    });
  };

  // 修改设备名称弹窗
  showEditEquipmentModal = (e) => {
    this.setState({
      editEquipmentVisibled: true,
    });
  };

  // 隐藏设备名称弹窗
  hideEditEquipmentModal = (e) => {
    e.preventDefault();
    this.setState({
      editEquipmentVisibled: false,
    });
  };

  secondMenuHandle(item, e) {
    console.log(e, item)
  }

  editMinitoring(item, e) {
    console.log(item)
  }

  // 添加分组确定按钮
  addGroupHandle = e => {
    var groupName = document.getElementById('add-group-input').value
    alert('添加成功')
    this.setState({
      isAdditionGroupShow: false
    })
  }

  // 添加设备确定按钮
  addEquipmentHandle = e => {
    var productNun = document.getElementById('add-equipment-product-num').value
    var password = document.getElementById('add-equipment-psw').value
    alert('添加成功')
    this.setState({
      isAdditionEquipmentShow: false
    })

  }

  // 控制添加设备/分组显示
  additionShowHandle = (type, e) => {
    switch (type) {
      case 'group':
        this.setState({
          isAdditionGroupShow: !this.state.isAdditionGroupShow,
          isAdditionEquipmentShow: false
        })
        break;
      case 'equipment':
        this.setState({
          isAdditionEquipmentShow: !this.state.isAdditionEquipmentShow,
          isAdditionGroupShow: false
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

  handleClick(e) {
    this.setState({
      isAdditionShow: false
    })
    var contentType = e.item.props.children
    switch (contentType) {
      case '实时视频':
        this.setState({
          isRealTimeShow: true,
          isEmergencyShow: false,
          isAnalysisShow: false,
          isAdditionEquipmentShow: false,
          isAdditionGroupShow: false,
        })
        break;
      case '告警信息':
        // 请求告警信息数据
        this.props.getWarningVideos({ serial: 'QSZN001' }, data => {
          if (data.uglyData) {
            var temp = data.uglyData
            var detailsTemp = []
            temp.map((item, index) => {
              detailsTemp.push(Object.assign({}, item, { 'validDate': '一个月' }))
            })
            this.setState({
              warningMessageDetails: detailsTemp
            })
          }
        })
        this.setState({
          isRealTimeShow: false,
          isEmergencyShow: true,
          isAnalysisShow: false,
          isAdditionEquipmentShow: false,
          isAdditionGroupShow: false,
        })
        break;
      case '密度分析':
        // 请求密度分析数据
        this.props.getDensityPicture({ serial: 'QSZN001' }, data => {
          if (data.uglyData) {
            var temp = data.uglyData
            var densityListTemp = []
            temp.map((item, index) => {
              densityListTemp.push({ 'path': item, 'validDate': '2019-0807-15:00:00' })
            })
            this.setState({
              densityList: densityListTemp
            })
          }
        })

        this.setState({
          isRealTimeShow: false,
          isEmergencyShow: false,
          isAnalysisShow: true,
          isAdditionEquipmentShow: false,
          isAdditionGroupShow: false,
        })
        break;
      default:
        break;
    }
  }

  UNSAFE_componentWillMount() {
    this.props.getDeviceGroup({ userId: '3' }, data => {
      console.log(data, 'wangyinbinb')
    })
  }

  render() {
    const { match, warningVideos } = this.props
    const { myMinitoringList, densityList, densityDetailIndex, warningDetailIndex } = this.state
    const groupMenu = (
      <Menu onClick={this.onGroupMenuClick.bind(this)}>
        <Menu.Item key="0">修改分组名称</Menu.Item>
        <Menu.Item key="1">删除</Menu.Item>
      </Menu>
    );

    const equipmentMenu = (
      <Menu onClick={this.onEquipmentMenuClick.bind(this)}>
        <Menu.Item key="0">修改设备名称</Menu.Item>
        <Menu.Item key="1">移动分组</Menu.Item>
        <Menu.Item key="2">删除</Menu.Item>
      </Menu>
    );
    return (
      <div className="minitoring-component">
        <div className='minitoring-left-nav'>
          <div className='left-nav-mine'>
            <div className='nav-mine-title'>我的设备</div>
            <div className='nav-mine-list'>
              <div className='nav-mine-item'>
                <Menu onClick={this.handleClick} style={{ width: 256 }} mode="inline">
                  {
                    myMinitoringList && myMinitoringList.length !== 0 ? myMinitoringList.map((item, index) => (
                      <SubMenu
                        key={index}
                        title={
                          <span>
                            <span>{` + ` + item.minitoringName}</span>
                            <Dropdown id={`groupDropdown-2`} overlay={groupMenu} trigger={['click']}>
                              <span id={`groupDropdown-1`} className='group-right-btn' defineGroupId={`1`} defineGroupName={`ww`}><img className='group-right-img' alt='group-right-img' src={ViewMore}></img></span>
                            </Dropdown>
                          </span>
                        }
                      >
                        {
                          item.childrenList && item.childrenList.length !== 0 ? item.childrenList.map((items, indexs) => (
                            <SubMenu
                              key={item.minitoringName + indexs}
                              title={
                                <span onClick={this.secondMenuHandle.bind(this, items)} style={{ height: '100%', width: '100%', display: 'block' }}>
                                  {/* <Icon type="appstore" /> */}
                                  <span>{` + ` + items.name}</span>
                                  <Dropdown overlay={equipmentMenu} trigger={['click']}>
                                    <span className='group-right-btn'><img className='group-right-img' alt='group-right-img' src={ViewMore}></img></span>
                                  </Dropdown>
                                </span>
                              }

                            >
                              {/* <Menu.Item key={`${item.minitoringName + items.id}-1`}>实时视频</Menu.Item> */}
                              <Menu.Item key={`${item.minitoringName + items.id}-2`}>告警信息</Menu.Item>
                              <Menu.Item key={`${item.minitoringName + items.id}-3`}>密度分析</Menu.Item>
                            </SubMenu>
                          )) : ''
                        }
                      </SubMenu>
                    )) : ''
                  }
                </Menu>
              </div>
              <Modal
                title="Modal"
                visible={this.state.editGroupVisibled}
                onOk={this.hideEditGroupModal.bind(this)}
                onCancel={this.hideEditGroupModal.bind(this)}
                okText="确认"
                cancelText="取消"
              >
                <p>Bla bla ...</p>
                <p>Bla bla ...</p>
                <p>Bla bla ...</p>
              </Modal>
              <Modal
                title="Modal"
                visible={this.state.editEquipmentVisibled}
                onOk={this.hideEditEquipmentModal.bind(this)}
                onCancel={this.hideEditEquipmentModal.bind(this)}
                okText="确认"
                cancelText="取消"
              >
                <p>Bla bla .</p>
                <p>Bla bla .</p>
                <p>Bla bla .</p>
              </Modal>
            </div>
          </div>
          <div className='left-nav-bottom-btn'>
            <div className='left-add-group-btn' onClick={this.additionShowHandle.bind(this, 'group')}>
              <img className='left-add-img' src={GroupAddition} alt='left-add-img'></img>
              <span className='left-add-group-title'>添加分组</span>
            </div>
            <div className='left-add-equipment-btn' onClick={this.additionShowHandle.bind(this, 'equipment')}>
              <img className='left-add-img' src={EquipmentAddition} alt='left-add-img'></img>
              <span className='left-add-equipment-title'>添加设备</span>
            </div>
          </div>
        </div>

        <div className='minitoring-right-content'>

          {/** 添加设备div
            *  isAdditionShow控制
            */}
          <div className={`add-equipment-content ${this.state.isAdditionShow ? '' : 'hide'}`}>
            <img alt='add-equipment-img' className='add-equipment-img' src={AddEquipment}></img>
          </div>
          <div className='add-equipment-content'>
            <div className={`add-equipment-comfirm ${this.state.isAdditionEquipmentShow ? '' : 'hide'}`}>
              <div className='add-equipment-form'>
                <span className='add-equipment-title'>添加设备</span>
                <input id='add-equipment-product-num' className='product-serial-number' placeholder='请输入产品序列号'></input>
                <input id='add-equipment-psw' className='product-psw' placeholder='请输入密码'></input>
                <span className='add-equipment-sure-btn' onClick={this.addEquipmentHandle.bind(this)}>确认</span>
              </div>
            </div>
            <div className={`add-equipment-comfirm ${this.state.isAdditionGroupShow ? '' : 'hide'}`}>
              <div className='add-equipment-form'>
                <span className='add-equipment-title'>添加分组</span>
                <input id='add-group-input' className='product-serial-number' placeholder='请输入分组名称'></input>
                <span className='add-equipment-sure-btn' onClick={this.addGroupHandle.bind(this)}>确认</span>
              </div>
            </div>
          </div>

          {/** 实时视频div
            *  isRealTimeShow控制
            */}
          <div className={`monitoring-detail-content real-time-content ${this.state.isRealTimeShow ? '' : 'hide'}`}>
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
          <div className={`monitoring-detail-content emegency-message-content ${this.state.isEmergencyShow ? '' : 'hide'}`}>

            <div className='emegency-left-content'>
              <div className='emegency-left-title'>告警信息</div>
              <div className='emegency-left-list'>
                {
                  warningVideos.uglyData && warningVideos.uglyData.length > 0 ? warningVideos.uglyData.map((item, index) => (
                    <div className='emegency-left-item' key={index} onClick={this.warningDetailChangeHandle.bind(this, index)}>
                      <span className='wd-span wd33'>{item.serial}</span>
                      {/* <span className='wd-span wd44'>{formatTime(item.createTime, 'Y-M-D h:m:s')}</span> */}
                      <span className='wd-span wd44'>{item.warningTime}</span>
                      <img src={WarningPicture} className='emegency-left-item-img' alt='emegency-left-item-img'></img>
                    </div>
                  ))
                    : ''
                }
              </div>
            </div>
            {
              this.state.warningMessageDetails.length > 0 ?
                <div>
                  <div className='emegency-right-top-videos'>
                    <div style={{ width: '100%', height: '100%' }}>
                      <Player>
                        {/* <source src={SRC_PATH + this.state.warningMessageDetails[warningDetailIndex]['warningVideoPath']} /> */}
                        <source src={`file:///home/ftp123${this.state.warningMessageDetails[warningDetailIndex]['warningVideoPath']}`} />
                        {/* <source src="http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4" /> */}
                        {/* <source src="http://mirrorblender.top-ix.org/movies/sintel-1024-surround.mp4" /> */}
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
                    <span className='right-bottom-message right-bottom-message-3'>有效期限：{this.state.warningMessageDetails[warningDetailIndex]['validDate']}</span>
                  </div>
                </div> :
                <div>
                  <div className='emegency-right-top-videos'>
                    <img src={WarningPicture} className='emegency-right-top-img' alt='emegency-right-top-img'></img>
                  </div>
                  <div className='emegency-right-bottom-message'>
                    <span className='right-bottom-message right-bottom-message-1'>详细信息： </span>
                    <span className='right-bottom-message right-bottom-message-2'>暂无</span>
                    <span className='right-bottom-message right-bottom-message-3'>有效期限：--</span>
                  </div>
                </div>
            }

          </div>

          {/** 密度分析div
            *  isAnalysisShow控制
          */}
          <div className={`monitoring-detail-content density-analysis-content ${this.state.isAnalysisShow ? '' : 'hide'}`}>

            <div className='minitoring-density-analysis-videos'>
              <div className='minitoring-density-analysis-videos-title'>
                <span className='density-analysis-title left-title'>设备1</span>
                <span className='density-analysis-title center-title'>密度分析</span>
                <span className='density-analysis-title right-title'></span>
              </div>

              <img className='density-analysis-videos-img' src={densityList.length !== 0 ? SRC_PATH + densityList[densityDetailIndex].path : ''} alt='density-analysis-videos-img'></img>
            </div>
            <div className='minitoring-density-analysis-list'>
              <div className='mimitoring-density-list'>
                {
                  densityList && densityList.length !== 0 ? densityList.map((item, index) => (
                    <div className='density-analysis-item' key={index}>
                      <img className='density-analysis-item-img' alt='density-analysis-item-img' src={SRC_PATH + item.path}></img>
                      <span className='density-analysis-item-date'>{item.validDate}</span>
                    </div>
                  )) : ''
                }
              </div>
            </div>
            {/* <img alt='density-analysis-right-btn' className='density-analysis-right-btn' src={RightBtn}></img> */}
          </div>

        </div>
      </div >
    )

  }
}
export default Minitoring
