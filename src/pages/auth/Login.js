import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { Button, Row, Col, Spin } from "antd";
import "../../App.scss";
import { useDispatch, useSelector } from "react-redux";
import { GoogleOutlined, LoadingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { createOrUpdateUser } from "../../functions/auth";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
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

      <Link to="/forgot/password" className="">
        Quên mật khẩu?
      </Link>

      <Button
        type="primary"
        size="large"
        onClick={handleSubmit}
        block
        disabled={!email || password.length < 6}
        className="mt-3"
      >
        Đăng nhập với email và mật khẩu
      </Button>
    </form>
  );

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
              Đăng Nhập <Spin indicator={antIcon} />
            </h4>
          ) : (
            <h4>Đăng Nhập</h4>
          )}
          {loginForm()}

          <p className="or-text">Hoặc</p>

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
