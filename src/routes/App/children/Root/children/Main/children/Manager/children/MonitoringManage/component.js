import React from 'react'
import './component.scss'

import { Button, Radio, Icon, Modal, Input } from 'antd';


const { confirm } = Modal;

const searchListIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

class MonitoringManage extends React.Component {
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
      <div className="monitoring-manager-component">
        <div className='monitoring-manager-title'>用户管理</div>

        <div className='monitoring-manager-middle'>
          <div className='monitoring-manager-search'>
            <span className='monitoring-manager-search-title'>用户查询</span>
            <input className='monitoring-manager-search-input' placeholder='设备序列号' ></input>
            <input className='monitoring-manager-search-input' placeholder='设备型号' ></input>
            <input className='monitoring-manager-search-input' placeholder='生产日期2019****' ></input>
            <button className='monitoring-manager-search-btn'>查询</button>
          </div>
          <div className='monitoring-manager-search-list'>
            <div className='manager-search-list-title'>
              <span className='wd-span wd15'>编号</span>
              <span className='wd-span wd15'>序列号</span>
              <span className='wd-span wd15'>型号</span>
              <span className='wd-span wd20'>生产日期</span>
              <span className='wd-span wd15'>状态</span>
              <span className='wd-span wd20'>所属用户</span>
            </div>
            <div className='manager-search-list-item'>
              {
                searchListIndex ? searchListIndex.map((item, index) => (
                  <div className='search-item'>
                    <span className='wd-span wd15 search-item-span'>{item}编号</span>
                    <span className='wd-span wd15 search-item-span'>{item}序列号</span>
                    <span className='wd-span wd15 search-item-span'>{item}型号</span>
                    <span className='wd-span wd20 search-item-span'>{item}生产日期</span>
                    <span className='wd-span wd15 search-item-span'>{item}状态</span>
                    <span className='wd-span wd20 search-item-span'>{item}所属用户</span>
                  </div>
                )) : ''
              }
            </div>
          </div>

        </div>
        <div className='monitoring-manager-bottom'>
          <div className='manager-detail'>
            <div className='detail-left-message'>
              <div className='monitoring-manager-bottom-title'>详情信息</div>
              <div className='left-detail-message'>
                <span className='detail-left-message-span'><span>序列号：</span><span>xicha</span></span>
                <span className='detail-left-message-span'><span>验证码：</span><span>1888888888</span></span>
                <span className='detail-left-message-span'><span>设备型号：</span><span>sd180</span></span>
                <span className='detail-left-message-span'><span>软件型号：</span><span>xicha20190808</span></span>
                <span className='detail-left-message-span'><span>生产日期：</span><span>x20190808</span></span>
              </div>
            </div>
            <div className='detail-right-list'>
              <div className='add-equipment-form'>
                <span className='add-equipment-title'>添加设备</span>
                <input className='product-input product-serial-number' placeholder='请输入产品序列号'></input>
                <input className='product-input product-code' placeholder='请输入验证码'></input>
                <input className='product-input product-model' placeholder='请输入设备型号'></input>
                <input className='product-input product-versions' placeholder='请输入软件版本'></input>
                <input className='product-input product-date' placeholder='请输入生产日期'></input>
                <span className='add-equipment-sure-btn'>确认</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default MonitoringManage
