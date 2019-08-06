import React from "react";
import "./component.scss";
import Split from "components/Split";
class BussinessRemind extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recommProd: []
    };
  }
  componentWillMount() {
    this.props.getRecommProd();
  }
  componentWillReceiveProps(recommProd) {
    if (recommProd !== this.state.recommProd) {
      this.setState({
        recommProd
      });
    }
  }
  componentDidMount() {}

  render() {
    let { recommProd } = this.state;
    try {
      recommProd = recommProd.recommProd.uglyData || [];
    } catch (error) {
      recommProd = []
    }
    return (
      <div className="home-product-component">
        <Split title={"使用产品推荐排行榜"} />
        <div className="product-content">
          {recommProd.map((item, index) => {
            switch (item.prodType) {
              case "dpsit":
                return (
                  <div className="product-item" key={index}>
                    <div className="top">
                      <div className="dpsit-img img">
                        <i className="iconfont icon-cunkuanlicai" />
                      </div>
                      <div className="name">{item.prodName}</div>
                      <div className="number">{item.appRecommCust}人可适用</div>
                    </div>
                    <div className="bottom">
                      <div className="item">
                        <p>存款</p>
                        <p className="title">产品类型</p>
                      </div>
                      <div className="item">
                        <p>{item.prodTerm}</p>
                        <p className="title">产品期限（月）</p>
                      </div>
                      <div className="item">
                        <p>{item.prodRate}</p>
                        <p className="title">利率</p>
                      </div>
                    </div>
                  </div>
                );
                break;
              case "loan":
                return (
                  <div className="product-item" key={index}>
                    <div className="top">
                      <div className="img loan-img">
                        <i className="iconfont icon-daikuanchanpin" />
                      </div>
                      <div className="name">{item.prodName}</div>
                      <div className="number">{item.appRecommCust}人可适用</div>
                    </div>
                    <div className="bottom">
                      <div className="item">
                        <p>贷款</p>
                        <p className="title">产品类型</p>
                      </div>
                      <div className="item">
                        <p>{item.longestTerm}</p>
                        <p className="title">最长期限（月）</p>
                      </div>
                      <div className="item">
                        <p>{item.highestAmt}</p>
                        <p className="title">最高金额（元）</p>
                      </div>
                    </div>
                  </div>
                );
                break;
              case "chrem":
                const now = new Date().getTime();
                const start = new Date(item.collStartDt).getTime();
                const end = new Date(item.collEndDt).getTime();
                let showTag = false;
                if (now >= start && now <= end) {
                  showTag = true;
                }
                return (
                  <div className="product-item" key={index}>
                    <div className="top">
                      <div className="img chrem-img">
                        <i className="iconfont icon-licaichanpin" />
                      </div>
                      <div className="name">
                        {item.prodName}
                        {showTag && <span className="tag">开售中</span>}
                      </div>
                      <div className="number">{item.appRecommCust}人可适用</div>
                    </div>
                    <div className="bottom">
                      <div className="item">
                        <p>理财</p>
                        <p className="title">产品类型</p>
                      </div>
                      <div className="item">
                        <p>{item.prodTerm}</p>
                        <p className="title">产品期限</p>
                      </div>
                      <div className="item">
                        <p>{item.expectedYield}</p>
                        <p className="title">预期收益率</p>
                      </div>
                    </div>
                  </div>
                );
                break;
              case "fund":
                return (
                  <div className="product-item" key={index}>
                    <div className="top">
                      <div className="img fund-img">
                        <i className="iconfont icon-jijinchanpin" />
                      </div>
                      <div className="name">
                        {item.prodName}
                        <span className="tag">基金类</span>
                      </div>
                      <div className="number">{item.appRecommCust}人可适用</div>
                    </div>
                    <div className="bottom">
                      <div className="item">
                        <p>{item.newNetValue}</p>
                        <p className="title">最新净值（元）</p>
                      </div>
                      <div className="item">
                        <p>{item.unitNetValue}</p>
                        <p className="title">单位净值（元）</p>
                      </div>
                      <div className="item">
                        <p>{item.expAnnuYield}</p>
                        <p className="title">预期年化收益利率</p>
                      </div>
                    </div>
                  </div>
                );
                break;
              case "invest":
                return (
                  <div className="product-item" key={index}>
                    <div className="top">
                      <div className="img invest-img">
                        <i className="iconfont icon-touzichanpin" />
                      </div>
                      <div className="name">
                        {item.prodName}
                        <span className="tag">投资类</span>
                      </div>
                      <div className="number">{item.appRecommCust}人可适用</div>
                    </div>
                    <div className="bottom">
                      <div className="item">
                        <p>{item.prodTerm}</p>
                        <p className="title">产品期限（天）</p>
                      </div>
                      <div className="item">
                        <p>{item.expectedYield}</p>
                        <p className="title">预期收益利率</p>
                      </div>
                      <div className="item">
                        <p>{item.buyAmt}</p>
                        <p className="title">起购金额（元）</p>
                      </div>
                    </div>
                  </div>
                );
                break;
              case "channel":
                return (
                  <div className="product-item" key={index}>
                    <div className="top">
                      <div className="img channel-img">
                        <i className="iconfont icon-qudaolei-yihutong" />
                      </div>
                      <div className="name">{item.prodName}</div>
                      <div className="number">{item.appRecommCust}人可适用</div>
                    </div>
                    <div className="bottom">
                      <div className="item">
                        <p>渠道类</p>
                        <p className="title">产品类型</p>
                      </div>
                      <div className="item">
                        <p>{item.prodKind}</p>
                        <p className="title">产品分类</p>
                      </div>
                    </div>
                  </div>
                );
                break;
              case "credit":
                return (
                  <div className="product-item" key={index}>
                    <div className="top">
                      <div className="img credit-img">
                        <i className="iconfont icon-xinyongqia" />
                      </div>
                      <div className="name">{item.prodName}</div>
                      <div className="number">{item.appRecommCust}人可适用</div>
                    </div>
                    <div className="bottom">
                      <div className="item">
                        <p>{item.prodYearFee}</p>
                        <p className="title">产品年费（元）</p>
                      </div>
                      <div className="item">
                        <p>{item.splitTerm}</p>
                        <p className="title">分期期限（期）</p>
                      </div>
                    </div>
                  </div>
                );
                break;
            }
          })}
        </div>
      </div>
    );
  }
}

export default BussinessRemind;
