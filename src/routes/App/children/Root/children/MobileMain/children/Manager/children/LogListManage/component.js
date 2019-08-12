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
  }


  render() {
    const { match, cont } = this.props
    return (
      <div className="log-mobile-list-component" {...this.props}>
        <div className='log-list-title'>日志列表({cont ? cont : '设备'})</div>
        <div className='log-list-bottom-content'>
          <div className='list-search-content'>
            <span className='search-span'>时间：</span>
            <DatePicker className='date-picker-date start-date' size='small' placeholder='请选择开始时间' />
            <Input className='date-picker-time start-time' size="small" placeholder="00:00:00" defaultValue='00:00:00' />
            <span className='search-span'> -- </span>
            <DatePicker className='date-picker-date end-date' size='small' placeholder='请选择结束时间' />
            <Input className='date-picker-time end-time' size="small" placeholder="23:59:59" defaultValue='23:59:59' />
            <Button className='date-picker-search-btn' size='small'>查询</Button>
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
                searchListIndex ? searchListIndex.map((item, index) => (
                  <div className='result-items'>
                    <span className='wd-span wd15 search-items-span'>7222</span>
                    <span className='wd-span wd25 search-items-span'>55555</span>
                    <span className='wd-span wd25 search-items-span'>+699名</span>
                    <span className='wd-span wd35 search-items-span'>0808080</span>
                  </div>

                )) : ''
              }
            </div>
            <Pagination
              total={85}
              showTotal={total => `总共 ${total} 条数据`}
              pageSize={15}
              defaultCurrent={1}
              size='small'
            />
          </div>
        </div>
      </div>
    )
  }
}
export default LogListManage
