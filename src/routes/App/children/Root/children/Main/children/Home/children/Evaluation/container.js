import { connect } from "react-redux";
import Component from "./component.js";
import { getCustEvaluation } from "store/modules/home";

const mapDispatchToProps = {
  getCustEvaluation
};

const mapStateToProps = state => ({
  custEvaluation: state.home.custEvaluation
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
