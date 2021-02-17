import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";

import AdminNav from "../../components/nav/AdminNav";
import { getProductsByCount } from "../../functions/product";
import Loading from "../../components/loading/Loading";
import AdminProductCard from "../../components/cards/AdminProductCard";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

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

  return (
    <div className="container pt-5 pb-5">
      <Row>
        <Col span={5}>
          <AdminNav />
        </Col>
        <Col span={19} className="pl-5">
          {loading ? (
            <h4>
              Bảng điều khiển
              <Loading />
            </h4>
          ) : (
            <h4>Bảng điều khiển</h4>
          )}

          <hr />
          <Col>
            <Row gutter={16}>
              {products.map((product) => (
                <Col span={8} className="mb-3">
                  <AdminProductCard product={product} key={product._id} />
                </Col>
              ))}
            </Row>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
