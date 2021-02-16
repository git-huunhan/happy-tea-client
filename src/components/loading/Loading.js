import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const Loading = ({fontsize}) => {
  return (
    <Spin
      className="ml-2 mt-0"
      indicator={
        <LoadingOutlined style={{ fontSize: fontsize, color: "#ff9dba" }} spin />
      }
    />
  );
};

export default Loading;
