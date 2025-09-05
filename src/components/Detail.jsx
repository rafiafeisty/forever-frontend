import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectsize, setsize] = useState("")

  const adding = () => {
    if (!selectsize) {
      alert("Please select a size");
    } else {
      const item = {
        item_id: product._id,
        size: selectsize
      };

      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(item);
      localStorage.setItem("cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("storage"));

      alert("Item added to cart!");
    }
  };


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://backend-forever-zeta.vercel.app/auth/detail/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <p className="text-center mt-10 text-gray-500">Loading product...</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 items-center mt-12 w-[80%] mx-auto gap-6">
        <div>
          <img
            className="h-[400px] sm:h-[500px] object-cover"
            src={
              product.image.startsWith("http")
                ? product.image // direct URL
                : product.image.startsWith("data:image")
                  ? product.image // already base64 formatted
                  : `data:image/jpeg;base64,${product.image}` // raw base64 string
            }
            alt={product.name}
          />
        </div>
        <div className="text-lg space-y-10">
          <h1 className="text-slate-700 font-bold text-xl">{product.name}</h1>
          <p className="font-bold text-black">${product.price}</p>
          <p className="font-sm text-slate-500">{product.description}</p>
          <h1 className="font-bold text-slate-700 text-xl">Select Size</h1>
          <div className="flex gap-4">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <button
                key={size}
                className={`py-1 px-3 border-[1px] border-black 
                  ${selectsize === size ? "bg-black text-white" : "bg-gray-200"}`}
                onClick={() => setsize(size)}
              >
                {size}
              </button>
            ))}
          </div>
          <button className="mt-6 text-white bg-black transition-all duration-300 ease py-2 px-3" onClick={adding}>
            Add To Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default Detail;
