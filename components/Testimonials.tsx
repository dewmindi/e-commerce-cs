import React from 'react'
import { AnimatedTooltip } from './ui/animated-tooltip'
import { Star } from 'lucide-react';

const Testimonials = () => {

      const people = [
    {
      id: 1,
      name: "John Doe",
      designation: "Software Engineer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    },
    {
      id: 2,
      name: "Robert Johnson",
      designation: "Product Manager",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    },
    {
      id: 3,
      name: "Jane Smith",
      designation: "Data Scientist",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    },
    {
      id: 4,
      name: "Emily Davis",
      designation: "UX Designer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    },
    {
      id: 5,
      name: "Tyler Durden",
      designation: "Marketing Coordinator",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    },
    // Add more items as needed
  ];

  return (
<section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">

        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#333333] text-center mb-16">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                company: "Tech Startup",
                text: "CS Graphics Meta transformed our brand identity completely. Their minimalistic approach perfectly captured our vision.",
                rating: 5,
              },
              {
                name: "Michael Chen",
                company: "E-commerce Business",
                text: "The website design exceeded our expectations. Clean, modern, and conversion-focused. Highly recommended!",
                rating: 5,
              },
              {
                name: "Emily Rodriguez",
                company: "Creative Agency",
                text: "Professional, creative, and delivered on time. Their attention to detail is remarkable.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-[#F5F5F5] p-6 rounded-lg">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-[#666666] mb-4 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <p className="font-semibold text-[#333333]">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-[#666666]">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <AnimatedTooltip items={people} />
        </div>
      </section>
  )
}

export default Testimonials
