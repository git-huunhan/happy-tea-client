import React from "react";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";

const ProductListItems = ({ product }) => {
  const { category, subs, topping, sold, shipping, brand } = product;

  return (
    <div className="mt-2">
      <Row>
        <Col span={6}>
          <p className="label-info-product pt-1 pb-1">Danh mục</p>
        </Col>
        {category && (
          <Col>
            <div className="category-sub-product p-1">
              <Link to={`/category/${category.slug}`}>{category.name}</Link>
            </div>
          </Col>
        )}
      </Row>

      <Row>
        <Col span={6}>
          <p className="label-info-product pt-1 pb-1">Danh mục con</p>
        </Col>
        <Col>
          {subs && (
            <div className="d-flex">
              {subs.map((s) => (
                <div key={s._id} className="category-sub-product mr-2 p-1">
                  <Link to={`/sub/${s.slug}`}>{s.name}</Link>
                </div>
              ))}
            </div>
          )}
        </Col>
      </Row>

      <Row className="pt-1 pb-1">
        <Col span={6}>
          <p className="label-info-product">Thương hiệu</p>
        </Col>
        <Col>{brand}</Col>
      </Row>

      <Row className="pt-1 pb-1">
        <Col span={6}>
          <p className="label-info-product">Topping</p>
        </Col>
        <Col>{topping}</Col>
      </Row>

      <Row className="pt-1 pb-1">
        <Col span={6}>
          <p className="label-info-product">Vận chuyển</p>
        </Col>
        <Col>{shipping}</Col>
      </Row>

      <Row className="pt-1 pb-1">
        <Col span={6}>
          <p className="label-info-product">Đã bán</p>
        </Col>
        <Col>{sold}</Col>
      </Row>
    </div>
  );
};

export default ProductListItems;
