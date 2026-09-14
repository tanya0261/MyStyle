import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import { shopDataContext } from "../context/ShopContext";
import Card from "./Card";

function BestSeller() {
  const { products } = useContext(shopDataContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const filterProduct = products.filter(
      (item) => item.bestseller === true
    );

    setBestSeller(filterProduct.slice(0, 4));
  }, [products]);

  return (
    <div className="pt-0 pb-0">
      {/* Heading */}
      <div className="text-center">
        <Title text1="BEST" text2="SELLER" />

        <p className="mt-4 max-w-2xl mx-auto text-gray-500 text-sm sm:text-base">
          Explore our most loved fashion pieces, chosen by customers for
          their premium quality, comfort, and timeless style.
        </p>
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12">
        {bestSeller.map((item, index) => (
          <Card
            key={index}
            name={item.name}
            id={item._id}
            price={item.price}
            image={item.image1}
          />
        ))}
      </div>
    </div>
  );
}

export default BestSeller;