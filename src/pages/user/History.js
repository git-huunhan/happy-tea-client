import React from "react";
import { Row, Col } from "antd";

import UserNav from "../../components/nav/UserNav";

const History = () => (
  <div className="container pt-5 pb-5">
    <Row>
      <Col span={5}>
        <UserNav />
      </Col>
      <Col span={19} className="pl-5">
        <h4>Lịch sử mua hàng</h4>
        <hr/>    
      </Col>
    </Row>
  </div>
);

export default History;
