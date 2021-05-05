import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, Menu, Slider, Empty, Checkbox, Radio, Button } from "antd";
import {
  DollarOutlined,
  StarOutlined,
  TagsOutlined,
  CarOutlined,
  BarsOutlined,
} from "@ant-design/icons";

import {
  getProductsByCount,
  fetchProductsByFilter,
} from "../functions/product";
import { getCategories } from "../functions/category";
import { getSubs } from "../functions/sub";
import ProductCardShop from "../components/cards/ProductCardShop";
import LoadingCard from "../components/cards/LoadingCard";
import PriceFormat from "../components/price/PriceFormat";
import Star from "../components/form/Star";

const { SubMenu } = Menu;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [star, setStar] = useState("");
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState("");
  const [brands, setBrands] = useState([
    "Milksha",
    "Sharetea",
    "Coco",
    "Koi",
    "Chachago",
  ]);
  const [brand, setBrand] = useState("");
  const [toppings, setToppings] = useState([
    "Trân châu đen",
    "Trân châu ngọc trai",
    "Thạch nha đam",
    "Thạch trái cây",
    "Kem cheese",
    "Full topping",
  ]);
  const [topping, setTopping] = useState("");
  const [shipping, setShipping] = useState("");

  let dispatch = useDispatch();
  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    loadAllProducts();
    // fetch categories
    getCategories().then((res) => setCategories(res.data));
    // fetch subcategories
    getSubs().then((res) => setSubs(res.data));
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: "0",
    });
  });

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  // 1. load products by default on page load
  const loadAllProducts = () => {
    setLoading(true);

    getProductsByCount(100).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  // 2. load products on user search input
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
      if (!text) {
        loadAllProducts();
      }
    }, 300);

    return () => clearTimeout(delayed);
  }, [text]);

  // 3. load products based on price range
  useEffect(() => {
    console.log("ok to request");
    fetchProducts({ price });
  }, [ok]);

  const handleSlider = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });

    // reset
    setCategoryIds([]);
    setPrice(value);
    setStar("");
    setSub("");
    setBrand("");
    setTopping("");
    setShipping("");
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  // 4. load products based on category
  // show categories in a list of checkbox
  const showCategories = () =>
    categories.map((c) => (
      <div className="checkbox-category" key={c._id}>
        <Checkbox
          onChange={handleCheck}
          value={c._id}
          name="category"
          checked={categoryIds.includes(c._id)}
        >
          {c.name}
        </Checkbox>
      </div>
    ));

  // handle check for categories
  const handleCheck = (e) => {
    // reset
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });

    setPrice([0, 0]);
    setStar("");
    setSub("");
    setBrand("");
    setTopping("");
    setShipping("");
    // console.log(e.target.value);
    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked); // true or -1

    // indexOf method ? if not found returns -1 else return index
    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      // if found pull out one item from index
      inTheState.splice(foundInTheState, 1);
    }

    setCategoryIds(inTheState);
    // console.log(inTheState);
    fetchProducts({ category: inTheState });
  };

  // 5. show products by star rating
  const handleStarClick = (num) => {
    //console.log(num);
    // reset
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar(num);
    setSub("");
    setBrand("");
    setTopping("");
    setShipping("");
    fetchProducts({ stars: num });
  };

  const showStars = () => (
    <Row className="rating-container">
      <Col className="rating-shop-menu" span={24}>
        <Star id={5} starClick={handleStarClick} numberOfStars={5} />
      </Col>
      <Col className="rating-shop-menu d-flex align-items-center" span={24}>
        <Col span={13}>
          <Star id={4} starClick={handleStarClick} numberOfStars={4} />
        </Col>
        <Col span={11}>
          <p className="ml-2 mb-0">trở lên</p>
        </Col>
      </Col>
      <Col className="rating-shop-menu d-flex align-items-center" span={24}>
        <Col span={13}>
          <Star id={3} starClick={handleStarClick} numberOfStars={3} />
        </Col>
        <Col span={11}>
          <p className="ml-2 mb-0">trở lên</p>
        </Col>
      </Col>
      <Col className="rating-shop-menu d-flex align-items-center" span={24}>
        <Col span={13}>
          <Star id={2} starClick={handleStarClick} numberOfStars={2} />
        </Col>
        <Col span={11}>
          <p className="ml-2 mb-0">trở lên</p>
        </Col>
      </Col>
      <Col className="rating-shop-menu d-flex align-items-center" span={24}>
        <Col span={13}>
          <Star id={1} starClick={handleStarClick} numberOfStars={1} />
        </Col>
        <Col span={11}>
          <p className="ml-2 mb-0">trở lên</p>
        </Col>
      </Col>
    </Row>
  );

  // 6. show products by sub category
  const showSubs = () =>
    subs.map((s) => (
      <div
        key={s._id}
        className="p-1 mr-2 mt-2 badge sub-child"
        onClick={() => handleSub(s)}
      >
        {s.name}
      </div>
    ));

  const handleSub = (sub) => {
    // console.log("SUB", sub);
    setSub(sub);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setTopping("");
    setShipping("");
    fetchProducts({ sub });
  };

  // 7. show products based on brand name
  const showBrands = () =>
    brands.map((b) => (
      <div key={b._id}>
        <Radio value={b} name={b} checked={b === brand} onChange={handleBrand}>
          {b}
        </Radio>
      </div>
    ));

  const handleBrand = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setTopping("");
    setShipping("");
    setBrand(e.target.value);
    fetchProducts({ brand: e.target.value });
  };

  // 8. show products based on topping
  const showToppings = () =>
    toppings.map((t) => (
      <div key={t._id}>
        <Radio
          value={t}
          name={t}
          checked={t === topping}
          onChange={handleTopping}
        >
          {t}
        </Radio>
      </div>
    ));

  const handleTopping = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setShipping("");
    setTopping(e.target.value);
    fetchProducts({ topping: e.target.value });
  };

  // 9. show products based on shipping yes/no
  const showShipping = () => (
    <div>
      <Checkbox
        onChange={handleShippingChange}
        value="Có"
        checked={shipping === "Có"}
      >
        Có
      </Checkbox>
      <Checkbox
        onChange={handleShippingChange}
        value="Không"
        checked={shipping === "Không"}
      >
        Không
      </Checkbox>
    </div>
  );

  const handleShippingChange = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setTopping("");
    setShipping(e.target.value);
    fetchProducts({ shipping: e.target.value });
  };

  const handleReset = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setTopping("");
    setShipping("");

    const delayed = setTimeout(() => {
      loadAllProducts();
    }, 100);

    // fetch categories
    getCategories().then((res) => setCategories(res.data));
    // fetch subcategories
    getSubs().then((res) => setSubs(res.data));
    return () => clearTimeout(delayed);
  };

  return (
    <div className="body-home">
      <div className="container pt-3 pb-3">
        <div className="main-background-color">
          <Row>
            <Col span={5} className="shop-menu pb-3">
              <h4 className="ml-3 mt-3">Bộ lọc tìm kiếm</h4>
              <Menu
                className="submenu-product"
                defaultOpenKeys={[
                  "slider",
                  "category",
                  "rating",
                  "sub",
                  "brand",
                  "topping",
                  "shipping",
                ]}
                mode="inline"
              >
                {/* price */}
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

                {/* category */}
                <SubMenu
                  key="category"
                  icon={<BarsOutlined />}
                  title="Danh mục sản phẩm"
                >
                  <div>{showCategories()}</div>
                </SubMenu>

                {/* rating */}
                <SubMenu key="rating" icon={<StarOutlined />} title="Đánh giá">
                  <div>{showStars()}</div>
                </SubMenu>

                {/* sub category */}
                <SubMenu key="sub" icon={<TagsOutlined />} title="Danh mục con">
                  <div className="sub-shop-menu">{showSubs()}</div>
                </SubMenu>

                {/* brand */}
                <SubMenu
                  key="brand"
                  icon={<BarsOutlined />}
                  title="Thương hiệu"
                >
                  <div className="brand-shop-menu">{showBrands()}</div>
                </SubMenu>

                {/* topping */}
                <SubMenu key="topping" icon={<BarsOutlined />} title="Toppings">
                  <div className="brand-shop-menu">{showToppings()}</div>
                </SubMenu>

                {/* shipping */}
                <SubMenu
                  key="shipping"
                  icon={<CarOutlined />}
                  title="Giao hàng"
                >
                  <div className="brand-shop-menu">{showShipping()}</div>
                </SubMenu>

                {/* reset */}
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <Button onClick={handleReset} type="primary" size="normal">
                    Xóa tất cả
                  </Button>
                </div>
              </Menu>
            </Col>

            <Col span={19} className="mb-3">
              <h4 className="ml-3 mt-3 header-text-home">Sản phẩm</h4>
              {products.length ? (
                loading ? (
                  <Row>
                    <LoadingCard count={4} />
                  </Row>
                ) : (
                  <Row>
                    {products.map((p) => (
                      <ProductCardShop key={p._id} product={p} />
                    ))}
                  </Row>
                )
              ) : (
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
