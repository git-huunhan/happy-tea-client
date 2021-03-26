import React, { useState, useEffect } from "react";
import { Button, Row, Col, Card, Alert, Space, Popconfirm, Empty } from "antd";
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
import CategoryForm from "../../../components/form/CategoryForm";
import LocalSearch from "../../../components/form/LocalSearch";
import Notification from "../../../components/notification/Notification";

const CategoryCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  // step 1
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: "0",
    });
  });

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const handleSubmit = () => {
    setLoading(true);

    createCategory({ name }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        setName("");
        Notification("success", `${res.data.name} is created`);
        loadCategories();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400)
          Notification("error", err.response.data);
      });

    loadCategories();
  };

  const handleRemove = async (slug) => {
    setLoading(true);
    removeCategory(slug, user.token)
      .then((res) => {
        setLoading(false);
        Notification("success", `${res.data.name} deleted`);
        loadCategories();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) {
          setLoading(false);
          Notification("error", err.response.data);
        }
      });
  };

  // step 4
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

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
          <Card>
            <h6>Tên danh mục</h6>
            <CategoryForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
              placeholder="Nhập tên danh mục"
            />
          </Card>
          <Card className="mt-3">
            {/* step 2 and step 3 */}
            <h6>Tất cả danh mục</h6>
            <LocalSearch keyword={keyword} setKeyword={setKeyword} />

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
              // step 5
              categories.filter(searched(keyword)).map((c) => (
                <Alert
                  className="mt-2"
                  type="info"
                  message={c.name}
                  key={c._id}
                  action={
                    <Space>
                      <Button>
                        <Link to={`/admin/category/${c.slug}`}>
                          <EditOutlined
                            className="text-primary"
                            size="large"
                          />
                          <span className="ml-2 text-primary">Sửa</span>
                        </Link>
                      </Button>

                      <Popconfirm
                        title="Bạn có chắc chắn muốn xóa?"
                        onConfirm={() => handleRemove(c.slug)}
                        okText="Có"
                        cancelText="Không"
                      >
                        <Button icon={<DeleteOutlined className="text-danger" />}>
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
