import React from 'react'
import './component.scss'

import { Menu, Icon } from 'antd';

import AddEquipment from './images/upper-bg.png'
import GroupAddition from './images/blue_add.png'
import EquipmentAddition from './images/yellow_add.png'

const { SubMenu } = Menu;


function handleClick(e) {
  console.log('click', e);
}

class Minitoring extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
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
  }

  secondMenuHandle(item,e) {
    console.log(e, item)
  }

  componentWillMount() {
  }

  render() {
    const { match } = this.props
    const { myMinitoringList } = this.state
    return (
      <div className="minitoring-component">
        <div className='minitoring-left-nav'>
          <div className='left-nav-mine'>
            <div className='nav-mine-title'>我的设备</div>
            <div className='nav-mine-list'>
              <div className='nav-mine-item'>
                <Menu onClick={handleClick} style={{ width: 256 }} mode="vertical">
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
            <div className='left-add-group-btn'>
              <img className='left-add-img' src={GroupAddition} alt='left-add-img'></img>
              <span className='left-add-group-title'>添加分组</span>
            </div>
            <div className='left-add-equipment-btn'>
              <img className='left-add-img' src={EquipmentAddition} alt='left-add-img'></img>
              <span className='left-add-equipment-title'>添加设备</span>
            </div>
          </div>
        </div>

        <div className='minitoring-right-content'>
          <div className='add-equipment-content'>
            <img alt='add-equipment-img' className='add-equipment-img' src={AddEquipment}></img>
            <div className='add-equipment-form'>
              <span className='add-equipment-title'>添加设备</span>
              <input className='product-serial-number' placeholder='请输入产品序列号'></input>
              <input className='product-psw' placeholder='请输入密码'></input>
              <span className='add-equipment-sure-btn'>确认</span>
            </div>
          </div>
        </div>
      </div >
    )

  }
}
export default Minitoring
