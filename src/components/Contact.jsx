import React from 'react'
import contact from '../images/contact.png'

const Contact = () => {
    return (
        <>
            <div className='mt-12 w-full sm:w-2/3 lg:w-1/2 mx-auto flex gap-2 items-center justify-center mb-8'>
                <div className='uppercase text-slate-500 text-2xl sm:text-3xl font-medium'>contact</div>
                <div className='uppercase text-slate-700 text-2xl sm:text-3xl font-medium'>us</div>
                <div className='h-[2px] w-12 sm:w-16 bg-slate-700'></div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 items-center mt-12 w-[80%] mx-auto gap-6'>
                <div>
                    <img className='h-[400px] sm:h-[500px]' src={contact} alt="contact.png" />
                </div>
                <div className='text-lg text-slate-500 space-y-10'>
                    <h1 className='text-slate-700 font-bold text-xl'>Our Store</h1>
                    <p>54709 Willms Station <br />Suite 350, Washington, USA</p>
                    <p>Tel: (415) 555-0132 <br />Email: admin@forever.com</p>
                    <h1 className='font-bold text-slate-700 text-xl'>Careers at Forever</h1>
                    <p>Learn more about our teams and job openings.</p>
                    <button className='mt-6 text-black transition-all duration-300 ease bg-white border-[1px] border-black py-2 px-3 hover:bg-black hover:text-white'>Explore Jobs</button>
                </div>
            </div>
        </>
    )
}

export default Contact
