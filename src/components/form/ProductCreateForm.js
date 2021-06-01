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

const ProductCreateForm = ({
  handleSubmit,
  handleChange,
  setValues,
  values,
  handleShippingChange,
  handleToppingChange,
  handleBrandChange,
  handleCategoryChange,
  subOptions,
  showSub,
  handleReload,
}) => {
  // destructure
  const { title, description, price, categories, subs, toppings, brands } =
    values;

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
        <Select placeholder="Vui lòng chọn..." onChange={handleShippingChange}>
          <Option key="No" value="Không">
            Không
          </Option>
          <Option key="Yes" value="Có">
            Có
          </Option>
        </Select>
      </Item>

      <Item label="Topping">
        <Select placeholder="Vui lòng chọn..." onChange={handleToppingChange}>
          {toppings.map((c) => (
            <Option key={c} value={c}>
              {c}
            </Option>
          ))}
        </Select>
      </Item>

      <Item label="Thương hiệu">
        <Select placeholder="Vui lòng chọn..." onChange={handleBrandChange}>
          {brands.map((b) => (
            <Option key={b} value={b}>
              {b}
            </Option>
          ))}
        </Select>
      </Item>

      <Item label="Danh mục">
        <Select placeholder="Vui lòng chọn..." onChange={handleCategoryChange}>
          {categories.length > 0 &&
            categories.map((c) => (
              <Option key={c._id} value={c._id}>
                {c.name}
              </Option>
            ))}
        </Select>
      </Item>

      {showSub && (
        <Item label="Danh mục con">
          <Select
            mode="multiple"
            allowClear
            placeholder="Vui lòng chọn..."
            value={subs}
            onChange={(value) => setValues({ ...values, subs: value })}
          >
            {subOptions.length &&
              subOptions.map((s) => (
                <Option key={s._id} value={s._id}>
                  {s.name}
                </Option>
              ))}
          </Select>
        </Item>
      )}

      <Item {...tailLayout} className="m-0">
        <Row>
          <Button type="primary" onClick={handleSubmit}>
            Lưu
          </Button>

          <Button className="ml-2" type="primary" onClick={handleReload}>
            Làm mới
          </Button>
        </Row>
      </Item>
    </Form>
  );
};

export default ProductCreateForm;
