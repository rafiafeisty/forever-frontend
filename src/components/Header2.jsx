import React from 'react'
import admin from '../images/admin.png'
import { useNavigate } from 'react-router-dom'

const Header2 = () => {
    const navigate=useNavigate()
    const logout=()=>{
        localStorage.removeItem("adminlog")
        navigate('/')
    }
    return (
        <>
            <div className="w-full h-[70px] flex items-center justify-between px-4 md:px-8 shadow-sm relative">
                <div>
                    <img src={admin} alt="logo" className="h-[40px]" />
                </div>
                <div className='ml-auto mr-10'>
                    <button className='text-white rounded-full py-2 px-3 bg-slate-700' onClick={logout}>Logout</button>
                </div>
            </div>
        </>
    )
}

export default Header2
