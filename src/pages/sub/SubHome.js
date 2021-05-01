import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Breadcrumb, Empty } from "antd";

import { getSub } from "../../functions/sub";
import ProductCard from "../../components/cards/ProductCard";

const SubHome = ({ match }) => {
  const [sub, setSub] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);
    getSub(slug).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setSub(res.data.sub);
      setProducts(res.data.products);
      setLoading(false);
    });
  }, []);

  return (
    <div className="body-home">
      <div className="container pt-3 pb-3">
        <Card className="breadcrumb-product">
          <Row>
            <Breadcrumb>
              <Breadcrumb.Item className="text-trans">
                <Link to="/">Trang chủ</Link>
              </Breadcrumb.Item>
              {sub && (
                <Breadcrumb.Item className="text-trans">
                  {sub.name}
                </Breadcrumb.Item>
              )}
            </Breadcrumb>
          </Row>
        </Card>

        <div className="main-background-color mt-3 pb-3">
          <Row>
            <Col>
              {loading ? (
                <h4>Loading...</h4>
              ) : (
                <h4 className="d-flex pt-3 ml-3 header-text-home">
                  {sub.name}:{" "}
                  <div className="ml-2 header-result-text">
                    {products.length} kết quả
                  </div>
                </h4>
              )}
            </Col>
          </Row>
          <Row>
            {products.length ? (
              products.map((p) => <ProductCard key={p._id} product={p} />)
            ) : (
              <Col
                span={24}
                className="d-flex justify-content-center pb-4 mt-5"
              >
                <Empty
                  image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                  draggable="false"
                  imageStyle={{
                    height: 100,
                  }}
                  description={""}
                />
              </Col>
            )}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default SubHome;
