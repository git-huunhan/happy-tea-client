import React, { useState, useEffect } from "react";
import { Button, Row, Col, Input, Form } from "antd";
import { useDispatch } from "react-redux";

import { auth } from "../../firebase";
import { createOrUpdateUser } from "../../functions/auth";
import Notification from "../../components/notification/Notification";
import Poster from "../../components/image/Poster";

const { Password } = Input;

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const { user } = useSelector((state) => ({ ...state }));
  let dispatch = useDispatch();

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, [history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validation
    if (!email || !password) {
      Notification("error", "Bạn cần phải nhập email và mật khẩu.");
      return;
    }

    if (password.length < 6) {
      Notification("error", "Mật khẩu cần có ít nhất 6 ký tự.");
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      if (result.user.emailVerified) {
        // remove user email from local storage
        window.localStorage.removeItem("emailForRegistration");
        // get user id token
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        // redux store
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
          })
          .catch((err) => console.log(err));
        // redirect
        history.push("/");
      }
    } catch (error) {
      Notification("error", "Đã có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  const completeRegistrationForm = () => (
    <Form>
      <div className="form-group">
        <Input
          size="large"
          type="email"
          className="mt-3"
          value={email}
          disabled
        />
        <br />
        <Password
          onPressEnter={handleSubmit}
          type="password"
          size="large"
          className="mt-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoFocus
        />
      </div>

      <Button
        onClick={handleSubmit}
        type="primary"
        shape="round"
        size="large"
        htmlType="submit"
        block
        className="mt-3"
      >
        Hoàn tất đăng ký
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
            <h4>Đăng Ký</h4>
            {completeRegistrationForm()}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default RegisterComplete;
