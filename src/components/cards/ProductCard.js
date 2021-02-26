import React from "react";
import { Card, Col, Rate } from "antd";

import DefaultImage from "../../images/default-product.png";
import { Link } from "react-router-dom";
import PriceFormat from "../price/PriceFormat";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const { title, description, images, slug, price } = product;
  return (
    // destructure

    <Col span={6}>
      <Link to={`/product/${slug}`}>
        <Card
          className="card-product p-3"
          cover={
            <img
              draggable="false"
              className="product-image"
              src={images && images.length ? images[0].url : DefaultImage}
              alt="product"
            />
          }
          // actions={[
          //   <div className="btn-hover-product pt-2 pb-2">
          //     <ShoppingCartOutlined className="text-product-primary" />
          //     <span className="ml-2 text-product-primary">
          //       Thêm vào giỏ hàng
          //     </span>
          //   </div>,
          // ]}
        >
          <Meta
            className="text-overflow"
            title={title}
            description={description}
          />
          <Rate className="mt-1 mb-1 rating" defaultValue={5} />
          <Col className="price-product-home">
          <PriceFormat price={price}/>
          </Col>
         
        </Card>
      </Link>
    </Col>
  );
};

export default ProductCard;
