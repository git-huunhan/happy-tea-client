import React, { useState, useEffect } from "react";
import { Button, Row, Col, Input, Form, Image } from "antd";
import { useSelector } from "react-redux";

import { auth } from "../../firebase";
import Loading from "../../components/loading/Loading";
import Notification from "../../components/notification/Notification";
import Poster from "../../components/image/Poster";

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user, history]);

  const handleSubmit = async (e) => {
    setLoading(true);

    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };

    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail("");
        setLoading(false);
        Notification("success", "Check your email for password reset link");
      })
      .catch((error) => {
        setLoading(false);
        Notification("error", error.message);
      });
  };

  return (
    <div className="body-home">
      <div className="container pt-5 pb-5">
        <Row className="form-style">
          <Col span={14}>
            <Poster />
          </Col>
          <Col span={10} className="register p-5">
            {loading ? (
              <h4>
                Quên Mật Khẩu <Loading />
              </h4>
            ) : (
              <h4>Quên Mật Khẩu</h4>
            )}
            <Form onFinish={handleSubmit}>
              <Input
                type="email"
                size="large"
                className="mt-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email"
                autoFocus
              />

              <Button
                type="primary"
                size="large"
                onClick={handleSubmit}
                block
                className="mt-4"
              >
                Xác nhận gửi
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ForgotPassword;
