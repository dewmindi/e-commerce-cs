"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Youtube,
} from "lucide-react"


const Footer = () => {
 const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isChatOpen, setIsChatOpen] = useState(false);

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
    const navItems = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "portfolio", label: "Portfolio" },
    { id: "pricing", label: "Packages" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
  ]
  return (
<footer className="py-12 px-4 sm:px-6 lg:px-8 bg-[#333333] text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold mb-4">CS Graphics Meta</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Transforming ideas into visual masterpieces with minimalistic design and maximum impact.
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-[#bb8d03fc]" />
                  <span className="text-gray-300">hello@csgraphicsmeta.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-[#bb8d03fc]" />
                  <span className="text-gray-300">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-[#bb8d03fc]" />
                  <span className="text-gray-300">New York, NY 10001</span>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Navigation</h4>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="text-gray-300 hover:text-[#bb8d03fc] transition-colors"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Media */}
            <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-gray-700 rounded-full hover:bg-[#bb8d03fc] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-700 rounded-full hover:bg-[#bb8d03fc] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-700 rounded-full hover:bg-[#bb8d03fc] transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>

              <a href="#" className="p-2 bg-gray-700 rounded-full hover:bg-[#bb8d03fc] transition-colors">
                <Youtube className="w-5 h-5" />
              </a>

            </div>
          </div>
        </div>

          <div className="border-t border-gray-600 pt-8 text-center">
            <p className="text-gray-300">© {new Date().getFullYear()} CS Graphics Meta. All rights reserved.</p>
            <p className="text-gray-300 font-mono "> <span className="text-xs ">Developed By | Dewmindi</span><span>™</span> </p>
          </div>
        </div>
      </footer>
  )
}

export default Footer


