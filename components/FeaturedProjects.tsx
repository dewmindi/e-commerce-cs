import React from 'react'
import { BackgroundGradient } from './ui/background-gradient'
import Link from 'next/link'


const FeaturedProjects = () => {
    return (
        <div className='max-w-7xl mx-auto flex flex-col gap-10 py-20'>
            <h1 className="text-2xl md:text-4xl text-center  bg-gradient-to-r from-black via-[#bb8d03fc] to-white text-transparent bg-clip-text"
            >
                Recent Projects
            </h1>
            <div className='sm:grid md:flex justify-center gap-10'>
                <div >
                    <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
                        <img
                            src={`/web-ui-design1.jpg`}
                            alt="jordans"
                            height="400"
                            width="400"
                            className="object-contain"
                        />
                        <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
                            Eco Spark Cleaning 
                        </p>

                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            Modern,SEO Optimized & mobile responsive website for a australian based cleaning service.
                        </p>
                         <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs  dark:bg-zinc-800">
                            <span>Web Development</span>
                            <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
                                View
                            </span>
                        </button>
                    </BackgroundGradient>
                </div>
                <div >
                    <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
                        <img
                            src={`/web-ui-design2.jpg`}
                            alt="jordans"
                            height="400"
                            width="400"
                            className="object-contain"
                        />
                        <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
                            Primes Cleaning 
                        </p>

                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            Modern,SEO Optimized & mobile responsive website for a australian based cleaning service.
                        </p>
                        <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs dark:bg-zinc-800">
                            <span>Web Development</span>
                            <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
                                View
                            </span>
                        </button>
                    </BackgroundGradient>
                </div>
                <div >
                    <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
                        <img
                            src={`/web-ui-design4.jpeg`}
                            alt="jordans"
                            height="400"
                            width="400"
                            className="object-contain"
                        />
                        <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
                            Elegance Stone 
                        </p>

                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            Modern,SEO Optimized & mobile responsive website for a australian based cleaning service.
                        </p>
                        <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs dark:bg-zinc-800">
                            <span>Brand Identity </span>
                            <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
                                View
                            </span>
                        </button>
                    </BackgroundGradient>
                </div>
                <div >
                    <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
                        <img
                            src={`/web-ui-design5.jpeg`}
                            alt="jordans"
                            height="400"
                            width="400"
                            className="object-contain"
                        />
                        <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
                            Zgiri Robotics
                        </p>

                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            Modern,SEO Optimized & mobile responsive website for a australian based cleaning service.
                        </p>
                        <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs dark:bg-zinc-800">
                            <span>Web Development</span>
                            <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
                                View
                            </span>
                        </button>
                    </BackgroundGradient>
                </div>
            </div>
            <div className="max-w-7xl mx-auto mt-10">
                <Link href="/">
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


