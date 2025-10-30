import { motion} from 'framer-motion'
import { AsteriskIcon } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { ref } from 'process'
import React, { useState } from 'react'
import CustomQuestions from './CustomQuestions'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { useInViewAnimation } from '@/utils/inviewAnimation'

const FrequentlyQuestion = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [submitted, setSubmitted] = useState(false);

    function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
        setForm((f) => ({ ...f, [key]: value }));
    }  

    async function onSubmit(e:React.FormEvent) {
            e.preventDefault();
            
            try {
               const res = await fetch("api/faq",{
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(form)
               }); 
    
               const data = await res.json();
    
               if (data.success) {
                setSubmitted(true);
                setForm({
                    name: "",
                    email: "",
                    message: "",                
                })
               }else{
                alert("Failed to send email:" + data.error);
               }
            } catch (err: any) {
                alert("Sending email error:" + err.message);
            }
        }

  const { ref, inView, variants } = useInViewAnimation();
  return (
<section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 items-stretch">
          {/* FAQ Section */}
          <motion.div
            className="w-full bg-white p-6 rounded-xl shadow-md flex flex-col md:col-span-2"
          >
            <h2 className="flex font-bold text-[#333333] mb-4">
              <AsteriskIcon /> FAQ
            </h2>
            <div className="mb-16">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#333333] text-center">
                  Answer To Your Most Common
                </h2>
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#bb8d03fc] text-center mb-4 leading-tight">
                  Questions
                </h2>
              </div>
              <CustomQuestions />
            </div>
          </motion.div>

          {/* Custom Question Form Section - Now taking 1/3 of the width */}
          <div className="w-full md:col-span-1">
            <motion.div
              ref={ref}
              initial="visible"
              animate={inView ? "visible" : "hidden"}
              variants={variants}
              transition={{ duration: 0.8 }}
              className="bg-white p-6 rounded-xl shadow-md h-full flex flex-col justify-between"
            >
              <div className="md:mt-20">
                <h3 className="text-2xl sm:text-3xl font-bold text-[#333333] text-center mb-2">
                  Got a <span className="text-[#bb8d03fc]">Specific Question?</span>
                </h3>
                <p className="text-[#666666] md:-mb-20 text-center text-sm">
                  Can't find your answer in our FAQs? Drop us a line!
                </p>
              </div>

              <form onSubmit={onSubmit} className="flex-grow flex flex-col justify-center space-y-4">
                <Textarea
                  required
                  id='message'
                  rows={4}
                  placeholder="Type your custom question here..."
                  value={form.message}
                  onChange={(e)=>update("message", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#bb8d03fc] focus:border-transparent resize-none text-sm"
                />
                <Input
                  type="text"
                  id='name'
                  placeholder="Your Name (Optional)"
                  value={form.name}
                  onChange={(e)=>update("name", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#bb8d03fc] focus:border-transparent text-sm"
                />
                <Input
                  required
                  id='email'
                  type="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={(e)=>update("email", e.target.value)}                  
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#bb8d03fc] focus:border-transparent text-sm"
                />
                <div className="flex justify-center mt-4">
                  <Button className="w-full bg-[#bb8d03fc] hover:bg-[#b69941fc] text-white py-2 rounded-lg font-medium transition-all text-sm">
                    Send Question
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
  )
}

export default FrequentlyQuestion
