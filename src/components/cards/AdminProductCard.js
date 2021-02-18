import React from "react";
import { Card, Popconfirm, Col } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import DefaultImage from "../../images/default-product.png";

const { Meta } = Card;

const AdminProductCard = ({ product, handleRemove }) => {
  // destructure
  const { title, description, images, slug } = product;
  return (
    <Col span={8}>
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
          <div className="btn-hover-product pt-2 pb-2 mr-2">
            <EditOutlined className="text-primary" />
            <span className="ml-2 text-primary">Sửa</span>
          </div>,
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
          title={title}
          description={`${description && description.substring(0, 40)}...`}
        />
        {/* <Rate allowHalf defaultValue={2.5} /> */}
        {/* <NumberFormat
        value={price}
        displayType={"text"}
        thousandSeparator={true}
        renderText={(value) => (
          <p className="mt-3 mb-0 d-flex price">
            {value.replace(/,/g, ".")} <p className="name-price m-0 ml-1">đ</p>
          </p>
        )}
      /> */}
      </Card>
    </Col>
  );
};

export default AdminProductCard;
