import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "antd";
import { useSelector } from "react-redux";

import { createProduct } from "../../../functions/product";
import AdminNav from "../../../components/nav/AdminNav";
import Notification from "../../../components/notification/Notification";
import ProductCreateForm from "../../../components/form/ProductCreateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/form/FileUpload";
import Loading from "../../../components/loading/Loading";

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  shipping: "",
  images: [
  ],
  toppings: [
    "Trân châu đen",
    "Trân châu ngọc trai",
    "Thạch nha đam",
    "Thạch trái cây",
    "Kem cheese",
    "Full topping",
  ],
  brands: ["Milksha", "Sharetea", "Coco", "Koi", "Chachago"],
  topping: "",
  brand: "",
};

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const [loading, setLoading] = useState(false);

  // redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setValues({ ...values, categories: c.data }));

  const handleSubmit = (e) => {
    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        Notification("success", `Sản phẩm "${res.data.title}" đã được tạo.`);
      })
      .catch((err) => {
        console.log(err);
        // if (err.response.status === 400) toast.error(err.response.data);
        Notification("error", "Đã có lỗi xảy ra, vui lòng thử lại!");
      });
  };

  const handleReload = (e) => {
    window.location.reload();
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleShippingChange = (value) => {
    setValues({ ...values, shipping: value });
  };

  const handleToppingChange = (value) => {
    setValues({ ...values, topping: value });
  };

  const handleBrandChange = (value) => {
    setValues({ ...values, brand: value });
  };

  const handleCategoryChange = (value) => {
    console.log("CLICKED CATEGORY", value);
    setValues({ ...values, subs: [], category: value });
    getCategorySubs(value).then((res) => {
      console.log("SUB OPTIONS ON CATEGORY CLICK", res);
      setSubOptions(res.data);
    });
    setShowSub(true);
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
            {loading ? (
              <h6 className="loading-header">
                Chọn ảnh sản phẩm
                <Loading fontsize={18}/>
              </h6>
            ) : (
              <h6 className="loading-header">Chọn ảnh sản phẩm</h6>
            )}
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
              loading={loading}
            />
          </Card>

          <Card className="mt-3">
            <h6>Nhập thông tin sản phẩm</h6>
            <ProductCreateForm
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              setValues={setValues}
              values={values}
              handleShippingChange={handleShippingChange}
              handleToppingChange={handleToppingChange}
              handleBrandChange={handleBrandChange}
              handleCategoryChange={handleCategoryChange}
              subOptions={subOptions}
              showSub={showSub}
              handleReload={handleReload}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductCreate;
