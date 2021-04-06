import React, { useState, useEffect } from "react";
import {
  getProductsByCount,
  fetchProductsByFilter,
} from "../functions/product";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row } from "antd";

import ProductCardShop from "../components/cards/ProductCardShop";
import LoadingCard from "../components/cards/LoadingCard";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    loadAllProducts();
  }, []);

  // 1. load products by default on page load

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  // 2. load products on user search input
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProduct({ query: text });
    }, 300);

    return () => clearTimeout(delayed);
  }, [text]);

  const fetchProduct = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  return (
    <div className="body-home">
      <div className="container pt-3 pb-3">
        <div className="main-background-color mt-3">
          <Row>
            <Col span={5} className="shop-menu">
              search/filter menu
            </Col>
            <Col span={19} className="mb-3">
              <h4 className="ml-3 mt-3">Sản phẩm</h4>
              {loading ? (
                <Row>
                  <LoadingCard count={4} />
                </Row>
              ) : (
                <Row>
                  {products.map((p) => (
                    <ProductCardShop key={p._id} product={p} />
                  ))}
                </Row>
              )}{" "}
              {products.length < 1 && <p>No products found</p>}
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Shop;
