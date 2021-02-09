import React from "react";
import { Button, Col, Form, Input } from "antd";

const { Item } = Form;

const CategoryForm = ({ handleSubmit, name, setName, placeholder }) => {
  return (
    <Form onFinish={handleSubmit}>
      <Col span={10}>
        <Item>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder={placeholder}
          />
        </Item>
        <Button type="primary" size="middle" onClick={handleSubmit}>
          Lưu
        </Button>
      </Col>
    </Form>
  );
};

export default CategoryForm;
