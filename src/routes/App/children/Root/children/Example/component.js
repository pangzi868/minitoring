import React from 'react'
import './component.scss'
import CreateItem from 'components/hz/CreateItem'
import Loading from 'components/hz/Loading'
import ReturnHeader from 'components/hz/ReturnHeader'
import FadePage from 'components/hz/FadePage'


class Example extends React.Component {

  render() {
    console.log('geigei')
    return (
      <div className="for-example">
        {/* <button className='for-example-button'>I`M BUTTON</button>

         <CreateItem
            type='select'
            rightTitle='全部'
            leftIcon={'icon-type'}
            leftTitle='客户类型'
          >
            <div className='item-right' >
              <span className='text'>nasi</span>
            </div>
          </CreateItem>
          <FadePage
              isShow={true}
              position='bottom'
            >
              <div className='comment-border'>
                <textarea className='comment-textarea' placeholder={213 ? '评论name...' : '请输入评论内容...'} value={1234} onChange={1235} onKeyUp={12353}></textarea>
              </div>
            </FadePage>*/}
      </div>


    )
  }
}

export default Example
