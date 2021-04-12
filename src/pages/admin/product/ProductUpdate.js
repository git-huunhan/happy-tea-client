import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "antd";
import { useSelector } from "react-redux";

import { getProduct, updateProduct } from "../../../functions/product";
import AdminNav from "../../../components/nav/AdminNav";
import Notification from "../../../components/notification/Notification";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/form/FileUpload";
import Loading from "../../../components/loading/Loading";
import ProductUpdateForm from "../../../components/form/ProductUpdateForm";

const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  subs: [],
  shipping: "",
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
  topping: "",
  brand: "",
};

const ProductUpdate = ({ match, history }) => {
  // state
  const [values, setValues] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [arrayOfSubs, setArrayOfSubs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);

  // redux
  const { user } = useSelector((state) => ({ ...state }));

  // route
  const { slug } = match.params;

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  const loadProduct = () => {
    getProduct(slug).then((p) => {
      // console.log("single product", p);
      // 1 load single product
      setValues({ ...values, ...p.data });
      // 2 load single product category subs
      getCategorySubs(p.data.category._id).then((res) => {
        setSubOptions(res.data); // on fisrt load, show default sub
      });
      // 3 prepare array of sub ids to show as default sub valus in antd Select
      let arr = [];
      p.data.subs.map((s) => {
        return arr.push(s._id);
      });
      console.log("ARR", arr);
      setArrayOfSubs((prev) => arr); // required for antd Select to work
    });
  };

  const loadCategories = () => {
    getCategories().then((c) => {
      console.log("GET CATEGORIES IN UPDATE PRODUCT", c.data);
      setCategories(c.data);
    });
  };

  const handleSubmit = (e) => {
    setLoading(true);

    values.subs = arrayOfSubs;
    values.category = selectedCategory ? selectedCategory : values.category;

    updateProduct(slug, values, user.token)
      .then((res) => {
        setLoading(false);
        Notification("success", `"Sản phẩm "${res.data.title}" đã được cập nhật.`);
        history.push("/admin/products");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        // if (err.response.status === 400) toast.error(err.response.data);
        Notification("error", "Đã có lỗi xảy ra, vui lòng thử lại!");
      });
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, " ------ ", e.target.value);
  };

  const handleShippingChange = (value) => {
    setValues({ ...values, shipping: value });
    // console.log(e.target.name, " ------ ", e.target.value);
  };

  const handleToppingChange = (value) => {
    setValues({ ...values, topping: value });
    // console.log(e.target.name, " ------ ", e.target.value);
  };

  const handleBrandChange = (value) => {
    setValues({ ...values, brand: value });
    // console.log(e.target.name, " ------ ", e.target.value);
  };

  const handleCategoryChange = (value) => {
    console.log("CLICKED CATEGORY", value);
    setValues({ ...values, subs: [] });

    setSelectedCategory(value);

    getCategorySubs(value).then((res) => {
      console.log("SUB OPTIONS ON CATEGORY CLICK", res);
      setSubOptions(res.data);
    });

    console.log("EXISTING CATEGORY values.category", values.category);

    // if user click back to the original category
    // show its sub categories in default
    if (values.category._id === value) {
      loadProduct();
    }
    // clear old sub category ids
    setArrayOfSubs([]);
  };

  return (
    <div className="container pt-5 pb-5">
      <Row>
        <Col span={5}>
          <AdminNav />
        </Col>
        <Col span={19} className="pl-5">
          <h4>Sửa sản phẩm</h4>
          <hr />

          <Card>
            {loading ? (
              <h6 className="loading-header">
                Chọn ảnh sản phẩm
                <Loading fontsize={18} />
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
            <ProductUpdateForm
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              setValues={setValues}
              values={values}
              handleShippingChange={handleShippingChange}
              handleToppingChange={handleToppingChange}
              handleBrandChange={handleBrandChange}
              handleCategoryChange={handleCategoryChange}
              categories={categories}
              subOptions={subOptions}
              arrayOfSubs={arrayOfSubs}
              setArrayOfSubs={setArrayOfSubs}
              selectedCategory={selectedCategory}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductUpdate;
