import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";

import { getCategories } from "../../functions/category";
import { getSubs } from "../../functions/sub";

const { ItemGroup, Item } = Menu;

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [subs, setSubs] = useState([]);

  let location = useLocation();

  useEffect(() => {
    getCategories().then((c) => {
      setCategories(c.data);
    });

    getSubs().then((c) => {
      setSubs(c.data);
    });
  }, []);

  const showCategories = () => (
    <Menu selectedKeys={[location.pathname]}>
      <ItemGroup title="Danh mục">
        {categories.map((c) => (
          <Item key={`/category/${c.slug}`}>
            <a href={`/category/${c.slug}`}>{c.name}</a>
          </Item>
        ))}
      </ItemGroup>

      <ItemGroup title="Danh mục con">
        {subs.map((s) => (
          <Item key={s._id}>{s.name}</Item>
        ))}
      </ItemGroup>
    </Menu>
  );

  return (
    <Dropdown overlay={showCategories()}>
      <div>
        Danh mục Sản phẩm <DownOutlined />
      </div>
    </Dropdown>
  );
};

export default CategoryList;
