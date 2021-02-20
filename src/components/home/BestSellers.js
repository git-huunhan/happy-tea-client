import React, { useEffect, useState } from "react";
import { Row } from "antd";
import { CrownFilled } from "@ant-design/icons";

import { getProducts } from "../../functions/product";
import ProductCard from "../../components/cards/ProductCard";
import LoadingCard from "../../components/cards/LoadingCard";

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    // sort, order, limit
    getProducts("sold", "desc", 4).then((res) => {
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
    </div>
  );
};

export default BestSellers;
