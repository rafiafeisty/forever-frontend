import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const [items, setItems] = useState([]);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        setItems(cart);
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const fetched = await Promise.all(
                    items.map(async (item) => {
                        const res = await fetch(`https://backend-forever-zeta.vercel.app/auth/detail/${item.item_id}`);
                        const data = await res.json();
                        return { ...data, size: item.size, quantity: item.quantity || 1 };
                    })
                );
                setProducts(fetched);
            } catch (err) {
                console.error("Error fetching cart items:", err);
            }
        };

        if (items.length > 0) {
            fetchProducts();
        } else {
            setProducts([]);
        }
    }, [items]);
    const updateCart = (updatedItems) => {
        setItems(updatedItems);
        localStorage.setItem("cart", JSON.stringify(updatedItems));
        window.dispatchEvent(new Event("cartUpdated"));
    };

    const removeItem = (id, size) => {
        const updatedItems = items.filter(
            (item) => !(item.item_id === id && item.size === size)
        );
        updateCart(updatedItems);
    };

    const increaseQty = (id) => {
        const updatedItems = items.map((item) =>
            item.item_id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
        updateCart(updatedItems);
    };
    const decreaseQty = (id) => {
        const updatedItems = items.map((item) =>
            item.item_id === id && (item.quantity || 1) > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
        );
        updateCart(updatedItems);
    };

    const subtotal = products.reduce(
        (acc, p) => acc + (p.price || 0) * (p.quantity || 1),
        0
    );
    const checkout = () => {
        const log = localStorage.getItem("userlogged")
        if (!log) {
            alert("Kindly login")
            navigate("/login")
        }
        else {
            if (products.length === 0) {
                alert("Select some items");
            } else {
                const orderItems = items.map(item => ({
                    item_id: item.item_id,
                    size: item.size,
                    quantity: item.quantity || 1,
                }));
                localStorage.setItem("order", JSON.stringify(orderItems));
                navigate("/delivery");
            }
        }
    };

    return (
        <>
            <div className="flex mx-auto w-1/2 sm:w-1/3 mt-10 items-center">
                <div className="uppercase text-slate-500 text-3xl font-medium">your</div>
                <div className="uppercase text-slate-700 text-3xl font-medium ml-2">Cart</div>
                <div className="h-[2px] w-16 bg-slate-700 ml-4"></div>
            </div>

            {/* Cart Items */}
            <div className="w-[80%] mx-auto mt-10 space-y-6">
                {products.length === 0 ? (
                    <p className="text-center text-gray-500">Your cart is empty</p>
                ) : (
                    products.map((product) => (
                        <div
                            key={product._id}
                            className="flex items-center justify-between border-b pb-4"
                        >
                            {/* Image */}
                            <img
                                src={`data:image/jpeg;base64,${product.image}`}
                                alt={product.name}
                                className="h-20 w-20 object-cover rounded"
                            />

                            {/* Details */}
                            <div className="flex-1 ml-4">
                                <h2 className="font-bold text-lg">{product.name}</h2>
                                <p className="text-gray-500 text-sm">{product.description}</p>
                                <p className="text-sm">Size: {product.size}</p>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => decreaseQty(product._id)}
                                    className="px-2 py-1 border rounded"
                                >
                                    -
                                </button>
                                <span>{product.quantity}</span>
                                <button
                                    onClick={() => increaseQty(product._id)}
                                    className="px-2 py-1 border rounded"
                                >
                                    +
                                </button>
                            </div>

                            {/* Price */}
                            <div className="font-bold text-lg ml-4">
                                ${(product.price * product.quantity).toFixed(2)}
                            </div>

                            {/* Remove */}
                            <button
                                onClick={() => removeItem(product._id, product.size)}
                                className="ml-4 text-slate-700 font-bold text-xl"
                            >
                                X
                            </button>
                        </div>
                    ))
                )}
            </div>

            {/* Cart Totals */}
            <div className="w-[30%] ml-auto grid grid-cols-1">
                <div className="mt-12 w-full flex gap-2 items-center">
                    <div className="uppercase text-slate-500 text-2xl font-medium">cart</div>
                    <div className="uppercase text-slate-700 text-2xl font-medium ml-2">totals</div>
                    <div className="h-[2px] w-16 bg-slate-700 ml-4"></div>
                </div>
                <div className="mt-4 w-[50%]">
                    <div className="flex gap-20 border-b-[1px] border-slate-300 py-3">
                        <p>Subtotal</p>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex gap-20 border-b-[1px] border-slate-300 py-3">
                        <p>Shipping</p>
                        <span>$ 0.00</span>
                    </div>
                    <div className="flex gap-20 font-bold">
                        <p>Total</p>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                </div>
                <div>
                    <button className="py-3 px-4 bg-black text-white text-lg mt-12"
                        onClick={checkout}
                    >Proceed to Checkout</button>
                </div>
            </div>
        </>
    );
};

export default Cart;
