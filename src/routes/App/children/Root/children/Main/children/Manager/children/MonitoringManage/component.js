import React from 'react'
import './component.scss'

import { Pagination } from 'antd';

class MonitoringManage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      size: 'small',
      deviceList: {},
      deviceDetail: null
    }
    this.params = {
      pageNo: 1,
      pageSize: 10,
      serial: "",
      productDate: "",
      deviceType: "",
    }

    this.enterDeviceComfirm = this.enterDeviceComfirm.bind(this)
    this.getListByCondition = this.getListByCondition.bind(this)
    this.getDeviceDetail = this.getDeviceDetail.bind(this)
  }

  /** 录入设备确认按钮 */
  enterDeviceComfirm = e => {
    e.preventDefault();
    var params = {
      serial: document.getElementById('product-addition-serial').value,
      deviceVerifyCode: document.getElementById('product-addition-code').value,
      deviceType: document.getElementById('product-addition-device-type').value,
      softVersion: document.getElementById('product-addition-soft-version').value,
      productDate: document.getElementById('product-addition-date').value,
    }
    this.props.enterDeviceToSystem && this.props.enterDeviceToSystem(params)
    document.getElementById('product-addition-serial').value = ''
    document.getElementById('product-addition-code').value = ''
    document.getElementById('product-addition-type').value = ''
    document.getElementById('product-addition-version').value = ''
    document.getElementById('product-addition-date').value = ''
  }

  /** 根据条件查询查询按钮 */
  getListByCondition = (type) => {
    if (type === 'click') {
      this.params.pageNo = 1
    }
    this.params.serial = document.getElementById('search-input-serial').value
    this.params.productDate = document.getElementById('search-input-productDate').value
    this.params.deviceType = document.getElementById('search-input-deviceType').value
    var params = {
      serial: this.params.serial,
      deviceType: this.params.deviceType,
      productDate: this.params.productDate,
      pageNo: this.params.pageNo,
      pageSize: this.params.pageSize,
    }
    this.props.getDeviceListByCondition && this.props.getDeviceListByCondition(params)
  }


  /** 点击列表查看详情 */
  getDeviceDetail = (deviceId, e) => {
    e.preventDefault();
    this.props.getDeviceDetail && this.props.getDeviceDetail(deviceId)
  }

  UNSAFE_componentWillReceiveProps(nextProps, prevState) {
    if (nextProps.clickMinitoring !== prevState.deviceList) {
      this.setState({
        deviceList: nextProps.clickMinitoring
      })
    }
    if (nextProps.deviceDetail !== prevState.deviceDetail) {
      this.setState({
        deviceDetail: nextProps.deviceDetail
      })
    }
  }



  render() {
    const { deviceList, deviceDetail } = this.state;
    return (
      <div className="monitoring-manager-component">
        <div className='monitoring-manager-title'>设备管理</div>

        <div className='monitoring-manager-middle'>
          <div className='monitoring-manager-search'>
            <span className='monitoring-manager-search-title'>设备查询</span>
            <input autoComplete="off" id='search-input-serial' className='monitoring-manager-search-input' placeholder='设备序列号' ></input>
            <input autoComplete="off" id='search-input-deviceType' className='monitoring-manager-search-input' placeholder='设备型号' ></input>
            <input autoComplete="off" id='search-input-productDate' className='monitoring-manager-search-input' placeholder='生产日期2019****' ></input>
            <button className='monitoring-manager-search-btn' onClick={this.getListByCondition.bind(this, 'click')}>查询</button>
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
                deviceList && deviceList.total > 0 ? deviceList.data.uglyData.map((item, index) => {
                  return (
                    <div className='search-item' key={index} onClick={this.getDeviceDetail.bind(this, item.deviceId)}>
                      <span className='wd-span wd15 search-item-span'>{(index + 1) + 10 * (this.params.pageNo - 1)}</span>
                      <span className='wd-span wd15 search-item-span'>{item.serial ? item.serial : ' -- '}</span>
                      <span className='wd-span wd15 search-item-span'>{item.deviceType ? item.deviceType : ' -- '}</span>
                      <span className='wd-span wd20 search-item-span'>{item.productDate ? item.productDate : ' -- '}</span>
                      <span className='wd-span wd15 search-item-span'>{item.deviceStatus === '0' ? '在库' : '交付'}</span>
                      <span className='wd-span wd20 search-item-span'>{item.nickName ? item.nickName : ' -- '}</span>
                    </div>
                  )
                }) : null
              }
            </div>
          </div>

        </div>

        <Pagination
          total={deviceList ? deviceList.total : 0}
          showTotal={total => `总共 ${total} 条数据`}
          pageSize={deviceList ? deviceList.pageSize : 10}
          defaultCurrent={1}
          current={deviceList ? deviceList.pageNo : 1}
          size='small'
          className='pagination-div'
          onChange={(pageNo, pageSize) => {
            this.params.pageNo = pageNo
            this.getListByCondition('page')
          }}
        />
        <div className='monitoring-manager-bottom'>
          <div className='manager-detail'>
            <div className='detail-left-message'>
              <div className='monitoring-manager-bottom-title'>详情信息</div>
              {
                // 判断是否点击返回detail，如果没有则默认展示第一条
                deviceDetail && deviceDetail.totle > 0 ?
                  <div className='left-detail-message'>
                    <span className='detail-left-message-span'><span>序列号：</span><span>{deviceDetail.device.serial ? deviceDetail.device.serial : ' -- '}</span></span>
                    <span className='detail-left-message-span'><span>验证码：</span><span>{deviceDetail.device.deviceVerifyCode ? deviceDetail.device.deviceVerifyCode : ' -- '}</span></span>
                    <span className='detail-left-message-span'><span>设备型号：</span><span>{deviceDetail.device.deviceType ? deviceDetail.device.deviceType : ' -- '}</span></span>
                    <span className='detail-left-message-span'><span>软件版本：</span><span>{deviceDetail.device.softVersion ? deviceDetail.device.softVersion : ' -- '}</span></span>
                    <span className='detail-left-message-span'><span>生产日期：</span><span>{deviceDetail.device.productDate ? deviceDetail.device.productDate : ' -- '}</span></span>
                  </div>
                  :
                  deviceList && deviceList.total > 0 ?
                    <div className='left-detail-message'>
                      <span className='detail-left-message-span'><span>序列号：</span><span>{deviceList.data.uglyData[0].serial ? deviceList.data.uglyData[0].serial : ' -- '}</span></span>
                      <span className='detail-left-message-span'><span>验证码：</span><span>{deviceList.data.uglyData[0].deviceVerifyCode ? deviceList.data.uglyData[0].deviceVerifyCode : ' -- '}</span></span>
                      <span className='detail-left-message-span'><span>设备型号：</span><span>{deviceList.data.uglyData[0].deviceType ? deviceList.data.uglyData[0].deviceType : ' -- '}</span></span>
                      <span className='detail-left-message-span'><span>软件版本：</span><span>{deviceList.data.uglyData[0].softVersion ? deviceList.data.uglyData[0].softVersion : ' -- '}</span></span>
                      <span className='detail-left-message-span'><span>生产日期：</span><span>{deviceList.data.uglyData[0].productDate ? deviceList.data.uglyData[0].productDate : ' -- '}</span></span>
                    </div> : <div className='left-detail-message'>
                      <span className='detail-left-message-span'><span>序列号：</span><span> -- </span></span>
                      <span className='detail-left-message-span'><span>验证码：</span><span> -- </span></span>
                      <span className='detail-left-message-span'><span>设备型号：</span><span> -- </span></span>
                      <span className='detail-left-message-span'><span>软件版本：</span><span> -- </span></span>
                      <span className='detail-left-message-span'><span>生产日期：</span><span> -- </span></span>
                    </div>
              }

            </div>
            <div className='detail-right-list'>
              <div className='add-equipment-form'>
                <span className='add-equipment-title'>录入设备</span>
                <input autoComplete="off" id='product-addition-serial' className='product-input product-serial-number' placeholder='请输入产品序列号'></input>
                <input autoComplete="off" id='product-addition-code' className='product-input product-code' placeholder='请输入验证码'></input>
                <input autoComplete="off" id='product-addition-device-type' className='product-input product-model' placeholder='请输入设备型号'></input>
                <input autoComplete="off" id='product-addition-soft-version' className='product-input product-versions' placeholder='请输入软件版本'></input>
                <input autoComplete="off" id='product-addition-date' className='product-input product-date' placeholder='请输入生产日期 例子：2019-01-01'></input>
                <span className='add-equipment-sure-btn' onClick={this.enterDeviceComfirm.bind(this)}>确认</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default MonitoringManage
