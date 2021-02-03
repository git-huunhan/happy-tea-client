import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { Button, Row, Col, Spin } from "antd";
import "../../App.scss";
import { useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        toast.dark("Check your email for password reset link");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };

  const antIcon = <LoadingOutlined style={{ fontSize: 20 }} spin />;

  return (
    <div className="container pt-5 pb-5">
      <Row className="form-style">
        <Col span={14}>
          <img
            className="poster"
            alt="example"
            src="https://firebasestorage.googleapis.com/v0/b/happy-tea-1a89b.appspot.com/o/Banner-02.png?alt=media&token=d01ed6f7-88d0-43ce-91e3-fa7d3ae45092"
            draggable="false"
          />
        </Col>
        <Col span={10} className="register p-5">
          {loading ? (
            <h4>
              Quên Mật Khẩu <Spin indicator={antIcon} />
            </h4>
          ) : (
            <h4>Quên Mật Khẩu</h4>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email"
                autoFocus
              />
            </div>
            <Button
              type="primary"
              disabled={!email}
              onClick={handleSubmit}
              size="large"
              block
              className="mt-3"
            >
              Xác nhận gửi
            </Button>
          </form>
        </Col>
      </Row>
    </div>
  );
};

export default ForgotPassword;
