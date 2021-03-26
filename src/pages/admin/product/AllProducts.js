import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";

import AdminNav from "../../../components/nav/AdminNav";
import { getProductsByCount } from "../../../functions/product";
import Loading from "../../../components/loading/Loading";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import { removeProduct } from "../../../functions/product";
import Notification from "../../../components/notification/Notification";
import { useSelector } from "react-redux";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllProducts();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: "0",
    });
  });

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(100)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleRemove = (slug) => {
    // console.log("send delete request", slug);
    removeProduct(slug, user.token)
      .then((res) => {
        loadAllProducts();
        Notification("success", `${res.data.title} đã được xóa`);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400)
          Notification("error", err.response.data);
      });
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
              Tất cả sản phẩm
              <Loading />
            </h4>
          ) : (
            <h4>Tất cả sản phẩm</h4>
          )}

          <hr />

          <Row>
            {products.map((product) => (
              <AdminProductCard
                product={product}
                key={product._id}
                handleRemove={handleRemove}
              />
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default AllProducts;
