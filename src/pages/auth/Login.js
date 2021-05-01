import React, { useState, useEffect } from "react";
import { Button, Row, Col, Input, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { GoogleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import { auth, googleAuthProvider } from "../../firebase";
import { createOrUpdateUser } from "../../functions/auth";
import Loading from "../../components/loading/Loading";
import Notification from "../../components/notification/Notification";
import Poster from "../../components/image/Poster";

const { Password } = Input;

const Login = ({ history }) => {
  const [email, setEmail] = useState("huunhankirigamer@gmail.com");
  const [password, setPassword] = useState("111111");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    let intended = history.location.state;
    if (intended) {
      return;
    } else {
      if (user && user.token) history.push("/");
    }
  }, [user, history]);

  let dispatch = useDispatch();

  const roleBasedRedirect = (res) => {
    // check if intended
    let intended = history.location.state;
    if (intended) {
      history.push(intended.from);
    } else {
      if (res.data.role === "admin") {
        history.push("/admin/dashboard");
      } else {
        history.push("/user/history");
      }
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });
          Notification(
            "success",
            `Chào mừng ${res.data.name} đã đến với Happy Tea!`
          );
          roleBasedRedirect(res);
        })
        .catch((err) => console.log(err));

      // history.push("/");
    } catch (error) {
      Notification("error", "Đã có lỗi xảy ra, vui lòng thử lại!");
      setLoading(false);
    }
  };

  const googleLogin = () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();

        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
            Notification(
              "success",
              `Chào mừng ${res.data.name} đã đến với Happy Tea!`
            );
            roleBasedRedirect(res);
          })
          .catch((err) => console.log(err));

        // history.push("/");
      })
      .catch((error) => {
        Notification("error", "Đã có lỗi xảy ra, vui lòng thử lại!");
      });
  };

  const loginForm = () => (
    <Form>
      <Input
        onPressEnter={handleSubmit}
        type="email"
        size="large"
        className="mt-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Nhập email"
        autoFocus
      />

      <Password
        onPressEnter={handleSubmit}
        size="large"
        className="login-password-input mt-3 mb-3"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Nhập mật khẩu"
      />

      <Link className="forgot-password-text" to="/forgot/password">
        Quên mật khẩu?
      </Link>

      <Button
        type="primary"
        size="large"
        onClick={handleSubmit}
        block
        className="mt-4"
      >
        Đăng nhập với email và mật khẩu
      </Button>
    </Form>
  );

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
                Đăng Nhập <Loading />
              </h4>
            ) : (
              <h4>Đăng Nhập</h4>
            )}
            {loginForm()}

            <p className="or-text mt-3">Hoặc</p>

            <Button
              type="danger"
              size="large"
              onClick={googleLogin}
              icon={<GoogleOutlined />}
              className="btn-google"
              block
            >
              Đăng nhập với Google
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Login;
