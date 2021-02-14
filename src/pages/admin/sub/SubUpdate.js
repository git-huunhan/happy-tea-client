import React, { useState, useEffect } from "react";
import { Row, Col, Card, Form } from "antd";
import { useSelector } from "react-redux";

import { updateSub, getSub } from "../../../functions/sub";
import { getCategories } from "../../../functions/category";
import AdminNav from "../../../components/nav/AdminNav";
import Loading from "../../../components/loading/Loading";
import CategoryForm from "../../../components/form/CategoryForm";
import Notification from "../../../components/notification/Notification";

const { Item } = Form;

const SubUpdate = ({ match, history }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState("");

  useEffect(() => {
    loadCategories();
    loadSub();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const loadSub = () =>
    getSub(match.params.slug).then((s) => {
      setName(s.data.name);
      setParent(s.data.parent);
    });

  const handleSubmit = () => {
    setLoading(true);

    updateSub(match.params.slug, { name, parent }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        setName("");
        Notification("success", `${res.data.name} is updated`);
        history.push("/admin/sub");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400)
          Notification("error", err.response.data);
      });

    loadCategories();
  };

  return (
    <div className="container pt-5 pb-5">
      <Row>
        <Col span={5}>
          <AdminNav />
        </Col>
        <Col span={19} className="pl-5">
          {loading ? (
            <h4>
              Sửa danh mục con <Loading />
            </h4>
          ) : (
            <h4>Sửa danh mục con</h4>
          )}
          <hr />

          <Card>
            <h6>Danh mục</h6>
            <Col span={10}>
              <Item className="m-0">
                <select
                  placeholder="Chọn danh mục"
                  onChange={(e) => setParent(e.target.value)}
                >
                  {categories.length > 0 &&
                    categories.map((c) => (
                      <option
                        key={c._id}
                        value={c._id}
                        selected={c._id === parent}
                      >
                        {c.name}
                      </option>
                    ))}
                </select>
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
        </Col>
      </Row>
    </div>
  );
};

export default SubUpdate;
