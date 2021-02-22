import React from "react";
import NumberFormat from "react-number-format";

const PriceFormat = ({ price }) => {
  return (
    <NumberFormat
      value={price}
      displayType={"text"}
      thousandSeparator={true}
      renderText={(value) => (
        <div className="mb-0 d-flex">
          {value.replace(/,/g, ".")}{" "}
          <div className="name-price m-0 ml-1">đ</div>
        </div>
      )}
    />
  );
};

export default PriceFormat;
