import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Button,
  Card,
  Steps,
  Collapse,
  Form,
  Input,
  Radio,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { CreditCardOutlined, EnvironmentOutlined } from "@ant-design/icons";

import {
  getUserCart,
  saveUserAddress,
  getUserAddress,
  applyCoupon,
  createCashOrderForUser,
  emptyUserCart,
} from "../functions/user";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Notification from "../components/notification/Notification";
import PriceFormat from "../components/price/PriceFormat";

const { Step } = Steps;
const { Panel } = Collapse;
const { Item } = Form;

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

const Checkout = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(0);
  const [address, setAddress] = useState("");
  const [coupon, setCoupon] = useState("");
  const [value, setValue] = useState(1);

  // discount price
  const [totalAfterDiscount, setTotalAfterDiscount] = useState("");
  const [discountError, setDiscountError] = useState("");

  const dispatch = useDispatch();
  const { user, COD } = useSelector((state) => ({ ...state }));
  const couponTrueOrFalse = useSelector((state) => state.coupon);

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

    dispatch({
      type: "COD",
      payload: true,
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

  const applyDiscountCoupon = () => {
    console.log("send coupon to backend", coupon);
    // applyCoupon
    applyCoupon(user.token, coupon).then((res) => {
      console.log("RES ON COUPON APPLIED", res.data);
      if (res.data) {
        setTotalAfterDiscount(res.data);
        // update redux coupon applied true/false
        dispatch({
          type: "COUPON_APPLIED",
          payload: true,
        });
      }

      // error
      if (res.data.err) {
        setDiscountError(res.data.err);
        // update redux coupon applied true/false
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
      }
    });
  };

  const showAddress = () => (
    <>
      <ReactQuill
        theme="snow"
        value={address}
        onChange={setAddress}
        enable={false}
      />
      <Button className="mt-3" type="primary" onClick={saveAddressToDb}>
        Lưu
      </Button>
    </>
  );

  const showProductSummary = () =>
    products.map((p, i) => (
      <Row key={i}>
        <Col span={4}>{p.count}x</Col>

        <Col span={12}>
          {p.product.title} ({p.topping})
        </Col>
        <Col
          span={8}
          className="d-flex justify-content-end bold"
          style={{ fontWeight: "bold" }}
        >
          <PriceFormat price={p.product.price * p.count} />
        </Col>
      </Row>
    ));

  const showApplyCoupon = () => (
    <Form onFinish={applyDiscountCoupon}>
      <Item className="m-0">
        <Input
          type="text"
          value={coupon}
          onChange={(e) => {
            setCoupon(e.target.value);
            setDiscountError("");
          }}
          placeholder={"Nhập mã giảm giá"}
        />
      </Item>
      <Button
        className="mt-3"
        type="primary"
        size="middle"
        onClick={applyDiscountCoupon}
      >
        Áp dụng mã giảm giá
      </Button>
    </Form>
  );

  const handleMethod = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);

    if (e.target.value === 1) {
      dispatch({
        type: "COD",
        payload: true,
      });
    } else if (e.target.value === 2) {
      dispatch({
        type: "COD",
        payload: false,
      });
    }
  };

  const createCashOrder = () => {
    createCashOrderForUser(user.token, COD, couponTrueOrFalse).then((res) => {
      console.log("USER CASH ORDER CREATED RES", res);
      // empty cart from redux, local storage, reset coupon, reset COD, redirect
      if (res.data.ok) {
        // empty local storage
        if (typeof window !== "undefined") localStorage.removeItem("cart");
        // empty redux cart
        dispatch({
          type: "ADD_TO_CART",
          payload: [],
        });

        // empty redux coupon
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });

        // empty redux COD
        dispatch({
          type: "COD",
          payload: true,
        });

        // empty cart from backend
        emptyUserCart(user.token);
        // redirect
        setTimeout(() => {
          history.push("/user/history");
        }, 1000);
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
                  {showAddress()}
                </div>

                <hr className="m-0" />

                <div className="p-3">
                  <h5>Mã giảm giá</h5>
                  <Row>
                    <Col span={10}>
                      {showApplyCoupon()}
                      {discountError && (
                        <p className="text-danger mt-1">{discountError}</p>
                      )}
                    </Col>

                    <Col span={14} className="d-flex justify-content-end">
                      <img
                        width={350}
                        height={220}
                        draggable={false}
                        alt="example"
                        src="https://firebasestorage.googleapis.com/v0/b/happy-tea-1a89b.appspot.com/o/coupon.svg?alt=media&token=69bac87c-30b9-472f-9071-21cacfb5bc5e"
                      />
                    </Col>
                  </Row>
                </div>

                <hr className="m-0" />

                <div className="p-3">
                  <h5>Chọn hình thức thanh toán</h5>

                  <Radio.Group onChange={handleMethod} value={value}>
                    <Row>
                      <Radio value={1} className="d-flex align-items-center">
                        <div className="d-flex align-items-center">
                          <EnvironmentOutlined
                            style={{ fontSize: "20px" }}
                            className="mr-2 "
                          />
                          <span>Thanh toán tiền mặt khi nhận hàng</span>
                        </div>
                      </Radio>
                    </Row>

                    <Row className="mt-3">
                      <Radio value={2} className="d-flex align-items-center">
                        <div className="d-flex align-items-center">
                          <CreditCardOutlined
                            style={{ fontSize: "20px" }}
                            className="mr-2"
                          />
                          <span>Thanh toán bằng thẻ quốc tế Visa</span>
                        </div>
                      </Radio>
                    </Row>
                  </Radio.Group>
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
                      <div style={{ fontWeight: "bold" }}>Đơn hàng</div>
                      <div className="ml-1">({products.length} sản phẩm)</div>
                    </div>
                  }
                  key="1"
                >
                  <div>{showProductSummary()}</div>
                </Panel>
              </Collapse>

              <Row className="pt-3 pl-3 pr-3">
                <Col span={10}>
                  <p className="m-0">Tạm tính</p>
                </Col>
                <Col span={14} className="d-flex align-items-end flex-column">
                  <div className="sub-total-price m-0">
                    <PriceFormat price={total} />
                  </div>
                </Col>
              </Row>

              <Row className="p-3">
                <Col span={10}>
                  <p className="m-0">Phí vận chuyển</p>
                </Col>
                <Col span={14} className="d-flex align-items-end flex-column">
                  <div className="sub-total-price m-0">
                    <PriceFormat price={0} />
                  </div>
                </Col>
              </Row>

              {totalAfterDiscount > 0 && (
                <Row className="pl-3 pr-3 pb-3">
                  <Col span={12}>
                    <p className="m-0">Áp dụng mã giảm giá</p>
                  </Col>
                  <Col span={12} className="d-flex align-items-end flex-column">
                    <div className="sub-total-price text-success m-0">
                      <PriceFormat price={-(total - totalAfterDiscount)} />
                    </div>
                  </Col>
                </Row>
              )}

              <hr className="m-0" />
              <Row className="p-3">
                <Col span={10}>
                  <p className="m-0">Thành tiền</p>
                </Col>
                <Col span={14} className="d-flex align-items-end flex-column">
                  <div className="total-price mb-2">
                    {totalAfterDiscount > 0 ? (
                      <PriceFormat price={totalAfterDiscount} />
                    ) : (
                      <PriceFormat price={total} />
                    )}
                  </div>

                  <p className="m-0">(Đã bao gồm VAT nếu có)</p>
                </Col>
              </Row>
            </div>

            <Button
              type="primary"
              size="large"
              className="mt-3"
              block
              disabled={current === 1 || current === 0}
              onClick={
                value === 1 ? createCashOrder : () => history.push("/payment")
              }
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
