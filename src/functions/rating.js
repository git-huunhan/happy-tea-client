import React from "react";
import Rating from "../components/rating/Rating";

// [1, 4, 6, 7]
// 1 + 4 = 5
// 5 + 6 = 11
// 11 + 7 = 18
export const showAverage = (p, size) => {
  if (p && p.ratings) {
    let ratingsArray = p && p.ratings;
    let total = [];
    let length = ratingsArray.length;
    console.log("length", length);
    ratingsArray.map((r) => total.push(r.star));
    let totalReduced = total.reduce((p, n) => p + n, 0);
    console.log("totalReduced", totalReduced);
    let highest = length * 5;
    console.log("highest", highest);
    let result = (totalReduced * 5) / highest;
    console.log("result", result);

    return (
      <div className="text-center pt-1 pb-1">
        <span className="d-flex">
          <Rating rating={result} size={size}/>
          <div className="ml-2">({p.ratings.length} đánh giá)</div>
        </span>
      </div>
    );
  }
};
