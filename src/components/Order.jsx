import React, { useState, useEffect } from 'react'
import Adminpan from './Adminpan'
import { useNavigate } from 'react-router-dom'

const Order = () => {
    const [orders, setOrders] = useState([])
    const navigate = useNavigate()

    const fetching = async () => {
        try {
            const response = await fetch("https://backend-forever-zeta.vercel.app/auth/orders")
            const data = await response.json()
            setOrders(data)
        } catch (err) {
            console.error("Error fetching orders:", err)
        }
    }

    useEffect(() => {
        fetching()
    }, [])

    useEffect(() => {
        const log = localStorage.getItem("adminlog")
        if (!log) {
            navigate("/admin")
        }
    })


    const deleteing = async (id) => {
        const response = await fetch("https://backend-forever-zeta.vercel.app/auth/delorder", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        })
        const data = await response.json();

        if (response.ok) {
            alert("order deleted successfully")
            setOrders((prev) => prev.filter((item) => item._id !== id));
        }
    }
    return (
        <>
            <div className='flex gap-4'>
                <Adminpan />
                <div className='mt-12 w-[90%] sm:w-[75%] mx-auto'>
                    {/* Table Header */}
                    <div className='border-[1px] border-slate-600 m-2'>
                        <div className='bg-gray-200 text-slate-700 font-medium grid grid-cols-3 px-4 py-2 text-center'>
                            <p>Products</p>
                            <p>Customer</p>
                            <p>Action</p>
                        </div>
                    </div>

                    {/* Table Rows */}
                    {orders.map((order) => (
                        <div key={order._id} className='border-[1px] border-slate-600 m-2'>
                            <div className='text-slate-700 font-medium grid grid-cols-1 sm:grid-cols-4 gap-8 px-4 py-2 text-center items-center'>

                                {/* Products */}
                                <div className='flex flex-col items-center'>
                                    {order.items.map((item, index) => (
                                        <div key={index} className="mb-2">
                                            <p><strong>{item.item_id?.name || "Unknown"}</strong></p>
                                            <p>Size: {item.size}</p>
                                            <p>Qty: {item.quantity}</p>
                                        </div>
                                    ))}
                                    <p className="font-bold">Total: ${order.total}</p>
                                </div>

                                {/* Customer */}
                                <div>
                                    <p><strong>Customer: </strong>{order.customer_name}</p>
                                    <p><strong>Date: </strong>{new Date(order.date).toLocaleDateString()}</p>
                                </div>

                                {/* Action */}
                                <div>
                                    <select
                                        value={order.status}
                                        onChange={async (e) => {
                                            const newStatus = e.target.value;

                                            try {
                                                const response = await fetch(`https://backend-forever-zeta.vercel.app/auth/updateorder/${order._id}`, {
                                                    method: "PUT",
                                                    headers: { "Content-Type": "application/json" },
                                                    body: JSON.stringify({ status: newStatus }),
                                                });

                                                if (response.ok) {
                                                    setOrders((prev) =>
                                                        prev.map((o) =>
                                                            o._id === order._id ? { ...o, status: newStatus } : o
                                                        )
                                                    );
                                                }
                                            } catch (err) {
                                                console.error("Error updating order:", err);
                                            }
                                        }}
                                        className='px-3 py-2 border border-gray-300 w-[90%] focus:outline-none focus:ring-0 focus:border-gray-300 rounded'
                                    >
                                        <option value="packing">Packing</option>
                                        <option value="leave for delivery">Leave for delivery</option>
                                        <option value="on the way">On the way</option>
                                        <option value="delivered">Delivered</option>
                                    </select>

                                </div>
                                <div>
                                    <button className='font-bold ml-4 text-slate-700 text-xl'
                                        onClick={() => deleteing(order._id)}
                                    >X</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Order
