import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const Search = () => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const history = useHistory();

  const handleChange = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    history.push(`/shop?${text}`);
  };

  return (
    <Input
      onChange={handleChange}
      onPressEnter={handleSubmit}
      type="search"
      className="pt-0 pb-0 pr-0"
      placeholder="Tìm sản phẩm, danh mục mong muốn..."
      value={text}
      suffix={
        <Button
          className="btn-search-header"
          type="primary"
          size="middle"
          onClick={handleSubmit}
        >
          <SearchOutlined
            onClick={handleSubmit}
            style={{ cursor: "pointer" }}
          />
          Tìm kiếm
        </Button>
      }
    />
  );
};

export default Search;
