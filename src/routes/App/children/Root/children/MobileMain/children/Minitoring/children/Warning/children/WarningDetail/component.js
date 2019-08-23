import React from 'react'
import './component.scss'
import Company from './images/company.png'
import { Popover } from 'antd-mobile';
import {
  Player, ControlBar, ReplayControl,
  ForwardControl, CurrentTimeDisplay,
  TimeDivider, PlaybackRateMenuButton, VolumeMenuButton
} from 'video-react';

import ReactDOM from 'react-dom'


const SRC_PATH = 'http://112.74.77.11:2019/shungkon'

const Item = Popover.Item;

class Detail extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    }

  }


  componentDidUpdate(_prevProps, _prevState) {
    if (this.refs.videos) {
      ReactDOM.findDOMNode(this.refs.videos.video).load();
    }
  }


  UNSAFE_componentWillReceiveProps({ warningVideosDetail }) {
    if (warningVideosDetail !== this.state.warningVideosDetail) {
      this.setState({
        warningVideosDetail: warningVideosDetail
      })
    }
  }

  render() {
    const { warningVideosDetail } = this.state
    return (
      <div className="warning-detail-mobile-component">
        {
          warningVideosDetail ?
            <div className='warning-content'>
              <div className='emegency-right-top-videos'>
                <div style={{ width: '100%', height: '100%' }}>
                  <Player ref='videos'>
                    <source src={SRC_PATH + warningVideosDetail.warningVideoPath} />
                    <ControlBar>
                      <ReplayControl seconds={10} order={1.1} />
                      <ForwardControl seconds={30} order={1.2} />
                      <CurrentTimeDisplay order={4.1} />
                      <TimeDivider order={4.2} />
                      <PlaybackRateMenuButton
                        rates={[5, 2, 1, 0.5, 0.1]}
                        order={7.1}
                      />
                      <VolumeMenuButton disabled />
                    </ControlBar>
                  </Player>
                </div>
              </div>
              <div className='warning-right-bottom-message'>
                <span className='right-bottom-message right-bottom-message-1'>详细信息： </span>
                <span className='right-bottom-message right-bottom-message-2'>{warningVideosDetail.warningMessage}</span>
                <span className='right-bottom-message right-bottom-message-3'>有效期限：{warningVideosDetail.validDate}</span>
              </div>
            </div> :
            <div className='warning-content'>
              <div className='real-time-videos'>
                <img className='real-time-videos-img' alt='real-time-videos-img' src={Company}></img>
              </div>
              <div className='warning-right-bottom-message'>
                <span className='right-bottom-message right-bottom-message-1'>详细信息： </span>
                <span className='right-bottom-message right-bottom-message-2'>暂无</span>
                <span className='right-bottom-message right-bottom-message-3'>有效期限：--</span>
              </div>
            </div>
        }

      </div >
    )

  }
}
export default Detail
