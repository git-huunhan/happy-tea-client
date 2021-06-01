import React from "react";
import {
  LogoutOutlined,
  DashboardOutlined,
  UserOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Menu, Row, Col, Badge, Popover, Image, Button, Empty } from "antd";
import { Link, useHistory, useLocation } from "react-router-dom";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";

import CategoryList from "../category/CategoryList";
import Search from "../form/Search";
import CategorySearch from "../category/CategorySearch";
import DefaultImage from "../../images/default-product.png";
import PriceFormat from "../price/PriceFormat";

const { SubMenu, Item } = Menu;

const Header = () => {
  let location = useLocation();

  let dispatch = useDispatch();
  let { user, cart } = useSelector((state) => ({ ...state }));
  let history = useHistory();

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });

    history.push("/login");
  };

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  return (
    <div className="main-background-color pt-1 pb-1">
      <div className="container pb-1">
        <Row>
          <Col span={24}>
            <Menu selectedKeys={[location.pathname]} mode="horizontal">
              {!user && (
                <Item key="/register" className="float-right mr-0">
                  <Link to="/register">Đăng ký</Link>
                </Item>
              )}

              {!user && (
                <Item key="/login" className="float-right">
                  <Link to="/login">Đăng nhập</Link>
                </Item>
              )}

              {user && (
                <SubMenu
                  title={user.email && user.email.split("@")[0]}
                  className="username float-right mr-0"
                >
                  {user && user.role === "subscriber" && (
                    <Item key="/user/history" icon={<UserOutlined />}>
                      <Link to="/user/history">Tài khoản của tôi</Link>
                    </Item>
                  )}

                  {user && user.role === "admin" && (
                    <Item key="/admin/dashboard" icon={<DashboardOutlined />}>
                      <Link to="/admin/dashboard">Bảng điều khiển</Link>
                    </Item>
                  )}

                  <Item icon={<LogoutOutlined />} onClick={logout}>
                    Đăng xuất
                  </Item>
                </SubMenu>
              )}

              <Item key="/" className="ml-0">
                <Link to="/">Trang chủ</Link>
              </Item>

              <Item key="/shop">
                <Link to="/shop">Sản phẩm</Link>
              </Item>
            </Menu>
          </Col>
        </Row>
        <Row>
          <Col span={8} className="d-flex align-items-center">
            <div className="float-left">
              <a className="navbar-brand p-0" href="/">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/happy-tea-1a89b.appspot.com/o/Logo.svg?alt=media&token=9946ba39-54a3-4927-97e7-e25ab5b98062"
                  alt="logo"
                  className="logo"
                  draggable="false"
                />
              </a>
            </div>
            <div className="float-left header-dropdown d-flex align-items-center ml-4">
              <CategoryList />
            </div>
          </Col>

          <Col span={13} className="d-flex align-items-center">
            <Search />
          </Col>
          <Col
            span={3}
            className="cart-icon d-flex align-items-center justify-content-center"
          >
            <Popover
              placement="bottom"
              content={
                <div style={{ width: "300px" }}>
                  <div className="popover-cart pr-3 pt-2 pl-3">
                    {!cart.length ? (
                      <Row>
                        <Col span={24}>
                          <div className="main-background-color pt-4 pb-4">
                            <Empty
                              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                              draggable="false"
                              imageStyle={{
                                height: 100,
                              }}
                              description={
                                "Không có sản phẩm nào trong giỏ hàng của bạn."
                              }
                            />
                          </div>
                        </Col>
                      </Row>
                    ) : (
                      cart.map((p) => (
                        <Row key={p._id} className="mt-2 mb-2">
                          <Col span={6} className="cart-product-image">
                            {p.images.length ? (
                              <Image
                                width={50}
                                height={50}
                                preview={false}
                                src={p.images[0].url}
                                key={p.public_id}
                                alt=""
                              />
                            ) : (
                              <img
                                className="product-default-image"
                                src={DefaultImage}
                                alt=""
                                style={{
                                  width: 50,
                                  height: 50,
                                  objectFit: "cover",
                                }}
                              />
                            )}
                          </Col>
                          <Col
                            span={18}
                            className="pl-2 pr-1 d-flex flex-column"
                          >
                            <Row>
                              <Link
                                to={`/product/${p.slug}`}
                                style={{ color: "#000" }}
                              >
                                <p className="m-0 font-weight-bold text-trans">
                                  {p.title}
                                </p>
                              </Link>
                            </Row>

                            <Row className="mt-auto">
                              <Col span={6}>
                                <p className="m-0 font-weight-bold">
                                  x{p.count}
                                </p>
                              </Col>

                              <Col
                                span={18}
                                className="d-flex align-items-end flex-column font-weight-bold popover-price"
                              >
                                <PriceFormat price={p.price * p.count} />
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      ))
                    )}
                  </div>
                  <hr className="m-0" />
                  <Col className="d-flex align-items-end flex-column p-3">
                    <div className="d-flex align-items-center">
                      <p className="m-0 font-weight-bold">Tổng cộng:</p>
                      <div className="popover-total-price mb-0 ml-2">
                        <PriceFormat price={getTotal()} />
                      </div>
                    </div>
                  </Col>

                  <Col className="pl-3 pr-3 pb-3">
                    <Link to="/cart">
                      <Button type="primary" block>
                        Xem giỏ hàng
                      </Button>
                    </Link>
                  </Col>
                </div>
              }
              title={`Giỏ hàng (${cart.length} sản phẩm)`}
            >
              <Link to="/cart">
                <Badge count={cart.length} overflowCount={99} offset={[3, 0]}>
                  <ShoppingCartOutlined />
                </Badge>
              </Link>
            </Popover>
          </Col>
        </Row>
        <Row>
          <Col span={8}></Col>
          <Col span={16}>
            <CategorySearch />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Header;
