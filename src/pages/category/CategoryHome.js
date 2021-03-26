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
    });
  }, []);

  return (
    <div className="container">
      <Row>
        <Col>
          {loading ? (
            <h4>Loading...</h4>
          ) : (
            <h4>
              Có {products.length} sản phẩm trong danh mục {category.name}
            </h4>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default CategoryHome;
