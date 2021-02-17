import React from "react";
import { Card } from "antd";

const { Meta } = Card;

const AdminProductCard = ({ product }) => {
  // destructure
  const { title, description, images, price } = product;
  return (
    <Card cover={<img draggable="false" className="product-image" src={images && images.length ? images[0].url : ""} alt="product"/>}>
      <Meta title={title} description={description} />
      <h5 className="mb-0 mt-3">{price}</h5>
    </Card>
  );
};

export default AdminProductCard;
