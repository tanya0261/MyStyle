import React from "react";
import Banner1 from "../assets/Banner1.png";
import Banner2 from "../assets/Banner2.png";
import Banner3 from "../assets/Banner3.png";
import Banner4 from "../assets/Banner4.png";

function Background({ heroCount }) {
  const banners = [Banner1, Banner2, Banner3, Banner4];

  return (
    <div className="w-full overflow-hidden">
      <img
        src={banners[heroCount]}
        alt="banner"
        className="
          w-full
          h-[35vh]
          sm:h-[45vh]
          md:h-[60vh]
          lg:h-screen
          object-cover
          object-[center_20%]
          transition-all
          duration-700
        "
      />
    </div>
  );
}

export default Background;