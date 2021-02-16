import React, { useState, useEffect } from "react";
import {
  Button,
  Row,
  Col,
  Card,
  Select,
  Alert,
  Space,
  Popconfirm,
  Empty,
  Form,
} from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { createSub, removeSub, getSubs } from "../../../functions/sub";
import { getCategories } from "../../../functions/category";
import AdminNav from "../../../components/nav/AdminNav";
import Loading from "../../../components/loading/Loading";
import CategoryForm from "../../../components/form/CategoryForm";
import LocalSearch from "../../../components/form/LocalSearch";
import Notification from "../../../components/notification/Notification";

const { Item } = Form;
const { Option } = Select;

const SubCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [subs, setSubs] = useState([]);

  // step 1
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const loadSubs = () => getSubs().then((c) => setSubs(c.data));

  const handleSubmit = () => {
    setLoading(true);

    createSub({ name, parent: category }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        setName("");
        Notification("success", `${res.data.name} is created`);
        loadSubs();
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
    removeSub(slug, user.token)
      .then((res) => {
        setLoading(false);
        Notification("success", `${res.data.name} deleted`);
        loadSubs();
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
              Tạo danh mục con <Loading />
            </h4>
          ) : (
            <h4>Tạo danh mục con</h4>
          )}
          <hr />

          <Card>
            <h6>Danh mục</h6>
            <Col span={10}>
              <Item className="m-0">
                <Select
                  placeholder="Chọn danh mục"
                  onChange={(value) => setCategory(value)}
                >
                  {categories.length > 0 &&
                    categories.map((c) => (
                      <Option key={c._id} value={c._id}>
                        {c.name}
                      </Option>
                    ))}
                </Select>
              </Item>
            </Col>
          </Card>

          <Card className="mt-3">
            <h6>Tên danh mục con</h6>
            <CategoryForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
              placeholder="Nhập tên danh mục con"
            />
          </Card>
          <Card className="mt-3">
            {/* step 2 and step 3 */}
            <h6>Tất cả danh mục</h6>
            <LocalSearch keyword={keyword} setKeyword={setKeyword} />

            {subs.length === 0 ? (
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
              subs.filter(searched(keyword)).map((s) => (
                <Alert
                  className="mt-2"
                  type="info"
                  message={s.name}
                  key={s._id}
                  action={
                    <Space>
                      <Button>
                        <Link to={`/admin/sub/${s.slug}`}>
                          <EditOutlined
                            className="text-secondary"
                          />
                          <span className="ml-2 text-secondary">Sửa</span>
                        </Link>
                      </Button>

                      <Popconfirm
                        title="Bạn có chắc chắn muốn xóa?"
                        onConfirm={() => handleRemove(s.slug)}
                        okText="Có"
                        cancelText="Không"
                      >
                        <Button icon={ <DeleteOutlined className="text-danger" />}>
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

export default SubCreate;
