import React from "react";
import { Col, Row, Collapse, Card, Image } from "antd";
import { Link } from "react-router-dom";

import PriceFormat from "../../components/price/PriceFormat";
import DefaultImage from "../../images/default-product.png";

const { Panel } = Collapse;

const HistoryDetailInfo = ({ order }) => {
  return (
    <div className="card-collapse-history">
      <Collapse accordion>
        <Panel
          header={<div className="card-detail-history">Chi tiết</div>}
          key="1"
          showArrow={false}
        >
          <Row className="d-flex justify-content-between">
            <Col span={24} className="mb-3">
              <Card>
                <h6>Địa chỉ</h6>
                <div
                  className="quill-address-reader"
                  dangerouslySetInnerHTML={{ __html: order.address }}
                />
              </Card>
            </Col>

            <Col span={12} className="pr-2">
              <Card>
                <h6>Phí vận chuyển</h6>
                <div className="quill-address-reader">
                  <PriceFormat price={0} />
                </div>
              </Card>
            </Col>
            <Col span={12} className="pl-2">
              <Card>
                <h6>Phương thức thanh toán</h6>
                <div className="quill-address-reader">
                  <p>
                    {order.paymentIntent.payment_method_types[0].toUpperCase()}
                  </p>
                </div>
              </Card>
            </Col>
          </Row>

          <div className="mt-3 table-card">
            <Row className="p-3 header-table">
              <Col span={10}>Sản phẩm</Col>
              <Col span={6}>Topping</Col>
              <Col span={4}>Số lượng</Col>
              <Col span={4}>Tạm tính</Col>
            </Row>

            {order.products.map((p, i) => (
              <div key={i}>
                <hr className="m-0" />
                <Row className="p-3">
                  <Col span={4} className="cart-product-image">
                    {p.product.images.length ? (
                      <Link to={`/product/${p.product.slug}`}>
                        <Image
                          width={130}
                          height={130}
                          preview={false}
                          src={p.product.images[0].url}
                          key={p.product.public_id}
                          alt=""
                        />
                      </Link>
                    ) : (
                      <Link to={`/product/${p.product.slug}`}>
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

                  <Col span={6} className="pl-3 pr-3 d-flex flex-column">
                    <div>
                      <Link to={`/product/${p.product.slug}`}>
                        <h6 className="text-trans">{p.product.title}</h6>
                      </Link>
                    </div>
                    <div className="cart-product-brand">
                      <p className="mb-0">Thương hiệu: {p.product.brand}</p>
                    </div>
                  </Col>

                  <Col span={6}>{p.product.topping}</Col>
                  <Col span={4}>{p.count}</Col>
                  <Col span={4}>
                    <PriceFormat price={p.product.price * p.count} />
                  </Col>
                </Row>
              </div>
            ))}

            <hr className="m-0" />
            <Row className="d-flex justify-content-end ">
              <Col span={9}>
                <Row className="pt-3 pl-3 pr-3">
                  <Col span={10}>
                    <p className="m-0">Tạm tính</p>
                  </Col>
                  <Col span={14} className="d-flex align-items-end flex-column">
                    <div className="sub-total-price m-0">
                      <PriceFormat price={order.cartTotal} />
                    </div>
                  </Col>
                </Row>

                <Row className="pt-3 pl-3 pr-3">
                  <Col span={10}>
                    <p className="m-0">Phí vận chuyển</p>
                  </Col>
                  <Col span={14} className="d-flex align-items-end flex-column">
                    <div className="sub-total-price m-0">
                      <PriceFormat price={0} />
                    </div>
                  </Col>
                </Row>

                <Row className="pt-3 pl-3 pr-3">
                  <Col span={10}>
                    <p className="m-0">Tổng cộng</p>
                  </Col>
                  <Col span={14} className="d-flex align-items-end flex-column">
                    <div className="total-price mb-2">
                      <PriceFormat price={order.paymentIntent.amount / 100} />
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};

export default HistoryDetailInfo;
