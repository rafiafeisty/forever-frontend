import React, { useEffect, useState } from 'react'
import heading from '../images/heading.png'
import { CiSearch } from "react-icons/ci";
import { IoPersonOutline, IoLockClosedOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/collection?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearch(false);
      setSearchTerm("");
    }
  };

  const admin = () => {
    window.open('/admin', '_blank');
  };

  const handleLogout = () => {
    localStorage.removeItem("userlogged");
    setLoggedIn(false);
    navigate("/");
  };

  useEffect(() => {
    const checkLogin = () => {
      const status = localStorage.getItem("userlogged");
      setLoggedIn(status === "true");
    };

    checkLogin();
    window.addEventListener("storage", checkLogin);

    return () => {
      window.removeEventListener("storage", checkLogin);
    };
  }, []);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(cart.length);
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  return (
    <>
      <div className="w-full h-[70px] flex items-center justify-between px-4 md:px-8 shadow-sm relative">
        <div>
          <img src={heading} alt="logo" className="h-[40px]" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <a href="/" className="relative after:content-[''] after:block after:w-0 after:h-[2px] after:bg-black after:mt-1 after:transition-all after:duration-300 hover:after:w-full">Home</a>
          <a href="/collection" className="relative after:content-[''] after:block after:w-0 after:h-[2px] after:bg-black after:mt-1 after:transition-all after:duration-300 hover:after:w-full">Collections</a>
          <a href="/about" className="relative after:content-[''] after:block after:w-0 after:h-[2px] after:bg-black after:mt-1 after:transition-all after:duration-300 hover:after:w-full">About</a>
          <a href="/contact" className="relative after:content-[''] after:block after:w-0 after:h-[2px] after:bg-black after:mt-1 after:transition-all after:duration-300 hover:after:w-full">Contact</a>

          <button className="rounded-md py-1 px-3 border border-black hover:bg-black hover:text-white transition" onClick={admin}>
            Admin Panel
          </button>
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-4 text-2xl font-bold relative">
          <button onClick={() => setSearch(!search)}><CiSearch /></button>

          {loggedIn ? (
            <button
              onClick={handleLogout}
              className="text-sm bg-black text-white py-1 px-3 rounded hover:bg-gray-800"
            >
              Logout
            </button>
          ) : (
            <a href="/login"><IoPersonOutline /></a>
          )}

          {/* Cart with badge */}
          <div className="relative">
            <a href="/cart"><IoLockClosedOutline /></a>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <button
            className="md:hidden text-3xl ml-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <IoClose /> : <GiHamburgerMenu />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="absolute top-[70px] left-0 w-full bg-white shadow-md md:hidden flex flex-col space-y-4 p-4 z-50">
          <a href="/" className="hover:text-gray-600">Home</a>
          <a href="/collection" className="hover:text-gray-600">Collections</a>
          <a href="/about" className="hover:text-gray-600">About</a>
          <a href="/contact" className="hover:text-gray-600">Contact</a>

          <button
            className="rounded-md py-1 px-3 border border-black hover:bg-black hover:text-white transition"
            onClick={admin}
          >
            Admin Panel
          </button>


        </div>
      )}

      {/* Search Bar */}
      <div
        className={`border-b-[1px] border-t-[1px] border-gray-400 mx-auto w-[70%] mt-6 ${search ? "block" : "hidden"}`}
      >
        <form
          onSubmit={handleSearch}
          className="w-1/2 sm:w-1/3 mx-auto mt-6 flex items-center relative"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="rounded-full border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 py-1 px-3 w-full mb-4"
          />
          <button
            type="submit"
            className="text-xl absolute right-3 top-1/3 -translate-y-1/2"
          >
            <CiSearch />
          </button>
        </form>
      </div>
    </>
  );
};

export default Header;
