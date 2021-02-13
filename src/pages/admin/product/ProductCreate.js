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
  notification
} from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { createProduct } from "../../../functions/product";
import AdminNav from "../../../components/nav/AdminNav";

const { Item } = Form;
const { Option } = Select;

const openNotification = ( message ) => {
  notification.error({
    message: `Notification ${message}`,
    placement: 'bottomLeft',
  });
};

const initialState = {
  title: "Trà đào",
  description: "Hihi trà này ngon vl",
  price: "15000",
  categories: [],
  category: "",
  subs: [],
  shipping: "Yes",
  quantity: "10",
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
  topping: "Trân châu đen",
  brand: "Chachago",
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

  // redux
  const { user } = useSelector((state) => ({ ...state }));

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
    topping,
    brand,
  } = values;

  const handleSubmit = (e) => {
    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        

      })
      .catch((err) => {
        console.log(err);
        // if (err.response.status === 400) toast.error(err.response.data);
        openNotification(err.response.data.err)
      });
  };

  const handleChange = (e) => {
    setValue({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, " ------ ", e.target.value);
  };

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
                <select name="shipping" onChange={handleChange}>
                  <option disabled selected>
                    Vui lòng chọn...
                  </option>
                  <option value="No">Không</option>
                  <option value="Yes">Có</option>
                </select>
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
                <select name="topping" onChange={handleChange}>
                  <option disabled selected>
                    Vui lòng chọn...
                  </option>
                  {toppings.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Item>

              <Item label="Thương hiệu">
                <select
                  placeholder="Vui lòng chọn"
                  name="brand"
                  onChange={handleChange}
                >
                  <option disabled selected>
                    Vui lòng chọn...
                  </option>
                  {brands.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </Item>

              <Item {...tailLayout} className="m-0">
                <Button type="primary" onClick={handleSubmit}>
                  Lưu
                </Button>
              </Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductCreate;
