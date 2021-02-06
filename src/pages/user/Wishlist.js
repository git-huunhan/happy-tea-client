import React from "react";
import { Row, Col } from "antd";

import UserNav from "../../components/nav/UserNav";

const Wishlist = () => (
  <div className="container pt-5 pb-5">
    <Row>
      <Col span={5}>
        <UserNav />
      </Col>
      <Col span={19} className="pl-5">
        <h4>Yêu thích</h4>
      </Col>
    </Row>
  </div>
);

export default Wishlist;
