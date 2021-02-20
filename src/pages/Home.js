import React from "react";

import Banner from "../components/banner/Banner";
import BestRating from "../components/home/BestRating";
import BestSellers from "../components/home/BestSellers";

const Home = () => {
  return (
    <div className="body-home">
      <div className="container pt-3 pb-3">
        <Banner />
        <BestRating />
        <BestSellers />
      </div>
    </div>
  );
};

export default Home;
