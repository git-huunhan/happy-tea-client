import React, { useState, useEffect } from "react";
import { Button, Row, Col, Form, Input, Card } from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import { getCategory, updateCategory } from "../../../functions/category";
import AdminNav from "../../../components/nav/AdminNav";
import Loading from "../../../components/loading/Loading";

const { Item } = Form;

const CategoryUpdate = ({ history, match }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = () =>
    getCategory(match.params.slug).then((c) => setName(c.data.name));

  const handleSubmit = () => {
    setLoading(true);

    updateCategory(match.params.slug, { name }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        setName("");
        toast.dark(`${res.data.name} is updated`);
        history.push("/admin/category");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const categoryForm = () => (
    <Form onFinish={handleSubmit}>
      <Col span={10}>
        <Item label="Tên danh mục">
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            required
          />
        </Item>
        <Button type="primary" size="middle" onClick={handleSubmit}>
          Lưu
        </Button>
      </Col>
    </Form>
  );

  return (
    <div className="container pt-5 pb-5">
      <Row>
        <Col span={5}>
          <AdminNav />
        </Col>
        <Col span={19} className="pl-5">
          {loading ? (
            <h4>
              Sửa danh mục <Loading />
            </h4>
          ) : (
            <h4>Sửa danh mục</h4>
          )}
          <hr />
          <Card>{categoryForm()}</Card>
        </Col>
      </Row>
    </div>
  );
};

export default CategoryUpdate;
