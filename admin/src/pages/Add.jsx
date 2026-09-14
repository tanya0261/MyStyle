import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../component/Nav";
import Sidebar from "../component/Sidebar";
import upload from "../assets/Upload Image.png";
import { authDataContext } from "../context/AuthContext";
import axios from 'axios'
import Loading from "../component/Loading";
import { toast } from "react-toastify";
function Add() {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Women");
  const [subCategory, setSubCategory] = useState("Dresses");
  const [price, setPrice] = useState("");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);
  let {serverUrl} = useContext(authDataContext)
  const handleAddProduct = async (e) => {
  e.preventDefault();
     setLoading(true);
  try {
   

    if (
      !image1 ||
      !image2 ||
      !image3 ||
      !image4 ||
      !name ||
      !description ||
      !price ||
      sizes.length === 0
    ) {
      toast.warning("Please fill all required fields");
        setLoading(false);
        return;
    
    }

    let formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("price", price);
    formData.append("bestseller", bestseller);
    formData.append("sizes", JSON.stringify(sizes));

    formData.append("image1", image1);
    formData.append("image2", image2);
    formData.append("image3", image3);
    formData.append("image4", image4);

    const result = await axios.post(
      `${serverUrl}/api/product/addproduct`,
      formData,
      { withCredentials: true }
    );

    console.log(result.data);

    toast.success("Product Added Successfully");

    setImage1(false);
    setImage2(false);
    setImage3(false);
    setImage4(false);

    setName("");
    setDescription("");
    setCategory("Women");
    setSubCategory("Dresses");
    setPrice("");
    setSizes([]);
    setBestseller(false);

  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message ||
      "Failed to add product");
  } finally {
    setLoading(false); // ADD THIS
  }
};

  const sizeHandler = (size) => {
    setSizes((prev) =>
      prev.includes(size)
        ? prev.filter((item) => item !== size)
        : [...prev, size]
    );
  };
 

  return (
  <div className="min-h-screen bg-[#F8F4F1]">
    <Nav />

    <div className="flex flex-col md:flex-row">
      <Sidebar />

      <div className="flex-1 p-4 md:p-6 lg:p-8">

  <button
    type="button"
    onClick={() => navigate("/")}
    className="
      mb-6
      px-4
      py-2
      bg-white
      border
      border-[#D88770]
      text-[#2F1E1A]
      rounded-xl
      hover:bg-[#FFF6F2]
      transition-all
      font-medium
    "
  >
    ← Back to Dashboard
  </button>
        <form
          onSubmit={handleAddProduct}
          className="bg-white rounded-3xl shadow-lg p-4 md:p-6 lg:p-8"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-[#2F1E1A] mb-8">
            Add Product
          </h1>

          {/* Images */}
          <div>
            <p className="text-lg font-medium mb-4 text-[#2F1E1A]">
              Upload Images *
            </p>

            <div className="flex flex-wrap gap-3 md:gap-5">
              {[1, 2, 3, 4].map((item) => {
                const image =
                  item === 1
                    ? image1
                    : item === 2
                    ? image2
                    : item === 3
                    ? image3
                    : image4;

                const setImage =
                  item === 1
                    ? setImage1
                    : item === 2
                    ? setImage2
                    : item === 3
                    ? setImage3
                    : setImage4;

                return (
                  <label
                    key={item}
                    htmlFor={`image${item}`}
                    className="cursor-pointer"
                  >
                    <img
                      src={
                        image
                          ? URL.createObjectURL(image)
                          : upload
                      }
                      alt=""
                      className="
                        w-24 h-24
                        md:w-32 md:h-32
                        object-cover
                        border-2
                        border-dashed
                        border-[#D88770]
                        rounded-2xl
                        p-2
                        bg-[#FFF6F2]
                      "
                    />

                    <input
                      type="file"
                      id={`image${item}`}
                      hidden
                      required
                      onChange={(e) =>
                        setImage(e.target.files[0])
                      }
                    />
                  </label>
                );
              })}
            </div>
          </div>

          {/* Product Name */}
          <div className="mt-8">
            <p className="mb-2 font-medium text-[#2F1E1A]">
              Product Name *
            </p>

            <input
              type="text"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-4 border border-gray-300 rounded-xl outline-none focus:border-[#D88770]"
            />
          </div>

          {/* Description */}
          <div className="mt-6">
            <p className="mb-2 font-medium text-[#2F1E1A]">
              Product Description *
            </p>

            <textarea
              rows="5"
              placeholder="Write product description"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              required
              className="w-full p-4 border border-gray-300 rounded-xl outline-none focus:border-[#D88770]"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col md:flex-row gap-6 mt-6">
            <div>
              <p className="mb-2 font-medium">
                Category *
              </p>

              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setSizes([]);
                }}
                required
                className="border border-gray-300 rounded-xl p-3 w-full md:w-auto"
              >
                <option value="Women">Women</option>
                <option value="Men">Men</option>
                <option value="Kids">Kids</option>
              </select>
            </div>

            <div>
              <p className="mb-2 font-medium">
                Sub Category *
              </p>

              <select
                value={subCategory}
                onChange={(e) => {
                  setSubCategory(e.target.value);
                  setSizes([]);
                }}
                required
                className="border border-gray-300 rounded-xl p-3 w-full md:w-auto"
              >
                <option value="Dresses">Dresses</option>
                <option value="TopWear">TopWear</option>
                <option value="BottomWear">BottomWear</option>
                <option value="Bags">Bags</option>
                <option value="Accessories">Accessories</option>
                <option value="Shoes">Shoes</option>
                <option value="Watches">Watches</option>
              </select>
            </div>

            <div>
              <p className="mb-2 font-medium">
                Price *
              </p>

              <input
                type="number"
                placeholder="999"
                value={price}
                onChange={(e) =>
                  setPrice(e.target.value)
                }
                required
                className="border border-gray-300 rounded-xl p-3 w-full md:w-auto"
              />
            </div>
          </div>

          {/* Sizes */}
          <div className="mt-8">
            <p className="font-medium mb-3">
              Available Sizes *
            </p>

            <div className="flex flex-wrap gap-3">
              {(category === "Kids"
                ? [
                    "1-2Y",
                    "2-3Y",
                    "3-4Y",
                    "4-5Y",
                    "5-6Y",
                    "6-7Y",
                    "7-8Y",
                    "8-9Y",
                    "9-10Y",
                  ]
                : subCategory === "Shoes"
                ? ["5", "6", "7", "8", "9", "10", "11"]
                : ["XS", "S", "M", "L", "XL", "XXL"]
              ).map((size) => (
                <button
                  type="button"
                  key={size}
                  onClick={() => sizeHandler(size)}
                  className={`px-4 md:px-5 py-2 rounded-xl border transition-all ${
                    sizes.includes(size)
                      ? "bg-[#D88770] text-white border-[#D88770]"
                      : "bg-white border-gray-300 hover:border-[#D88770]"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            {sizes.length > 0 && (
              <p className="mt-3 text-sm text-gray-500">
                Selected Sizes: {sizes.join(", ")}
              </p>
            )}
          </div>

          {/* Bestseller */}
          <div className="mt-8 flex items-center gap-3">
            <input
              type="checkbox"
              checked={bestseller}
              onChange={() =>
                setBestseller(!bestseller)
              }
            />

            <p className="font-medium">
              Add to Bestseller
            </p>
          </div>

          {/* Submit */}
          <button 
            type="submit" disabled={loading}
            className="
              mt-8
              bg-[#D88770]
              hover:bg-[#c97761]
              text-white
              px-8
              py-3
              rounded-xl
              font-semibold
              transition
              w-full
              md:w-auto
            "
          >
             {loading ? <Loading /> : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  </div>
);
}

export default Add;