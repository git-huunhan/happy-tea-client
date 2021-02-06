import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const antIcon = <LoadingOutlined style={{ fontSize: 20 }} spin />;

const Loading = () => {
  return <Spin indicator={antIcon} />;
};

export default Loading;
