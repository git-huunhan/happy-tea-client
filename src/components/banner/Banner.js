import React from "react";
import { Row, Col, Carousel } from "antd";

const Banner = () => {
  return (
    <Row className="mb-3">
      <Col span={16}>
        <Carousel autoplay className="carousel-banner">
          <div>
            <img
              className="banner-1st"
              src="https://salt.tikicdn.com/cache/w824/ts/banner/e1/c0/0b/844d77cefc927a124adcd5e57a6bde75.png.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              className="banner-1st"
              src="https://salt.tikicdn.com/cache/w824/ts/banner/9d/8d/d1/117a838aae3d388883296697ffcc9ed1.png.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              className="banner-1st"
              src="https://salt.tikicdn.com/cache/w824/ts/banner/4d/ea/64/f473f42bd75aebe57cb8f0a3a019e8a6.png.jpg"
              alt=""
            />
          </div>
        </Carousel>
      </Col>
      <Col span={8}>
        <img
          className="banner-2nd"
          src="https://salt.tikicdn.com/cache/w408/ts/banner/67/52/2c/1f848ca2a3914cebbbb603cec366af6f.png.jpg"
          alt=""
        />
      </Col>
    </Row>
  );
};

export default Banner;
