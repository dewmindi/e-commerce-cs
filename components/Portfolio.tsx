"use client"
import React, { useState } from 'react'
import ProjectCard from './ProjectCard'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { projectsData } from '@/app/data/portfolioData'


const Portfolio = () => {

    const [isLoaded, setIsLoaded] = useState(false)
    const [ref, inView] = useInView({
        triggerOnce: false,
        threshold: 0.4,
    });

    const [ref1, inView1] = useInView({
        triggerOnce: false,
        threshold: 0.2,
    });


    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };

    const projects = projectsData;
    return (
        <section id="services" className="py-20 px-4 sm:px-6 lg:px-8">
            <motion.div
                ref={ref1}
                animate={inView1 ? "visible" : "hidden"}
                variants={variants}
                transition={{ duration: 0.7 }}
                className="max-w-7xl mx-auto"
            >
                <div className="text-center mb-4">
                    <h2 className="text-2xl md:text-4xl mb-4 text-[#bb8d03fc]"
                    >
                        Logo Design & Web Development Services We Offer
                    </h2>
                    <p className="text-white text-center max-w-7xl mx-auto">
                        A great brand starts with a memorable logo. Our expert graphic designers in Melbourne craft unique, professional logos
                        that capture your business's essence. Whether you need a brand new logo design, business cards, packaging, or marketing
                        materials, we provide unlimited revisions until you are 100% satisfied.
                    </p>

                </div>
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Row 1 */}
                    <div className="grid sm:grid-cols-1 md:grid-cols-6 gap-6">
                        <div className="sm:col-span-1 md:col-span-4 h-[250px]">
                            {projects[0] && <ProjectCard project={projects[0]} />}
                        </div>
                        <div className="sm:col-span-1 md:col-span-2 h-[250px]">
                            {projects[1] && <ProjectCard project={projects[1]} />}
                        </div>
                    </div>
                    {/* Row 2 */}
                    <div className="grid sm:grid-cols-1 md:grid-cols-6 gap-6">
                        <div className="sm:col-span-1 md:col-span-2 h-[250px]">
                            {projects[2] && <ProjectCard project={projects[2]} />}
                        </div>
                        <div className="sm:col-span-1 md:col-span-2 h-[250px]">
                            {projects[3] && <ProjectCard project={projects[3]} />}
                        </div>
                        <div className="sm:col-span-1 md:col-span-2 h-[250px]">
                            {projects[5] && <ProjectCard project={projects[4]} />}
                        </div>
                    </div>
                </div>
            </motion.div>
            <p className="text-white text-center max-w-7xl mx-auto mt-4">
                        Your website is your 24/7 storefront. We offer custom web design services tailored to your specific industry.
                        From affordable basic websites for tradies and local services to comprehensive e-commerce platforms, our web design
                        team in Hallam builds fast, mobile-friendly, and SEO-optimized websites that convert visitors into paying clients.
                    </p>
        </section>


    )
}

export default Portfolio
