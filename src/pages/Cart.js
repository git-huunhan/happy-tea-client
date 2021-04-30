import React from "react";
import { Card, Row, Col, Empty, Button, Image, InputNumber } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import PriceFormat from "../components/price/PriceFormat";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import { userCart } from "../functions/user";

const Cart = ({ history }) => {
  const { cart, user } = useSelector((state) => ({ ...state }));

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const saveOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log("cart save err", err));
  };

  const showCartItems = () => (
    <div>
      {cart.map((p) => (
        <ProductCardInCheckout key={p._id} p={p} />
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
              <Card className="breadcrumb-product mt-3">
                <Row className="d-flex align-items-end">
                  <Col span={10} className="font-weight-bold">
                    Sản phẩm
                  </Col>
                  <Col span={6} className="pl-3 pr-3 font-weight-bold">
                    Topping
                  </Col>
                  <Col span={4} className="pl-3 pr-3 font-weight-bold">
                    Số lượng
                  </Col>
                  <Col span={4} className="pl-3 pr-3 font-weight-bold">
                    Giá tiền
                  </Col>
                </Row>
              </Card>

              {showCartItems()}
            </Col>

            <Col span={7}>
              <div className="checkout-sticky">
                <div className="main-background-color mt-3">
                  <Row className="p-3">
                    <Col span={6}>
                      <p className="m-0">Tạm tính</p>
                    </Col>
                    <Col
                      span={18}
                      className="d-flex align-items-end flex-column"
                    >
                      <div className="sub-total-price m-0">
                        <PriceFormat price={getTotal()} />
                      </div>
                    </Col>
                  </Row>
                  <hr className="m-0" />
                  <Row className="p-3">
                    <Col span={6}>
                      <p className="m-0">Thành tiền</p>
                    </Col>
                    <Col
                      span={18}
                      className="d-flex align-items-end flex-column"
                    >
                      <div className="total-price mb-2">
                        <PriceFormat price={getTotal()} />
                      </div>
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
              </div>
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
};

export default Cart;
