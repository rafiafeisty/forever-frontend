import React from 'react'
import { MdOutlinePolicy } from "react-icons/md";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { FaHeadphonesAlt } from "react-icons/fa";

const Stickers = () => {
  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-12 mt-28 mx-auto w-[70%]'>
        <div className='space-y-4 min-h-[70px] text-center text-xl'>
            <center>
                <div className='text-3xl'>
            <MdOutlinePolicy/>
            </div>
            </center>
            <h1 className='text-slate-700'>Easy exchange policy</h1>
            <p className='text-gray-500'>We offer hassle free exchange policy</p>
        </div>
        <div className='space-y-4 min-h-[70px] text-center text-xl'>
            <center>
                <div className='text-3xl'>
            <IoCheckmarkDoneCircleOutline />
            </div>
            </center>
            <h1 className='text-slate-700'>7 Days Return Policy</h1>
            <p className='text-gray-500'>We provide 7 days free return policy</p>
        </div>
        <div className='space-y-4 min-h-[70px] text-center text-xl'>
            <center>
                <div className='text-3xl'>
            <FaHeadphonesAlt />
            </div>
            </center>
            <h1 className='text-slate-700'>Best customer support</h1>
            <p className='text-gray-500'>we provide 24/7 customer support</p>
        </div>
      </div>
    </>
  )
}

export default Stickers
