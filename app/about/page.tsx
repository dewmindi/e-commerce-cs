"use client"

import FooterNew from "@/components/FooterNew"
import Header from "@/components/Header"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Target,
  Eye,
  Users,
  Award,
  Lightbulb,
  Heart,
  CheckCircle,
  Star,
  Palette,
  Monitor,
  PenTool,
} from "lucide-react"
import Link from "next/link"

export default function AboutUsPage() {
  return (
    <div id="about" className="min-h-screen bg-foreground ">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-background mb-6 leading-tight">
                About CS Graphics Meta
              </h1>
              <p className="text-xl text-[#666666] mb-8 leading-relaxed">
                We are a passionate team of creative professionals dedicated to transforming ideas into visual
                masterpieces. Our journey began with a simple belief: great design has the power to change the world.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2 border px-4 py-2 rounded-full shadow-sm">
                  <Award className="w-5 h-5 text-[#bb8d03fc]" />
                  <span className="text-sm font-medium text-white">Award Winning</span>
                </div>
                <div className="flex items-center space-x-2 border px-4 py-2 rounded-full shadow-sm">
                  <Users className="w-5 h-5 text-[#bb8d03fc]" />
                  <span className="text-sm font-medium text-white">Expert Team</span>
                </div>
                <div className="flex items-center space-x-2 border px-4 py-2 rounded-full shadow-sm">
                  <Star className="w-5 h-5 text-[#bb8d03fc]" />
                  <span className="text-sm font-medium text-white">5-Star Rated</span>
                </div>
              </div>
            </div>

            {/* Image Placeholder */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d393.00228765297805!2d145.26176955573314!3d-38.000033591793766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad617941d407e2d%3A0x41fa6a629caa06ea!2sCS%20Graphic%20Meta!5e0!3m2!1sen!2slk!4v1758567534999!5m2!1sen!2slk"
                  width="100%"
                  height="100%"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                ></iframe>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#bb8d03fc] text-white p-4 rounded-lg shadow-lg">
                <div className="text-2xl font-bold">15+</div>
                <div className="text-sm">Years Experience</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-background mb-4">Our Vision & Mission</h2>
            <p className="text-lg text-[#666666] max-w-2xl mx-auto">
              Driven by purpose, guided by creativity, and committed to excellence in everything we do.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Vision */}
            <div className="bg-[#F5F5F5] p-8 rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-[#bb8d03fc] rounded-full mr-4">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#333333]">Our Vision</h3>
              </div>
              <p className="text-[#666666] leading-relaxed mb-6">
                To be the leading creative agency that empowers businesses worldwide through innovative design
                solutions. We envision a world where every brand has a unique visual identity that resonates with their
                audience and drives meaningful connections.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-[#666666]">
                  <CheckCircle className="w-4 h-4 text-[#bb8d03fc] mr-3 flex-shrink-0" />
                  Global creative leadership
                </li>
                <li className="flex items-center text-[#666666]">
                  <CheckCircle className="w-4 h-4 text-[#bb8d03fc] mr-3 flex-shrink-0" />
                  Innovation in design thinking
                </li>
                <li className="flex items-center text-[#666666]">
                  <CheckCircle className="w-4 h-4 text-[#bb8d03fc] mr-3 flex-shrink-0" />
                  Meaningful brand connections
                </li>
              </ul>
            </div>

            {/* Mission */}
            <div className="bg-white border-2 border-[#F5F5F5] p-8 rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-[#bb8d03fc] rounded-full mr-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#333333]">Our Mission</h3>
              </div>
              <p className="text-[#666666] leading-relaxed mb-6">
                To deliver exceptional design solutions that transform our clients' visions into reality. We are
                committed to providing personalized service, innovative creativity, and measurable results that help
                businesses grow and succeed in their respective markets.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-[#666666]">
                  <CheckCircle className="w-4 h-4 text-[#bb8d03fc] mr-3 flex-shrink-0" />
                  Exceptional design quality
                </li>
                <li className="flex items-center text-[#666666]">
                  <CheckCircle className="w-4 h-4 text-[#bb8d03fc] mr-3 flex-shrink-0" />
                  Personalized client service
                </li>
                <li className="flex items-center text-[#666666]">
                  <CheckCircle className="w-4 h-4 text-[#bb8d03fc] mr-3 flex-shrink-0" />
                  Measurable business results
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-background mb-4">Our Core Values</h2>
            <p className="text-lg text-[#666666] max-w-2xl mx-auto">
              The principles that guide our work and define our commitment to excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Creativity */}
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group">
              <div className="text-center">
                <div className="p-4 bg-[#007BFF]/10 rounded-full w-16 h-16 mx-auto mb-4 group-hover:bg-[#007BFF]/20 transition-colors duration-300">
                  <Lightbulb className="w-8 h-8 text-[#bb8d03fc] mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-[#333333] mb-3">Creativity</h3>
                <p className="text-[#666666] leading-relaxed">
                  We believe in pushing creative boundaries and thinking outside the box to deliver unique solutions
                  that stand out in the market.
                </p>
              </div>
            </div>

            {/* Quality */}
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group">
              <div className="text-center">
                <div className="p-4 bg-[#007BFF]/10 rounded-full w-16 h-16 mx-auto mb-4 group-hover:bg-[#007BFF]/20 transition-colors duration-300">
                  <Award className="w-8 h-8 text-[#bb8d03fc] mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-[#333333] mb-3">Quality</h3>
                <p className="text-[#666666] leading-relaxed">
                  Excellence is not negotiable. We maintain the highest standards in every project, ensuring exceptional
                  results that exceed expectations.
                </p>
              </div>
            </div>

            {/* Integrity */}
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group">
              <div className="text-center">
                <div className="p-4 bg-[#007BFF]/10 rounded-full w-16 h-16 mx-auto mb-4 group-hover:bg-[#007BFF]/20 transition-colors duration-300">
                  <Heart className="w-8 h-8 text-[#bb8d03fc] mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-[#333333] mb-3">Integrity</h3>
                <p className="text-[#666666] leading-relaxed">
                  Honesty and transparency form the foundation of our relationships. We build trust through reliable
                  communication and ethical practices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Expertise Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-background mb-4">Our Expertise</h2>
            <p className="text-lg text-[#666666] max-w-2xl mx-auto">
              Specialized skills and comprehensive services that drive your business forward.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Palette className="w-8 h-8" />,
                title: "Brand Identity",
                description: "Complete brand development from concept to implementation",
                projects: "150+ Projects",
              },
              {
                icon: <Monitor className="w-8 h-8" />,
                title: "Web Design",
                description: "Modern, responsive websites that convert visitors to customers",
                projects: "200+ Websites",
              },
              {
                icon: <PenTool className="w-8 h-8" />,
                title: "Graphic Design",
                description: "Creative visual solutions for print and digital media",
                projects: "500+ Designs",
              },
              {
                icon: <Lightbulb className="w-8 h-8" />,
                title: "Strategy",
                description: "Creative direction and brand strategy consulting",
                projects: "100+ Strategies",
              },
            ].map((service, index) => (
              <div key={index} className="text-center group">
                <div className="p-6 bg-[#F5F5F5] rounded-lg hover:bg-white hover:shadow-lg transition-all duration-300">
                  <div className="text-[#bb8d03fc] mb-4 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-[#333333] mb-2">{service.title}</h3>
                  <p className="text-[#666666] text-sm mb-3 leading-relaxed">{service.description}</p>
                  <div className="text-[#bb8d03fc] text-sm font-medium">{service.projects}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#bb8d03fc] to-[#ada661]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Transform Your Vision?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let's work together to create something extraordinary that represents your brand and drives your success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#contact">
              <Button className="bg-white text-black font-bold text-lg shadow-xl hover:bg-gray-100 px-8 py-3  hover:scale-105 rounded-lg transition-colors">
                Start Your Project
              </Button>
            </Link>
            <Link href="/#portfolio">
              <Button className="bg-[#FFC107] hover:bg-[#FFA000] font-bold text-lg shadow-xl text-[#333333] px-8 py-3  hover:scale-105 rounded-lg transition-colors">
                View Our Work
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <FooterNew />
    </div>
  )
}
