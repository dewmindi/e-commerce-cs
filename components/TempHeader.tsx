"use client"

import * as React from "react"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { Menu, X, ShoppingCart, ChevronDown } from "lucide-react"
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import { loadStripe } from '@stripe/stripe-js';

import { useIsMobile } from "@/hooks/use-mobile"

import { Navbar, NavBody, NavbarLogo, NavItems, MobileNav, MobileNavHeader, MobileNavToggle, MobileNavMenu } from "./ui/resizable-navbar"
import { ServicesDropdown } from "./ServicesDropdown"

const TempHeader = () => {
    const isMobile = useIsMobile()
    const { cart, getTotalItems, removeFromCart, getTotalPrice } = useCart()
    const [isCartOpen, setIsCartOpen] = useState(false)
    const cartRef = useRef(null)
    const router = useRouter();
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState("home")
    const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);

    // --- Smooth scroll to section ---
    // Smooth scroll function
    const scrollToSection = (sectionId: string, href?: string) => {
        if (href) {
            router.push(href)
            return
        }

        if (pathname === "/") {
            const element = document.getElementById(sectionId)
            if (element) {
                element.scrollIntoView({ behavior: "smooth" })
            }
        } else {
            router.push(`/#${sectionId}`)
        }
    }

    // --- Track active section on scroll ---
    useEffect(() => {
        if (pathname === "/") {
            const handleScroll = () => {
                const sections = ["home", "about", "services", "portfolio", "packages", "faq", "contact"];
                const scrollPosition = window.scrollY + 100;
                let currentActive = "home";
                for (const section of sections) {
                    const element = document.getElementById(section);
                    if (element) {
                        const offsetTop = element.offsetTop;
                        const offsetHeight = element.offsetHeight;
                        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                            currentActive = section;
                            break;
                        }
                    }
                }
                setActiveSection(currentActive);
            };
            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        }
    }, [pathname]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
                setIsCartOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


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

    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { name: "Home", link: "/" },
        { name: "About", link: "/about" },

        {
            customComponent: <ServicesDropdown />   // 👈 dropdown here!
        },
        { name: "Portfolio", link: "#portfolio" },
        { name: "Pricing", link: "#packages" },
        { name: "FAQ", link: "#faq" },
        { name: "Contact", link: "#contact" },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 backdrop-blur-sm z-50">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <Navbar className="top-0 fixed bg-black">
                    {/* DESKTOP NAV */}
                    <NavBody>
                        <NavbarLogo />

                        <NavItems items={navItems} />

                        {/* Example button */}
                        <div className="">
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

                    </NavBody>
                </Navbar>
                                    {/* MOBILE NAV */}
                    <MobileNav>
                        <MobileNavHeader>
                            <NavbarLogo />
                            <div className="flex items-center gap-2">
                                <MobileNavToggle
                                    isOpen={isOpen}
                                    onClick={() => setIsOpen(!isOpen)}
                                />
                            </div>

                        </MobileNavHeader>

                        <MobileNavMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
                            <a href="/" onClick={() => setIsOpen(false)}>Home</a>
                            <a href="/about" onClick={() => setIsOpen(false)}>About</a>
                            <a href="#services" onClick={() => setIsOpen(false)}>Services</a>
                            <a href="#contact" onClick={() => setIsOpen(false)}>Contact</a>
                        </MobileNavMenu>
                    </MobileNav>
            </div>
        </nav>


    )
}
export default TempHeader;