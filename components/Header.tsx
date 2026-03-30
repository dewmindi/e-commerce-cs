"use client"

import * as React from "react"
import { useState, useEffect, useRef } from "react"
import { Menu, X, ShoppingCart, ChevronDown } from "lucide-react"
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";

import { useIsMobile } from "@/hooks/use-mobile"
import { Navbar, NavBody, NavbarLogo, NavItems, MobileNav, MobileNavHeader, MobileNavToggle, MobileNavMenu } from "./ui/resizable-navbar"
import { ServicesDropdown } from "./ServicesDropdown"

const CheckoutForm = ({ onCheckout, onCancel }: { onCheckout: any, onCancel: () => void }) => {
    const [customerName, setCustomerName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [projectNote, setProjectNote] = useState("");

    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-semibold text-gray-800">Checkout Details</h3>
                <button 
                    onClick={onCancel} 
                    className="text-xs text-gray-500 hover:text-red-500 transition-colors px-2 py-1 rounded hover:bg-red-50"
                >
                    Cancel
                </button>
            </div>

            <div className="space-y-3">
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Full Name</label>
                    <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#bb8d03fc] focus:ring-1 focus:ring-[#bb8d03fc] transition-all bg-gray-50 focus:bg-white text-gray-800 placeholder-gray-400"
                        placeholder="John Doe"
                        required
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Email Address</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#bb8d03fc] focus:ring-1 focus:ring-[#bb8d03fc] transition-all bg-gray-50 focus:bg-white text-gray-800 placeholder-gray-400"
                        placeholder="john@example.com"
                        required
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Phone Number</label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#bb8d03fc] focus:ring-1 focus:ring-[#bb8d03fc] transition-all bg-gray-50 focus:bg-white text-gray-800 placeholder-gray-400"
                        placeholder="+61 (xxx) xxx-xxxx"
                        required
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                        Project Note <span className="text-gray-400 font-normal">(Optional)</span>
                    </label>
                    <textarea
                        value={projectNote}
                        onChange={(e) => setProjectNote(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#bb8d03fc] focus:ring-1 focus:ring-[#bb8d03fc] transition-all bg-gray-50 focus:bg-white text-gray-800 placeholder-gray-400 resize-none"
                        placeholder="Any specific instructions..."
                        rows={3}
                    />
                </div>
            </div>

            <button
                onClick={() =>
                    onCheckout({
                        customerName,
                        email,
                        phone,
                        projectNote,
                    })
                }
                className="w-full mt-5 bg-[#bb8d03fc] text-white font-medium py-2.5 rounded-lg hover:bg-[#a67c03] active:scale-[0.98] transition-all shadow-sm hover:shadow-md text-sm"
            >
                Proceed to Payment
            </button>
        </div>
    );
};


const Header = () => {
    const isMobile = useIsMobile()
    const { cart, getTotalItems, removeFromCart, getTotalPrice } = useCart()
    const [isCartOpen, setIsCartOpen] = useState(false)
    const cartRef = useRef<HTMLDivElement>(null)
    const mobilecartRef = useRef<HTMLDivElement>(null)
    const router = useRouter();
    const pathname = usePathname();
    const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);
    const [showCheckoutForm, setShowCheckoutForm] = useState(false);

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


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;

            if (isMobile) {
                if (mobilecartRef.current && !mobilecartRef.current.contains(target)) {
                    setIsCartOpen(false);
                }
            } else {
                if (cartRef.current && !cartRef.current.contains(target)) {
                    setIsCartOpen(false);
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isMobile]);



    const handleCheckout = async ({
        customerName,
        email,
        phone,
        projectNote,
    }: {
        customerName: string;
        email: string;
        phone: string;
        projectNote: string;
    }) => {

        if (!customerName || !email || !phone) {
            alert("Please fill in required contact details.");
            return;
        }

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
                body: JSON.stringify({ cartItems: itemsToSend, customerName, email, phone, projectNote }),
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
        { name: "Home", section: "" },
        { name: "About", link: "/about" },
        { name: "Blog", link: "/blog" },

        { customComponent: <ServicesDropdown /> },

        { name: "Portfolio", section: "portfolio" },
        { name: "Pricing", section: "packages" },
        { name: "FAQ", section: "faq" },
        { name: "Contact", section: "contact" },
        { name: "Get Quote", link: "/quotation" },
    ];




    const handleNavClick = (item: any) => {
        if (item.link) {
            router.push(item.link);
            return;
        }

        const sectionId = item.section;

        // If clicking Home
        if (!sectionId) {
            router.push("/");
            return;
        }

        if (pathname === "/") {
            // Already on homepage → scroll
            const el = document.getElementById(sectionId);
            if (el) el.scrollIntoView({ behavior: "smooth" });
        } else {
            // Not on homepage → navigate to homepage with hash
            router.push(`/#${sectionId}`);
        }
    };

    return (
        <Navbar className="top-0 fixed bg-black">
            {/* DESKTOP NAV */}
            <NavBody>
                <NavbarLogo />

                <NavItems
                    items={navItems}
                    className="gap-2"
                    onItemClick={(item) => handleNavClick(item)}
                />


                {/* Example button */}
                <div className=" border text-white rounded-md">
                    <button onClick={() => setIsCartOpen(!isCartOpen)} className="relative p-2">
                        <ShoppingCart className="w-6 h-6 text-white" />
                        {getTotalItems() > 0 && (
                            <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-2">
                                {getTotalItems()}
                            </span>
                        )}
                    </button>
                    {/* Desktop */}
                    {!isMobile && isCartOpen && (
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

                                    {!showCheckoutForm ? (
                                        <button
                                            onClick={() => setShowCheckoutForm(true)}
                                            className="w-full bg-[#bb8d03fc] text-white text-sm font-bold py-2 rounded hover:bg-[#c59f09]"
                                        >
                                            Checkout
                                        </button>
                                    ) : (
                                        <CheckoutForm onCheckout={handleCheckout} onCancel={() => setShowCheckoutForm(false)} />
                                    )}
                                </div>
                            )}

                        </div>
                    )}
                </div>
            </NavBody>

            {/* MOBILE NAV */}
            <MobileNav>
                <MobileNavHeader>
                    <NavbarLogo />
                    <div className="flex items-center gap-2">
                        <div className=" border border-black text-white rounded-md">
                            <button onClick={() => setIsCartOpen(!isCartOpen)} className="relative p-2">
                                <ShoppingCart className="w-6 h-6 text-white" />
                                {getTotalItems() > 0 && (
                                    <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-2">
                                        {getTotalItems()}
                                    </span>
                                )}
                            </button>
                            {/* Mobile */}
                            {isMobile && isCartOpen && (
                                <div ref={mobilecartRef} className="absolute right-0 mt-3 w-80 bg-white border rounded-lg shadow-lg z-50">
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

                                            {!showCheckoutForm ? (
                                                <button
                                                    onClick={() => setShowCheckoutForm(true)}
                                                    className="w-full bg-[#bb8d03fc] text-white text-sm font-bold py-2 rounded hover:bg-[#c59f09]"
                                                >
                                                    Checkout
                                                </button>
                                            ) : (
                                                <CheckoutForm onCheckout={handleCheckout} onCancel={() => setShowCheckoutForm(false)} />
                                            )}
                                        </div>
                                    )}

                                </div>
                            )}

                        </div>
                        <MobileNavToggle
                            isOpen={isOpen}
                            onClick={() => setIsOpen(!isOpen)}
                        />
                    </div>

                </MobileNavHeader>
                <MobileNavMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
                    {/* Home */}
                    <button
                        onClick={() => {
                            setIsOpen(false)
                            router.push("/")
                        }}
                        className="py-2 text-left w-full"
                    >
                        Home
                    </button>

                    {/* About */}
                    <button
                        onClick={() => {
                            setIsOpen(false)
                            router.push("/about")
                        }}
                        className="py-2 text-left w-full"
                    >
                        About
                    </button>

                    {/* Blog */}
                    <button
                        onClick={() => {
                            setIsOpen(false)
                            router.push("/blog")
                        }}
                        className="py-2 text-left w-full"
                    >
                        Blog
                    </button>

                    {/* Services section */}
                    <button
                        onClick={() => {
                            setIsOpen(false)
                            scrollToSection("services")
                        }}
                        className="py-2 text-left w-full"
                    >
                        Services
                    </button>
                    {/* Portfolio section */}
                    <button
                        onClick={() => {
                            setIsOpen(false)
                            scrollToSection("portfolio")
                        }}
                        className="py-2 text-left w-full"
                    >
                        Portfolio
                    </button>
                    {/* Pricing section */}
                    <button
                        onClick={() => {
                            setIsOpen(false)
                            scrollToSection("packages")
                        }}
                        className="py-2 text-left w-full"
                    >
                        Pricing
                    </button>
                    {/* FAQ section */}
                    <button
                        onClick={() => {
                            setIsOpen(false)
                            scrollToSection("faq")
                        }}
                        className="py-2 text-left w-full"
                    >
                        FAQ
                    </button>
                    {/* Contact section */}
                    <button
                        onClick={() => {
                            setIsOpen(false)
                            scrollToSection("contact")
                        }}
                        className="py-2 text-left w-full"
                    >
                        Contact
                    </button>
                    {/* Quotation Page */}
                    <button
                        onClick={() => {
                            setIsOpen(false)
                            router.push("/quotation")
                        }}
                        className="py-2 text-left w-full"
                    >
                        Get Quote
                    </button>
                </MobileNavMenu>

            </MobileNav>
        </Navbar>

    )
}
export default Header;
