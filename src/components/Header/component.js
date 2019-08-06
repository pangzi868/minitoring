import React from "react";

import styles from "./component.module.scss";
import { withRouter } from "react-router";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
  }


  render() {
    return (
      <div className={styles["header-component"]}>
        <div className={styles["title"]}>天威视讯</div>
      </div>
    );
  }
}

export default withRouter(Header);
