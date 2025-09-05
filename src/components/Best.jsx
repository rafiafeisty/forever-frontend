import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Best = () => {
  const [items, setItems] = useState([])
  const navigate = useNavigate()

  const detailing = (id) => {
    navigate(`/detail/${id}`) 
  }

  const fetching = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/display")
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
        <div className='uppercase text-slate-500 text-3xl font-medium'>best</div>
        <div className='uppercase text-slate-700 text-3xl font-medium ml-2'>sellers</div>
        <div className='h-[2px] w-16 bg-slate-700 ml-4'></div>
      </div>
      <div className='w-1/2 mx-auto mt-6 text-slate-700 text-lg'>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel, necessitatibus Lorem ipsum dolor.
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 mx-auto w-[80%] mt-16 gap-12">
        {items.slice(-10).map((item) => (
          <div key={item._id} className='h-[250px] w-[150px] sm:w-[200px]'>
            <div className='w-full'>
              <div>
                <img
                  src={item.image.startsWith("http") ? item.image : `data:image/jpeg;base64,${item.image}`}
                  className='h-[200px] w-full transform transition duration-200 ease-in-out hover:scale-105 hover:cursor-pointer'
                  onClick={() => detailing(item._id)}
                  alt={item.name}
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

export default Best
