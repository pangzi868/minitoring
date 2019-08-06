import { connect } from 'react-redux'
import Component from './component.js'
import { getManCustRank } from 'store/modules/home'

const mapDispatchToProps = {
  getManCustRank
}

const mapStateToProps = (state) => ({
  manCustRank: state.home.manCustRank

})

export default connect(mapStateToProps, mapDispatchToProps)(Component)
