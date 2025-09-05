import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate=useNavigate()
  const registering = async () => {
    const username = document.getElementById("usernameS").value
    const password = document.getElementById("passwordS").value
    if (!username || !password) {
      alert("Fill all the fields")
    }
    else {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      })
      const data = await response.json()
      if (response.ok) {
        alert("user created successfully")
      }
    }
  }
  const logging = async () => {
    const username = document.getElementById("usernameL").value
    const password = document.getElementById("passwordL").value
    if (!username || !password) {
      alert("Fill all the fields")
    }
    else {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      })
      const data = await response.json()
      if (response.ok) {
        alert("user logged in successfully")
        localStorage.setItem("userlogged",true)
        navigate("/")
      }
      else{
        alert(data)
      }
    }
  }
  const [account, setaccount] = useState(true)
  return (
    <>
      <div className={`w-[60%] sm:w-[40%] mx-auto mt-28 mb-28 ${account ? "block" : "hidden"}`}>
        <div className='mx-auto text-5xl font-heading mb-6 w-[70%] sm:w-[40%]'>Login</div>
        <div className='space-y-6 w-full'>
          <input type="email" placeholder='Email' id="usernameL" className='py-2 px-3 border-[1px] border-slate-700 w-[80%] focus:outline-none focus:ring-0 focus:border-slate-700' />
          <input type="password" placeholder='Password' id="passwordL" className='py-2 px-3 border-[1px] border-slate-700 w-[80%] focus:outline-none focus:ring-0 focus:border-slate-700' />
        </div>
        <div className='flex'>
          <button className='bg-white text-black mt-1 font-medium text-sm ml-auto mr-[130px]' onClick={() => setaccount(!account)}>Create Account</button>
        </div>
        <div className='mt-12 mx-auto w-full sm:w-[30%]'>
          <button className='text-xl text-white py-2 px-3 bg-black' onClick={logging}>Sign in</button>
        </div>
      </div>
      <div className={`w-[60%] sm:w-[40%] mx-auto mt-28 mb-28 ${account ? "hidden" : "block"}`}>
        <div className='mx-auto text-5xl font-heading mb-6 w-[70%] sm:w-[40%]'>Sign up</div>
        <div className='space-y-6 w-full'>
          <input type="text" placeholder='Name' className='py-2 px-3 border-[1px] border-slate-700 w-[80%] focus:outline-none focus:ring-0 focus:border-slate-700' />
          <input type="email" placeholder='Email' id="usernameS" className='py-2 px-3 border-[1px] border-slate-700 w-[80%] focus:outline-none focus:ring-0 focus:border-slate-700' />
          <input type="password" placeholder='Password' id="passwordS" className='py-2 px-3 border-[1px] border-slate-700 w-[80%] focus:outline-none focus:ring-0 focus:border-slate-700' />
        </div>
        <div className='flex'>
          <button className='bg-white text-black mt-1 font-medium text-sm ml-auto mr-[130px]' onClick={() => setaccount(!account)}>Login Here</button>
        </div>
        <div className='mt-12 mx-auto w-full sm:w-[30%]'>
          <button className='text-xl text-white py-2 px-3 bg-black' onClick={registering}>Sign Up</button>
        </div>
      </div>
    </>
  )
}

export default Login
