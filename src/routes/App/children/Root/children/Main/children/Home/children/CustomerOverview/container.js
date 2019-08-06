import { connect } from "react-redux";
import Component from "./component.js";
import { getCustOverview } from "store/modules/home";

const mapDispatchToProps = {
  getCustOverview
};

const mapStateToProps = state => ({
  custOverview: state.home.custOverview
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
