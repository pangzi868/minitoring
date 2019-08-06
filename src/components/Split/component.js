import React from "react";
import styles from "./component.module.scss";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
class Split extends React.Component {
  render() {
    const { title, href } = this.props;
    return (
      <div className={styles["split-component"]}>
        <span className={styles["title"]}>{title}</span>
        {href ? (
          <Link to={href} className={`${styles["link"]}`}>
            <i className={`${styles["more-icon"]} iconfont icon-switch_right`} />
          </Link>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default withRouter(Split);
