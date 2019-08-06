import React from "react";
import "./component.scss";
import Split from "components/Split";
import { formatMoney } from "utils/moneyFormat";

class BussinessRemind extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assetInfo: {}
    };
  }

  componentDidMount() {}
  componentWillMount() {
    this.props.getAssetInfo();
  }
  componentWillReceiveProps({ assetInfo }) {
    if (assetInfo !== this.props.assetInfo) {
      this.setState({
        assetInfo
      });
    }
  }
  render() {
    let { assetInfo } = this.state;
    assetInfo = [
      {
        name: "存款时点余额",
        amount: assetInfo.dpsitBal,
        lastDay: assetInfo.dpsitLastDay,
        lastMonth: assetInfo.dpsitLastMonth,
        lastYear: assetInfo.dpsitLastYear
      },
      {
        name: "贷款时点余额",
        amount: assetInfo.loanBal,
        lastDay: assetInfo.loanLastDay,
        lastMonth: assetInfo.loanLastMonth,
        lastYear: assetInfo.loanLastYear
      },
      {
        name: "理财时点余额",
        amount: assetInfo.chremBal,
        lastDay: assetInfo.chremLastDay,
        lastMonth: assetInfo.chremLastMonth,
        lastYear: assetInfo.chremLastYear
      }
    ];
    console.log(assetInfo);
    return (
      <div className="home-asset-component">
        <Split title={"资产分布"} />
        <div className="asset-content">
          {assetInfo.map(item => {
            return (
              <div className="asset-item" key={item.name}>
                <div className="item-left">
                  <p className="name">{item.name}</p>
                  <p className="amount">
                    {formatMoney(item.amount, "万元")}
                    <span className="unit">万元</span>
                  </p>
                </div>
                <div className="item-right">
                  <p className="">
                    <span className="">比上日</span>
                    <span
                      className={`${
                        formatMoney(item.lastDay) < 0 ? "down" : "up"
                      } amount`}
                    >
                      <i
                        className={`iconfont ${
                          formatMoney(item.lastDay) < 0 ? "icon-down1" : "icon-up1"
                        }`}
                      />
                      {formatMoney(item.lastDay)}万元
                    </span>
                  </p>
                  <p className="">
                    <span className="">比上月</span>
                    <span
                      className={`${
                        formatMoney(item.lastMonth) < 0 ? "down" : "up"
                      } amount`}
                    >
                      <i
                        className={`iconfont ${
                          formatMoney(item.lastMonth) < 0
                            ? "icon-down1"
                            : "icon-up1"
                        }`}
                      />
                      {formatMoney(item.lastMonth)}万元
                    </span>
                  </p>
                  <p className="">
                    <span className="">比上年</span>
                    <span
                      className={`${
                        formatMoney(item.lastYear) < 0 ? "down" : "up"
                      } amount`}
                    >
                      <i
                        className={`iconfont ${
                          formatMoney(item.lastYear) < 0 ? "icon-down1" : "icon-up1"
                        }`}
                      />
                      {formatMoney(item.lastYear)}万元
                    </span>
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
