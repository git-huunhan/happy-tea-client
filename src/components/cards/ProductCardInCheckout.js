import React from "react";
import { useDispatch } from "react-redux";
import { Row, Col, Image, InputNumber, Popconfirm } from "antd";
import { Link } from "react-router-dom";

import DefaultImage from "../../images/default-product.png";
import PriceFormat from "../../components/price/PriceFormat";
import Notification from "../notification/Notification";

const ProductCardInCheckout = ({ p }) => {
  const toppings = [
    "Trân châu đen",
    "Trân châu ngọc trai",
    "Thạch nha đam",
    "Thạch trái cây",
    "Kem cheese",
    "Full topping",
  ];

  const dispatch = useDispatch();

  const handleToppingChange = (e) => {
    console.log("topping changed", e.target.value);

    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].topping = e.target.value;
        }
      });

      // console.log('cart update topping', cart)
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleQuantityChange = (value) => {
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].count = value;
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));

      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleRemove = () => {
    // console.log(p._id, "to remove");

    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id === p._id) {
          cart.splice(i, 1);
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));

      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });

      Notification("success", `Đã xóa "${p.title}" khỏi giỏ hàng thành công!`);
    }
  };

  return (
    <div className="main-background-color mt-3 p-3">
      <Row>
        <Col span={4} className="cart-product-image">
          {p.images.length ? (
            <Link to={`/product/${p.slug}`}>
              <Image
                width={130}
                height={130}
                preview={false}
                src={p.images[0].url}
                key={p.public_id}
                alt=""
              />
            </Link>
          ) : (
            <Link to={`/product/${p.slug}`}>
              <img
                className="product-default-image"
                src={DefaultImage}
                alt=""
                style={{ width: 130, height: 130, objectFit: "cover" }}
              />
            </Link>
          )}
        </Col>

        <Col span={6} className="pl-3 pr-3 d-flex flex-column">
          <div>
            <Link to={`/product/${p.slug}`}>
              <h6 className="text-trans">{p.title}</h6>
            </Link>
          </div>
          <div className="cart-product-brand">
            <p className="mb-0">Thương hiệu: {p.brand}</p>
          </div>
          <div className="cart-product-delete mt-auto">
            <Popconfirm
              placement="rightBottom"
              title="Bạn có chắc chắn muốn xóa?"
              onConfirm={handleRemove}
              okText="Có"
              cancelText="Không"
            >
              <p className="text-danger mb-0" style={{ cursor: "pointer" }}>
                Xóa
              </p>
            </Popconfirm>
          </div>
        </Col>

        <Col span={6} className="d-flex pr-3 pl-3">
          <div>
            <select
              onChange={handleToppingChange}
              name="topping"
              id=""
              style={{ width: 159 }}
            >
              {p.topping ? (
                <option value={p.topping}>{p.topping}</option>
              ) : (
                <option>Select</option>
              )}
              {toppings
                .filter((t) => t !== p.topping)
                .map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
            </select>
          </div>
        </Col>

        <Col span={4} className="d-flex pr-3 pl-3">
          <div>
            <InputNumber
              type="number"
              style={{ width: 98 }}
              min={1}
              max={15}
              value={p.count}
              onChange={handleQuantityChange}
            />
          </div>
        </Col>

        <Col span={4} className="pl-3 pr-3">
          <div className="cart-product-price m-0">
            <PriceFormat price={p.price * p.count} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProductCardInCheckout;
