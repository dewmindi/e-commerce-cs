import React from 'react'
import { BackgroundGradient } from './ui/background-gradient'
import Link from 'next/link'


const FeaturedProjects = () => {
    return (
        <div id='portfolio' className='max-w-7xl mx-auto flex flex-col py-20'>
            <h1 className="text-2xl md:text-4xl text-center  bg-gradient-to-r from-black via-[#bb8d03fc] to-white text-transparent bg-clip-text"
            >
                Recent Projects
            </h1>
            <div className='sm:grid md:flex justify-center gap-10 px-8 md:px-0 mt-10 '>
                <div>
                    <BackgroundGradient className="rounded-[22px] max-w-sm p-2  bg-black">
                        <img
                            src={`/crystalx-ui-meta.png`}
                            alt="jordans"
                            height="400"
                            width="400"
                            className="object-contain rounded-[22px] border border-zinc-800"
                        />
                        <p className="text-base px-2 sm:text-xl text-white mt-8 mb-2 dark:text-neutral-200">
                            Crystalx Auto Detailing
                        </p>

                        <p className="text-sm px-2 text-neutral-600 dark:text-neutral-400">
                            Modern,SEO Optimized & mobile responsive website for a australian based cleaning service.
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
                <div className='mt-4 md:mt-0'>
                    <BackgroundGradient className="rounded-[22px] max-w-sm p-2  bg-black">
                        <img
                            src={`/best-mortgage.png`}
                            alt="jordans"
                            height="400"
                            width="400"
                            className="object-contain rounded-[22px] border-zinc-800"
                        />
                        <p className="text-base px-2 sm:text-xl text-white mt-8 mb-2 dark:text-neutral-200">
                            Best Mortgage & Financial
                        </p>

                        <p className="text-sm px-2 text-neutral-600 dark:text-neutral-400">
                            Modern,SEO Optimized & mobile responsive website for a australian based cleaning service.
                        </p>
                        <Link href="https://bmafs.com.au/" passHref target="_blank">
                            <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs border border-zinc-800">
                                <span>Web Development</span>
                                <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
                                    View
                                </span>
                            </button>
                        </Link>
                    </BackgroundGradient>
                </div>
                <div className='mt-4 md:mt-0'>
                    <BackgroundGradient className="rounded-[22px] max-w-sm p-2  bg-black">
                        <img
                            src={`/Eco-spark-ui-meta.png`}
                            alt="jordans"
                            height="400"
                            width="400"
                            className="object-contain rounded-[22px] border-zinc-800"
                        />
                        <p className="text-base px-2 sm:text-xl text-white mt-8 mb-2 dark:text-neutral-200">
                            Eco Spark Cleaning
                        </p>

                        <p className="text-sm px-2 text-neutral-600 dark:text-neutral-400">
                            Modern,SEO Optimized & mobile responsive website for a australian based cleaning service.
                        </p>
                        <Link href="https://ecosparkcco.com.au/" passHref target="_blank">
                            <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs border border-zinc-800">
                                <span>Web Development</span>
                                <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
                                    View
                                </span>
                            </button>
                        </Link>
                    </BackgroundGradient>
                </div>
                <div className='mt-4 md:mt-0'>
                    <BackgroundGradient className="rounded-[22px] max-w-sm p-2  bg-black">
                        <img
                            src={`/ak-pressure-ui.png`}
                            alt="jordans"
                            height="400"
                            width="400"
                            className="object-contain rounded-[22px] border-zinc-800"
                        />
                        <p className="text-base px-2 sm:text-xl text-white mt-8 mb-2 dark:text-neutral-200">
                            AK Pressure Washing
                        </p>

                        <p className="text-sm px-2 text-neutral-600 dark:text-neutral-400">
                            Modern,SEO Optimized & mobile responsive website for a australian based cleaning service.
                        </p>
                        <Link href="https://akpressurewashing.com.au/" passHref target="_blank">
                            <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs border border-zinc-800">
                                <span>Web Development</span>
                                <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
                                    View
                                </span>
                            </button>
                        </Link>
                    </BackgroundGradient>
                </div>
            </div>
            <div className="max-w-7xl mx-auto mt-10">
                <Link href="/web-development">
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


