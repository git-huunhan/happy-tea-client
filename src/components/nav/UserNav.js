import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "antd";

const { Item } = Menu;

const UserNav = () => {
  let location = useLocation();

  return (
    <Menu
      style={{ width: 256 }}
      selectedKeys={[location.pathname]}
      mode="vertical"
    >
      <Item key="/user/history">
        <span>Lịch sử mua hàng</span>
        <Link to="/user/history" />
      </Item>

      <Item key="/user/password">
        <span>Đổi mật khẩu</span>
        <Link to="/user/password" />
      </Item>

      <Item key="/user/wishlist">
        <span>Yêu thích</span>
        <Link to="/user/wishlist" />
      </Item>
    </Menu>
  );
};

export default UserNav;
