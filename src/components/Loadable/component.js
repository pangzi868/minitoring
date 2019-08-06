import React from 'react'
import Loadable from 'react-loadable'
import './component.scss'
const Loading = (props) => {

  if (props.isLoading) {
    if (props.timedOut) {
      return <div className='loadable-component'><div className='remind-text'>Loader timed out!</div></div>
    } else if (props.pastDelay) {
      return <div className='loadable-component'><div className='remind-text'>Loading...</div></div>
    } else {
      return null;
    }
  } else if (props.error) {
    return <div className='loadable-component'><div className='remind-text'>Error! Component failed to load</div></div>
  } else {
    return null;
  }
}

const NoLoading = (props) => {
  return null;
}

export default (Component) => {
  return (
    Loadable({
      loader: () => Component,
      loading: true ? NoLoading : Loading,
    })
  )
}



