import React from 'react'
import './component.scss'

import { Menu, Icon } from 'antd';

import AddEquipment from './images/upper-bg.png'
import EgVideos from './images/videos.png'
import GroupAddition from './images/blue_add.png'
import EquipmentAddition from './images/yellow_add.png'
import Setting from './images/1.9.png'
import RightBtn from './images/4.3.png'
import DownloadBtn from './images/3.4.png'

const { SubMenu } = Menu;

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
    this.additionShow = this.additionShow.bind(this)

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
    switch (contentType) {
      case '实时视频':
        this.props.history.push('/root/main/videos')
        break;
      case '告警信息':
        this.props.history.push('/root/main/warning')
        break;
      case '密度分析':
        this.props.history.push('/root/main/density')
        break;
      default:
        break;
    }
  }

  componentWillMount() {
  }

  render() {
    const { match } = this.props
    const { myMinitoringList } = this.state
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
                              key={item.minitoringName + indexs}
                              title={
                                <span onClick={this.secondMenuHandle.bind(this, items)} style={{ height: '100%', width: '100%', display: 'block' }}>
                                  {/* <Icon type="appstore" /> */}
                                  <span>{items.name}</span>
                                </span>
                              }

                            >
                              <Menu.Item key={`${item.minitoringName + items.id}-1`}>实时视频</Menu.Item>
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
          <div className={`add-equipment-form ${this.state.isShowHandle.isAdditionGroupShow ? '' : 'hide'}`}>
            <span className='add-equipment-title'>添加分组</span>
            <input id='addGroup' className='product-serial-number' placeholder='请输入分组名称'></input>
            <span className='add-equipment-sure-btn'>确认</span>
          </div>

          <div className={`add-equipment-form ${this.state.isShowHandle.isAdditionEquipmentShow ? '' : 'hide'}`}>
            <span className='add-equipment-title'>添加设备</span>
            <input id='addEquipment' className='product-serial-number' placeholder='请输入产品序列号'></input>
            <input id='addEquipmentPsw' className='product-psw' placeholder='请输入密码'></input>
            <span className='add-equipment-sure-btn'>确认</span>
          </div>
        </div>
      </div >
    )

  }
}
export default Minitoring
