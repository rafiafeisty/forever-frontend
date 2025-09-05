import React from 'react'
import { IoAddCircleOutline } from "react-icons/io5";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Adminpan = () => {
    const navigate = useNavigate()
    const add = () => {
        navigate("/add")
    }
    const order = () => {
        navigate("/order")
    }
    const list = () => {
        navigate("/list")
    }

    useEffect(() => {
        const log = localStorage.getItem("adminlog")
        if (!log) {
            navigate("/admin")
        }
    })
    return (
        <div className='flex'>
            <div className='ml-4 sm:ml-20 space-y-4 mt-20'>
                {/* Add Item */}
                <button
                    className='w-[50px] sm:w-[200px] px-3 py-1 border-[1px] border-slate-300 bg-white flex gap-2 sm:gap-4 text-xl font-medium items-center justify-center sm:justify-start'
                    onClick={add}
                >
                    <IoAddCircleOutline />
                    <p className='hidden sm:block'>Add Item</p>
                </button>

                {/* List Items */}
                <button
                    className='w-[50px] sm:w-[200px] px-3 py-1 border-[1px] border-slate-300 bg-white flex gap-2 sm:gap-4 text-xl font-medium items-center justify-center sm:justify-start'
                    onClick={list}
                >
                    <IoCheckmarkDoneCircleSharp />
                    <p className='hidden sm:block'>List Items</p>
                </button>

                {/* Orders */}
                <button
                    className='w-[50px] sm:w-[200px] px-3 py-1 border-[1px] border-slate-300 bg-white flex gap-2 sm:gap-4 text-xl font-medium items-center justify-center sm:justify-start'
                    onClick={order}
                >
                    <IoCheckmarkDoneCircleSharp />
                    <p className='hidden sm:block'>Orders</p>
                </button>
            </div>

            {/* Divider line */}
            <div className='h-[100vh] border-r-[2.5px] border-slate-300'></div>
        </div>
    )
}

export default Adminpan
