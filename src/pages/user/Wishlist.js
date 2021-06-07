import React, { useState, useEffect } from "react";
import { Row, Col, Image, Card, Popconfirm, Empty, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import UserNav from "../../components/nav/UserNav";
import { getWishlist, removeWishlist } from "../../functions/user";
import PriceFormat from "../../components/price/PriceFormat";
import DefaultImage from "../../images/default-product.png";
import { showAverage } from "../../functions/rating";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () =>
    getWishlist(user.token).then((res) => {
      setWishlist(res.data.wishlist);
    });

  const handleRemove = (productId) =>
    removeWishlist(productId, user.token).then((res) => {
      loadWishlist();
    });

  return (
    <div className="container pt-5 pb-5">
      <Row>
        <Col span={5}>
          <UserNav />
        </Col>
        <Col span={19} className="pl-5">
          <h4>Yêu thích</h4>
          <hr />

          {wishlist.length > 0 ? (
            wishlist.map((p) => (
              <div key={p._id}>
                <Card className="mb-3">
                  <Row>
                    <Col span={3} className="cart-product-image">
                      {p.images.length ? (
                        <Link to={`/product/${p.slug}`}>
                          <Image
                            width={100}
                            height={100}
                            preview={false}
                            src={p.images[0].url}
                            key={p.public_id}
                            alt=""
                          />
                        </Link>
                      ) : (
                        <Link to={`/product/${p.slug}`}>
                          <img
                            className="product-default-image"
                            src={DefaultImage}
                            alt=""
                            style={{
                              width: 130,
                              height: 130,
                              objectFit: "cover",
                            }}
                          />
                        </Link>
                      )}
                    </Col>

                    <Col span={15} className="pl-3 pr-3 d-flex flex-column">
                      <div style={{ width: "fit-content" }}>
                        <Link to={`/product/${p.slug}`}>
                          <h6
                            className="text-trans"
                            style={{ fontSize: "18px" }}
                          >
                            {p.title}
                          </h6>
                        </Link>
                      </div>

                      <div className="cart-product-brand">
                        <p className="mb-0">Thương hiệu: {p.brand}</p>
                      </div>

                      <Row>
                        <Col>
                          <div>
                            {p && p.ratings && p.ratings.length > 0 ? (
                              showAverage(p, "18px")
                            ) : (
                              <div className="no-rating mt-3 mb-2 pt-1 pb-1">
                                Chưa có đánh giá
                              </div>
                            )}
                          </div>
                        </Col>
                      </Row>
                    </Col>

                    <Col
                      span={6}
                      className="d-flex flex-column align-items-end"
                    >
                      <Row>
                        <span style={{ fontWeight: "500", fontSize: "18px" }}>
                          <PriceFormat price={p.price} />
                        </span>
                      </Row>

                      <div className="cart-product-delete mt-auto">
                        <Popconfirm
                          placement="rightBottom"
                          title="Bạn có chắc chắn muốn xóa?"
                          onConfirm={() => handleRemove(p._id)}
                          okText="Có"
                          cancelText="Không"
                        >
                          <p
                            className="text-danger mb-0"
                            style={{ cursor: "pointer" }}
                          >
                            Xóa
                          </p>
                        </Popconfirm>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </div>
            ))
          ) : (
            <Row>
              <Col span={24}>
                <div className="main-background-color mt-3 pt-4 pb-4">
                  <Empty
                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                    draggable="false"
                    imageStyle={{
                      height: 100,
                    }}
                    description={
                      "Không có sản phẩm nào trong danh mục yêu thích của bạn."
                    }
                  />

                  <Row className="d-flex justify-content-center align-items-center mt-4">
                    <Button type="primary" size="large">
                      <Link to="/">Tiếp tục mua sắm</Link>
                    </Button>
                  </Row>
                </div>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Wishlist;
