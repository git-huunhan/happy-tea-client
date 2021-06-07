import React, { useState, useEffect } from "react";
import { Row, Col, Empty } from "antd";
import { useSelector, useDispatch } from "react-redux";
import Notification from "../../components/notification/Notification";

import { getOrders, changeStatus } from "../../functions/admin";
import AdminNav from "../../components/nav/AdminNav";
import Orders from "../../components/order/Orders";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () =>
    getOrders(user.token).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });

  const handleStatusChange = (orderId, orderStatus) => {
    changeStatus(orderId, orderStatus, user.token).then((res) => {
      Notification("success", "Đã cập nhật trạng thái đơn hàng");
      loadOrders();
    });
  };

  return (
    <div className="container pt-5 pb-5">
      <Row>
        <Col span={5}>
          <AdminNav />
        </Col>
        <Col span={19} className="pl-5">
          <h4>Bảng điều khiển</h4>

          <hr />

          {/* {JSON.stringify(orders)} */}

          {orders.length > 0 ? (
            <Orders orders={orders} handleStatusChange={handleStatusChange} />
          ) : (
            <Col span={24} className="pb-4 mt-5">
              <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                draggable="false"
                imageStyle={{
                  height: 100,
                }}
                description={"Chưa có đơn hàng."}
              />
            </Col>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
