import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Row } from "antd";

import Loading from "../loading/Loading";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(3);

  let history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    // redirect once count is equal to 0
    count === 0 && history.push("/");
    // clean up
    return () => clearInterval(interval);
  }, [count, history]);

  return (
    <div className="container pt-5 pb-5">
      <Row className="d-flex justify-content-center">
        <Loading />
      </Row>
      <Row className="d-flex justify-content-center mt-2">
        <h6>Chuyển hướng trang trong {count} giây</h6>
      </Row>
    </div>
  );
};

export default LoadingToRedirect;
