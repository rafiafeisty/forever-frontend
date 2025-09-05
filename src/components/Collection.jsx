import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Collection = () => {
  const [items, setItems] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]); 
  const [selectedTypes, setSelectedTypes] = useState([]); 
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  const detailing = (id) => {
    navigate(`/detail/${id}`);
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("https://backend-forever-zeta.vercel.app/auth/display");
        const data = await response.json();
        setItems(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchItems();
  }, []);

  // handle checkbox toggle
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleTypeChange = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  // apply filters
  const filteredItems = items.filter((item) => {
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(item.category?.toLowerCase());

    const typeMatch =
      selectedTypes.length === 0 ||
      selectedTypes.includes(item.subcategory);

    const searchMatch =
      searchQuery === "" ||
      item.name.toLowerCase().includes(searchQuery) ||
      item.description.toLowerCase().includes(searchQuery);

    return categoryMatch && typeMatch && searchMatch;
  });

  return (
    <div className="container mx-auto px-4">
      {/* Header Section */}
      <div className="mt-12 w-full sm:w-2/3 lg:w-1/2 mx-auto flex gap-2 items-center justify-center mb-8">
        <div className="uppercase text-slate-500 text-2xl sm:text-3xl font-medium">all</div>
        <div className="uppercase text-slate-700 text-2xl sm:text-3xl font-medium">Collections</div>
        <div className="h-[2px] w-12 sm:w-16 bg-slate-700"></div>
      </div>

      {/* Main Content Grid */}
      <div className="flex flex-col lg:flex-row gap-8 px-4 lg:px-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4">
          <div className="uppercase text-xl sm:text-2xl mb-6">
            <h1>filters</h1>
          </div>
          <div className="mb-8 p-4 w-full border border-gray-300 rounded">
            <h1 className="uppercase text-lg font-medium">Categories</h1>
            <ul className="text-gray-500 mt-4 space-y-2">
              {["Men", "Women", "Kids"].map((cat) => (
                <li key={cat} className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4"
                    checked={selectedCategories.includes(cat.toLowerCase())}
                    onChange={() => handleCategoryChange(cat.toLowerCase())}
                  />
                  <label>{cat}</label>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4 w-full border border-gray-300 rounded">
            <h1 className="uppercase text-lg font-medium">Type</h1>
            <ul className="text-gray-500 mt-4 space-y-2">
              {["Topwear", "Bottomwear", "Winterwear"].map((t) => (
                <li key={t} className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4"
                    checked={selectedTypes.includes(t)}
                    onChange={() => handleTypeChange(t)}
                  />
                  <label>{t}</label>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:w-3/4">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div key={item._id} className="group">
                  <div className="overflow-hidden rounded">
                    <img
                      src={
                        item.image.startsWith("http")
                          ? item.image
                          : item.image.startsWith("data:image")
                          ? item.image
                          : `data:image/jpeg;base64,${item.image}`
                      }
                      className="h-48 sm:h-56 w-full object-cover transform transition duration-300 ease-in-out group-hover:scale-105 hover:cursor-pointer"
                      alt={item.name}
                      onClick={() => detailing(item._id)}
                    />
                  </div>
                  <div className="mt-3">
                    <div className="text-slate-700 text-sm sm:text-base">{item.name}</div>
                    <div className="text-slate-500 text-xs">{item.description}</div>
                    <div className="text-slate-800 font-medium">${item.price}</div>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-4 text-center text-gray-500">No products available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
