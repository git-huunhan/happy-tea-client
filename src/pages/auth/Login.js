import React, { useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { Button, Row, Col } from "antd";
import "../../App.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const loginForm = () => (
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
        <br />
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Nhập mật khẩu"
        />
      </div>

      <br />
      <Button type="primary" size="large" onClick={handleSubmit} block>
        Đăng nhập với email và mật khẩu
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
            draggable="false"
          />
        </Col>
        <Col span={10} className="register p-5">
          <h4>Đăng Nhập</h4>
          {loginForm()}
        </Col>
      </Row>
    </div>
  );
};

export default Login;
