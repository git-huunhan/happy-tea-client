import React, { useState } from "react";
import { LogoutOutlined } from "@ant-design/icons";
import "../../App.scss";
import { Menu, Row, Col } from "antd";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase";
import { useDispatch } from "react-redux";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");

  let dispatch = useDispatch();
  let history = useHistory();

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });

    history.push("/login");
  };

  return (
    <div className="container">
      <Row>
      <Col span={12}>
        <a className="navbar-brand" href="/">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/happy-tea-1a89b.appspot.com/o/Logo.svg?alt=media&token=6870761d-ab2f-4a2a-9b92-e25c4a5affca"
            alt="logo"
            className="logo"
            draggable="false"
          />
        </a>
      </Col>

      <Col span={12}>
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
          <Item key="register" className="float-right mr-0">
            <Link to="/register">Đăng ký</Link>
          </Item>

          <Item key="login" className="float-right">
            <Link to="/login">Đăng nhập</Link>
          </Item>

          <SubMenu key="SubMenu" title="Username" className="float-right">
            <Item key="setting:1">Option 1</Item>
            <Item key="setting:2">Option 2</Item>
            <Item icon={<LogoutOutlined />} onClick={logout}>
              Đăng xuất
            </Item>
          </SubMenu>

          <Item key="home" className="float-right">
            <Link to="/">Trang chủ</Link>
          </Item>
        </Menu> 
      </Col>
    </Row>
    </div>
  );
};

export default Header;
