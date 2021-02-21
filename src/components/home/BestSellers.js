import React, { useEffect, useState } from "react";
import { Row, Pagination } from "antd";
import { CrownFilled } from "@ant-design/icons";

import { getProducts, getProductsCount } from "../../functions/product";
import ProductCard from "../../components/cards/ProductCard";
import LoadingCard from "../../components/cards/LoadingCard";

const BestSellers = () => {
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
    getProducts("sold", "desc", page).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  return (
    <div className="main-background-color mt-3">
      <h4 className="pt-3 ml-3 header-text-home">
        <CrownFilled className="mr-2" />
        Bán chạy nhất
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

export default BestSellers;
