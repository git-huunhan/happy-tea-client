import React, { useEffect, useState } from "react";
import { Row, Col, Button, Card, Steps, Collapse } from "antd";
import { useSelector, useDispatch } from "react-redux";

import {
  getUserCart,
  saveUserAddress,
  getUserAddress,
} from "../functions/user";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Notification from "../components/notification/Notification";

const { Step } = Steps;
const { Panel } = Collapse;

const steps = [
  {
    title: "Đăng nhập",
  },
  {
    title: "Địa chỉ giao hàng",
  },
  {
    title: "Thanh toán & Đặt mua",
  },
];

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(0);
  const [address, setAddress] = useState("");

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      // console.log("user cart res", JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });

    getUserAddress(user.token).then((res) => {
      // console.log("address", JSON.stringify(res.data.address, null, 4));

      setAddress(res.data.address);
      if (res.data.address === "<p><br></p>") {
        setCurrent(1);
      }

      if (res.data.address !== "<p><br></p>") {
        setCurrent(2);
      }
    });
  }, []);

  const saveAddressToDb = () => {
    // console.log(address);
    saveUserAddress(user.token, address).then((res) => {
      if (address !== "<p><br></p>") {
        Notification("success", "Địa chỉ đã được lưu");
        setCurrent(2);
      }

      if (address === "<p><br></p>") {
        Notification(
          "error",
          "Địa chỉ trống! Vui lòng thêm địa chỉ để đặt hàng."
        );
        setCurrent(1);
      }
    });
  };

  return (
    <div className="body-home">
      <div className="container pt-3 pb-3">
        <Row>
          <Col span={17} className="pr-3">
            <div>
              <Card className="steps-checkout">
                <Steps current={current} size="small">
                  {steps.map((item) => (
                    <Step key={item.title} title={item.title} />
                  ))}
                </Steps>
              </Card>
            </div>

            <Col className="mt-3">
              <div className="main-background-color">
                <div className="p-3">
                  <h5>Địa chỉ giao hàng</h5>
                  <ReactQuill
                    theme="snow"
                    value={address}
                    onChange={setAddress}
                    enable={false}
                  />
                  <Button
                    className="mt-3"
                    type="primary"
                    onClick={saveAddressToDb}
                  >
                    Lưu
                  </Button>
                </div>

                <hr className="m-0" />

                <div className="p-3">
                  <h5>Mã giảm giá</h5>
                </div>
              </div>
            </Col>
          </Col>

          <Col span={7}>
            <div className="main-background-color">
              <Collapse accordion>
                <Panel
                  header={
                    <div className="d-flex">
                      <div style={{fontWeight: "bold"}}>Đơn hàng</div>
                      <div className="ml-1">({products.length} sản phẩm)</div>
                    </div>
                  }
                  key="1"
                >
                  <div>
                    {products.map((p, i) => (
                      <div key={i}>
                        <p className="m-0">
                          {p.product.title} ({p.topping}) x{p.count} ={" "}
                          {p.product.price * p.count}
                        </p>
                      </div>
                    ))}
                  </div>
                </Panel>
              </Collapse>

              <div className="p-3">
                <p className="m-0">Thành tiền: {total}</p>
              </div>
            </div>

            <Button
              type="primary"
              size="large"
              className="mt-3"
              block
              disabled={current === 1 || current === 0}
            >
              Đặt mua
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Checkout;
