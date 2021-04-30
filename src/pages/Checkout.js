import React from "react";
import { Row, Col, Button } from "antd";

const Checkout = () => {
  return (
    <div className="body-home">
      <div className="container pt-3 pb-3">
        <Row>
          <Col span={17} className="pr-3">
            <div className="main-background-color p-3">
              Địa chỉ giao hàng
              <br />
              Text area
              <Button type="primary">Save</Button>
              <hr />
              <h4>Mã giảm giá</h4>
            </div>
          </Col>

          <Col span={7}>
            <div className="main-background-color p-3">
              <h4>Thanh toán</h4>
              <p>Sản phẩm</p>
              <hr />
              <p>list sản phẩm</p>
              <hr />
              <p>Thành tiền</p>
              <Button>Đặt mua</Button>
              <Button>Xóa giỏ hàng</Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Checkout;
