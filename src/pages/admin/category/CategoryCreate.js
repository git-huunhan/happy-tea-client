import React, { useState, useEffect } from "react";
import {
  Button,
  Row,
  Col,
  Form,
  Input,
  Card,
  Alert,
  Space,
  Popconfirm,
  Empty,
} from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../functions/category";
import AdminNav from "../../../components/nav/AdminNav";
import Loading from "../../../components/loading/Loading";

const { Item } = Form;

const CategoryCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const handleSubmit = () => {
    setLoading(true);

    createCategory({ name }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        setName("");
        toast.dark(`${res.data.name} is created`);
        loadCategories();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });

    loadCategories();
  };

  const handleRemove = async (slug) => {
    setLoading(true);
    removeCategory(slug, user.token)
      .then((res) => {
        setLoading(false);
        toast.error(`${res.data.name} deleted`);
        loadCategories();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) {
          setLoading(false);
          toast.error(err.response.data);
        }
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
              Tạo danh mục <Loading />
            </h4>
          ) : (
            <h4>Tạo danh mục</h4>
          )}
          <hr />
          <Card>{categoryForm()}</Card>
          <Card className="mt-3">
            {categories.length === 0 ? (
              <Empty
                image={
                  <img
                    src="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                    alt="empty"
                    draggable="false"
                  />
                }
                imageStyle={{
                  height: 80,
                }}
                description={<span>Danh mục trống</span>}
              />
            ) : (
              categories.map((c) => (
                <Alert
                  className="mb-2 mt-2"
                  type="info"
                  message={c.name}
                  key={c._id}
                  action={
                    <Space>
                      <Button>
                        <Link to={`/admin/category/${c.slug}`}>
                          <EditOutlined
                            className="text-secondary"
                            size="large"
                          />
                          <span className="ml-2 text-secondary">Sửa</span>
                        </Link>
                      </Button>

                      <Popconfirm
                        title="Bạn có chắc chắn muốn xóa?"
                        onConfirm={() => handleRemove(c.slug)}
                        okText="Có"
                        cancelText="Không"
                      >
                        <Button>
                          <span>
                            <DeleteOutlined className="text-danger" />
                          </span>
                          <span className="ml-2 text-danger">Xóa</span>
                        </Button>
                      </Popconfirm>
                    </Space>
                  }
                />
              ))
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CategoryCreate;
