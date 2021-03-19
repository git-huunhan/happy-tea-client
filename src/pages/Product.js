import React, { useEffect, useState } from "react";
import { Row } from "antd";
import { useSelector } from "react-redux";

import { getProduct, productStar } from "../functions/product";
import SingleProduct from "../components/cards/SingleProduct";
import LoadingCard from "../components/cards/LoadingCard";
import Notification from "../components/notification/Notification";

const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const [star, setStar] = useState(0);

  const { user } = useSelector((state) => ({ ...state }));

  const { slug } = match.params;

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  useEffect(() => {
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star); // current user star
    }
  });

  const loadSingleProduct = () =>
    getProduct(slug).then((res) => setProduct(res.data));

  const onStarClick = (newRating, name) => {
    setStar(newRating);
    // console.table(newRating, name);
    productStar(name, newRating, user.token).then((res) => {
      console.log("rating click", res.data);
      Notification("success", "Cảm ơn bạn đã đánh giá!");
      loadSingleProduct();
    });
    
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
