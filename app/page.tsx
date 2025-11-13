"use client"

import { useState, useEffect } from "react"
import { ArrowBigRight } from "lucide-react"

import ChatBotModal from "@/components/ChatBotModal"
import Link from 'next/link';
// import Header from "@/components/Header"
import ContactUs from "@/components/ContactUs"
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards"
import Achievements from "@/components/Achievements"
import FooterNew from "@/components/FooterNew"
import PricingPlan from "@/components/PricingPlan"
import Portfolio from "@/components/Portfolio"
import HeroSection from "@/components/HeroSection"
import FrequentlyQuestion from "@/components/FrequentlyQuestion";
import GoogleReviews from "@/components/GoogleReviews";
import NewHero from "@/components/NewHero";
import { Header } from "@/components/Header";
import { TrustedPartners } from "@/components/TrustedPartners";

import FeaturedProjects from "@/components/FeaturedProjects";

interface CartItem {
  id: string
  title: string
  category: string
  price: number
  image: string
  quantity: number
}

export default function CSGraphicsMetaWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([])

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "services", "portfolio", "pricing", "faq", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

    const addToCart = (project: any) => {
    const cartItem: CartItem = {
      id: project.title.toLowerCase().replace(/\s+/g, "-"),
      title: project.title,
      category: project.category,
      price: project.price,
      image: project.image,
      quantity: 1,
    }

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === cartItem.id)
      if (existingItem) {
        return prevCart.map((item) => (item.id === cartItem.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        return [...prevCart, cartItem]
      }
    })
  }

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    setCart((prevCart) => prevCart.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  return (
    <div className=" bg-black text-[#333333]">
      
      <HeroSection />
      
      {/* Portfolio Showcase Section */}
      <TrustedPartners/>
      <section className=''>
          <InfiniteMovingCards items={[
            {
              image: "/BrandImages/Dark/dark1.png",
              name: "",
              title: ""
            },
            {
              image: "/BrandImages/Dark/dark2.png",
              name: "",
              title: ""
            },
            {
              image: "/BrandImages/Dark/dark3.png",
              name: "",
              title: ""
            },
            {
              image: "/BrandImages/Dark/dark4.png",
              name: "",
              title: ""
            },
            {
              image: "/BrandImages/Dark/dark5.png",
              name: "",
              title: ""
            },
            {
              image: "/BrandImages/Dark/dark6.png",
              name: "",
              title: ""
            },
            {
              image: "/BrandImages/Dark/dark7.png",
              name: "",
              title: ""
            },
          ]} />
        </section>
      <Portfolio />
      <FeaturedProjects/>
      {/* Pricing Section */}
      <PricingPlan />
      {/* <section className='bg-[#333333]'></section> */}
      


      {/* Faq Section */}
      <FrequentlyQuestion/>
      
      <GoogleReviews/>

      {/* ContactUs Section */}
      <ContactUs />

      <Achievements />

      <FooterNew />

      <ChatBotModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}
