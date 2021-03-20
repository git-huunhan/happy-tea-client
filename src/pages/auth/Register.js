import React, { useState, useEffect } from "react";
import { Button, Row, Col, Input, Form } from "antd";
import { useSelector } from "react-redux";

import { auth } from "../../firebase";
import Notification from "../../components/notification/Notification";

const Register = ({ history }) => {
  const [email, setEmail] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user, history]);

  const handleSubmit = async () => {
    // validation
    if (!email) {
      Notification("error", "Email is required");
      return;
    }

    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);
    Notification("success", `Hi ${email}. Bạn vui lòng vào email để xác nhận!`);

    // save user email in local storage
    window.localStorage.setItem("emailForRegistration", email);
    // clear state
    setEmail("");
  };

  const registerForm = () => (
    <Form onFinish={handleSubmit}>
      <Input
        size="large"
        className="mt-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Nhập email"
        autoFocus
      />

      <Button
        type="primary"
        shape="round"
        size="large"
        onClick={handleSubmit}
        block
        className="mt-4"
      >
        Gửi email xác thực
      </Button>
    </Form>
  );

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
          <h4>Đăng Ký</h4>
          {registerForm()}
        </Col>
      </Row>
    </div>
  );
};

export default Register;
