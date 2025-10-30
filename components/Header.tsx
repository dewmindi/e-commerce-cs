"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X, ShoppingCart } from "lucide-react"
import Link from 'next/link';
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import { loadStripe } from '@stripe/stripe-js';
import { projectsData } from "@/app/data/portfolioData";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Header = () => {
    const { cart, getTotalItems, removeFromCart, getTotalPrice } = useCart()
    const [isCartOpen, setIsCartOpen] = useState(false)
    const cartRef = useRef(null)
    const router = useRouter();
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState("home")
    const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);

    // State variables for dropdown visibility
    const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
    const [openCategory, setOpenCategory] = useState<string | null>(null);

    const whatsappNumber = "+61 405 455 273";
    const whatsappLink = `https://wa.me/${whatsappNumber.replace(/ /g, '')}`;

    useEffect(() => {
        if (pathname === '/') {
            const handleScroll = () => {
                const sections = ["home", "about", "services", "portfolio", "pricing", "faq", "contact"]
                const scrollPosition = window.scrollY + 100
                let currentActive = "home";
                for (const section of sections) {
                    const element = document.getElementById(section)
                    if (element) {
                        const offsetTop = element.offsetTop
                        const offsetHeight = element.offsetHeight
                        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                            currentActive = section;
                            break
                        }
                    }
                }
                setActiveSection(currentActive);
            }
            window.addEventListener("scroll", handleScroll)
            return () => window.removeEventListener("scroll", handleScroll)
        } else {
            if (pathname.startsWith('/projects')) {
                setActiveSection('portfolio');
            } else if (pathname === '/about') {
                setActiveSection('about');
            } else {
                setActiveSection('');
            }
        }
    }, [pathname]);

    const scrollToSection = (sectionId: string, href?: string) => {
        setIsMenuOpen(false);
        if (href) {
            router.push(href);
            return;
        }
        if (pathname === '/') {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            router.push(`/#${sectionId}`);
        }
    };

    const navItems = [
        { id: "home", label: "Home" },
        { id: "about", label: "About Us", type: "link", href: "/about" },
        { id: "services", label: "Services" },
        { id: "portfolio", label: "Portfolio" },
        { id: "pricing", label: "Packages" },
        { id: "faq", label: "FAQ" },
        { id: "contact", label: "Contact" },
    ]

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
        <div className="mb-4">
            <nav className="fixed top-0 left-0 right-0 bg-black/70 backdrop-blur-sm z-50">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link href="/" passHref>
                            <div className="cursor-pointer">
                                <img
                                    src="/cs-logo.png"
                                    alt="CS Graphics Meta Logo"
                                    className="h-40"
                                />
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex space-x-4 items-center gap-x-4">
                            {navItems.map((item) =>
                                item.id === "services" ? (
                                    <div
                                        key={item.id}
                                        className="relative"
                                        onMouseEnter={() => setIsServicesDropdownOpen(true)}
                                        onMouseLeave={() => {
                                            setIsServicesDropdownOpen(false);
                                            setOpenCategory(null);
                                        }}
                                    >
                                        <button
                                            className={`ml-1 text-sm font-medium transition-colors hover:text-[#d6b85cfc] ${activeSection === item.id ? "text-[#bb8d03fc]" : "text-white"}`}
                                        >
                                            {item.label} ▾
                                        </button>

                                        {/* Services Dropdown */}
                                        {isServicesDropdownOpen && (
                                            <ul className="absolute left-0 -mt-1 bg-[#4c4c4c] text-gray-50 rounded shadow-lg min-w-[220px] z-50 text-sm">
                                                {projectsData.map((project) => (
                                                    <li
                                                        key={project.id}
                                                        className="relative"
                                                        onMouseEnter={() => setOpenCategory(project.category)}
                                                        onMouseLeave={() => setOpenCategory(null)}
                                                    >
                                                        <Link
                                                            href={project.tags[0]?.mainPagePath || "#"}
                                                            className="flex justify-between items-center px-4 py-2 hover:bg-[#bb8d03fc] whitespace-nowrap transition-colors"
                                                        >
                                                            {project.category} <span className="ml-2">▸</span>
                                                        </Link>

                                                        {/* Sub-dropdown */}
                                                        {openCategory === project.category && (
                                                            <ul className="absolute left-full top-0 mt-0 bg-[#4c4c4c] text-white rounded shadow-lg min-w-[200px] z-50">
                                                                {project.tags.map((tag, idx) => (
                                                                    <li key={idx}>
                                                                        <Link
                                                                            href={tag.path || tag.mainPagePath || "#"}
                                                                            className="block px-4 py-2 hover:bg-[#bb8d03fc] whitespace-nowrap transition-colors"
                                                                        >
                                                                            {tag.name}
                                                                        </Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ) : (
                                    <button
                                        key={item.id}
                                        onClick={() => scrollToSection(item.id, item.href)}
                                        className={`ml-1 text-sm font-medium transition-colors hover:text-[#d6b85cfc] ${activeSection === item.id ? "text-[#bb8d03fc]" : "text-white"}`}
                                    >
                                        {item.label}
                                    </button>
                                )
                            )}
                            <button
                                onClick={() => scrollToSection("contact")}
                                className="border border-[#bb8d03fc] hover:opacity-90 text-white text-sm  px-4 py-2 rounded-sm shadow-sm transition whitespace-nowrap mr-1"
                            >
                                Get Quote
                            </button>
                            <a
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="border border-[#bb8d03fc] hover:opacity-90 hover:animate-none text-white text-sm  px-3 py-2 rounded-sm shadow-sm transition flex items-center whitespace-nowrap animate-pulse duration-800"
                            >
                                <span className="align-middle"><img src="https://img.icons8.com/?size=100&id=BkugfgmBwtEI&format=png&color=000000" width={20} className="mr-2"></img></span>
                                {whatsappNumber}
                            </a>
                        </div>

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
                        {/* Mobile Menu Button */}
                        <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>

                    {/* Mobile Navigation */}
                    {isMenuOpen && (
                        <div className="md:hidden grid justify-center py-4 border-t border-gray-100 gap-2 ">
                            {navItems.map((item) =>
                                item.id === "services" ? (
                                    <div
                                        key={item.id}
                                        className=""
                                        onMouseEnter={() => setIsServicesDropdownOpen(true)}
                                        onMouseLeave={() => {
                                            setIsServicesDropdownOpen(false);
                                            setOpenCategory(null);
                                        }}
                                    >
                                        <button
                                            className={`ml-1 text-sm font-medium transition-colors hover:text-[#d6b85cfc] ${activeSection === item.id ? "text-[#bb8d03fc]" : "text-white"}`}
                                        >
                                            {item.label} ▾
                                        </button>

                                        {/* Services Dropdown */}
                                        {isServicesDropdownOpen && (
                                            <ul className="absolute left-0 -mt-1 bg-[#4c4c4c] text-gray-50 rounded shadow-lg min-w-[220px] z-50 text-sm">
                                                {projectsData.map((project) => (
                                                    <li
                                                        key={project.id}
                                                        className="relative"
                                                        onMouseEnter={() => setOpenCategory(project.category)}
                                                        onMouseLeave={() => setOpenCategory(null)}
                                                    >
                                                        <Link
                                                            href={project.tags[0]?.mainPagePath || "#"}
                                                            className="flex justify-between items-center px-4 py-2 hover:bg-[#bb8d03fc] whitespace-nowrap transition-colors"
                                                        >
                                                            {project.category} <span className="ml-2">▸</span>
                                                        </Link>

                                                        {/* Sub-dropdown */}
                                                        {openCategory === project.category && (
                                                            <ul className="pr-4 absolute left-full top-0 mt-0 bg-[#4c4c4c] text-white rounded shadow-lg min-w-[200px] z-50">
                                                                {project.tags.map((tag, idx) => (
                                                                    <li key={idx}>
                                                                        <Link
                                                                            href={tag.path || tag.mainPagePath || "#"}
                                                                            className="block px-4 py-2 hover:bg-[#bb8d03fc] whitespace-nowrap transition-colors"
                                                                        >
                                                                            {tag.name}
                                                                        </Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ) : (
                                    <button
                                        key={item.id}
                                        onClick={() => scrollToSection(item.id, item.href)}
                                        className={`ml-1 text-sm font-medium transition-colors hover:text-[#d6b85cfc] ${activeSection === item.id ? "text-[#bb8d03fc]" : "text-white"}`}
                                    >
                                        {item.label}
                                    </button>
                                )
                            )}
                        </div>
                    )}
                </div>
            </nav>
        </div>
    )
}

export default Header