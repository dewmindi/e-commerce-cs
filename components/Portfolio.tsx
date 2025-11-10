import { Link } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './ui/button'
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
        <section id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8">
            <motion.div
                ref={ref1}
                animate={inView1 ? "visible" : "hidden"}
                variants={variants}
                transition={{ duration: 0.7 }}
                className="max-w-7xl mx-auto"
            >
                <div className="text-center mb-16">
                    <h1 className="text-xl   bg-gradient-to-r from-black via-[#bb8d03fc] to-white text-transparent bg-clip-text"
                    >
                        Services We Offer
                    </h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isLoaded ? 0 : 1, y: isLoaded ? 0 : 20 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl text-white/50 max-w-2xl mx-auto leading-tight"
                    >
                        Precision-crafted logos that deliver clarity in a complex
                        marketplace. Turning abstract brand values into concrete visual
                        assets that perform.
                    </motion.p>
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


                    {/* Row 3 */}
                    <div className="grid sm:grid-cols-1 md:grid-cols-6 gap-6">
                        <div className="sm:col-span-1 md:col-span-2 h-[250px]">
                            {projects[5] && <ProjectCard project={projects[5]} />}
                        </div>
                        <div className="sm:col-span-1 md:col-span-4 h-[250px]">
                            {projects[6] && <ProjectCard project={projects[6]} />}
                        </div>
                    </div>

                </div>
            </motion.div>
        </section>


    )
}

export default Portfolio
