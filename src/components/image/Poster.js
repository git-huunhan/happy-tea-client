import React from "react";
import { Image } from "antd";

const Poster = () => {
  return (
    <Image
      width={680}
      height={500}
      preview={false}
      alt="example"
      src="https://i.pinimg.com/originals/08/53/d4/0853d41c51b9d3caf8828520818ee64a.jpg"
    />
  );
};

export default Poster;
