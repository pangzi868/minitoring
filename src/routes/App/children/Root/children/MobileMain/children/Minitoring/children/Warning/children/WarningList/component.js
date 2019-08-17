import React from 'react'
import './component.scss'
import LeftIcon from './images/1.3.png'
import MenuIcon from './images/1.1.png'
import DownloadBtn from './images/3.4.png'
import VideosIcon from './images/videos.png'
import { Popover } from 'antd-mobile';
import { getQueryString } from 'utils/url'

import InnerPage from 'components/hz/InnerPage'
import { PullToRefresh, ListView } from 'antd-mobile';
import WarningDetail from '../WarningDetail/component'
import Company from './images/company.png'

const Item = Popover.Item;

class List extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      warningVideos: {},
      warningMessageDetails: [],
    }


    this.getBusinessInfoPage = React.createRef()
    this.serial = null
    this.warningVideosDetail = null
    this.warningDetailChangeHandle = this.warningDetailChangeHandle.bind(this)
  }
  warningDetailChangeHandle = (index, e) => {
    this.warningVideosDetail = this.state.warningVideos[index]
    this.setState({})
    this.getBusinessInfoPage.current.show()
  }

  UNSAFE_componentWillMount() {
  }

  UNSAFE_componentWillReceiveProps({ warningVideos }) {
    if (warningVideos !== this.state.warningVideos) {
      this.setState({
        warningVideos: warningVideos
      })
    }
  }

  render() {
    const { warningMessageDetails, warningVideos } = this.state
    console.log(warningVideos, 'wangwarningVideos')
    return (
      <div className="warning-mobile-component">
        {/* <div className='warning-top-div'>
          <div className='left-icon-div'>
            <img onClick={this.goBackToList} className='left-icon' alt='left-icon' src={LeftIcon}></img>
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
        </div> */}

        <div className='space-box'></div>
        <div className='warning-message-title'>
          <span className='span-wd'>设备</span>
          <span className='span-wd'>日期</span>
          <span className='span-wd'>视频</span>
        </div>

        <div className='warning-message-list-div'>
          <div className='warning-message-list'>
            {
              warningVideos && warningVideos && warningVideos.length > 0 ? warningVideos.map((item, index) => (
                <div className='warning-message-item' key={index} onClick={this.warningDetailChangeHandle.bind(this, index)}>
                  <span className='item-wd-span wd33'>{item.serial}</span>
                  <span className='item-wd-span wd33'>{item.warningTime}</span>
                  <span className='item-wd-span wd33'>
                    <img src={Company} className='warning-message-item-img' alt='warning-message-item-img'></img>
                  </span>
                </div>
              ))
                : ''
            }
          </div>


        </div>
        <InnerPage from="right" ref={this.getBusinessInfoPage} title='告警信息详情'>
          <WarningDetail getBusinessInfoPage={this.getBusinessInfoPage} warningVideosDetail={this.warningVideosDetail} />
        </InnerPage>
      </div >
    )

  }
}
export default List
