import React, { useState, useEffect } from "react";
import {
  getProductsByCount,
  fetchProductsByFilter,
} from "../functions/product";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, Menu, Slider, Empty } from "antd";
import { DollarOutlined } from "@ant-design/icons";

import ProductCardShop from "../components/cards/ProductCardShop";
import LoadingCard from "../components/cards/LoadingCard";
import PriceFormat from "../components/price/PriceFormat";

const { SubMenu } = Menu;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);

  let dispatch = useDispatch();
  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    loadAllProducts();
  }, []);

  const fetchProduct = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

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

  // 3. load products based on price range
  useEffect(() => {
    console.log("ok to request");
    fetchProduct({ price });
  }, [ok]);

  const handleSlider = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  return (
    <div className="body-home">
      <div className="container pt-3 pb-3">
        <div className="main-background-color mt-3">
          <Row>
            <Col span={5} className="shop-menu">
              <h4 className="ml-3 mt-3">Bộ lọc tìm kiếm</h4>
              <Menu
                className="submenu-product"
                defaultOpenKeys={["slider"]}
                mode="inline"
              >
                <SubMenu
                  key="slider"
                  icon={<DollarOutlined />}
                  title="Khoảng giá"
                >
                  <div className="slider-filter">
                    <Slider
                      className="ml-4 mr-4"
                      tipFormatter={(v) => <PriceFormat price={v} />}
                      range
                      value={price}
                      onChange={handleSlider}
                      max="100000"
                    ></Slider>
                  </div>
                </SubMenu>
              </Menu>
            </Col>
            <Col span={19} className="mb-3">
              <h4 className="ml-3 mt-3 header-text-home">Sản phẩm</h4>
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
              {products.length < 1 && (
                <Empty
                  className="mt-3 mb-3"
                  image={
                    <img
                      src="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                      alt="empty"
                      draggable="false"
                    />
                  }
                  imageStyle={{
                    height: 80,
                  }}
                  description={<span>Không tìm thấy sản phẩm</span>}
                />
              )}
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Shop;
