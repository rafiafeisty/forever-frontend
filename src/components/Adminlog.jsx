import React from 'react'
import { useNavigate } from 'react-router-dom'

const Adminlog = () => {
  const navigate = useNavigate()
  const logging = async () => {
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    if (!username || !password) {
      alert("Fill all the fields")
    }
    else {
      const response = await fetch("http://localhost:5000/auth/adminlog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      })
      const data = await response.json()
      if (response.ok) {
        alert("admin logged in successfully")
        localStorage.setItem("userlogged", true)
        localStorage.setItem("adminlog", true)
        navigate("/adminpan")
      }
      else {
        alert(data)
      }
    }
  }
  return (
    <>
      <div className='w-[80%] sm:w-[30%] mx-auto border-[2px] border-slate-400 mt-24'>
        <h1 className='font-heading mt-10 font-bold w-[30%] mx-auto text-xl'>Admin Login</h1>
        <div className='space-y-4 px-10 py-10'>
          <div>
            <label htmlFor="email" className='text-medium'>Email</label>
            <br />
            <input type="email" placeholder='Email' id="username" className='px-3 py-1 border border-gray-300 w-[80%] focus:outline-none focus:ring-0 focus:border-gray-300' />
          </div>
          <div>
            <label htmlFor="password" className='text-medium'>Password</label>
            <br />
            <input type="password" placeholder='Password' id="password" className='px-3 py-1 border border-gray-300 w-[80%] focus:outline-none focus:ring-0 focus:border-gray-300' />
          </div>
          <div className='w-[50%] mx-auto'>
            <button className='py-2 px-3 text-white bg-black rounded-md mt-4 text-xl' onClick={logging}>Login</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Adminlog
