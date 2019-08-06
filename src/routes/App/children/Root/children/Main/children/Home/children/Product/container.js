import { connect } from 'react-redux'
import Component from './component.js'
import { getRecommProd } from 'store/modules/home'

const mapDispatchToProps = {
  getRecommProd
}

const mapStateToProps = (state) => ({
  recommProd: state.home.recommProd

})

export default connect(mapStateToProps, mapDispatchToProps)(Component)
