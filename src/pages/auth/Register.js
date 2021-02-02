import React, { useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { Button, Row, Col, Card } from "antd";
import "../../App.scss";

const Register = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validation
    if (!email) {
      toast.error("Email is required");
      return;
    }

    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);
    toast.dark(`Hi ${email}. Gửi email cho m rồi kìa th lz!`);

    // save user email in local storage
    window.localStorage.setItem("emailForRegistration", email);
    // clear state
    setEmail("");
  };

  const registerForm = () => (
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

      <br />
      <Button type="primary" shape="round" size="large" htmlType="submit" block>
        Gửi email xác thực
      </Button>
    </form>
  );

  return (
    <div className="container pt-5 pb-5">
      <Row className="form-style">
        <Col span={14}>
          <img 
            className="poster"
            alt="example"
            src="https://firebasestorage.googleapis.com/v0/b/happy-tea-1a89b.appspot.com/o/Banner-02.png?alt=media&token=d01ed6f7-88d0-43ce-91e3-fa7d3ae45092"
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
