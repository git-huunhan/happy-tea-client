import React from "react";
import { Card, Col, Row, Button, Image, Breadcrumb, Tabs } from "antd";
import { Link } from "react-router-dom";
import {
  HeartOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import DefaultImage from "../../images/default-product.png";
import PriceFormat from "../price/PriceFormat";
import ProductListItems from "./ProductListItems";
import Rating from "../rating/Rating";
import RatingModal from "../modal/RatingModal";

const { TabPane } = Tabs;

const SingleProduct = ({ product, onStarClick, star }) => {
  const { title, images, price, category, description, _id } = product;

  return (
    <div>
      <Card className="breadcrumb-product">
        <Row>
          <Breadcrumb>
            <Breadcrumb.Item className="text-trans">
              <Link to="/">Trang chủ</Link>
            </Breadcrumb.Item>
            {category && (
              <Breadcrumb.Item className="text-trans">
                {category.name}
              </Breadcrumb.Item>
            )}
            <Breadcrumb.Item className="text-trans">{title}</Breadcrumb.Item>
          </Breadcrumb>
        </Row>
      </Card>

      <Card className="card-product-home mt-3">
        <Row>
          <Col span={10} className="image-product">
            {images && images.length ? (
              <Carousel showThumbs={false}>
                {images &&
                  images.map((i) => (
                    <Image src={i.url} key={i.public_id} alt="" />
                  ))}
              </Carousel>
            ) : (
              <Card
                className="card-default-image"
                cover={
                  <img
                    className="product-default-image"
                    src={DefaultImage}
                    alt=""
                  />
                }
              ></Card>
            )}
          </Col>
          <Col span={14} className="info-product">
            <Row>
              <h3 className="text-trans">{title}</h3>
            </Row>
            <div className="price-product p-3">
              <Row>
                <PriceFormat price={price} />
              </Row>

              <Row>
                <p className="tip-price mb-0">
                  Ở đâu rẻ hơn, Happy Tea hoàn tiền
                </p>
              </Row>
            </div>

            <Row>
              <Col>
                <div className="mt-3 mb-2"></div>
              </Col>

              <Col className="d-flex align-items-center justify-content-center">
                <p className="mb-0 ml-2">(4 đánh giá)</p>
              </Col>
            </Row>

            <ProductListItems product={product} />

            <Row className="button-product">
              <Link to="/">
                <Button
                  type="primary"
                  className="text-trans"
                  size="large"
                  icon={<ShoppingCartOutlined />}
                >
                  Thêm vào giỏ hàng
                </Button>
              </Link>
              <Link className="btn-wishlist ml-3" to="/">
                <Button size="large" icon={<HeartOutlined />}></Button>
              </Link>

              <RatingModal>
                <Rating id={_id} size="30px" changeRating={onStarClick} rating={star}/>
              </RatingModal>
            </Row>
          </Col>
        </Row>
      </Card>

      <Card className="description-card mt-3">
        <Tabs type="card">
          <TabPane tab="Mô tả" key="1">
            {description && description}
          </TabPane>

          <TabPane tab="Thêm" key="2">
            Gọi cho chúng tôi: xxxx xxx xxx để biết thêm về sản phẩm.
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default SingleProduct;
