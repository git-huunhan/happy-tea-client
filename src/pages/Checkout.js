import React, { useEffect, useState } from "react";
import { Row, Col, Button, Card, Steps } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getUserCart } from "../functions/user";

const { Step } = Steps;

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
  const [current, setCurrent] = React.useState(1);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      console.log("user cart res", JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);

  const saveAddressToDb = () => {
    //
    setCurrent(2);
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
                  Text area
                  <Button type="primary" onClick={saveAddressToDb}>
                    Save
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
              <div className="p-3">
                <p className="m-0">Đơn hàng ({products.length} sản phẩm)</p>
              </div>

              <hr className="m-0" />

              <div className="p-3">
                {products.map((p, i) => (
                  <div key={i}>
                    <p className="m-0">
                      {p.product.title} ({p.topping}) x{p.count} ={" "}
                      {p.product.price * p.count}
                    </p>
                  </div>
                ))}
              </div>

              <hr className="m-0" />

              <div className="p-3">
                <p className="m-0">Thành tiền: {total}</p>
              </div>
            </div>

            <Button type="primary" size="large" className="mt-3" block>
              Đặt mua
            </Button>
            <Button type="" size="large" className="mt-3" block>
              Xóa đơn hàng
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Checkout;
