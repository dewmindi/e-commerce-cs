
"use client"
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { PlusIcon, Check } from 'lucide-react';
import Header from '@/components/Header';
import { AnimatePresence, motion } from 'framer-motion';
import { useInViewAnimation } from '@/utils/inviewAnimation';
import { Button } from '@/components/ui/button';
import FooterNew from '@/components/FooterNew';
import { useCart } from '@/app/context/CartContext';
import Link from 'next/link';


// Define the types for your data structures to ensure type safety
interface Benefit {
    text: string;
}

interface PricingPlanFeature {
    text: string;
    type: 'feature' | 'disfeature' | 'exfeature'; // To differentiate between included, excluded, and extra
}

interface PricingPlan {
    title: string;
    price: string;
    features: PricingPlanFeature[];
}

interface FAQ {
    question: string;
    answer: string;
}

interface ProjectImage {
    image: string;
    name: string;
    title: string;
}

interface CategoryPageContent {
    pageTitle: string;
    headerDescription: string;
    headerImage: string;
    aboutDescription: string;
    benefits: string[]; // Simple array of strings for now
    pricingPlans?: PricingPlan[];
    portfolioImages: ProjectImage[];
    faqs: FAQ[];
    callToActionTitle: string;
    callToActionDescription: string;
    processDescription: string;
}

interface CategoryPageTemplateProps {
    content: CategoryPageContent;
}

