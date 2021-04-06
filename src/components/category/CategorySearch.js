import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getSubsByCount } from "../../functions/sub";

const CategorySearch = () => {
  const [subs, setSubs] = useState([]);
  
  useEffect(() => {
    loadAllSubs();
  }, []);

  const loadAllSubs = () => {
    getSubsByCount(5).then((s) => {
      setSubs(s.data);
    });
  };

  return (
    <div>
      {subs.map((s) => (
        <Link to={`/sub/${s.slug}`} key={s._id} className="category-search mr-3">
          {s.name}
        </Link>
      ))}
    </div>
  );
};

export default CategorySearch;
