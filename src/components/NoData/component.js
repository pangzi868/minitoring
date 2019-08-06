import React from "react";
import "./component.scss";
import NoDataImg from './images/noData.svg'
import PropTypes from 'prop-types'

class NoData extends React.Component {
  static propTypes = {
    cont: PropTypes.string,
  }

  static defaultProps = {
    cont: ''
  }

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentWillMount() {
  }
  componentWillReceiveProps({ cont }) {
    if (cont !== this.props.cont) {
    }
  }
  render() {
    const { cont } = this.props
    return (
      <div {...this.props} className='no-data-component'>
        <img className='no-data' alt='no-data' src={NoDataImg}></img>
        {
          cont !== '' ? cont : '没有搜索到匹配的数据'
        }
      </div>
    );
  }
}

export default NoData;
