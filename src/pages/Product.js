import React, { useEffect, useState } from "react";
import { Row } from "antd";

import { getProduct } from "../functions/product";
import SingleProduct from "../components/cards/SingleProduct";

const Product = ({ match }) => {
  const [product, setProduct] = useState({});

  const { slug } = match.params;

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  const loadSingleProduct = () =>
    getProduct(slug).then((res) => setProduct(res.data));
  return (
    <div className="body-home">
      <div className="container pt-3 pb-3">
        <SingleProduct product={product} />
        <Row>Related products</Row>
      </div>
    </div>
  );
};

export default Product;
