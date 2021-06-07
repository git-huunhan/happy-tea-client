import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Row, Col } from "antd";

import StripeCheckout from "../components/StripeCheckout";

// load stripe outside of components render to avoid recreating stripe object on avery render
const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Payment = () => {
  return (
    <div className="body-home">
      <div className="container pt-3 pb-3 text-center">
        <Elements stripe={promise}>
          <Row className="d-flex justify-content-center">
            <Col span={16}>
              <StripeCheckout />
            </Col>
          </Row>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
