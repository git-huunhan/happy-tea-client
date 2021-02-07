import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Button, Row, Col, Input, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { GoogleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import { auth, googleAuthProvider } from "../../firebase";
import "../../App.scss";
import { createOrUpdateUser } from "../../functions/auth";
import Loading from "../../components/loading/Loading";

const { Password } = Input;

const Login = ({ history }) => {
  const [email, setEmail] = useState("huunhankirigamer@gmail.com");
  const [password, setPassword] = useState("111111");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user]);

  let dispatch = useDispatch();

  const roleBasedRedirect = (res) => {
    if (res.data.role === "admin") {
      history.push("/admin/dashboard");
    } else {
      history.push("/user/history");
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

          roleBasedRedirect(res);
        })
        .catch((err) => console.log(err));
        
      // history.push("/");
    } catch (error) {
      toast.error(error.message);
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

            roleBasedRedirect(res);
          })
          .catch((err) => console.log(err));

        // history.push("/");
      })
      .catch((error) => {
        toast.error(error.message);
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

      <Link to="/forgot/password">Quên mật khẩu?</Link>

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
  );
};

export default Login;
