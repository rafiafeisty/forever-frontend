import React, { useState } from 'react'
import Adminpan from './Adminpan'
import { FiUpload, FiX } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Add = () => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [price, setPrice] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const navigate = useNavigate()

  useEffect(() => {
    const log = localStorage.getItem("adminlog")
    if (!log) {
      navigate("/admin")
    }
  })

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const removeImage = () => {
    setFile(null);
  };

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 3000);
  };

  const adding = async () => {
    // Basic validation
    if (!file) {
      showToast("Please upload an image", "error");
      return;
    }

    if (!name || !description || !category || !subcategory || !price) {
      showToast("Please fill all fields", "error");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("subcategory", subcategory);
    formData.append("price", price);

    try {
      const response = await fetch("http://localhost:5000/auth/add", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        // Show success toast
        showToast("Product added successfully!");

        // Reset form
        setFile(null);
        setName("");
        setDescription("");
        setCategory("");
        setSubcategory("");
        setPrice("");
      } else {
        showToast("Error adding product: " + data.message, "error");
      }
    } catch (error) {
      console.error("Error:", error);
      showToast("Network error. Please try again.", "error");
    }
  };

  return (
    <div className='flex gap-4 relative'>
      <Adminpan />
      <div className='mt-12 space-y-8 w-[80%] sm:w-[60%]'>
        {/* Upload Field */}
        <div className='flex gap-4 items-start'>
          <div>
            <input
              type="file"
              id="fileUpload"
              className="hidden"
              onChange={handleFileChange}
              accept="image/*"
            />
            <label
              htmlFor="fileUpload"
              className="flex flex-col items-center justify-center border-[2px] border-dotted border-slate-400 
                        px-6 py-6 bg-[#f1f1f1] w-[150px] h-[100px] cursor-pointer rounded-md
                        hover:bg-slate-200 transition"
            >
              <FiUpload className="text-3xl text-slate-600" />
              <span className="text-sm text-slate-600 mt-2">Upload</span>
            </label>
          </div>

          {/* Image Preview */}
          {file && (
            <div className="relative">
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="w-[150px] h-[100px] object-cover rounded-md border"
              />
              <button
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
              >
                <FiX size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Product Name */}
        <div className='w-full'>
          <label className='text-slate-700 font-medium text-lg mb-2'>Product Name:</label>
          <br />
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Type Here'
            className='px-3 py-2 border border-gray-300 w-[80%]' />
        </div>

        {/* Product Description */}
        <div className='w-full'>
          <label className='text-slate-700 font-medium text-lg mb-2'>Product Description</label>
          <br />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)}
            cols={42} rows={3} className='px-3 py-2 border border-gray-300 w-[80%]'></textarea>
        </div>

        {/* Category + Subcategory + Price */}
        <div className='w-full'>
          <div className='grid grid-cols-3 font-medium text-slate-700 mb-2'>
            <p>Product Category</p>
            <p>Sub Category</p>
            <p>Price</p>
          </div>
          <div className='grid grid-cols-3 gap-4'>
            <select value={category} onChange={(e) => setCategory(e.target.value)}
              className='px-3 py-2 border border-gray-300 w-[90%] rounded'>
              <option value="">Select</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kids">Kids</option>
            </select>

            <select value={subcategory} onChange={(e) => setSubcategory(e.target.value)}
              className='px-3 py-2 border border-gray-300 w-[90%] rounded'>
              <option value="">Select</option>
              <option value="bottomwear">Bottomwear</option>
              <option value="topwear">Topwear</option>
              <option value="winterwear">Winterwear</option>
            </select>

            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)}
              placeholder="Price" className='px-3 py-2 border border-gray-300 w-[90%] rounded' />
          </div>
        </div>

        <div>
          <button onClick={adding} className='py-2 px-3 bg-black text-white w-[120px]'>Add</button>
        </div>
      </div>

      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed bottom-4 right-4 px-4 py-2 rounded-md shadow-md text-white
          ${toast.type === "error" ? "bg-red-500" : "bg-green-500"} 
          transition-opacity duration-300`}>
          {toast.message}
        </div>
      )}
    </div>
  )
}

export default Add