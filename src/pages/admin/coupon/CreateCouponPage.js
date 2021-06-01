import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Row,
  Col,
  Card,
  Popconfirm,
  Empty,
  Form,
  Input,
  DatePicker,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import Notification from "../../../components/notification/Notification";
import {
  getCoupons,
  removeCoupon,
  createCoupon,
} from "../../../functions/coupon";
import AdminNav from "../../../components/nav/AdminNav";
import Loading from "../../../components/loading/Loading";

const { Item } = Form;
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const tailLayout = {
  wrapperCol: { offset: 4, span: 20 },
};

const CreateCouponPage = () => {
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [discount, setDiscount] = useState("");
  const [loading, setLoading] = useState("");
  const [coupons, setCoupons] = useState([]);

  // redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllCoupons();
  }, []);

  const loadAllCoupons = () => getCoupons().then((res) => setCoupons(res.data));

  const handleSubmit = (e) => {
    setLoading(true);
    //console.table(name, expiry, discount);
    createCoupon({ name, expiry, discount }, user.token)
      .then((res) => {
        setLoading(false);
        loadAllCoupons();
        setName("");
        setDiscount("");
        setExpiry("");
        Notification("success", `Mã giảm giá "${res.data.name}" đã được tạo`);
      })
      .catch((err) => console.log("create coupon err", err));
  };

  const handleRemove = (couponId) => {
    setLoading(true);
    removeCoupon(couponId, user.token)
      .then((res) => {
        loadAllCoupons();
        setLoading(false);
        Notification("success", `Đã xóa mã giảm giá "${res.data.name}"`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container pt-5 pb-5">
      <Row>
        <Col span={5}>
          <AdminNav />
        </Col>
        <Col span={19} className="pl-5">
          {loading ? (
            <h4>
              Mã giảm giá <Loading />
            </h4>
          ) : (
            <h4>Mã giảm giá</h4>
          )}
          <hr />
          <Card>
            <h6>Nhập mã giảm giá</h6>
            <Form {...layout} onFinish={handleSubmit}>
              <Item label="Tên">
                <Col span={8}>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoFocus
                  />
                </Col>
              </Item>

              <Item label="Giảm giá">
                <Col span={8}>
                  <Input
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    required
                    suffix="%"
                  />
                </Col>
              </Item>

              <Item label="Hạn sử dụng">
                <DatePicker
                  onChange={(date) => setExpiry(date)}
                  value={expiry}
                  required
                  format={"DD/MM/YYYY"}
                  placeholder=""
                />
              </Item>

              <Item {...tailLayout} className="m-0">
                <Button type="primary" size="middle" onClick={handleSubmit}>
                  Lưu
                </Button>
              </Item>
            </Form>
          </Card>

          <div className="mt-3 table-card">
            <Row className="p-3 header-table">
              <Col span={8}>Tên</Col>
              <Col span={6}>Hạn sử dụng</Col>
              <Col span={6}>Giảm giá</Col>
              <Col span={4}>Hành động</Col>
            </Row>

            {coupons.length === 0 ? (
              <Empty
                image={
                  <img
                    src="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                    alt="empty"
                    draggable="false"
                  />
                }
                imageStyle={{
                  height: 80,
                }}
                description={<span>Chưa có mã giảm giá nào</span>}
                className="mt-4 mb-4"
              />
            ) : (
              coupons.map((c) => (
                <div key={c._id}>
                  <hr className="m-0" />
                  <Row className="p-3">
                    <Col span={8}>{c.name}</Col>
                    <Col span={6}>
                      {new Date(c.expiry).toLocaleDateString("en-GB")}
                    </Col>
                    <Col span={6}>{c.discount}%</Col>
                    <Col span={4} className="text-danger">
                      <Popconfirm
                        title="Bạn có chắc chắn muốn xóa?"
                        onConfirm={() => handleRemove(c._id)}
                        okText="Có"
                        cancelText="Không"
                        className="btn-table-delete"
                      >
                        <DeleteOutlined /> Xóa
                      </Popconfirm>
                    </Col>
                  </Row>
                </div>
              ))
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CreateCouponPage;
