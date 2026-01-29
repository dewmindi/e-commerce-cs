"use client";

import { X } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import { useRef, useEffect } from "react";

export const CartDropdown = ({ isCartOpen, setIsCartOpen }: any) => {
    const { cart, removeFromCart, getTotalItems, getTotalPrice } = useCart();
    const cartRef = useRef(null);

    // close on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (cartRef.current && !cartRef.current.contains(e.target as Node)) {
                setIsCartOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    if (!isCartOpen) return null;

    return (
        <div
            ref={cartRef}
            className="absolute right-0 mt-3 w-80 bg-white border rounded-lg shadow-lg z-50"
        >
            <div className="p-4 border-b flex justify-between items-center">
                <h3 className="text-sm font-semibold text-[#333]">Cart Summary</h3>
                <button onClick={() => setIsCartOpen(false)}>
                    <X className="w-5 h-5 text-gray-600 hover:text-red-500" />
                </button>
            </div>

            {cart.length === 0 ? (
                <div className="p-4 text-sm text-gray-500 text-center">
                    Your cart is empty.
                </div>
            ) : (
                <div className="max-h-60 overflow-y-auto">
                    {cart.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between px-4 py-3 border-b hover:bg-gray-50 transition"
                        >
                            <div className="flex items-center space-x-3">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-12 h-12 rounded object-cover"
                                />
                                <div>
                                    <h4 className="text-sm font-medium text-gray-800">{item.title}</h4>
                                    <p className="text-xs text-gray-500">
                                        {item.category} × {item.quantity}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <p className="text-sm font-semibold text-[#333]">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </p>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-xs text-red-500 hover:underline"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {cart.length > 0 && (
                <div className="p-4 border-t">
                    <div className="flex justify-between text-sm font-semibold text-[#333] mb-3">
                        <span>Total:</span>
                        <span>${getTotalPrice().toFixed(2)}</span>
                    </div>

                    <button className="w-full bg-[#bb8d03fc] text-white text-sm font-bold py-2 rounded hover:bg-[#c59f09] transition">
                        Checkout
                    </button>
                </div>
            )}
        </div>
    );
};
