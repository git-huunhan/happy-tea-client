import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const antIcon = <LoadingOutlined style={{ fontSize: 20, color: '#ff9dba' }} spin />;

const Loading = () => {
  return <Spin indicator={antIcon} />;
};

export default Loading;
