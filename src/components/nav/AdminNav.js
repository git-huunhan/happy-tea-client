import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "antd";

const { Item } = Menu;

const AdminNav = () => {
  let location = useLocation();

  return (
    <Menu
      style={{ width: 256 }}
      selectedKeys={[location.pathname]}
      mode="vertical"
    >
      <Item key="/admin/dashboard">
        <span>Bảng điều khiển</span>
        <Link to="/admin/dashboard" />
      </Item>

      <Item key="/admin/product">
        <span>Sản phẩm</span>
        <Link to="/admin/product" />
      </Item>

      <Item key="/admin/products">
        <span>Tất cả sản phẩm</span>
        <Link to="/admin/products" />
      </Item>

      <Item key="/admin/category">
        <span>Danh mục</span>
        <Link to="/admin/category" />
      </Item>

      <Item key="/admin/sub">
        <span>Danh mục con</span>
        <Link to="/admin/sub" />
      </Item>

      <Item key="/admin/coupon">
        <span>Mã giảm giá</span>
        <Link to="/admin/coupon" />
      </Item>

      <Item key="/user/password">
        <span>Đổi mật khẩu</span>
        <Link to="/user/password" />
      </Item>

      <Item >
        <span>Happy New Year!</span>
      </Item>
    </Menu>
  );
};

export default AdminNav;
