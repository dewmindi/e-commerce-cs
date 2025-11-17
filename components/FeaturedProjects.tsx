import React from 'react'
import { BackgroundGradient } from './ui/background-gradient'
import Link from 'next/link'
import Image from 'next/image'


const FeaturedProjects = () => {

    const recentProjects = [
        {
            img: "/crystalx-ui-meta.webp",
            tittle: "Crystalx Auto Detailing",
            desc: "Modern, SEO Optimized & mobile responsive website for an Australian based cleaning service.",
            link: "https://crystalxauto.com.au/",
        },
        {
            img: "/best-mortgage.webp",
            tittle: "Best Mortgage & Financial",
            desc: "Modern, SEO Optimized & mobile responsive website for an Australian based cleaning service.",
            link: "https://crystalxauto.com.au/",
        },
        {
            img: "/Eco-spark-ui-meta.webp",
            tittle: "Eco Spark Cleaning",
            desc: "Modern, SEO Optimized & mobile responsive website for an Australian based cleaning service.",
            link: "https://crystalxauto.com.au/",
        },
        {
            img: "/ak-pressure-ui.webp",
            tittle: "AK Pressure Washing",
            desc: "Modern, SEO Optimized & mobile responsive website for an Australian based cleaning service.",
            link: "https://crystalxauto.com.au/",
        },                        
    ]

    return (
        <div id='portfolio' className='max-w-7xl mx-auto flex flex-col py-20'>
            <h1 className="text-2xl md:text-4xl text-center  bg-gradient-to-r from-black via-[#bb8d03fc] to-white text-transparent bg-clip-text"
            >
                Recent Projects
            </h1>
            <div className='sm:grid md:flex justify-center gap-10 px-8 md:px-0 mt-10 '>
                {recentProjects.map((project, index)=>(
                <div key={index} className={`${index !== 0 ? "mt-4 md:mt-0" : ""}`}>
                    <BackgroundGradient className="rounded-[22px] max-w-sm p-2  bg-black">
                        <Image
                            src={project.img}
                            alt={project.tittle}
                            width={264}
                            height={141}
                            className="w-full object-contain rounded-[22px] border border-zinc-800"
                            loading="lazy"
                            quality={80}
                        />
                        <p className="text-base px-2 sm:text-xl text-white mt-8 mb-2 dark:text-neutral-200">
                            {project.tittle}
                        </p>

                        <p className="text-sm px-2 text-neutral-600 dark:text-neutral-400">
                            {project.desc}
                        </p>
                        <Link href="https://crystalxauto.com.au/" passHref target="_blank">
                            <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs border border-zinc-800">
                                <span>Web Development</span>
                                <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
                                    View
                                </span>
                            </button>
                        </Link>
                    </BackgroundGradient>
                </div>
                ))}
            </div>
            <div className="max-w-7xl mx-auto mt-10">
                <Link href="/projects">
                    <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs  leading-6  text-white inline-block">
                        <span className="absolute inset-0 overflow-hidden rounded-full">
                            <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        </span>
                        <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-1 px-4 ring-1 ring-white/10 ">
                            <span>
                                View All Projects
                            </span>
                            <svg fill="none" height="16" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg" >
                                <path d="M10.75 8.75L14.25 12L10.75 15.25" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                            </svg>
                        </div>
                        <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default FeaturedProjects


