import React from 'react'
import './component.scss'


import { DatePicker, Radio, Button, Input, Pagination } from 'antd';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const searchListIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

class LogListManage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.logManagerList = null
    this.params = {
      pageNo: 1,
      pageSize: 15,
      startTime: "",
      endTime: ""
    }
    this.changePagination = this.changePagination.bind(this)
    this.checkLogByCondition = this.checkLogByCondition.bind(this)
  }

  checkLogByCondition = e => {
    this.params.pageNo = 1
    var startDate = document.getElementById('start-time-date').getElementsByClassName('ant-calendar-picker-input')[0].value
    var startHour = document.getElementById('start-time-hour').value
    var endDate = document.getElementById('end-time-date').getElementsByClassName('ant-calendar-picker-input')[0].value
    var endHour = document.getElementById('end-time-hour').value
    if (startDate === '') {
      alert('请选择开始时间')
      return
    }
    if (endDate === '') {
      alert('请选择结束时间')
      return
    }
    this.params.startTime = startDate + ' ' + startHour
    this.params.endTime = endDate + ' ' + endHour
    this.changePagination()
  }

  changePagination = e => {
    this.props.changeLogList && this.props.changeLogList({
      pageNo: this.params.pageNo,
      pageSize: this.params.pageSize,
      startTime: this.params.startTime,
      endTime: this.params.endTime
    })
  }

  UNSAFE_componentWillReceiveProps({ logManageList }) {
    if (logManageList !== this.logManagerList) {
      this.logManagerList = logManageList
    }
  }

  render() {
    const { match } = this.props
    return (
      <div className="log-list-component" {...this.props}>
        <div className='log-list-title'>日志列表</div>
        <div className='log-list-bottom-content'>
          <div className='list-search-content'>
            <span className='search-span'>时间：</span>
            <DatePicker id='start-time-date' className='date-picker-date start-date' size='small' placeholder='请选择开始时间' />
            <Input id='start-time-hour' className='date-picker-time start-time' size="small" placeholder="00:00:00" defaultValue='00:00:00' />
            <span className='search-span'> -- </span>
            <DatePicker id='end-time-date' className='date-picker-date end-date' size='small' placeholder='请选择结束时间' />
            <Input id='end-time-hour' className='date-picker-time end-time' size="small" placeholder="23:59:59" defaultValue='23:59:59' />
            <Button onClick={this.checkLogByCondition.bind(this)} className='date-picker-search-btn' size='small'>查询</Button>
          </div>
          <div className='search-result-list'>
            <div className='search-result-title'>
              <span className='wd-span wd15'>编号</span>
              <span className='wd-span wd25'>ip地址</span>
              <span className='wd-span wd25'>文件名</span>
              <span className='wd-span wd35'>时间</span>
            </div>
            <div className='search-result-item-list'>
              {
                this.logManagerList && this.logManagerList !== null && this.logManagerList.total !== 0 ? this.logManagerList.data.uglyData.map((item, index) => {
                  return (
                    <div className='result-items'>
                      <span className='wd-span wd15 search-items-span'>{item.logNum}</span>
                      <span className='wd-span wd25 search-items-span'>{item.ipAddress}</span>
                      <span className='wd-span wd25 search-items-span'>{item.logName}</span>
                      <span className='wd-span wd35 search-items-span'>{item.logTime}</span>
                    </div>

                  )
                }) : ''
              }
            </div>
            <Pagination
              total={this.logManagerList ? this.logManagerList.total : 0}
              showTotal={total => `总共 ${total} 条数据`}
              pageSize={this.logManagerList ? this.logManagerList.pageSize : 15}
              defaultCurrent={1}
              current={this.logManagerList ? this.logManagerList.pageNo : 1}
              size='small'
              className='pagination-div'
              onChange={(pageNo, pageSize) => {
                this.pageNo = pageNo
                this.changePagination()
              }}
            />
          </div>
        </div>
      </div>
    )
  }
}
export default LogListManage
