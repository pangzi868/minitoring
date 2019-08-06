import React from "react";
import "./component.scss";
import Split from "components/Split";
import { formatMoney } from "utils/moneyFormat";

class BussinessRemind extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dpsitInfo: [] };
  }

  componentDidMount() {}
  componentWillMount() {
    this.props.getDpsitInfo();
  }
  componentWillReceiveProps({ dpsitInfo }) {
    if (dpsitInfo !== this.props.dpsitInfo) {
      this.setState({
        dpsitInfo
      });
    }
  }
  render() {
    let { dpsitInfo } = this.state;
    dpsitInfo = dpsitInfo.uglyData || [];
    return (
      <div className="home-deposit-component">
        <Split title={"存款新增排行榜"} />
        <div className="deposit-content">
          {dpsitInfo.map(item => {
            return (
              <div className="deposit-item" key={item.orgNo}>
                <div className="bank-name">{item.orgName}</div>
                <div className="progress-bar">
                  <div className="back" />
                  <div className="front" style={{ width: `${100*item.dpsitLastDay/item.dpsitBal}%` }} />
                </div>
                <div className="amount">
                  <p>{formatMoney(item.dpsitBal)}万元</p>
                  <p className="up">
                    <i className="iconfont icon-up1" />
                    {formatMoney(item.dpsitLastDay)}万元
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default BussinessRemind;
