import React from "react";
import { Col, Skeleton, Card } from "antd";

const LoadingCard = ({ count }) => {
  const card = () => {
    let totalCards = [];

    for (let i = 0; i < count; i++) {
      totalCards.push(
        <Col span={6} key={i}>
          <Card
            className="card-product p-3 skeleton-product"
            cover={<Skeleton.Image className="p-3" />}
          >
            <Skeleton className="p-3" active></Skeleton>
          </Card>
        </Col>
      );
    }

    return totalCards;
  };

  return <>{card()}</>;
};

export default LoadingCard;
