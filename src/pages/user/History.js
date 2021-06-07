import React, { useState, useEffect } from "react";
import { Row, Col, Empty, Button, Card } from "antd";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import UserNav from "../../components/nav/UserNav";
import { getUserOrders } from "../../functions/user";
import Notification from "../../components/notification/Notification";
import PriceFormat from "../../components/price/PriceFormat";
import ShowPaymentInfo from "../../components/cards/ShowPaymentInfo";
import "react-quill/dist/quill.snow.css";
import HistoryDetailInfo from "../../components/cards/HistoryDetailInfo";

const History = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadUserOrders();
  }, []);

  const loadUserOrders = () =>
    getUserOrders(user.token).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });

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

  const showEachOrders = () =>
    orders.map((order, i) => (
      <Card key={i} className="mb-3">
        <ShowPaymentInfo order={order}></ShowPaymentInfo>
        {showOrderInTable(order)}
        <HistoryDetailInfo order={order} />
      </Card>
    ));

  return (
    <div className="container pt-5 pb-5">
      <Row>
        <Col span={5}>
          <UserNav />
        </Col>
        <Col span={19} className="pl-5">
          <h4>Lịch sử mua hàng</h4>
          <hr />

          {orders.length > 0 ? (
            <div>{showEachOrders()}</div>
          ) : (
            <Col span={24} className="pb-4 mt-5">
              <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                draggable="false"
                imageStyle={{
                  height: 100,
                }}
                description={"Bạn chưa mua sản phẩm nào."}
              />

              <Row className="d-flex justify-content-center align-items-center mt-4">
                <Button type="primary" size="large">
                  <Link to="/">Tiếp tục mua sắm</Link>
                </Button>
              </Row>
            </Col>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default History;
