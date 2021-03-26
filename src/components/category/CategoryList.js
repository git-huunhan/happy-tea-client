import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";

import { getCategories } from "../../functions/category";
import { getSubs } from "../../functions/sub";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  const [subs, setSubs] = useState([]);

  useEffect(() => {
    getCategories().then((c) => {
      setCategories(c.data);
    });

    getSubs().then((c) => {
      setSubs(c.data);
    });
  }, []);

  const showCategories = () => (
    <Menu>
      <Menu.ItemGroup title="Danh mục">
        {categories.map((c) => (
          <Menu.Item key={c._id}>
            <Link to={`/category/${c.slug}`}>{c.name}</Link>
          </Menu.Item>
        ))}
      </Menu.ItemGroup>

      <Menu.ItemGroup title="Danh mục con">
        {subs.map((s) => (
          <Menu.Item key={s._id}>{s.name}</Menu.Item>
        ))}
      </Menu.ItemGroup>
    </Menu>
  );

  return (
    <div>
      <Dropdown overlay={showCategories}>
        <a>
          Danh mục Sản phẩm <DownOutlined />
        </a>
      </Dropdown>
    </div>
  );
};

export default CategoryList;
