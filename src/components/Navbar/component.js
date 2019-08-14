import React from "react";
import styles from "./component.module.scss";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

class BottomNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHome: false,
      navList: []
    };
  }

  componentWillMount() {}

  UNSAFE_componentWillReceiveProps({ userPermission }) {}

  render() {
    const { activeIndex } = this.props;
    return (
      <div className={`${styles["navbar-component"]}`}>
        <Link
          className={`${styles["nav-item"]} ${styles["home"]}`}
          to={"/root/main/home"}
        >
          <div className={`${styles["icon-wrapper"]} ${activeIndex===0?styles["active"]:''}`}>
            <i className={`${styles["iconfont"]} iconfont icon-home_nor`} />
          </div>
          <p className={`${activeIndex===0?styles["active"]:''}`}>首页</p>
        </Link>
        <Link
          className={`${styles["nav-item"]} ${styles["customer"]}`}
          to={"/root/main/customer"}
        >
          <div className={`${styles["icon-wrapper"]} ${activeIndex===1?styles["active"]:''}`}>
            <i className={`${styles["iconfont"]} iconfont icon-customer_nor`} />
          </div>
          <p className={`${activeIndex===1?styles["active"]:''}`}>客户</p>
        </Link>
        <Link
          className={`${styles["nav-item"]} ${styles["mine"]}`}
          to={"/root/main/task"}
        >
          <div className={`${styles["sale-wrapper"]} ${styles["icon-wrapper"]} ${activeIndex===2?styles["active"]:''} `}>
            <i
              className={`${styles["iconfont"]} ${
                styles["sale-icon"]
              } iconfont icon-task_nor`}
            />
          </div>
          <p className={`${activeIndex===2?styles["active"]:''}`}>营销任务</p>
        </Link>
        <Link
          className={`${styles["nav-item"]} ${styles["mine"]}`}
          to={"/root/main/product"}
        >
          <div className={`${styles["icon-wrapper"]} ${activeIndex===3?styles["active"]:''}`}>
            <i className={`${styles["iconfont"]} iconfont icon-product_nor`} />
          </div>
          <p className={`${activeIndex===3?styles["active"]:''}`}>产品</p>
        </Link>
        <Link
          className={`${styles["nav-item"]} ${styles["mine"]}`}
          to={"/root/main/mine"}
        >
          <div className={`${styles["icon-wrapper"]} ${activeIndex===4?styles["active"]:''}`}>
            <i className={`${styles["iconfont"]} iconfont icon-me_nor`} />
          </div>
          <p className={`${activeIndex===4?styles["active"]:''}`}>我的</p>
        </Link>
      </div>
    );
  }
}

export default withRouter(BottomNav);
