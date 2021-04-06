import React from "react";
import {
  LogoutOutlined,
  DashboardOutlined,
  UserOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Menu, Row, Col } from "antd";
import { Link, useHistory, useLocation } from "react-router-dom";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";

import CategoryList from "../category/CategoryList";
import Search from "../form/Search";
import CategorySearch from "../category/CategorySearch";

const { SubMenu, Item } = Menu;

const Header = () => {
  let location = useLocation();

  let dispatch = useDispatch();
  let { user } = useSelector((state) => ({ ...state }));
  let history = useHistory();

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });

    history.push("/login");
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
                  src="https://firebasestorage.googleapis.com/v0/b/happy-tea-1a89b.appspot.com/o/Logo.svg?alt=media&token=6870761d-ab2f-4a2a-9b92-e25c4a5affca"
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
            <ShoppingCartOutlined />
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
