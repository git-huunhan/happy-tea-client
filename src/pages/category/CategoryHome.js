import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";

import { getCategory } from "../../functions/category";
import ProductCard from "../../components/cards/ProductCard";

const CategoryHome = ({ match }) => {
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);
    getCategory(slug).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setCategory(res.data.category);
      setProducts(res.data.products);
      setLoading(false);
    });
  }, []);

  return (
    <div className="body-home">
      <div className="container pt-3 pb-3">
        <div className="main-background-color">
          <Row>
            <Col>
              {loading ? (
                <h4>Loading...</h4>
              ) : (
                <h4 className="pt-3 ml-3 header-text-home">
                  Có {products.length} sản phẩm trong danh mục {category.name}
                </h4>
              )}
            </Col>
          </Row>
          <Row>
            {products.map((p) => (
              <ProductCard product={p} />
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default CategoryHome;
