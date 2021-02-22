import React from "react";
import { Card, Col, Row, Rate, Button, Image, Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import DefaultImage from "../../images/default-product.png";
import PriceFormat from "../price/PriceFormat";
import ProductListItems from "./ProductListItems";

const SingleProduct = ({ product }) => {
  const { title, images, price, category } = product;

  return (
    <div>
      <Card className="card-product-home breadcrumb-product">
        <Row>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/">Trang chủ</Link>
            </Breadcrumb.Item>
            {category && <Breadcrumb.Item>{category.name}</Breadcrumb.Item>}
            <Breadcrumb.Item>{title}</Breadcrumb.Item>
          </Breadcrumb>
        </Row>
      </Card>

      <Card className="card-product-home mt-3">
        <Row>
          <Col span={10} className="image-product">
            {images && images.length ? (
              <Carousel>
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
              <h3>{title}</h3>
            </Row>
            <Row className="price-product p-3">
              <PriceFormat price={price} />
            </Row>

            <ProductListItems product={product} />

            <Row className="button-product">
              <Link>
                <Button size="large" icon={<ShoppingCartOutlined />}>
                  Thêm vào giỏ hàng
                </Button>
              </Link>
              <Link to="/">
                <Button
                  className="ml-3"
                  size="large"
                  icon={<HeartOutlined />}
                ></Button>
              </Link>
            </Row>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default SingleProduct;
