import React from "react";
import { Col, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const LocalSearch = ({ keyword, setKeyword }) => {
  const handleSearchChange = (e) => {
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <Col span={10}>
      <Input
        type="search"
        placeholder="Tìm kiếm..."
        value={keyword}
        onChange={handleSearchChange}
        prefix={<SearchOutlined className="ml-2 mr-2" />}
        className="pl-1 pr-1 mb-3"
      />
    </Col>
  );
};

export default LocalSearch;
