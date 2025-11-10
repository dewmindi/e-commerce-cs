import { Check, Star } from 'lucide-react'
import React from 'react'

const Achievements = () => {
    return (
        <section className=" mx-auto py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    {/* <h2 className="text-3xl sm:text-4xl font-bold text-[#333333] mb-4">
                        Awards & Achievements
                    </h2> */}
                    <h2 className="flex justify-center items-center text-xl bg-gradient-to-r from-black via-[#bb8d03fc] to-white text-transparent bg-clip-text">
                        Awards & Achievements
                    </h2>
                    <p className="text-lg text-[#666666] max-w-2xl mx-auto">
                        Recognition and certifications that demonstrate our commitment to
                        excellence and professional growth
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-2">
                    {/* Certified Internal Wellbeing Trainer */}
                    <div className="bg-[#F5F5F5] p-8 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group">
                        <div className="flex items-start mb-6">
                            <div className="p-3 bg-[#007BFF]/10 rounded-full mr-4 group-hover:bg-[#007BFF]/20 transition-colors duration-300">
                                <Star className="w-6 h-6 text-[#007BFF]" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold text-[#333333] mb-2 group-hover:text-[#bb8d03fc] transition-colors duration-300">
                                    Awarded Industrial Wellbeing
                                </h3>
                                <p className="text-yellow-600 font-medium mb-3 group-hover:text-[#333333]">Wonder of Wellbeing-Program, 2017</p>
                            </div>
                        </div>
                    </div>
                    {/* Kaizen Circle Project Competition */}
                    <div className="flex bg-[#F5F5F5] p-8 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group">
                        <div className="flex items-start mb-6">
                            <div className="p-3 bg-yellow-100 rounded-full mr-4 group-hover:bg-yellow-200 transition-colors duration-300">
                                <div className="w-6 h-6 flex items-center justify-center">
                                    <span className="text-yellow-600 font-bold text-lg">🏆</span>
                                </div>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold text-[#333333] mb-2 group-hover:text-[#bb8d03fc] transition-colors duration-300">
                                    Kaizen Circle Project Competition
                                </h3>
                                <p className="text-yellow-600 font-medium mb-3 group-hover:text-[#333333]">
                                    First Place, 2017
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="mt-16 pt-12 border-t border-gray-200">
                    <div className="flex justify-center items-center  space-y-8 md:space-y-0 gap-5 ">
                        <img
                            src="/GeminiMeta.png" // Path to your Meta Verified logo
                            alt="Meta Verified Logo"
                            className="h-52 w-52" // Adjusted for typical logo size
                        />
                        <img
                            src="/GeminiSatis.png" // Path to your 100% Satisfaction icon
                            alt="100% Satisfaction Icon"
                            className="h-28 w-h-28" // Adjusted size, slightly larger if it's a circular icon
                        />

                    </div>
                </div> */}
            </div>
        </section>
    );
}

export default Achievements

{/* Achievements Section */ }

