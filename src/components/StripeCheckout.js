import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

import { createPaymentIntent } from "../functions/stripe";
import PriceFormat from "../components/price/PriceFormat";
import { createOrder, emptyUserCart } from "../functions/user";

const StripeCheckout = ({ history }) => {
  const dispatch = useDispatch();
  const { user, coupon } = useSelector((state) => ({ ...state }));

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  const [cartTotal, setCartTotal] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [payable, setPayable] = useState(0);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    createPaymentIntent(user.token, coupon).then((res) => {
      console.log("create payment intent", res.data);
      setClientSecret(res.data.clientSecret);
      // additional response received on successful payment
      setCartTotal(res.data.cartTotal);
      setTotalAfterDiscount(res.data.totalAfterDiscount);
      setPayable(res.data.payable);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    });

    if (payload.error) {
      setError(`Thanh toán thất bại ${payload.error.message}`);
      setProcessing(false);
    } else {
      // here you get result after successful payment
      // create order and save in database for admin to process
      createOrder(payload, user.token).then((res) => {
        if (res.data.ok) {
          // empty cart from local storage
          if (typeof window !== "undefined") localStorage.removeItem("cart");

          // empty cart from redux
          dispatch({
            type: "ADD_TO_CART",
            payload: [],
          });

          // reset coupon to false
          dispatch({
            type: "COUPON_APPLIED",
            payload: false,
          });

          // reset COD
          dispatch({
            type: "COD",
            payload: true,
          });

          // empty cart from database
          emptyUserCart(user.token);
        }
      });
      // empty user cart from redux store and local storage
      console.log(JSON.stringify(payload, null, 4));
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  const handleChange = async (e) => {
    // listen for changes in the card element
    // and display any errors as the customer types their card details

    setDisabled(e.empty); // disable pay button if errors
    setError(e.error ? e.error.message : ""); // show error message
  };

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <>
      <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
        <h4>Hoàn tất đặt hàng </h4>
        {!succeeded && (
          <div>
            {coupon && totalAfterDiscount !== undefined ? (
              <div className="alert alert-success border-alert d-flex justify-content-center">
                <span className="mr-1">
                  Số tiền sau khi áp dụng mã giảm giá:
                </span>
                <PriceFormat price={totalAfterDiscount} />
              </div>
            ) : (
              <p className="alert alert-danger border-alert">
                Không có mã giảm giá được áp dụng
              </p>
            )}
          </div>
        )}

        <div className="price-payment">
          <Row>
            <Col span={12} className="pt-3 pb-3 total-price-payment-title">
              <div>Tổng cộng</div>
              <div className="total-price d-flex justify-content-center">
                <PriceFormat price={cartTotal} />
              </div>
            </Col>
            <Col span={12} className="pt-3 pb-3 price-after-discount-title">
              <div>Số tiền thanh toán</div>
              <div className="price-after-discount text-success d-flex justify-content-center align-items-center">
                <CheckCircleOutlined className="mr-2" />
                <PriceFormat price={payable} />
              </div>
            </Col>
          </Row>
        </div>

        <div className="d-flex justify-content-center mt-4 mb-4">
          <div className="visa-card d-flex flex-column  justify-content-end">
            <Row className="mb-4 ml-4">
              <Col
                style={{
                  color: "white",
                  fontSize: "20px",
                  fontWeight: "500",
                }}
              >
                <span>4242 4242 4242 4242</span>
              </Col>
            </Row>
          </div>
        </div>

        <CardElement
          id="card-element"
          options={cardStyle}
          onChange={handleChange}
        />
        <button
          className="stripe-button"
          disabled={processing || disabled || succeeded}
        >
          <span id="button-text">
            {processing ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Đặt mua"
            )}
          </span>
        </button>
        <br />
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        <br />
        <p className={succeeded ? "result-message" : "result-message hidden"}>
          Mua hàng thành công.{" "}
          <Link to="/user/history">Xem lịch sử mua hàng của bạn.</Link>
        </p>
      </form>
    </>
  );
};

export default StripeCheckout;
