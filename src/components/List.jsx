import React, { useState, useEffect } from "react";
import Adminpan from "./Adminpan";
import { useNavigate } from "react-router-dom";

const List = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:5000/auth/display");
        const data = await response.json();
        setItems(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchItems();
  }, []);

  useEffect(() => {
    const log = localStorage.getItem("adminlog")
    if (!log) {
      navigate("/admin")
    }
  })

  const deleting = async (id) => {
    try {
      const response = await fetch("http://localhost:5000/auth/del", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (response.ok) {
        setItems((prev) => prev.filter((item) => item._id !== id));
        alert(data);
      } else {
        alert(data);
      }
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };


  return (
    <>
      <div className="flex gap-4">
        <Adminpan />
        <div className="mt-12 w-full sm:w-[75%] mx-auto">
          {/* Header */}
          <div className="border-[1px] border-slate-600 m-2">
            {/* Show grid on sm+ screens */}
            <div className="hidden sm:grid bg-gray-200 text-slate-700 font-medium grid-cols-5 px-4 py-2 text-center">
              <p>Image</p>
              <p>Name</p>
              <p>Category</p>
              <p>Price</p>
              <p>Action</p>
            </div>
            {/* Show only on mobile */}
            <div className="sm:hidden bg-gray-200 text-slate-700 font-medium px-4 py-2 text-center">
              <p>All Products</p>
            </div>
          </div>

          {/* Rows */}
          {items.length > 0 ? (
            items.map((item) => (
              <div
                key={item._id}
                className="border-[1px] border-slate-600 m-2"
              >
                <div className="text-slate-700 font-medium grid grid-cols-5 px-4 py-2 text-center items-center">
                  {/* Image */}
                  <img
                    src={`data:image/jpeg;base64,${item.image}`}
                    alt={item.name}
                    className="w-[80px] h-[80px] mx-auto object-cover"
                  />
                  {/* Name */}
                  <p>{item.name}</p>
                  {/* Category */}
                  <p>{item.category}</p>
                  {/* Price */}
                  <p>${item.price}</p>
                  {/* Action */}
                  <button className="bg-white font-bold" onClick={() => deleting(item._id)}>
                    X
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-6">No products found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default List;
