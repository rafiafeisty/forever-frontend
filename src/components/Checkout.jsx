import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const navigate=useNavigate()
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        const log=localStorage.getItem("userlogged")
        if(!log){
            navigate("/")
            alert("Kindly login")
        }
    })

    useEffect(() => {
        const loadProducts = async () => {
            const orderItems = JSON.parse(localStorage.getItem("order")) || [];
            try {
                const fetched = await Promise.all(
                    orderItems.map(async (item) => {
                        const res = await fetch(`http://localhost:5000/auth/detail/${item.item_id}`);
                        const data = await res.json();
                        return {
                            ...data,
                            size: item.size,
                            quantity: item.quantity,
                        };
                    })
                );
                setProducts(fetched);
            } catch (err) {
                console.error("Error fetching products:", err);
            }
        };
        loadProducts();
    }, []);

    // Calculate total
    const total = products.reduce(
        (acc, p) => acc + (p.price || 0) * (p.quantity || 1),
        0
    );

    const saveOrder = async () => {
        const first = document.getElementById("first").value;
        const last = document.getElementById("last").value;
        const email = document.getElementById("email").value;
        const zip = document.getElementById("zip").value;
        const city = document.getElementById("city").value;
        const country = document.getElementById("country").value;
        const state = document.getElementById("state").value;
        const phone = document.getElementById("phone").value;

        if (!first || !last || !email || !city || !zip || !country || !state || !phone) {
            alert("Fill all the fields");
            return;
        }
        if(products.length==0){
            alert("No order has been placed")
            return
        }

        const customer_name = `${first} ${last}`;

        const orderPayload = {
            customer_name,
            items: products.map((p) => ({
                item_id: p._id,
                size: p.size,
                quantity: p.quantity,
            })),
            total,
            status: "packaging",
        };

        try {
            const res = await fetch("http://localhost:5000/auth/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderPayload),
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.removeItem("order");
                window.dispatchEvent(new Event("cartUpdated"));
                alert("Order placed successfully!");
                navigate("/")

            }
        } catch (err) {
            console.error("Error placing order:", err);
        }
    };

    return (
        <>
            <div className='mt-12 w-full sm:w-2/3 lg:w-1/2 mx-auto flex gap-2 items-center justify-center mb-8'>
                <div className='uppercase text-slate-500 text-2xl sm:text-3xl font-medium'>Delivery</div>
                <div className='uppercase text-slate-700 text-2xl sm:text-3xl font-medium'>Information</div>
                <div className='h-[2px] w-12 sm:w-16 bg-slate-700'></div>
            </div>
            <div className='w-[90%] sm:w-[70%] lg:w-[50%] mx-auto space-y-3 mt-20 mb-32'>

                <div className='flex gap-2 w-full'>
                    <input
                        className='px-3 py-2 flex-1 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded-md'
                        type="text"
                        placeholder='First name'
                        id="first"
                    />
                    <input
                        className='px-3 py-2 flex-1 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded-md'
                        type="text"
                        placeholder='Last Name'
                        id="last"
                    />
                </div>
                <div className='w-full'>
                    <input
                        className='px-3 py-2 border border-gray-300 w-full focus:outline-none focus:ring-0 focus:border-gray-300 rounded-md'
                        type="email"
                        placeholder='Email'
                        id="email"
                    />
                </div>
                <div className='flex gap-2 w-full'>
                    <input
                        className='px-3 py-2 flex-1 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded-md'
                        type="text"
                        placeholder='City'
                        id="city"
                    />
                    <input
                        className='px-3 py-2 flex-1 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded-md'
                        type="text"
                        placeholder='State'
                        id="state"
                    />
                </div>
                <div className='flex gap-2 w-full'>
                    <input
                        className='px-3 py-2 flex-1 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded-md'
                        type="text"
                        placeholder='ZipCode'
                        id="zip"
                    />
                    <input
                        className='px-3 py-2 flex-1 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded-md'
                        type="text"
                        placeholder='Country'
                        id="country"
                    />
                </div>
                <div className='w-full'>
                    <input
                        className='px-3 py-2 border border-gray-300 w-full focus:outline-none focus:ring-0 focus:border-gray-300 rounded-md'
                        type="number"
                        placeholder='Phone'
                        id="phone"
                    />
                </div>
                <div className='mt-24 w-[30%] mx-auto'>
                    <button className='bg-black text-white text-xl py-2 px-4 rounded-md' onClick={saveOrder}>Pay Bill</button>
                </div>
            </div>
        </>
    )
}

export default Checkout
