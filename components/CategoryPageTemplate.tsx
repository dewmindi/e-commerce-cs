
"use client"
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import React, { useState } from 'react';
import { PlusIcon, Check } from 'lucide-react';
import Header from '@/components/Header';
import { AnimatePresence, motion } from 'framer-motion';
import { useInViewAnimation } from '@/utils/inviewAnimation';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"
import { Textarea } from './ui/textarea'
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';
import FooterNew from '@/components/FooterNew';
import { useCart } from '@/app/context/CartContext';
import Link from 'next/link';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@radix-ui/react-accordion';

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

const CategoryPageTemplate: React.FC<CategoryPageTemplateProps> = ({ content }) => {
    const router = useRouter();
    const { ref, sectionVariants, variants } = useInViewAnimation();

    const [isAboutDescriptionExpanded, setIsAboutDescriptionExpanded] = useState(false);
    const aboutDescriptionTruncationLength = 200; // Adjust as needed
    const isAboutDescriptionLong = content.aboutDescription.length > aboutDescriptionTruncationLength;
    const truncatedAboutDescription = isAboutDescriptionLong
        ? content.aboutDescription.substring(0, aboutDescriptionTruncationLength) + '...'
        : content.aboutDescription;

    // State for the "Read More" functionality for the new processDescription
    const [isProcessDescriptionExpanded, setIsProcessDescriptionExpanded] = useState(false);
    const processDescriptionTruncationLength = 300; // Adjust as needed for the process section's initial display
    const isProcessDescriptionLong = content.processDescription && content.processDescription.length > processDescriptionTruncationLength;
    const truncatedProcessDescription = isProcessDescriptionLong
        ? content.processDescription!.substring(0, processDescriptionTruncationLength) + '...'
        : content.processDescription || '';

    // Correctly initialize useCart
    const { addToCart } = useCart();

    // The function you wrote, adjusted to match the `plan` object structure
    const handleAddToCart = (plan: PricingPlan) => {
        // You'll need to clean the price string, e.g., remove '$'
        const price = parseFloat(plan.price.replace(/[^0-9.]/g, ''));

        addToCart({
            id: plan.title, // Use title as a unique ID
            title: plan.title + "-" + content.pageTitle,
            price: price,
            quantity: 1,
            image: '/cs-logo.png', // Or a better image URL if available
            category: content.pageTitle, // Use the current page title as the category
        });
    };

    const [form, setForm] = useState({
        project: content.pageTitle,
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
    return (
        <div className="min-h-screen bg-[#F5F5F5] text-background">
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
                    <section className="bg-gradient-to-r from-[#bb8d03fc] to-[#211f0b] text-background py-6 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                        <div className="absolute inset-0 z-0 opacity-20">
                            <Image
                                src={content.headerImage}
                                alt={`${content.pageTitle} Background`}
                                layout="fill"
                                objectFit="cover"
                                className="scale-105"
                            />
                        </div>
                        <div className="max-w-4xl mx-auto text-center relative z-10">
                            <h2 className="text-4xl sm:text-4xl font-extrabold mb-2 drop-shadow-md">
                                {content.pageTitle}
                            </h2>
                            <p className="text-lg sm:text-xl max-w-2xl mx-auto opacity-90 drop-shadow-sm">
                                {content.headerDescription}
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
                            {content.pricingPlans && content.pricingPlans.length > 0 ? (
                                <>
                                    <h2 className="text-3xl sm:text-4xl  text-background mb-12">
                                        {content.pageTitle} Pricing Plans
                                    </h2>

                                    {/* Use grid layout with equal-height columns */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                                        {content.pricingPlans.map((plan, index) => (
                                            <motion.div
                                                key={index}
                                                className="border border-zinc-700 text-background rounded-lg p-8 shadow-md hover:shadow-xl transition-shadow duration-300  h-full flex flex-col justify-between"
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                                whileHover={{ y: -5 }}
                                            >
                                                <div>
                                                    <h3 className="text-2xl font-bold text-background mb-4">{plan.title}</h3>
                                                    <p className="text-5xl font-extrabold text-[#bb8d03fc] mb-6">{plan.price}</p>
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
                                                                    <PlusIcon className="text-[#e2c363fc] mr-2" size={20} />
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
                                                    Select Plan
                                                </Button>
                                            </motion.div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h2 className="text-3xl sm:text-4xl font-bold text-background mb-12">
                                        Get a Quote for {content.pageTitle}
                                    </h2>
                                    <p className='mb-12 text-[#666666]'>Our pricing is tailored to your project needs. Since design requirements can vary, the final cost will depend on your specific goals and preferences.
                                        Please share your basic details and a short note about your {content.pageTitle} requirements. One of our team members will reach out to discuss further and provide a personalized estimate.</p>
                                    <form onSubmit={onSubmit} className="max-w-xl mx-auto border  p-8 rounded-lg shadow-md space-y-6 text-left" encType="multipart/form-data">
                                        <Input
                                            type="text"
                                            id='name'
                                            placeholder="Your Name"
                                            value={form.name}
                                            onChange={(e) => update("name", e.target.value)}
                                            className="w-full px-3 py-2  bg-[#111111] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#bb8d03fc] focus:border-transparent text-sm"
                                        />
                                        <Input
                                            required
                                            id='email'
                                            type="email"
                                            placeholder="Your Email"
                                            value={form.email}
                                            onChange={(e) => update("email", e.target.value)}
                                            className="w-full px-3 py-2 bg-[#111111] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#bb8d03fc] focus:border-transparent text-sm"
                                        />
                                        <Input
                                            required
                                            id='phone'
                                            type="phone"
                                            placeholder="Contact Number"
                                            value={form.phone}
                                            onChange={(e) => update("phone", e.target.value)}
                                            className="w-full px-3 py-2 bg-[#111111] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#bb8d03fc] focus:border-transparent text-sm"
                                        />
                                        <Textarea
                                            required
                                            id='message'
                                            rows={4}
                                            placeholder={`Project Note(Please briefly describe your ${content.pageTitle} requirements. We'll connect with you soon for details.)`}
                                            value={form.message}
                                            onChange={(e) => update("message", e.target.value)}
                                            className="w-full px-3 py-2 bg-[#111111] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#bb8d03fc] focus:border-transparent resize-none text-sm"
                                        />
                                        {/* ADDED FILE UPLOAD INPUT */}
                                        <div>
                                            {/* <label className="block text-sm font-medium text-[#333333]">Attach Files</label> */}
                                            <input
                                                id='file'
                                                type="file"
                                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                                                className="mt-1 block w-full text-sm text-[#333333]
                                                    file:mr-4 file:py-2 file:px-4
                                                    file:rounded-sm file:border-0
                                                    file:text-sm file:font-semibold
                                                    file:bg-[#bb8d03fc] file:text-background
                                                    hover:file:bg-[#e2c363fc]"
                                            />
                                        </div>
                                        <Button type="submit" className="bg-[#FFC107] hover:bg-[#FFA000] text-[#333333] px-8 py-3 rounded-lg font-bold text-lg shadow-md transition-all duration-300 hover:scale-105">
                                            Submit Request
                                        </Button>
                                    </form>
                                </>
                            )}
                        </div>
                    </section>


                    {/* --- NEW: Optional "Process" Section (with Read More) --- */}
                    {content.processDescription && ( // Only render this section if processDescription exists
                        <section className="bg-black py-16 px-4 sm:px-6 lg:px-8 text-center"> {/* Added text-center for consistency */}
                            <div className="max-w-4xl mx-auto">
                                <h2 className="text-3xl sm:text-4xl font-bold text-background mb-12">
                                    {content.pageTitle} Process {/* Dynamic title */}
                                </h2>
                                <div className="space-y-6">
                                    <p className="text-lg text-[#666666] leading-relaxed mb-4 text-center">
                                        {isProcessDescriptionExpanded ? content.processDescription : truncatedProcessDescription}
                                    </p>
                                    {isProcessDescriptionLong && (
                                        <div className='flex justify-center'>
                                            <button
                                                onClick={() => setIsProcessDescriptionExpanded(!isProcessDescriptionExpanded)}
                                                className="border border-[#FFC107] hover:bg-[#FFC107] hover:text-black py-2 px-2 rounded-md  font-medium focus:outline-none mt-2"
                                            >
                                                {isProcessDescriptionExpanded ? 'Read Less' : 'Read More'}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>
                    )}
                    {/* --- Dynamic Description Section --- */}
                    <section className="bg-black py-10 px-4 sm:px-6 lg:px-8 text-center">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl sm:text-4xl font-bold text-background mb-8">
                                About {content.pageTitle}
                            </h2>
                            <p className="text-lg text-[#666666] leading-relaxed">
                                {content.aboutDescription}
                            </p>
                            <h2 className="text-3xl sm:text-4xl font-bold text-background mt-8 mb-8">What we Offer</h2>
                            <ul className='grid justify-center text-start md:grid-cols-4 sm:grid-cols-1 text-[#666666] gap-2'>
                                {content.benefits.map((text, id) => (
                                    <li key={id}>✅ {text}</li>
                                ))}
                            </ul>
                        </div>
                    </section>



                    {/* --- Projects Grid/Slider for Active Tag --- */}
                    <section className="bg-black py-16 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-6xl mx-auto">
                            <h2 className="text-3xl sm:text-4xl font-bold text-background text-center mb-12">
                                {content.pageTitle} Portfolio
                            </h2>
                            <InfiniteMovingCards
                                items={content.portfolioImages}
                            />
                        </div>
                    </section>

                    {/* --- FAQs Section --- */}
                    <section className="bg-black py-16 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl sm:text-4xl font-bold text-background text-center mb-12">
                                Frequently Asked Questions
                            </h2>
                            <div className="space-y-6">
                                {content.faqs.map((faq, index) => (
                                    <motion.div
                                        key={index}
                                        className="bg-[#F5F5F5] rounded-lg p-6 shadow-sm"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <h3 className="text-xl font-semibold text-[#333333] mb-2">{faq.question}</h3>
                                        <p className="text-[#666666]">{faq.answer}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                </motion.div>
            </AnimatePresence>

            {/* --- Call to Action Section --- */}
            {/* <section className="bg-gradient-to-r from-[#bb8d03fc] to-[#ada661] py-16 px-4 sm:px-6 lg:px-8 text-center text-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4 ">{content.callToActionTitle}</h2>
                    <p className="text-lg mb-8 opacity-90 leading-tight">
                        {content.callToActionDescription}
                    </p>
                    <Link href="/#contact">
                        <Button className="bg-[#FFC107] hover:bg-[#FFA000] text-[#333333] px-10 py-4 rounded-lg font-bold text-lg shadow-xl transition-all duration-300 hover:scale-105">
                            Get a Free Quote Now
                        </Button>
                    </Link>
                </div>
            </section> */}
            <FooterNew />
        </div>
    );
};

export default CategoryPageTemplate;