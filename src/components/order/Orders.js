import React from "react";
import { Row, Col, Select, Card, Form } from "antd";

import ShowPaymentInfo from "../cards/ShowPaymentInfo";
import HistoryDetailInfo from "../cards/HistoryDetailInfo";
import PriceFormat from "../price/PriceFormat";

const { Option } = Select;
const { Item } = Form;

const Orders = ({ orders, handleStatusChange }) => {
  const showOrderInTable = (order) => (
    <div className="mt-3 table-card">
      <Row className="p-3 header-table">
        <Col span={8}>Tên sản phẩm</Col>
        <Col span={6}>Số lượng</Col>
        <Col span={6}>Số tiền</Col>
        <Col span={4}>Trạng thái đơn hàng</Col>
      </Row>

      {order.products.map((p, i) => (
        <div key={i}>
          <hr className="m-0" />
          <Row className="p-3">
            <Col span={8}>{p.product.title}</Col>
            <Col span={6}>{p.count}</Col>
            <Col span={6}>
              <PriceFormat price={p.product.price * p.count} />
            </Col>
            <Col span={4}>{order.orderStatus}</Col>
          </Row>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {orders.map((order) => (
        <Card key={order._id} className="mb-3">
          <ShowPaymentInfo order={order} />

          <Row className="d-flex justify-content-center align-items-center">
            <span className="mr-1 card-title-history">Trạng thái đơn hàng:</span>

            <Col span={5}>
              <Item className="m-0">
                <Select
                  onChange={(value) => handleStatusChange(order._id, value)}
                  defaultValue={order.orderStatus}
                  name="status"
                >
                  <Option value="Chưa xử lý">Chưa xử lý</Option>
                  <Option value="Đang xử lý">Đang xử lý</Option>
                  <Option value="Đang giao">Đang giao</Option>
                  <Option value="Đã hủy">Đã hủy</Option>
                  <Option value="Đã giao">Đã giao</Option>
                </Select>
              </Item>
            </Col>
          </Row>
          {showOrderInTable(order)}
          <HistoryDetailInfo order={order} />
        </Card>
      ))}
    </>
  );
};

export default Orders;
