import React from "react";
import { Card, Col, Row } from "antd";

import DefaultImage from "../../images/default-product.png";
import { Link } from "react-router-dom";
import PriceFormat from "../price/PriceFormat";
import { showAverage } from "../../functions/ratingshop";

const { Meta } = Card;

const ProductCardShop = ({ product }) => {
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
          <Row>
            <Col>
              <div className="mt-3 mb-2">
                {product && product.ratings && product.ratings.length > 0 ? (
                  showAverage(product, "20px")
                ) : (
                  <div className="mt-3 mb-2 pt-1 pb-1">
                    <div className="no-rating-home" style={{ height: "48px" }}>
                      Chưa có đánh giá
                    </div>
                  </div>
                )}
              </div>
            </Col>
          </Row>

          <Col className="price-product-home">
            <PriceFormat price={price} />
          </Col>
        </Card>
      </Link>
    </Col>
  );
};

export default ProductCardShop;
