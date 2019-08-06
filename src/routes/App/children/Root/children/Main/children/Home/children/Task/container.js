import { connect } from 'react-redux'
import Component from './component.js'
import { getTaskList } from 'store/modules/home'

const mapDispatchToProps = {
  getTaskList
}

const mapStateToProps = (state) => ({
  taskList: state.home.taskList

})

export default connect(mapStateToProps, mapDispatchToProps)(Component)
