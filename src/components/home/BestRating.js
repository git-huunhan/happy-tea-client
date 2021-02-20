import React, { useEffect, useState } from "react";
import { Row, Pagination, Col } from "antd";
import { StarFilled, FundFilled } from "@ant-design/icons";

import { getProducts, getProductsCount } from "../../functions/product";
import ProductCard from "../../components/cards/ProductCard";
import LoadingCard from "../../components/cards/LoadingCard";

const BestRating = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadAllProducts();
  }, [page]);

  useEffect(() => {
    getProductsCount().then((res) => setProductsCount(res.data));
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    // sort, order, limit
    getProducts("createdAt", "desc", page).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  return (
    <div className="main-background-color">
      <h4 className="pt-3 ml-3 header-text-home">
        <StarFilled className="mr-2" />
        Được yêu thích nhất
      </h4>
      {loading ? (
        <Row>
          <LoadingCard count={4} />
        </Row>
      ) : (
        <Row>
          {products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </Row>
      )}
      <Row className="d-flex justify-content-center pt-3 pb-3">
        <Pagination
          className="pagination-product"
          current={page}
          total={(productsCount / 4) * 10}
          onChange={(value) => setPage(value)}
        />
      </Row>
    </div>
  );
};

export default BestRating;
