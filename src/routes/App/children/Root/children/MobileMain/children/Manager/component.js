import React from 'react'
import './component.scss'

import { Menu, Icon, Upload, Button, message } from 'antd';

// import reqwest from 'reqwest';

import UserManager from './children/UserManager'
import MonitoringManage from './children/MonitoringManage'
import LogListManage from './children/LogListManage'

import AddEquipment from './images/upper-bg.png'
import EgVideos from './images/videos.png'
import GroupAddition from './images/blue_add.png'
import EquipmentAddition from './images/yellow_add.png'
import RightBtn from './images/4.3.png'
import DownloadBtn from './images/3.4.png'
import File from './images/4.1.png'
import UploadFile from './images/4.2.png'

const { SubMenu } = Menu;


class Minitoring extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      LogListMonitoring: '',
      isWindowShow: {
        isAdditionShow: true,
        isRealTimeShow: false,
        isEmergencyShow: false,
        isAnalysisShow: false,
        isLogListShow: false,
        isUpdateFirmwareShow: false,
        isUserManagerShow: false,
        isMinitoringManagerShow: false
      },
      fileList: [],
      uploading: false,
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
    this.leftBottomShowOrHideHandle = this.leftBottomShowOrHideHandle.bind(this)
  }

  secondMenuHandle(item, e) {
  }

  editMinitoring(item, e) {
  }

  handleClick(e) {
    var contentType = e.item.props.children
    var monitoringName = e.key
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
        this.setState({
          isWindowShow: isWindowShowCopy
        })
        break;
      case '告警信息':
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
        this.setState({
          isWindowShow: isWindowShowCopy
        })
        break;
      case '密度分析':
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
        this.setState({
          isWindowShow: isWindowShowCopy
        })
        break;
      case '日志列表':
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
          isWindowShow: isWindowShowCopy,
          LogListMonitoring: monitoringName.split('-')[0] + '-' + monitoringName.split('-')[1]
        })
        break;
      default:
        break;
    }
  }

  // 导航栏下栏按钮操作
  leftBottomShowOrHideHandle(index) {
    var isWindowShowCopy = this.state.isWindowShow
    switch (index) {
      case '1':
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

    // You can use any AJAX library you like
    // reqwest({
    //   url: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    //   method: 'post',
    //   processData: false,
    //   data: formData,
    //   success: () => {
    //     this.setState({
    //       fileList: [],
    //       uploading: false,
    //     });
    //     message.success('upload successfully.');
    //   },
    //   error: () => {
    //     this.setState({
    //       uploading: false,
    //     });
    //     message.error('upload failed.');
    //   },
    // });
  };


  UNSAFE_componentWillMount() {
  }

  render() {
    const { match } = this.props
    const { uploading, fileList, myMinitoringList, LogListMonitoring } = this.state
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
                            <span>{item.minitoringName}</span>
                          </span>
                        }
                      >
                        {
                          item.childrenList && item.childrenList.length !== 0 ? item.childrenList.map((items, indexs) => (
                            <SubMenu
                              key={item.minitoringName + items.name}
                              title={
                                <span onClick={this.secondMenuHandle.bind(this, items)} style={{ height: '100%', width: '100%', display: 'block' }}>
                                  {/* <Icon type="appstore" /> */}
                                  <span>{items.name}</span>
                                </span>
                              }

                            >
                              <Menu.Item key={`${item.minitoringName + '-' + items.name}-1`}>实时视频</Menu.Item>
                              <Menu.Item key={`${item.minitoringName + '-' + items.name}-2`}>告警信息</Menu.Item>
                              <Menu.Item key={`${item.minitoringName + '-' + items.name}-3`}>密度分析</Menu.Item>
                              <Menu.Item key={`${item.minitoringName + '-' + items.name}-4`}>日志列表</Menu.Item>
                            </SubMenu>
                          )) : ''
                        }
                      </SubMenu>
                    )) : ''
                  }
                </Menu>
              </div>
            </div>
          </div>
          <div className='left-bottom-nav'>
            <div className='left-nav-bottom-btn'>
              <div className='left-add-group-btn'>
                <img className='left-add-img' src={GroupAddition} alt='left-add-img'></img>
                <span className='left-add-group-title'>添加分组</span>
              </div>
              <div className='left-add-equipment-btn'>
                <img className='left-add-img' src={EquipmentAddition} alt='left-add-img'></img>
                <span className='left-add-equipment-title'>添加设备</span>
              </div>
            </div>

            <div className='manager-left-btn'>
              <div className='nav-manager-title' onClick={this.leftBottomShowOrHideHandle.bind(this, '1')}>用户管理</div>
              <div className='nav-manager-title' onClick={this.leftBottomShowOrHideHandle.bind(this, '2')}>设备管理</div>
              <div className='nav-manager-title' onClick={this.leftBottomShowOrHideHandle.bind(this, '3')}>更新固件</div>
            </div>
          </div>
        </div>

        <div className='minitoring-right-content'>

          {/** 添加设备div
            *  isAdditionShow控制
            */}
          <div className={`add-equipment-content ${this.state.isWindowShow.isAdditionShow ? '' : 'hide'}`}>
            <img alt='add-equipment-img' className='add-equipment-img' src={AddEquipment}></img>
            <div className='add-equipment-form'>
              <span className='add-equipment-title'>添加设备</span>
              <input className='product-serial-number' placeholder='请输入产品序列号'></input>
              <input className='product-psw' placeholder='请输入密码'></input>
              <span className='add-equipment-sure-btn'>确认</span>
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
              <img alt='real-time-right-btn' className='real-time-right-btn' src={RightBtn}></img>
            </div>
          </div>

          {/** 告警信息div
            *  isEmegencyShow控制
          */}
          <div className={`monitoring-detail-content emegency-message-content ${this.state.isWindowShow.isEmergencyShow ? '' : 'hide'}`}>

            <div className='emegency-left-content'>
              <div className='emegency-left-title'>告警信息</div>
              <div className='emegency-left-list'>
                <div className='emegency-left-item'>
                  <span className='wd-span wd33'>设备1</span>
                  <span className='wd-span wd44'>2019-0807 01:08:09</span>
                  <img src={AddEquipment} className='emegency-left-item-img' alt='emegency-left-item-img'></img>
                </div>
                <div className='emegency-left-item'>
                  <span className='wd-span wd33'>设备1</span>
                  <span className='wd-span wd44'>2019-0807 01:08:09</span>
                  <img src={AddEquipment} className='emegency-left-item-img' alt='emegency-left-item-img'></img>
                </div>
                <div className='emegency-left-item'>
                  <span className='wd-span wd33'>设备1</span>
                  <span className='wd-span wd44'>2019-0807 01:08:09</span>
                  <img src={AddEquipment} className='emegency-left-item-img' alt='emegency-left-item-img'></img>
                </div>
              </div>
            </div>

            <div className='emegency-right-top-videos'>
              <img src={AddEquipment} className='emegency-right-top-img' alt='emegency-right-top-img'></img>
            </div>

            <div className='emegency-right-bottom-message'>
              <span className='right-bottom-message right-bottom-message-1'>详细信息： </span>
              <span className='right-bottom-message right-bottom-message-2'>2019年02月5日，上午9时02分03秒，广州噼里啪啦设备机发现目标，目标在右下角，并成功驱赶</span>
              <span className='right-bottom-message right-bottom-message-3'>有效期限：一个月</span>
            </div>
          </div>

          {/** 密度分析div
            *  isAnalysisShow控制
          */}
          <div className={`monitoring-detail-content density-analysis-content ${this.state.isWindowShow.isAnalysisShow ? '' : 'hide'}`}>

            <div className='minitoring-density-analysis-videos'>
              <div className='minitoring-density-analysis-videos-title'>
                <span className='density-analysis-title left-title'>设备1</span>
                <span className='density-analysis-title center-title'>密度分析</span>
                <span className='density-analysis-title right-title'></span>
              </div>

              <img className='density-analysis-videos-img' src={EgVideos} alt='density-analysis-videos-img'></img>
            </div>
            <div className='minitoring-density-analysis-list'>
              <div className='density-analysis-item'>
                <img className='density-analysis-item-img' alt='density-analysis-item-img' src={EgVideos}></img>
                <span className='density-analysis-item-date'>2019-0730-17:30:00</span>
              </div>
              <div className='density-analysis-item'>
                <img className='density-analysis-item-img' alt='density-analysis-item-img' src={EgVideos}></img>
                <span className='density-analysis-item-date'>2019-0730-17:30:00</span>
              </div>
              <div className='density-analysis-item'>
                <img className='density-analysis-item-img' alt='density-analysis-item-img' src={EgVideos}></img>
                <span className='density-analysis-item-date'>2019-0730-17:30:00</span>
              </div>
              <img alt='density-analysis-right-btn' className='density-analysis-right-btn' src={RightBtn}></img>
            </div>
          </div>

          {/** 日志管理div
            *  isLogListShow控制
           */}
          <div className={`monitoring-detail-content log-list-content ${this.state.isWindowShow.isLogListShow ? '' : 'hide'}`}>
            <LogListManage cont={LogListMonitoring} />
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
              <Upload {...props}>
                <div className='upload-div'>
                  <input className='upload-input'></input>
                  <img src={UploadFile} alt='upload-img' className='upload-img'></img>
                </div>
                {/* <Button>
                    <Icon type="upload" /> Select File
                  </Button> */}
              </Upload>
              <Button
                type="primary"
                onClick={this.handleUpload}
                disabled={fileList.length === 0}
                loading={uploading}
                className='upload-btn'
              >
                {uploading ? '上传中...' : '上传固件'}
              </Button>
            </div>
          </div>


          {/** 用户管理
            *  isUserManagerShow控制
          */}
          <div className={`monitoring-detail-content user-manager-content ${this.state.isWindowShow.isUserManagerShow ? '' : 'hide'}`}>
            <UserManager />
          </div>


          {/** 设备管理
            *  isMinitoringManagerShow控制
          */}
          <div className={`monitoring-detail-content minitoring-manager-content ${this.state.isWindowShow.isMinitoringManagerShow ? '' : 'hide'}`}>
            <MonitoringManage />
          </div>
        </div>
      </div >
    )

  }
}
export default Minitoring
