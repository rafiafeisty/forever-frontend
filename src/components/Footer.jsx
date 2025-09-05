import React from 'react'
import heading from '../images/heading.png'

const Footer = () => {
  return (
    <>
      <div className='grid grid-cols-1 gap-12 sm:grid-cols-3 w-[90%] mx-auto mt-6'>
        <div className='w-[80%]'>
            <img src={heading} alt="heading-logo" />
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil architecto qui aperiam quas obcaecati.</p>
        </div>
        <div className='space-y-4'>
            <h1 className='text-3xl font-medium font-heading'>Company</h1>
            <ul className='text-sm space-y-3'>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div className='space-y-4'>
            <h1 className='text-3xl font-medium font-heading'>Get In Touch</h1>
            <ul className='text-sm space-y-2'>
                <li>123+69797</li>
                <li>example@gmail.com</li>
            </ul>
        </div>
      </div>
      <div className='mt-12 mb-2'>
        <div className='w-1/2 mx-auto h-[1px] bg-slate-700'></div>
        <div className='w-1/3 mx-auto font-medium mt-6'>
            Copyright 2024@ greatstack.dev - All Right Reserved.
        </div>
      </div>
    </>
  )
}

export default Footer
