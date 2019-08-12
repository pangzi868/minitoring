import React from 'react'
import './component.scss'
import LeftIcon from './images/1.3.png'
import MenuIcon from './images/1.1.png'
import DownloadBtn from './images/3.4.png'
import VideosIcon from './images/videos.png'
import { Popover } from 'antd-mobile';

const Item = Popover.Item;

class List extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    }

  }

  render() {
    return (
      <div className="warning-mobile-component">
        <div className='warning-top-div'>
          <div className='left-icon-div'>
            <img className='left-icon' alt='left-icon' src={LeftIcon}></img>
          </div>
          <div className='center-title'>告警信息</div>
          <div className='right-icon-div'>
            <Popover mask
              overlayClassName="fortest"
              overlayStyle={{ color: 'currentColor' }}
              visible={this.state.visible}
              overlay={[
                (<Item key="4" value="scan" data-seed="logId">实时视频</Item>),
                (<Item key="5" value="special" style={{ whiteSpace: 'nowrap' }}>告警信息</Item>),
                (<Item key="6" value="button ct">
                  <span style={{ marginRight: 5 }}>密度分析</span>
                </Item>),
              ]}
              align={{
                overflow: { adjustY: 0, adjustX: 0 },
                offset: [-10, 0],
              }}
              onVisibleChange={this.handleVisibleChange}
              onSelect={this.onSelect}
            >
              <div style={{
                height: '100%',
                padding: '0 15px',
                marginRight: '-15px',
                display: 'flex',
                alignItems: 'center',
              }}
              >
                <img className='menu-icon' alt='menu-icon' src={MenuIcon}></img>
              </div>
            </Popover>

          </div>
        </div>

        <div className='space-box'></div>
        <div className='warning-message-title'>
          <span className='span-wd'>设备</span>
          <span className='span-wd'>日期</span>
          <span className='span-wd'>视频</span>
        </div>

        <div className='warning-message-list-div'>

          <div className='warning-message-list'>
            <div className='warning-message-item'>
              <span className='item-wd-span wd33'>设备1</span>
              <span className='item-wd-span wd33'>2019-0807 01:08:09</span>
              <span className='item-wd-span wd33'>
                <img src={VideosIcon} className='warning-message-item-img' alt='warning-message-item-img'></img>
              </span>
            </div>
            <div className='warning-message-item'>
              <span className='item-wd-span wd33'>设备1</span>
              <span className='item-wd-span wd33'>2019-0807 01:08:09</span>
              <span className='item-wd-span wd33'>
                <img src={VideosIcon} className='warning-message-item-img' alt='warning-message-item-img'></img>
              </span>
            </div>
            <div className='warning-message-item'>
              <span className='item-wd-span wd33'>设备1</span>
              <span className='item-wd-span wd33'>2019-0807 01:08:09</span>
              <span className='item-wd-span wd33'>
                <img src={VideosIcon} className='warning-message-item-img' alt='warning-message-item-img'></img>
              </span>
            </div>
            <div className='warning-message-item'>
              <span className='item-wd-span wd33'>设备1</span>
              <span className='item-wd-span wd33'>2019-0807 01:08:09</span>
              <span className='item-wd-span wd33'>
                <img src={VideosIcon} className='warning-message-item-img' alt='warning-message-item-img'></img>
              </span>
            </div>
            <div className='warning-message-item'>
              <span className='item-wd-span wd33'>设备1</span>
              <span className='item-wd-span wd33'>2019-0807 01:08:09</span>
              <span className='item-wd-span wd33'>
                <img src={VideosIcon} className='warning-message-item-img' alt='warning-message-item-img'></img>
              </span>
            </div>
            <div className='warning-message-item'>
              <span className='item-wd-span wd33'>设备1</span>
              <span className='item-wd-span wd33'>2019-0807 01:08:09</span>
              <span className='item-wd-span wd33'>
                <img src={VideosIcon} className='warning-message-item-img' alt='warning-message-item-img'></img>
              </span>
            </div>
            <div className='warning-message-item'>
              <span className='item-wd-span wd33'>设备1</span>
              <span className='item-wd-span wd33'>2019-0807 01:08:09</span>
              <span className='item-wd-span wd33'>
                <img src={VideosIcon} className='warning-message-item-img' alt='warning-message-item-img'></img>
              </span>
            </div>
            <div className='warning-message-item'>
              <span className='item-wd-span wd33'>设备1</span>
              <span className='item-wd-span wd33'>2019-0807 01:08:09</span>
              <span className='item-wd-span wd33'>
                <img src={VideosIcon} className='warning-message-item-img' alt='warning-message-item-img'></img>
              </span>
            </div>
            <div className='warning-message-item'>
              <span className='item-wd-span wd33'>设备1</span>
              <span className='item-wd-span wd33'>2019-0807 01:08:09</span>
              <span className='item-wd-span wd33'>
                <img src={VideosIcon} className='warning-message-item-img' alt='warning-message-item-img'></img>
              </span>
            </div>
            <div className='warning-message-item'>
              <span className='item-wd-span wd33'>设备1</span>
              <span className='item-wd-span wd33'>2019-0807 01:08:09</span>
              <span className='item-wd-span wd33'>
                <img src={VideosIcon} className='warning-message-item-img' alt='warning-message-item-img'></img>
              </span>
            </div>
          </div>
        </div>
      </div >
    )

  }
}
export default List
