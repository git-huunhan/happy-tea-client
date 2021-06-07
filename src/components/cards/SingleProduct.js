import React from "react";
import { Card, Col, Row, Button, Image, Breadcrumb, Tabs } from "antd";
import { Link, useHistory } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";

import DefaultImage from "../../images/default-product.png";
import PriceFormat from "../price/PriceFormat";
import ProductListItems from "./ProductListItems";
import Rating from "../rating/Rating";
import RatingModal from "../modal/RatingModal";
import { showAverage } from "../../functions/rating";
import Notification from "../notification/Notification";
import { addToWishlist } from "../../functions/user";

const { TabPane } = Tabs;

const SingleProduct = ({ product, onStarClick, star }) => {
  // redux
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  // router
  let history = useHistory();

  const handleAddToCard = () => {
    // create cart array
    let cart = [];
    if (typeof window !== "undefined") {
      // if cart is in localstorage GET it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // push new product to cart
      cart.push({
        ...product,
        count: 1,
      });
      // remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      // save to local storage
      // console.log('unique', unique)
      localStorage.setItem("cart", JSON.stringify(unique));
      // show notification
      Notification("success", "Thêm vào giỏ hàng thành công!");

      // add to redux state
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
    }
  };

  const { title, images, price, category, description, _id } = product;

  const handleAddToWishlist = () => {
    addToWishlist(product._id, user.token).then((res) => {
      console.log("ADDED TO WISHLIST", res.data);
      Notification("success", "Đã thêm vào danh sách yêu thích");
      history.push("/user/wishlist");
    });
  };

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
                <Link to={`/category/${category.slug}`}>{category.name}</Link>
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
                <div className="mt-3 mb-2">
                  {product && product.ratings && product.ratings.length > 0 ? (
                    showAverage(product, "25px")
                  ) : (
                    <div className="no-rating mt-3 mb-2 pt-1 pb-1">
                      Chưa có đánh giá
                    </div>
                  )}
                </div>
              </Col>
            </Row>

            <ProductListItems product={product} />

            <Row className="button-product">
              <Button
                onClick={handleAddToCard}
                type="primary"
                className="text-trans"
                size="large"
                icon={<ShoppingCartOutlined />}
              >
                Thêm vào giỏ hàng
              </Button>

              <div className="btn-wishlist ml-3">
                <Button
                  onClick={handleAddToWishlist}
                  size="large"
                  icon={<HeartOutlined />}
                ></Button>
              </div>

              <RatingModal>
                <Rating
                  id={_id}
                  size="30px"
                  changeRating={onStarClick}
                  rating={star}
                />
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
