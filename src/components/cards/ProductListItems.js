import React from "react";
import { Link } from "react-router-dom";

const ProductListItems = ({ product }) => {
  const { category, subs, topping, sold, shipping, brand } = product;

  return (
    <ul className="list-group">
      {category && (
        <li className="list-group-item">
          Danh mục{" "}
          <Link
            to={`/category/${category.slug}`}
            className="label label-default label-pill pull-xs-right"
          >
            {category.name}
          </Link>
        </li>
      )}

      {subs && (
        <li className="list-group-item">
          Danh mục con{" "}
          {subs.map((s) => (
            <Link
              key={s._id}
              to={`/sub/${s.slug}`}
              className="label label-default label-pill pull-xs-right"
            >
              {s.name}
            </Link>
          ))}
        </li>
      )}

      <li className="list-group-item">
        Thương hiệu{" "}
        <span className="label label-default label-pill pull-xs-right">
          {brand}
        </span>
      </li>

      <li className="list-group-item">
        Vận chuyển{" "}
        <span className="label label-default label-pill pull-xs-right">
          {shipping}
        </span>
      </li>

      <li className="list-group-item">
        Topping{" "}
        <span className="label label-default label-pill pull-xs-right">
          {topping}
        </span>
      </li>

      <li className="list-group-item">
        Đã bán{" "}
        <span className="label label-default label-pill pull-xs-right">
          {sold}
        </span>
      </li>
    </ul>
  );
};

export default ProductListItems;
