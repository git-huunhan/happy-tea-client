import React, { useState, useEffect } from "react";
import {
  Button,
  Row,
  Col,
  Card,
  Alert,
  Space,
  Popconfirm,
  Empty,
  Input,
  Form,
  Select,
} from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { createProduct } from "../../../functions/product";
import AdminNav from "../../../components/nav/AdminNav";

const { Item } = Form;
const { Option } = Select;

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  toppings: [
    "Trân châu đen",
    "Trân châu ngọc trai",
    "Thạch nha đam",
    "Thạch trái cây",
    "Kem cheese",
    "Full topping",
  ],
  brands: ["Milksha", "Sharetea", "Coco", "Koi", "Chachago"],
  color: "",
  brand: "",
};

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const tailLayout = {
  wrapperCol: { offset: 4, span: 20 },
};

const ProductCreate = () => {
  const [values, setValue] = useState(initialState);

  // destructure
  const {
    title,
    description,
    price,
    categories,
    category,
    subs,
    shipping,
    quantity,
    images,
    toppings,
    brands,
    color,
    brand,
  } = values;

  const handleSubmit = (e) => {};

  const handleChange = (e) => {};

  return (
    <div className="container pt-5 pb-5">
      <Row>
        <Col span={5}>
          <AdminNav />
        </Col>
        <Col span={19} className="pl-5">
          <h4>Tạo sản phẩm</h4>

          <hr />
          <Card>
            <Form {...layout} onFinish={handleSubmit}>
              <Item label="Tên">
                <Input
                  type="text"
                  name="title"
                  value={title}
                  onChange={handleChange}
                />
              </Item>

              <Item label="Mô tả">
                <Input
                  type="text"
                  name="description"
                  value={description}
                  onChange={handleChange}
                />
              </Item>

              <Item label="Giá tiền">
                <Input
                  type="number"
                  name="price"
                  value={price}
                  onChange={handleChange}
                />
              </Item>

              <Item label="Vận chuyển">
                <Select name="shipping" onChange={handleChange}>
                  <Option value="No">Không</Option>
                  <Option value="Yes">Có</Option>
                </Select>
              </Item>

              <Item label="Số lượng">
                <Input
                  type="number"
                  name="quantity"
                  value={quantity}
                  onChange={handleChange}
                />
              </Item>

              <Item label="Topping">
                <Select name="topping" onChange={handleChange}>
                  {toppings.map((c) => (
                    <Option key={c} value={c}>
                      {c}
                    </Option>
                  ))}
                </Select>
              </Item>

              <Item label="Thương hiệu">
                <Select name="brand" onChange={handleChange}>
                  {brands.map((b) => (
                    <Option key={b} value={b}>
                      {b}
                    </Option>
                  ))}
                </Select>
              </Item>

              <Item {...tailLayout} className="m-0">
                <Button type="primary">Lưu</Button>
              </Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductCreate;
