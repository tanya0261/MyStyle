import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import { shopDataContext } from "../context/ShopContext";
import Card from "./Card";

function LatestCollection() {
  const { products } = useContext(shopDataContext);

  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products?.slice(0, 8) || []);
  }, [products]);

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">

      {/* Heading */}
      <div className="text-center mb-8">
        <Title text1="LATEST" text2="COLLECTION" />

        <p className="mt-4 max-w-2xl mx-auto text-gray-500 text-sm sm:text-base leading-relaxed">
          Discover our newest arrivals crafted for modern fashion lovers.
          Explore trending styles, premium fabrics, and timeless elegance
          designed to elevate your wardrobe.
        </p>
      </div>

      {/* Products */}
      <div
        className="
          grid
          grid-cols-2
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-4
          sm:gap-6
        "
      >
        {latestProducts.map((item) => (
          <Card
            key={item._id}
            id={item._id}
            name={item.name}
            image={item.image1}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
}

export default LatestCollection;