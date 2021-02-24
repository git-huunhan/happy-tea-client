import React from "react";
import { Button, Input, Form, Select, Row } from "antd";

const { Item } = Form;
const { Option } = Select;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const tailLayout = {
  wrapperCol: { offset: 4, span: 20 },
};

const ProductUpdateForm = ({
  handleSubmit,
  handleChange,
  values,
  handleShippingChange,
  handleToppingChange,
  handleBrandChange,
  handleCategoryChange,
  categories,
  subOptions,
  arrayOfSubs,
  setArrayOfSubs,
  selectedCategory
}) => {
  // destructure
  const {
    title,
    description,
    price,
    shipping,
    toppings,
    brands,
    topping,
    brand,
    category,
  } = values;

  return (
    <Form {...layout} onFinish={handleSubmit}>
      <Item label="Tên">
        <Input
          type="text"
          autoComplete="off"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Item>

      <Item label="Mô tả">
        <Input
          type="text"
          autoComplete="off"
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
        <Select
          placeholder="Vui lòng chọn..."
          onChange={handleShippingChange}
          value={shipping === "Có" ? "Có" : "Không"}
        >
          <Option key="No" value="Không">
            Không
          </Option>
          <Option key="Yes" value="Có">
            Có
          </Option>
        </Select>
      </Item>

      <Item label="Topping">
        <Select
          placeholder="Vui lòng chọn..."
          onChange={handleToppingChange}
          value={topping}
        >
          {toppings.map((c) => (
            <Option key={c} value={c}>
              {c}
            </Option>
          ))}
        </Select>
      </Item>

      <Item label="Thương hiệu">
        <Select
          placeholder="Vui lòng chọn..."
          onChange={handleBrandChange}
          value={brand}
        >
          {brands.map((b) => (
            <Option key={b} value={b}>
              {b}
            </Option>
          ))}
        </Select>
      </Item>

      <Item label="Danh mục">
        <Select
          placeholder="Vui lòng chọn..."
          onChange={handleCategoryChange}
          value={selectedCategory ? selectedCategory : category._id}
        >
          {categories.length > 0 &&
            categories.map((c) => (
              <Option key={c._id} value={c._id}>
                {c.name}
              </Option>
            ))}
        </Select>
      </Item>

      <Item label="Danh mục con">
        <Select
          mode="multiple"
          allowClear
          placeholder="Vui lòng chọn..."
          value={arrayOfSubs}
          onChange={(value) => setArrayOfSubs(value)}
        >
          {subOptions.length &&
            subOptions.map((s) => (
              <Option key={s._id} value={s._id}>
                {s.name}
              </Option>
            ))}
        </Select>
      </Item>

      <Item {...tailLayout} className="m-0">
        <Row>
          <Button type="primary" onClick={handleSubmit}>
            Lưu
          </Button>
        </Row>
      </Item>
    </Form>
  );
};

export default ProductUpdateForm;
