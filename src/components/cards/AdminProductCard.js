import React from "react";
import { Card, Popconfirm, Col } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import DefaultImage from "../../images/default-product.png";
import { Link } from "react-router-dom";

const { Meta } = Card;

const AdminProductCard = ({ product, handleRemove }) => {
  // destructure
  const { title, description, images, slug } = product;
  return (
    <Col span={6}>
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
        actions={[
          <Link to={`/admin/product/${slug}`}>
            <div className="btn-hover-product pt-2 pb-2 mr-2">
              <EditOutlined className="text-primary" />
              <span className="ml-2 text-primary">Sửa</span>
            </div>
          </Link>,
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa?"
            onConfirm={() => handleRemove(slug)}
            okText="Có"
            cancelText="Không"
          >
            <div className="btn-hover-product pt-2 pb-2 ml-2">
              <DeleteOutlined className="text-danger" />
              <span className="ml-2 text-danger">Xóa</span>
            </div>
          </Popconfirm>,
        ]}
      >
        <Meta
          className="text-overflow"
          title={title}
          description={description}
        />
      </Card>
    </Col>
  );
};

export default AdminProductCard;
