import React from 'react'
import './component.scss'
import LeftIcon from './../../images/1.3.png'
import MenuIcon from './../../images/1.1.png'
import DownloadBtn from './../../images/3.4.png'
import VideosIcon from './../../images/videos.png'
import { Popover } from 'antd-mobile';

const Item = Popover.Item;

const SRC_PATH = 'http://112.74.77.11:2019/shungkon'

class Density extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      selected: '',
      densityList: [],
      densityDetailIndex: 0
    }
    this.densityDetailHandle = this.densityDetailHandle.bind(this)
  }

  // 密度分析详细信息切换
  densityDetailHandle = index => {
    if (this.setState.densityDetailIndex !== index) {
      this.setState({
        densityDetailIndex: index
      })
    }
  }


  onSelect = (opt) => {
    this.setState({
      visible: false,
      selected: opt.props.value,
    });
  };
  handleVisibleChange = (visible) => {
    this.setState({
      visible,
    });
  };

  UNSAFE_componentWillReceiveProps({ densityList }) {
    if (densityList !== this.state.densityList) {
      this.setState({
        densityList: densityList
      })
    }
  }

  render() {
    const { densityList, densityDetailIndex } = this.state
    return (
      <div className="density-mobile-component">
        {/* <div className='videos-top-div'>
          <div className='left-icon-div'>
            <img className='left-icon' alt='left-icon' src={LeftIcon}></img>
          </div>
          <div className='center-title'>密度分析</div>
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

        {
          densityList && densityList.length > 0 ?
            <div className='videos-content'>
              <div className='real-time-videos'>
                <img className='real-time-videos-img' alt='real-time-videos-img' src={SRC_PATH + densityList[densityDetailIndex].path}></img>
              </div>

              <div className='videos-list-div'>
                <div className='minitoring-real-time-list'>
                  {
                    densityList.map((item, index) => {
                      return (
                        <div className='real-time-item' key={index} onClick={this.densityDetailHandle.bind(this, index)}>
                          <img className='real-time-item-img' alt='real-time-item-img' src={SRC_PATH + item.path}></img>
                          <span className='real-time-item-date'>{item.validDate}</span>
                          {/* <img className='real-time-download-img' alt='real-time-download-img' src={DownloadBtn}></img> */}
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div> :
            <div className='videos-content'>
              <div className='real-time-videos'>
                <img className='real-time-videos-img' alt='real-time-videos-img' src={VideosIcon}></img>
              </div>

              <div className='videos-list-div'>
                <div className='minitoring-real-time-list'>
                </div>
              </div>

            </div>
        }
      </div >
    )

  }
}
export default Density
