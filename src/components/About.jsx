import React from 'react'
import about from '../images/about.png'

const About = () => {
    return (
        <>
            <div className='mt-12 w-full sm:w-2/3 lg:w-1/2 mx-auto flex gap-2 items-center justify-center mb-8'>
                <div className='uppercase text-slate-500 text-2xl sm:text-3xl font-medium'>About</div>
                <div className='uppercase text-slate-700 text-2xl sm:text-3xl font-medium'>us</div>
                <div className='h-[2px] w-12 sm:w-16 bg-slate-700'></div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 items-center mt-12 w-[80%] mx-auto'>
                <div>
                    <img className='h-[550px]' src={about} alt="about.png" />
                </div>
                <div className='text-lg text-slate-700 space-y-6'>
                    <p>Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.</p>
                    <p>Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.</p>
                    <h3 className='font-bold'>Our Mission</h3>
                    <p>Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.</p>
                </div>
            </div>
            <div className='mt-12 w-full sm:w-2/3 lg:w-1/2 flex gap-2 items-center justify-center mb-8'>
                <div className='uppercase text-slate-500 text-2xl sm:text-3xl font-medium'>why</div>
                <div className='uppercase text-slate-700 text-2xl sm:text-3xl font-medium'>choose</div>
                <div className='uppercase text-slate-700 text-2xl sm:text-3xl font-medium'>us</div>
                <div className='h-[2px] w-12 sm:w-16 bg-slate-700'></div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-3 w-[95%] sm:w-[70%] mx-auto mt-12 gap-0'>
                <div className='border-[1px] border-slate-300 h-[200px] px-4 py-2 text-center space-y-6'>
                    <h1 className='font-bold mt-6'>Quality Assurance:</h1>
                    <p className='text-slate-500'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
                </div>
                <div className='border-[1px] border-slate-300 h-[200px] px-4 py-2 text-center space-y-6'>
                    <h1 className='font-bold mt-6'>Convenience:</h1>
                    <p className='text-slate-500'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
                </div>
                <div className='border-[1px] border-slate-300 h-[200px] w-[350px] px-4 py-2 text-center space-y-6'>
                    <h1 className='font-bold mt-6'>Exceptional Customer Service:</h1>
                    <p className='text-slate-500'>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
                </div>
            </div>
        </>
    )
}

export default About
