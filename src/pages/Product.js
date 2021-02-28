import React, { useEffect, useState } from "react";
import { Row } from "antd";

import { getProduct } from "../functions/product";
import SingleProduct from "../components/cards/SingleProduct";
import LoadingCard from "../components/cards/LoadingCard";

const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const [star, setStar] = useState(0);

  const { slug } = match.params;

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  const loadSingleProduct = () =>
    getProduct(slug).then((res) => setProduct(res.data));

  const onStarClick = (newRating, name) => {
    console.table(newRating, name);
  };

  return (
    <div className="body-home">
      <div className="container pt-3 pb-3">
        <SingleProduct
          product={product}
          onStarClick={onStarClick}
          star={star}
        />

        <div className="main-background-color mt-3">
          <h4 className="pt-3 ml-3 header-text-home">Sản phẩm có liên quan</h4>

          <Row>
            <LoadingCard count={4} />
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Product;
