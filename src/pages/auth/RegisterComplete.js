import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Button, Row, Col, Input, Form } from "antd";
import { useDispatch } from "react-redux";

import { auth } from "../../firebase";
import "../../App.scss";
import { createOrUpdateUser } from "../../functions/auth";

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
      toast.error("Email and password is required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
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
      toast.error(error.message);
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
          {completeRegistrationForm()}
        </Col>
      </Row>
    </div>
  );
};

export default RegisterComplete;
