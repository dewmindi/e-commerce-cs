
import { useState } from "react"
import { motion, AnimatePresence } from 'framer-motion';
const faqs = [
                {
                question: "How long does a typical project take?",
                answer:
                  "Project timelines vary depending on scope. Logo designs typically take 2-3 days, while complete brand identities can take 1-2 weeks. Website projects usually require 2-4 weeks depending on complexity.",
              },
              {
                question: "Do you provide revisions?",
                answer:
                  "Yes! We include revisions in all our packages. Starter packages include 2 revisions, while Professional and Enterprise packages include unlimited revisions until you're completely satisfied.",
              },
              {
                question: "What file formats do you provide?",
                answer:
                  "We provide all source files including AI, PSD, PNG, JPG, SVG, and PDF formats. You'll receive everything you need for both print and digital use.",
              },
              {
                question: "Can you work with our existing brand guidelines?",
                answer:
                  "Absolutely! We can work within your existing brand guidelines or help you develop new ones. We're flexible and adapt to your specific needs and requirements.",
              },
              {
                question: "Do you offer ongoing support?",
                answer:
                  "Yes, we provide ongoing support for all our clients. Whether you need minor adjustments or additional design work, we're here to help your brand grow.",
              },
];

const CustomQuestions = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    // Variants for the smooth height animation
    const contentVariants = {
        hidden: { opacity: 0, height: 0, marginTop: 0 },
        visible: {
            opacity: 1,
            height: "auto", // Animate to auto height
            marginTop: "8px", // Matches mt-2 (approx)
            transition: {
                duration: 0.3, // Controls the speed of the animation
                ease: "easeInOut"
            }
        },
        exit: {
            opacity: 0,
            height: 0,
            marginTop: 0,
            transition: {
                duration: 0.2, // Slightly faster collapse
                ease: "easeInOut"
            }
        }
    };

    return (
        <div className=" mt-10 space-y-4">
            {faqs.map((faq, idx) => (
                <div
                    key={idx}
                    className="w-full border-b border-gray-200 rounded-lg p-4 bg-white transition-all duration-300 hover:border-[#bb8d03fc] hover:shadow-md"
                >
                    <button
                        onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                        className="w-full text-left font-semibold py-1" // Added py-1 for consistent click area
                    >
                        {faq.question}
                    </button>
                    {/* AnimatePresence allows components to animate when they unmount */}
                    <AnimatePresence>
                        {openIndex === idx && (
                            <motion.p
                                variants={contentVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="text-start text-gray-600" // Removed mt-2 here as it's handled by variants
                            >
                                {faq.answer}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
};

export default CustomQuestions;
