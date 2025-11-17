"use client"
import { useState} from "react"
import ChatBotModal from "@/components/ChatBotModal"
import ContactUs from "@/components/ContactUs"
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards"
import Achievements from "@/components/Achievements"
import FooterNew from "@/components/FooterNew"
import PricingPlan from "@/components/PricingPlan"
import Portfolio from "@/components/Portfolio"
import HeroSection from "@/components/HeroSection"
import FrequentlyQuestion from "@/components/FrequentlyQuestion";
import GoogleReviews from "@/components/GoogleReviews";
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
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([])

  const [isLoaded, setIsLoaded] = useState(false)


  return (
    <div className=" bg-black text-[#333333]">
      
    
      <HeroSection />

      {/* Portfolio Showcase Section */}
      <TrustedPartners />
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
      <FeaturedProjects />
      {/* Pricing Section */}
      <PricingPlan />
      {/* <section className='bg-[#333333]'></section> */}



      {/* Faq Section */}
      <FrequentlyQuestion />

      <GoogleReviews />

      {/* ContactUs Section */}
      <ContactUs />

      <Achievements />

      <FooterNew />

      <ChatBotModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}
