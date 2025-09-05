import React from 'react'

const Subscribe = () => {
    return (
        <>
            <div className='mx-auto w-[80%] sm:w-1/3 mt-16 mb-28'>
                <div className='text-3xl text-slate-700 font-medium'>
                    <h1>Subscribe now & get 20% off</h1>
                </div>
                <div className='text-gray-400 font-medium text-lg mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. </div>
                <div className='flex mt-10 w-full'>
                    <input
                        className='px-3 py-2 border border-gray-300 w-[80%] focus:outline-none focus:ring-0 focus:border-gray-300'
                        type="email"
                        placeholder='Enter your email'
                    />
                    <button className='bg-slate-800 text-white px-3 py-1'>Subscribe</button>
                </div>
            </div>
        </>
    )
}

export default Subscribe
