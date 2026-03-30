"use client"
import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShoppingCart, ChevronDown } from "lucide-react"
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import { useCart } from "@/app/context/CartContext"
import { ServicesDropdown } from "./ServicesDropdown"

const CheckoutForm = ({ onCheckout, onCancel }: { onCheckout: any, onCancel: () => void }) => {
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [projectNote, setProjectNote] = useState("");

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300 w-full text-left">
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
          <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wider">Full Name</label>
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
          <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wider">Email Address</label>
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
          <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wider">Phone Number</label>
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
          <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wider">
            Project Note <span className="text-gray-400 font-normal italic">(Optional)</span>
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
        className="w-full mt-5 bg-[#bb8d03fc] text-white font-black py-3 rounded-xl hover:bg-[#a67c03] active:scale-[0.98] transition-all shadow-lg text-sm uppercase tracking-widest"
      >
        Proceed to Payment
      </button>
    </div>
  );
};

const GlobalNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);

  const { cart, getTotalItems, removeFromCart, getTotalPrice } = useCart();
  const cartRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsCartOpen(false);
        setShowCheckoutForm(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const scrollToSection = (sectionId: string, href?: string) => {
    if (href) {
      router.push(href);
      return;
    }

    if (pathname === "/") {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      router.push(`/#${sectionId}`)
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[100] flex justify-center px-4 sm:px-6 lg:px-8 py-6 pointer-events-none">
        <div className="relative w-full max-w-7xl flex items-center justify-between gap-4 pointer-events-auto">
          {/* Logo Glass Card */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/20 backdrop-blur-md border border-white/20 p-2 rounded-2xl shadow-xl flex items-center justify-center shrink-0 cursor-pointer"
            onClick={() => router.push('/')}
          >
            <Image 
              src="/cs-logo.png" 
              alt="CS Graphic Meta" 
              width={200} 
              height={50} 
              className="h-[40px] w-[90px]  object-cover"
            />
          </motion.div>

          {/* Desktop Navbar Glass Card */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 px-8 py-3 rounded-2xl shadow-xl hidden lg:flex items-center justify-center h-[60px]"
          >
            <nav className="flex gap-8 text-white/80 text-sm  tracking-wider items-center">
              <button onClick={() => scrollToSection("home")} className="hover:text-[#bb8d03fc] transition-colors">Home</button>
              <ServicesDropdown />
              <button onClick={() => scrollToSection("packages")} className="hover:text-[#bb8d03fc] transition-colors">Packages</button>
              <button onClick={() => router.push("/about")} className="hover:text-[#bb8d03fc] transition-colors">About</button>
              <button onClick={() => scrollToSection("contact")} className="hover:text-[#bb8d03fc] transition-colors">Contact</button>
              <button onClick={() => router.push("/quotation")} className="bg-[#bb8d03fc] text-black px-4 py-1.5 rounded-lg hover:bg-white transition-all text-xs font-black">Get Quote</button>
            </nav>
          </motion.div>

          {/* Right Actions Glass Card */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-2xl shadow-xl flex items-center relative gap-2 shrink-0 h-[60px]"
            ref={cartRef}
          >
            <button className="text-white hover:text-[#bb8d03fc] transition-colors relative flex items-center justify-center w-10 h-10 group" onClick={() => setIsCartOpen(!isCartOpen)}>
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-[10px]  font-black w-6 h-6 rounded-full flex items-center justify-center border-[#ffffff]">
                  {getTotalItems()}
                </span>
              )}
            </button>

            {isCartOpen && (
              <div className="absolute right-0 top-full mt-4 w-[340px] bg-white border border-gray-200 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-[100] overflow-hidden">
                <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                  <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Cart Summary</h3>
                  <button onClick={() => { setIsCartOpen(false); setShowCheckoutForm(false); }} className="p-1 hover:bg-red-50 rounded-full transition-colors"><X className="w-4 h-4 text-gray-400" /></button>
                </div>
                {cart.length === 0 ? (
                  <div className="p-10 text-center text-sm font-medium text-gray-500">Your cart is empty.</div>
                ) : (
                  <>
                    {!showCheckoutForm ? (
                      <>
                        <div className="max-h-[350px] overflow-y-auto p-2 space-y-2">
                          {cart.map((item) => (
                            <div key={item.id} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50/50 transition-all border border-transparent hover:border-gray-100 group">
                              <img src={item.image} alt={item.title} className="w-16 h-16 rounded-xl object-cover bg-gray-100" />
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-bold text-gray-900 truncate">{item.title}</h4>
                                <p className="text-xs text-gray-500 font-medium">Qty: {item.quantity}</p>
                                <p className="text-sm font-black text-[#bb8d03fc] mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                              </div>
                              <button onClick={() => removeFromCart(item.id)} className="w-8 h-8 rounded-full flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all focus:opacity-100"><X className="w-4 h-4" /></button>
                            </div>
                          ))}
                        </div>
                        <div className="p-5 bg-gray-50/50 border-t border-gray-100">
                          <div className="flex justify-between items-center mb-5">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Subtotal</span>
                            <span className="text-lg font-black text-gray-900">${getTotalPrice().toFixed(2)}</span>
                          </div>
                          <button onClick={() => setShowCheckoutForm(true)} className="w-full bg-black text-white text-xs font-black py-4 rounded-2xl hover:bg-[#bb8d03fc] hover:text-black transition-all shadow-xl uppercase tracking-widest">Checkout Now</button>
                        </div>
                      </>
                    ) : (
                      <div className="p-6 h-full max-h-[500px] overflow-y-auto">
                        <CheckoutForm onCheckout={handleCheckout} onCancel={() => setShowCheckoutForm(false)} />
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white hover:text-[#bb8d03fc] transition-colors z-[110] lg:hidden w-10 h-10 flex items-center justify-center group">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 group-hover:scale-110 transition-transform" />}
            </button>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[105] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <button onClick={() => setIsMenuOpen(false)} className="absolute top-10 right-10 text-white hover:text-[#bb8d03fc] transition-colors"><X className="w-10 h-10" /></button>
            <nav className="flex flex-col gap-6 text-center w-full max-w-md px-6 overflow-y-auto max-h-[80vh]">
              <button onClick={() => { scrollToSection("home"); setIsMenuOpen(false); }} className="text-white text-3xl font-black  tracking-tighter hover:text-[#bb8d03fc]">Home</button>
              <div className="space-y-4">
                <h3 className="text-[#bb8d03fc] text-xl font-black  tracking-widest border-b border-white/10 pb-2">Services</h3>
                <div className="grid grid-cols-1 gap-3">
                  {[{ name: "Logo Design", href: "/logo-design" }, { name: "Web Development", href: "/web-development" }, { name: "Social Media", href: "/social-media" }, { name: "Packages", href: "/#packages" }, { name: "Get Quote", href: "/quotation" }].map((s) => (
                    <button key={s.name} onClick={() => { router.push(s.href); setIsMenuOpen(false); }} className="text-white/70 text-lg font-bold hover:text-white">{s.name}</button>
                  ))}
                </div>
              </div>
              <button onClick={() => { router.push("/about"); setIsMenuOpen(false); }} className="text-white text-3xl font-black uppercase tracking-tighter hover:text-[#bb8d03fc]">About</button>
              <button onClick={() => { scrollToSection("contact"); setIsMenuOpen(false); }} className="text-white text-3xl font-black uppercase tracking-tighter hover:text-[#bb8d03fc]">Contact</button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GlobalNavbar;