const SocialMediaManagement = () => {
    const router = useRouter();
    const { ref, sectionVariants, variants } = useInViewAnimation();
    const pathname = usePathname();

    const scrollToSection = (sectionId: string, href?: string) => {

        if (pathname === "/") {
            const element = document.getElementById(sectionId)
            if (element) {
                element.scrollIntoView({ behavior: "smooth" })
            }
        } else {
            router.push(`#${sectionId}`)
        }
    }
    // Correctly initialize useCart
    const { addToCart } = useCart();

    const [form, setForm] = useState({
        project: "",
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [file, setFile] = useState<File | null>(null);

    const [submitted, setSubmitted] = useState(false);

    function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
        setForm((f) => ({ ...f, [key]: value }));
    }

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {

            const formData = new FormData();
            Object.entries(form).forEach(([key, value]) => {
                formData.append(key, value);
            });
            if (file) {
                formData.append("file", file);
            }
            const res = await fetch("api/quotation", {
                method: "POST",
                body: formData
            });

            const data = await res.json();
            console.log(data);

            if (data.success) {
                setSubmitted(true);
                setForm({
                    project: content.pageTitle,
                    name: "",
                    email: "",
                    phone: "",
                    message: "",
                });
                setFile(null);
            } else {
                alert("Failed to send email:" + data.error);
            }
        } catch (err: any) {
            alert("Sending email error:" + err.message);
        }
    }

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("en-AU", {
            style: "currency",
            currency: "AUD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    const pricingPlans = [
        {
            title: 'BASIC',
            price: '550',
            features: [
                { text: '12 posts per month', type: 'feature' },
                { text: 'Content writing for every post', type: 'feature' },
                { text: 'Hashtag and keyword research', type: 'feature' },
                { text: 'Full management of Facebook, Instagram & TikTok pages', type: 'feature' },
                { text: 'Post uploading every 2 days (up to 12 posts/month)', type: 'feature' },
                { text: 'Monitoring and general page management', type: 'feature' },
            ],
        },
        {
            title: 'PREMIUM',
            price: '770',
            features: [
                { text: 'All features in the Basic Package', type: 'feature' },
                { text: '20 premium posts per month', type: 'feature' },
                { text: 'Advanced hashtag & keyword strategy', type: 'feature' },
                { text: 'Priority scheduling and page monitoring', type: 'feature' },
                { text: 'Monthly insights report (optional to remove/add)', type: 'feature' },
                { text: 'Enhanced content writing and copy optimization', type: 'feature' },
            ],
        },
    ]
    // The function you wrote, adjusted to match the `plan` object structure
    const handleAddToCart = (plan: typeof pricingPlans[0]) => {
        // You'll need to clean the price string, e.g., remove '$'
        const price = parseFloat(plan.price.replace(/[^0-9.]/g, ''));

        addToCart({
            id: plan.title, // Use title as a unique ID
            title: plan.title + "-" + "Social Media Management",
            price: price,
            quantity: 1,
            image: '/cs-logo.png', // Or a better image URL if available
            category: "Social Media Management", // Use the current page title as the category
        });
    };
    const benefits = ["Builds brand credibility and professionalism", "Strengthens your brand identity", "Works as a long-term marketing asset", "Shows organization, clarity, and business maturity"]

    return (
        <div className="min-h-screen bg-[#F5F5F5] text-white">
            <Header />
            <div className="py-6 inset-0 bg-pattern-dots opacity-10"></div>
            <AnimatePresence mode="wait">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={sectionVariants}
                    className=""
                >
                    {/* --- Header Section --- */}
                    <section className="bg-gradient-to-r from-[#bb8d03fc] to-[#211f0b] text-white py-6 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                        <div className="absolute inset-0 z-0 opacity-20">
                            {/* <Image
                                src={content.headerImage}
                                alt={`${content.pageTitle} Background`}
                                layout="fill"
                                objectFit="cover"
                                className="scale-105"
                            /> */}
                        </div>
                        <div className="max-w-4xl mx-auto text-center relative z-10">
                            <h2 className="text-4xl sm:text-4xl font-extrabold mb-2 drop-shadow-md">
                                Social Media Management
                            </h2>
                            <p className="text-lg sm:text-xl max-w-2xl mx-auto opacity-90 drop-shadow-sm">
                                Grow Your Brand with Professional Social Media Management
                            </p>
                            <Button
                                onClick={() => router.push('/projects')}
                                className="mt-3 bg-[#FFC107] hover:bg-[#FFA000] text-[#333333] px-8 py-3 rounded-lg font-bold text-lg shadow-md transition-all duration-300 hover:scale-105"
                            >
                                &larr; View All Categories
                            </Button>
                        </div>
                    </section>
                    <section className="bg-black py-16 px-4 sm:px-6 lg:px-8 ">
                        <div className="max-w-6xl mx-auto text-center">

                            <h2 className="text-2xl md:text-4xl bg-gradient-to-r text-white text-transparent bg-clip-text mb-12">
                                Pricing Plans
                            </h2>

                            {/* Use grid layout with equal-height columns */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 items-stretch">
                                {pricingPlans.map((plan, index) => (
                                    <motion.div
                                        key={index}
                                        className="bg-black border border-zinc-700 text-white rounded-xl p-8 w-[400px] mx-auto hover:shadow-xl transition-shadow duration-300  h-full flex flex-col justify-between"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1, duration: 0.5 }}
                                        whileHover={{ y: -5 }}
                                    >
                                        <div>
                                            <h3 className="text-2xl font-bold text-white mb-4">{plan.title}</h3>
                                            <p className="text-5xl font-extrabold text-[#e2c363fc] mb-6">A{formatCurrency(plan.price)}<span className='text-sm'>/per month</span></p>
                                            <ul className="text-left text-gray-300 mb-8 space-y-2">
                                                {plan.features.map((feature, idx) => (
                                                    <li
                                                        key={idx}
                                                        className={`flex items-center ${feature.type === 'disfeature' ? 'text-gray-500 line-through' : ''}`}
                                                    >
                                                        {feature.type === 'feature' && (
                                                            <Check className="w-5 h-5 mr-3 flex-shrink-0 text-[#e2c363fc]" />
                                                        )}
                                                        {feature.type === 'disfeature' && (
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#7f7e7dfc] mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                            </svg>
                                                        )}
                                                        {feature.type === 'exfeature' && (
                                                            <PlusIcon className="text-[#bb8d03fc] mr-2" size={20} />
                                                        )}
                                                        {feature.text}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <Button
                                            // ADDED onClick handler here
                                            onClick={() => handleAddToCart(plan)}
                                            className="bg-black border border-[#FFC107] text-background hover:bg-[#FFC107] hover:text-black px-8 py-3 rounded-lg  text-lg shadow-md transition-all duration-300 hover:scale-105 mt-auto">
                                            Get Started
                                        </Button>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* --- NEW: Optional "Process" Section (with Read More) --- */}

                    <section className="bg-black py-16 px-4 sm:px-6 lg:px-8 text-center">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl sm:text-4xl  text-white mb-8">
                                Our Social Media Management Process
                            </h2>
                            <p className="text-lg text-[#666666] leading-relaxed mb-4 text-justify">
                                Our social media management process is built to deliver consistent brand growth and meaningful engagement. We start by understanding your business goals,
                                then create a custom content strategy with targeted keywords, hashtags, and design direction. Every post is planned, written, designed,
                                and scheduled with precision. We monitor performance, optimize continuously, and ensure your brand maintains a strong, professional presence across all platforms.
                            </p>
                            {/* <h2 className="text-3xl sm:text-4xl font-bold text-white mt-8 mb-8">What we Offer</h2>
                            <ul className='grid justify-center text-start md:grid-cols-4 sm:grid-cols-1 text-[#666666] gap-2'>
                                {content.benefits.map((text, id) => (
                                    <li key={id}>✅ {text}</li>
                                ))}
                            </ul> */}
                        </div>
                    </section>

                    <section className="bg-black py-10 px-4 sm:px-6 lg:px-8 text-center"> {/* Added text-center for consistency */}
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl sm:text-4xl  text-white mb-12">
                                Why Your Business Needs Social Media Management?
                            </h2>
                            <div className="space-y-6">
                                <p className="text-lg text-[#666666] leading-relaxed mb-4 text-justify">
                                    Effective social media management helps your business stay visible, relevant, and competitive. With millions of daily users across Facebook, 
                                    Instagram, TikTok, and YouTube, consistent posting and high-quality content are essential for building trust and attracting customers. Professional 
                                    management ensures your brand maintains a clean, active presence with optimized content, timely uploads, and a strategy designed for growth. It saves you 
                                    time while maximizing your reach, engagement, and overall online credibility.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* --- Dynamic Description Section --- */}


                </motion.div>
            </AnimatePresence>

            {/* --- Call to Action Section --- */}
            <section className="bg-gradient-to-r from-[#bb8d03fc] to-[#ada661] py-16 px-4 sm:px-6 lg:px-8 text-center text-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4 ">Get Your Profile Designed Today</h2>
                    <p className="text-lg mb-8 opacity-90 leading-tight">
                        Transform your brand image with a polished, professional company profile.
                    </p>
                    <Link href="/#contact">
                        <Button className="bg-[#FFC107] hover:bg-[#FFA000] text-[#333333] px-10 py-4 rounded-lg font-bold text-lg shadow-xl transition-all duration-300 hover:scale-105">
                            Get a Free Quote Now
                        </Button>
                    </Link>
                </div>
            </section>
            <FooterNew />
        </div>
    );
};

export default SocialMediaManagement;