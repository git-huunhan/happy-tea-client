import React from "react";
import { Row, Col } from "antd";

import AdminNav from "../../components/nav/AdminNav";

const AdminDashboard = () => {
  return (
    <div className="container pt-5 pb-5">
      <Row>
        <Col span={5}>
          <AdminNav />
        </Col>
        <Col span={19} className="pl-5">
          <h4>Bảng điều khiển</h4>

          <hr />
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
