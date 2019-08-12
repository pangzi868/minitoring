import React from 'react'
import './component.scss'
import LeftIcon from './images/1.3.png'
import MenuIcon from './images/1.1.png'
import DownloadBtn from './images/3.4.png'
import VideosIcon from './images/videos.png'
import { Popover } from 'antd-mobile';

const Item = Popover.Item;

class Detail extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    }

  }

  render() {
    return (
      <div className="warning-detail-mobile-component">
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

        <div className='warning-content'>
          <div className='real-time-videos'>
            <img className='real-time-videos-img' alt='real-time-videos-img' src={VideosIcon}></img>
          </div>

          <div className='warning-right-bottom-message'>
            <span className='right-bottom-message right-bottom-message-1'>详细信息： </span>
            <span className='right-bottom-message right-bottom-message-2'>2019年02月5日，上午9时02分03秒，广州噼里啪啦设备机发现目标，目标在右下角，并成功驱赶</span>
            <span className='right-bottom-message right-bottom-message-3'>有效期限：一个月</span>
          </div>
        </div>
      </div >
    )

  }
}
export default Detail
