import React, { useContext, useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { shopDataContext } from "../context/ShopContext";
import { FiSearch, FiFilter, FiChevronDown, FiX } from "react-icons/fi";
import Card from "../component/Card";

import RedHeels from "../assets/RedHeels.png";
import women from "../assets/women.jpg";
import men from "../assets/men.png";
import kid from "../assets/kid.png";
import shoes from "../assets/shoes.jpg";
import bag from "../assets/bag.jpg";
function Collections() {
  
  const { products } = useContext(shopDataContext);
  const [searchParams] = useSearchParams();
  const productSectionRef = useRef(null);
  const buttonRef = useRef(null);
  const [filterProduct, setFilterProduct] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const filterRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);

  const [search, setSearch] = useState(
  searchParams.get("search") || ""
);
  const [sortType, setSortType] = useState("relevant");
  
  useEffect(() => {
  setSearch(searchParams.get("search") || "");
}, [searchParams]);
  const categories = ["Men", "Women", "Kids"];

  const subCategories = [
    "Dresses",
    "TopWear",
    "BottomWear",
    "Bags",
    "Accessories",
    "Shoes",
    "Watches",
  ];

  // Category Toggle
  const toggleCategory = (category) => {
    if (selectedCategory.includes(category)) {
      setSelectedCategory(
        selectedCategory.filter((item) => item !== category)
      );
    } else {
      setSelectedCategory([...selectedCategory, category]);
    }
  };

  // SubCategory Toggle
  const toggleSubCategory = (subCategory) => {
    if (selectedSubCategory.includes(subCategory)) {
      setSelectedSubCategory(
        selectedSubCategory.filter((item) => item !== subCategory)
      );
    } else {
      setSelectedSubCategory([
        ...selectedSubCategory,
        subCategory,
      ]);
    }
  };
  const handleCategoryCardClick = (category) => {
  setSelectedCategory([category]);
  setSelectedSubCategory([]);

  productSectionRef.current?.scrollIntoView({
    behavior: "smooth",
  });
};

const handleAccessoriesClick = () => {
  setSelectedCategory([]);
  setSelectedSubCategory(["Bags", "Accessories"]);

  productSectionRef.current?.scrollIntoView({
    behavior: "smooth",
  });
};
   useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      filterRef.current &&
      !filterRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setShowFilters(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );
  };
}, []);
  // Apply Filters
  useEffect(() => {
    let productCopy = [...products];

    // Category Filter
    if (selectedCategory.length > 0) {
      productCopy = productCopy.filter((item) =>
        selectedCategory.includes(item.category)
      );
    }

    // SubCategory Filter
    if (selectedSubCategory.length > 0) {
      productCopy = productCopy.filter((item) =>
        selectedSubCategory.includes(item.subCategory)
      );
    }

    // Search
    if (search.trim()) {
  const searchValue = search.trim().toLowerCase();

  productCopy = productCopy.filter(
    (item) =>
      item.name?.toLowerCase().includes(searchValue) ||
      item.description?.toLowerCase().includes(searchValue) ||
      item.category?.toLowerCase().includes(searchValue) ||
      item.subCategory?.toLowerCase().includes(searchValue)
  );
}

    // Sorting
    if (sortType === "low-high") {
      productCopy.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      productCopy.sort((a, b) => b.price - a.price);
    } else if (sortType === "newest") {
      productCopy.sort(
        (a, b) =>
          new Date(b.createdAt) - new Date(a.createdAt)
      );
    }
    console.log("Search:", search);
    console.log("Filtered Count:", productCopy.length);
    console.log("Filtered Products:", productCopy);
    
   setFilterProduct(productCopy);
    
  }, [
    products,
    selectedCategory,
    selectedSubCategory,
    search,
    sortType,
  ]);
 useEffect(() => {
  const searchValue = searchParams.get("search") || "";
  setSearch(searchValue);

  if (searchValue) {
    setTimeout(() => {
      productSectionRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  }
}, [searchParams]);
  return (
    <div className="bg-[#FDFBF9] min-h-screen overflow-x-hidden pt-0">

      {/* COLLECTION HERO */}
<section className="mt-0 pt-0 mb-8 md:mb-12">
  {/* Top Hero Banner */}
  <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[85vh] lg:h-screen overflow-hidden">
    <img
  src={RedHeels}
  alt=""
  className="
    absolute
    inset-0
    w-full
    h-full
    object-cover

    object-[68%_center]
    sm:object-[72%_center]
    md:object-[75%_center]
    lg:object-center
  "
/>

    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-[#FDFBF9]/75 via-[#FDFBF9]/20 to-transparent"></div>

    {/* Content */}
    <div className="absolute inset-0 flex items-center">

      <div
        className="
        max-w-xl
        px-5
        sm:px-8
        md:px-10
        lg:ml-16
        "
      >

        <p
          className="
          uppercase
          tracking-[4px]
          sm:tracking-[6px]
          md:tracking-[8px]
          text-[#6B4F46]
          text-xs
          sm:text-sm
          mb-3
          md:mb-4
          "
        >
          New Arrivals
        </p>

        <h1
          className="
          text-4xl
          sm:text-5xl
          md:text-6xl
          lg:text-7xl
          xl:text-8xl
          font-serif
          text-[#2F1E1A]
          leading-[0.95]
          mb-4
          md:mb-6
          "
        >
          Elevate
          <br />
          Your Style
        </h1>

        <p
          className="
          text-sm
          sm:text-base
          md:text-lg
          text-[#5F5F5F]
          max-w-md
          mb-6
          md:mb-8
          "
        >
          Discover timeless fashion pieces crafted
          for the modern you.
        </p>

        <button
          onClick={() =>
            productSectionRef.current?.scrollIntoView({
              behavior: "smooth",
            })
          }
          className="
          bg-[#D88770]
          hover:bg-[#c57661]
          text-white
          px-6
          md:px-8
          py-3
          md:py-4
          rounded-xl
          text-sm
          md:text-base
          transition-all
          hover:scale-105
          "
        >
          Shop The Collection →
        </button>

      </div>

    </div>

  </div>

  {/* Collections Heading */}
  <div className="text-center mt-6 md:mt-8 mb-8 md:mb-10">

    <h2
      className="
      text-3xl
      sm:text-4xl
      md:text-5xl
      font-bold
      text-[#2F1E1A]
      "
    >
      OUR COLLECTIONS
    </h2>

    <p
      className="
      text-gray-500
      mt-3
      text-sm
      md:text-base
      px-4
      "
    >
      Discover premium fashion pieces crafted for
      elegance, comfort and timeless style.
    </p>

  </div>

  {/* Category Cards */}
  <div className="px-4 md:px-8">
  <div
    className="
    grid
    grid-cols-2
    md:grid-cols-3
    lg:grid-cols-5
    gap-4
    md:gap-6
    "
  >

    {/* Women */}
    <div
      onClick={() => handleCategoryCardClick("Women")}
      className="
      relative
      group
      h-[220px]
      sm:h-[260px]
      md:h-[300px]
      lg:h-[320px]
      rounded-[20px]
      md:rounded-[25px]
      overflow-hidden
      cursor-pointer
      "
    >
      <img
        src={women}
        alt=""
        className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
      />

      <div className="absolute inset-0 bg-black/25"></div>

      <h3 className="absolute bottom-4 md:bottom-6 left-4 md:left-6 text-white text-xl md:text-3xl font-semibold">
        Women
      </h3>
    </div>

    {/* Men */}
    <div
      onClick={() => handleCategoryCardClick("Men")}
      className="
      relative
      group
      h-[220px]
      sm:h-[260px]
      md:h-[300px]
      lg:h-[320px]
      rounded-[20px]
      md:rounded-[25px]
      overflow-hidden
      cursor-pointer
      "
    >
      <img
        src={men}
        alt=""
        className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
      />

      <div className="absolute inset-0 bg-black/25"></div>

      <h3 className="absolute bottom-4 md:bottom-6 left-4 md:left-6 text-white text-xl md:text-3xl font-semibold">
        Men
      </h3>
    </div>

    {/* Kids */}
    <div
      onClick={() => handleCategoryCardClick("Kids")}
      className="
      relative
      group
      h-[220px]
      sm:h-[260px]
      md:h-[300px]
      lg:h-[320px]
      rounded-[20px]
      md:rounded-[25px]
      overflow-hidden
      cursor-pointer
      "
    >
      <img
        src={kid}
        alt=""
        className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
      />

      <div className="absolute inset-0 bg-black/25"></div>

      <h3 className="absolute bottom-4 md:bottom-6 left-4 md:left-6 text-white text-xl md:text-3xl font-semibold">
        Kids
      </h3>
    </div>

    {/* Shoes */}
    <div
      onClick={() => {
        setSelectedCategory([]);
        setSelectedSubCategory(["Shoes"]);

        productSectionRef.current?.scrollIntoView({
          behavior: "smooth",
        });
      }}
      className="
      relative
      group
      h-[220px]
      sm:h-[260px]
      md:h-[300px]
      lg:h-[320px]
      rounded-[20px]
      md:rounded-[25px]
      overflow-hidden
      cursor-pointer
      "
    >
      <img
        src={shoes}
        alt=""
        className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
      />

      <div className="absolute inset-0 bg-black/25"></div>

      <h3 className="absolute bottom-4 md:bottom-6 left-4 md:left-6 text-white text-xl md:text-3xl font-semibold">
        Shoes
      </h3>
    </div>

    {/* Bags */}
    <div
      onClick={handleAccessoriesClick}
      className="
      relative
      group
      h-[220px]
      sm:h-[260px]
      md:h-[300px]
      lg:h-[320px]
      rounded-[20px]
      md:rounded-[25px]
      overflow-hidden
      cursor-pointer
      "
    >
      <img
        src={bag}
        alt=""
        className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
      />

      <div className="absolute inset-0 bg-black/25"></div>

      <h3 className="absolute bottom-4 md:bottom-6 left-4 md:left-6 text-white text-lg md:text-2xl font-semibold">
        Bags &
        <br />
        Accessories
      </h3>
    </div>

  </div>
</div>
</section>

      {/* Filter Button */}
      <button
  ref={buttonRef}
  onClick={() => setShowFilters(!showFilters)}
  className="
fixed
left-3
top-16
md:left-5
md:top-28
z-50

w-12
h-12

rounded-2xl

bg-[#D88770]/80
backdrop-blur-xl

border
border-[#D88770]/30

shadow-lg

flex
items-center
justify-center

text-white

transition-all
duration-300
hover:scale-105
"
>
  <FiFilter size={18} />
</button>
{/* Sidebar */}
<div
  ref={filterRef}
  className={`
    fixed left-3 top-24 z-40
    w-[90vw] max-w-[320px]
    transition-all duration-300
    ${
      showFilters
        ? "translate-x-0 opacity-100"
        : "-translate-x-[120%] opacity-0 pointer-events-none"
    }
  `}
>
  <div
    className="
      bg-white/20
      backdrop-blur-xl
      rounded-[28px]
      shadow-[0_20px_60px_rgba(216,135,112,0.18)]
      border border-white/30
      flex flex-col
      h-[75vh]
    "
  >
    {/* Header */}
    <div className="flex justify-between items-center p-6 pb-4">
      <h2 className="text-2xl font-bold text-[#2F1E1A]">
        Filters
      </h2>

      <button
        onClick={() => setShowFilters(false)}
        className="
          w-10 h-10
          rounded-full
          bg-[#F8F1ED]
          hover:bg-[#F3E2DB]
          flex items-center justify-center
        "
      >
        <FiX size={18} />
      </button>
    </div>

    {/* Scrollable Content */}
    <div className="flex-1 overflow-y-auto px-6">
      <h3 className="font-semibold mb-4 uppercase">
        Categories
      </h3>

      <div className="flex flex-wrap gap-3">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => toggleCategory(item)}
            className={`px-5 py-2 rounded-full border ${
              selectedCategory.includes(item)
                ? "bg-[#D88770] text-white border-[#D88770]"
                : "bg-white"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="h-px bg-[#E8D8D1] my-8"></div>

      <h3 className="font-semibold mb-4 uppercase">
        Sub Categories
      </h3>

      <div className="flex flex-wrap gap-3 pb-6">
        {subCategories.map((item) => (
          <button
            key={item}
            onClick={() => toggleSubCategory(item)}
            className={`px-5 py-2 rounded-full border ${
              selectedSubCategory.includes(item)
                ? "bg-[#D88770] text-white border-[#D88770]"
                : "bg-white"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>

    {/* Fixed Bottom Button */}
    <div className="p-4 border-t border-[#E8D8D1] bg-white/30">
      <button
        onClick={() => {
          setSelectedCategory([]);
          setSelectedSubCategory([]);
        }}
        className="
          w-full
          py-3
          rounded-xl
          bg-[#2F1E1A]
          text-white
        "
      >
        Clear Filters
      </button>
    </div>
  </div>
</div>
      {/* Main Content */}
<div
  ref={productSectionRef}
  className="max-w-7xl mx-auto"
>

  {/* Search + Sort */}
  <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-12">

  {/* Search */}
  <div className="relative w-full lg:max-w-lg">
    <FiSearch
      className="
      absolute
      left-5
      top-1/2
      -translate-y-1/2
      text-[#D88770]
      text-xl
      "
    />

    <input
      type="text"
      placeholder="Search luxury fashion..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
     className="
     w-full
     pl-14
     pr-5
     py-4
     rounded-full
   bg-white
     border-2
   border-[#DCC5BC]
     shadow-md
     focus:outline-none
   focus:border-[#D88770]
     focus:ring-4
   focus:ring-[#D88770]/20
      transition-all
      "
    />
  </div>

  {/* Sort */}
  <div className="relative">
    <select
      value={sortType}
      onChange={(e) => setSortType(e.target.value)}
      className="
      appearance-none
    bg-white
      border-2
    border-[#DCC5BC]
     px-6
      py-4
      rounded-full
      min-w-[280px]
   text-[#2F1E1A]
     font-semibold
      shadow-md
     focus:outline-none
   focus:border-[#D88770]
     focus:ring-4
   focus:ring-[#D88770]/20
     cursor-pointer
    transition-all
     "
    >
      <option value="relevant">Featured Products</option>
      <option value="low-high">Price: Low to High</option>
      <option value="high-low">Price: High to Low</option>
      <option value="newest">Newest Arrivals</option>
    </select>

    <FiChevronDown
      className="
      absolute
      right-5
      top-1/2
      -translate-y-1/2
      text-[#D88770]
      pointer-events-none
      "
    />
  </div>

</div>
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <p className="text-[#2F1E1A] font-medium">
            Showing {filterProduct.length} Products
          </p>

          <span className="bg-[#FFF6F2] text-[#D88770] px-4 py-2 rounded-full text-sm font-semibold">
            Fashion Collection
          </span>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 px-3 md:px-0 pb-32 md:pb-12">
          {filterProduct.map((item) => (
            <Card
              key={item._id}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Collections;