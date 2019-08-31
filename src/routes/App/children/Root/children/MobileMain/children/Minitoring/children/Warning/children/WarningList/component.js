import React from 'react'
import './component.scss'
import InnerPage from 'components/hz/InnerPage'
import WarningDetail from '../WarningDetail/component'
import Company from './images/company.png'

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
    const { warningVideos } = this.state
    return (
      <div className="warning-mobile-component">
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
                : <div className='no-list'>此设备暂无告警信息</div>
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
