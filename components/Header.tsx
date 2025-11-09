"use client"

import * as React from "react"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { Menu, X, ShoppingCart } from "lucide-react"
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import { loadStripe } from '@stripe/stripe-js';

import { useIsMobile } from "@/hooks/use-mobile"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const Header = () => {
    const isMobile = useIsMobile()
    const { cart, getTotalItems, removeFromCart, getTotalPrice } = useCart()
    const [isCartOpen, setIsCartOpen] = useState(false)
    const cartRef = useRef(null)
    const router = useRouter();
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState("home")
    const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
                setIsCartOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleCheckout = async () => {
        if (cart.length === 0) {
            alert('Your cart is empty. Please add items before checking out.');
            return;
        }
        setIsProcessingCheckout(true);
        try {
            const itemsToSend = cart.map(item => ({
                id: item.id,
                name: item.title,
                price: item.price,
                quantity: item.quantity,
            }));
            const res = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cartItems: itemsToSend }),
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || `Error: ${res.status}`);
            }
            const { url } = await res.json();
            if (url) {
                window.location.href = url;
            } else {
                throw new Error("Checkout session URL missing");
            }
        } catch (err: any) {
            console.error('Checkout error:', err.message);
            alert(`Failed to start checkout. ${err.message || 'Please try again.'}`);
        } finally {
            setIsProcessingCheckout(false);
        }
    };

    return (
        <header className="w-full flex justify-center items-center  py-4  fixed top-0 z-50 ">
            <NavigationMenu>
                <NavigationMenuList className="flex space-x-6 bg-black rounded-md">
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="bg-black text-white">Home</NavigationMenuTrigger>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="bg-black text-white">About</NavigationMenuTrigger>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="bg-black text-white">Services</NavigationMenuTrigger>
                        <NavigationMenuContent className="bg-black text-white">

                            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] py-4">
                                <li className="row-span-4">
                                    <NavigationMenuLink asChild>
                                        <a
                                            className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-4 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md md:p-6"
                                            href="/"
                                        >
                                            <div className="mb-2 text-lg font-medium sm:mt-4">Brand Identity / Logo Design</div>
                                            <p className="text-muted-foreground text-sm leading-tight">
                                                Beautifully designed components built with Tailwind CSS.
                                            </p>
                                        </a>
                                    </NavigationMenuLink>
                                </li>

                                <ListItem href="/docs" title="Web Development">
                                    <li>E-commerce Website</li>
                                    <li>Portfolio Website</li>
                                    <li>Business Website</li>
                                    <li>Booking Website</li>
                                </ListItem>
                                <ListItem href="/docs/installation" title="Social Media Service">
                                    <li>Social Media Design</li>
                                    <li>Social Media Managment</li>
                                </ListItem>
                                <ListItem href="/docs/primitives/typography" title="Packaging & Label Design">
                                    <li>Packaging Design</li>
                                    <li>Label Design</li>
                                    <li>Sticker Design</li>
                                </ListItem>
                                <ListItem href="/docs/primitives/typography" title="Leaflet,Flyer & Poster Design">
                                    <li>Leaflets Design</li>
                                    <li>Flyers Design</li>
                                    <li>Poster Design</li>
                                </ListItem>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="bg-black text-white">Portfolio</NavigationMenuTrigger>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="bg-black text-white">Packages</NavigationMenuTrigger>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="bg-black text-white">FAQ</NavigationMenuTrigger>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                            <Link href="/docs" className="text-black">Contact</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
                <div className="border rounded-lg ml-4">
                    <button onClick={() => setIsCartOpen(!isCartOpen)} className="relative p-2">
                        <ShoppingCart className="w-6 h-6 text-white" />
                        {getTotalItems() > 0 && (
                            <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-2">
                                {getTotalItems()}
                            </span>
                        )}
                    </button>
                    {isCartOpen && (
                        <div ref={cartRef} className="absolute right-0 mt-3 w-80 bg-white border rounded-lg shadow-lg z-50">
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
                                        <div key={item.id} className="flex items-center justify-between px-4 py-3 border-b hover:bg-gray-50 transition">
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
                                    <button
                                        onClick={handleCheckout}
                                        className="w-full bg-[#bb8d03fc] text-white text-sm font-bold py-2 rounded hover:bg-[#c59f09] transition"
                                        disabled={isProcessingCheckout || cart.length === 0}
                                    >
                                        {isProcessingCheckout ? 'Processing...' : 'Checkout'}
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </NavigationMenu>



        </header>

    )
}

function ListItem({
    title,
    children,
    href,
    ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <Link href={href}>
                    <div className="text-sm leading-none font-medium">{title}</div>
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
}
export default Header;

