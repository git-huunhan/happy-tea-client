import React, { useEffect, useState } from "react";
import { Row, Col, Carousel } from "antd";
import { StarFilled, FundFilled } from "@ant-design/icons";

import { getProductsByCount } from "../functions/product";
import ProductCard from "../components/cards/ProductCard";
import Loading from "../components/loading/Loading";

const contentStyle = {
  height: "250px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(4).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  return (
    <div className="body-home">
      <div className="container pt-3 pb-3">
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
        <div className="main-background-color">
          {loading ? (
            <Row className="d-flex justify-content-center">
              <Loading />
            </Row>
          ) : (
            <h4 className="pt-3 ml-3 header-text-home">
              <StarFilled className="mr-2" />
              Được yêu thích nhất
            </h4>
          )}

          <Row>
            {products.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Home;
