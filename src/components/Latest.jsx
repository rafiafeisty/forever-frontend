import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Latest = () => {
    const [items, setItems] = useState([])
    const navigate = useNavigate()

    const detailing = (id) => {
        navigate(`/detail/${id}`)   // 👈 pass id for details page
    }

    const fetching = async () => {
        try {
            const response = await fetch("https://backend-forever-zeta.vercel.app/auth/display")
            const data = await response.json()
            setItems(data)
        } catch (err) {
            console.error("Error fetching items:", err)
        }
    }

    useEffect(() => {
        fetching()
    }, [])

    return (
        <>
            <div className='flex mx-auto w-1/2 sm:w-1/3 mt-10 items-center'>
                <div className='uppercase text-slate-500 text-3xl font-medium'>Latest</div>
                <div className='uppercase text-slate-700 text-3xl font-medium ml-2'>Collection</div>
                <div className='h-[2px] w-16 bg-slate-700 ml-4'></div>
            </div>

            <div className='w-1/2 mx-auto mt-6 text-slate-700 text-lg'>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Vel, necessitatibus Lorem ipsum dolor.
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 mx-auto w-[80%] mt-16 gap-12">
                {items.slice(0, 10).map((item) => (
                    <div key={item._id} className='h-[250px] w-[150px] sm:w-[200px]'>
                        <div className='w-full'>
                            <div>
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className='h-[200px] w-full transform transition duration-200 ease-in-out hover:scale-105 hover:cursor-pointer'
                                    onClick={() => detailing(item._id)}
                                />
                            </div>
                            <div className='text-slate-700 mt-2'>{item.name}</div>
                            <div className='text-slate-800 font-medium'>${item.price}</div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Latest
