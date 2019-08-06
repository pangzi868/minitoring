import React from "react";
import { Link } from "react-router-dom";
import "./component.scss";
import Split from "components/Split";

class BussinessRemind extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      manCustRank: []
    };
  }
  componentWillMount() {
    this.props.getManCustRank();
  }
  componentWillReceiveProps(manCustRank) {
    if (manCustRank !== this.state.manCustRank) {
      this.setState({
        manCustRank
      });
    }
  }
  componentDidMount() {}

  render() {
    let { manCustRank } = this.state;
    try {
      manCustRank = manCustRank.manCustRank.uglyData || [];
    } catch (error) {
      manCustRank = [];
    }
    return (
      <div className="home-newCustomer-component">
        <Split title={"新增客户"} />
        <div className="new-customer-content">
          {manCustRank.map(item => {
            let tags = item.tagVos || [];
            if (tags && tags.length > 3) {
              tags = tags.slice(0, 3);
            }
            return (
              <Link to={`/root/main/customer/detail?id=${item.custNo}&key=${item.objectKey}`} className="customer-item" key={item.custNo}>
                <div className="top">
                  <div className="avatar">{item.custName.substr(0, 1)}</div>
                  <div className="content">
                    <p className="name">{item.custName}</p>
                    <p className="tag">
                      {tags.map(item => {
                        return <span key={item.tagId}>{item.tagName}</span>;
                      })}
                    </p>
                  </div>
                </div>
                <div className="bottom">
                  <div className="item">
                    <p className="value">123456</p>
                    <p className="title">账号</p>
                  </div>
                  <div className="item">
                    <p className="value">{item.relatePhone}</p>
                    <p className="title">手机号码</p>
                  </div>
                  <div className="item">
                    <p className="value">{item.dpsitBal}</p>
                    <p className="title">存款余额（元）</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}

export default BussinessRemind;
