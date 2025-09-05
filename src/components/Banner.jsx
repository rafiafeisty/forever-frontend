import React from 'react'
import magazine from '../images/magazine.png'

const Banner = () => {
    return (
        <>
            <div className='border border-black mt-10 min-h-[300px] mx-auto w-[70%] sm:w-1/2 grid grid-cols-1 sm:grid-cols-2 items-center justify-center'>
                <div className='ml-10'>
                    <div className='mb-6 mt-4 sm:mb-0 sm:mt-0'>
                        <div className='flex gap-4 items-center'>
                            <div className="h-1 w-10 bg-slate-700 rounded-md"></div>
                            <div className='uppercase text-center font-medium text-lg'>
                                our best sellers
                            </div>
                        </div>
                        <div>
                            <h1 className='text-3xl text-slate-700 font-heading sm:text-5xl'>Latest Arrivals</h1>
                        </div>
                        <div className='flex gap-4 items-center mt-4'>
                            <div className='uppercase text-center font-medium text-lg'>
                                Shop now
                            </div>
                            <div className="h-[1px] w-12 bg-slate-700 rounded-md"></div>
                        </div>
                    </div>
                </div>
                <div className='ml-auto'>
                    <img src={magazine} alt="magazine" />
                </div>
            </div>
        </>
    )
}

export default Banner
