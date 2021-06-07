import React from "react";
import { Row, Col, Carousel } from "antd";

const Banner = () => {
  return (
    <Row className="mb-3">
      <Col span={14}>
        <Carousel autoplay className="carousel-banner">
          <div>
            <img
              className="banner-1st"
              src="https://as1.ftcdn.net/v2/jpg/03/65/44/30/1000_F_365443084_Si0h06lqXK813IOWgDrb2CjVU1iD7pcQ.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              className="banner-1st"
              src="https://as1.ftcdn.net/v2/jpg/02/92/09/22/1000_F_292092285_kTjMXKgZTgUgMNv0P61CFtgM8MwBaTkA.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              className="banner-1st"
              src="https://as2.ftcdn.net/v2/jpg/03/58/04/97/1000_F_358049700_3C2pxny5O8Jgs7bgLpuuhbNp13e12qIv.jpg"
              alt=""
            />
          </div>
        </Carousel>
      </Col>
      <Col
        span={10}
        className="d-flex flex-column justify-content-between pl-3"
      >
        <div>
          <img
            className="banner-2nd"
            width="470px"
            src="https://firebasestorage.googleapis.com/v0/b/happy-tea-1a89b.appspot.com/o/free-ship.svg?alt=media&token=c883ab8c-74ec-450e-8ea9-9c2ecba41e36"
            alt=""
          />
        </div>

        <div>
          <img
            className="banner-2nd"
            width="470px"
            src="https://firebasestorage.googleapis.com/v0/b/happy-tea-1a89b.appspot.com/o/giamgia20.svg?alt=media&token=109d9f0b-e0a6-45ec-b68e-06611f6d4c84"
            alt=""
          />
        </div>
      </Col>
    </Row>
  );
};

export default Banner;
