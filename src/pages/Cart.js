import React from "react";
import { Card, Row, Col, Empty, Button, Image, InputNumber } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Product from "./Product";

import PriceFormat from "../components/price/PriceFormat";
import DefaultImage from "../images/default-product.png";
import NumberFormat from "react-number-format";

const Cart = () => {
  const { cart, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const saveOrderToDb = () => {
    //
  };

  const showCartItems = () => (
    <div>
      {cart.map((p) => (
        <div className="main-background-color mt-3 p-3">
          <Row>
            <Col span={4} className="cart-product-image">
              {p.images.length ? (
                <Image
                  width={130}
                  height={130}
                  preview={false}
                  src={p.images[0].url}
                  key={p.public_id}
                  alt=""
                />
              ) : (
                <Card
                  className="card-default-image"
                  cover={
                    <img
                      className="product-default-image"
                      src={DefaultImage}
                      alt=""
                    />
                  }
                ></Card>
              )}
            </Col>

            <Col span={10} className="pl-3 pr-3 d-flex flex-column">
              <div>
                <h6>{p.title}</h6>
              </div>
              <div className="cart-product-brand">
                <p className="mb-0">Thương hiệu: {p.brand}</p>
              </div>
              <div className="cart-product-brand">
                <p>Topping: {p.topping}</p>
              </div>
              <div className="cart-product-delete mt-auto">
                <p className="text-danger mb-0">Xóa</p>
              </div>
            </Col>

            <Col span={4} className="pl-3 pr-3">
              <p className="cart-product-price m-0">
                <PriceFormat price={p.price * p.count} />
              </p>
            </Col>

            <Col span={6} className="d-flex pl-3">
              <p className="mt-1">Số lượng</p>
              <div className="ml-2">
                <InputNumber min={1} max={50} defaultValue={p.count}/>
              </div>
            </Col>
          </Row>
        </div>
      ))}
    </div>
  );

  return (
    <div className="body-home">
      <div className="container pt-3 pb-3">
        <Card className="breadcrumb-product">
          <Row className="d-flex align-items-end">
            <h5 className="m-0">Giỏ hàng</h5>
            <p className="ml-2 mb-0">({cart.length} sản phẩm)</p>
          </Row>
        </Card>

        {!cart.length ? (
          <Row>
            <Col span={24}>
              <div className="main-background-color mt-3 pt-4 pb-4">
                <Empty
                  image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                  draggable="false"
                  imageStyle={{
                    height: 100,
                  }}
                  description={"Không có sản phẩm nào trong giỏ hàng của bạn."}
                />

                <Row className="d-flex justify-content-center align-items-center mt-4">
                  <Button type="primary" size="large">
                    <Link to="/">Tiếp tục mua sắm</Link>
                  </Button>
                </Row>
              </div>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col span={17} className="pr-3">
              {showCartItems()}
            </Col>

            <Col span={7}>
              <div className="main-background-color mt-3">
                <Row className="p-3">
                  <Col span={6}>
                    <p className="m-0">Tạm tính</p>
                  </Col>
                  <Col span={18} className="d-flex align-items-end flex-column">
                    <p className="sub-total-price m-0">
                      <PriceFormat price={getTotal()} />
                    </p>
                  </Col>
                </Row>
                <hr className="m-0" />
                <Row className="p-3">
                  <Col span={6}>
                    <p className="m-0">Thành tiền</p>
                  </Col>
                  <Col span={18} className="d-flex align-items-end flex-column">
                    <p className="total-price mb-2">
                      <PriceFormat price={getTotal()} />
                    </p>
                    <p className="m-0">(Đã bao gồm VAT nếu có)</p>
                  </Col>
                </Row>
              </div>

              {user ? (
                <Button
                  onClick={saveOrderToDb}
                  className="mt-3"
                  type="primary"
                  size="large"
                  block
                >
                  <Link to="/cart">Tiến hành đặt hàng</Link>
                </Button>
              ) : (
                <Button className="mt-3" type="primary" size="large" block>
                  <Link to={{ pathname: "/login", state: { from: "cart" } }}>
                    Tiến hành đặt hàng
                  </Link>
                </Button>
              )}
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
};

export default Cart;
