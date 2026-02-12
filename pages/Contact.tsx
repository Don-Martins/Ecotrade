import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      alert('Message sent! We will get back to you shortly.');
      setIsSubmitting(false);
      setFormState({ name: '', email: '', message: '' });
    }, 1500);
  };

  const faqs = [
    { q: 'How do verify sellers?', a: 'All sellers must undergo a business verification process including submitting ID and business registration documents.' },
    { q: 'What payment methods are supported?', a: 'We support bank transfers via Paystack, card payments via Stripe, and direct escrow wallet transfers.' },
    { q: 'Is there a commission fee?', a: 'Yes, we charge a small service fee of 2.5% on successful transactions to maintain the platform and ensure security.' }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      className="w-full bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
       <div className="bg-secondary-900 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-4"
          >
            Get in Touch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg"
          >
            Have questions? We're here to help.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <motion.div variants={fadeInUp} initial="hidden" animate="visible">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                 <input 
                   type="text" 
                   required
                   value={formState.name}
                   onChange={e => setFormState({...formState, name: e.target.value})}
                   className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-200 bg-white focus:bg-white"
                   placeholder="John Doe"
                 />
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                 <input 
                   type="email" 
                   required
                   value={formState.email}
                   onChange={e => setFormState({...formState, email: e.target.value})}
                   className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-200 bg-white focus:bg-white"
                   placeholder="john@example.com"
                 />
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                 <textarea 
                   rows={5}
                   required
                   value={formState.message}
                   onChange={e => setFormState({...formState, message: e.target.value})}
                   className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-200 bg-white focus:bg-white"
                   placeholder="How can we help you?"
                 ></textarea>
               </div>
               <motion.button 
                 type="submit"
                 disabled={isSubmitting}
                 whileHover={{ scale: 1.02 }}
                 whileTap={{ scale: 0.98 }}
                 className={`w-full bg-primary-600 text-white font-bold py-4 rounded-lg transition-all duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary-700 hover:shadow-lg'}`}
               >
                 {isSubmitting ? 'Sending...' : 'Send Message'}
               </motion.button>
            </form>
          </motion.div>

          {/* Info & FAQ */}
          <motion.div variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }} className="space-y-12">
             <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
               <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>
               <div className="space-y-6">
                 <div className="flex items-start">
                   <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 flex-shrink-0 mt-1">
                     <i className="fas fa-map-marker-alt"></i>
                   </div>
                   <div className="ml-4">
                     <p className="font-semibold text-gray-900">Our Office</p>
                     <p className="text-gray-600">123 Green Street, Victoria Island,<br />Lagos, Nigeria</p>
                   </div>
                 </div>
                 <div className="flex items-start">
                   <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 flex-shrink-0 mt-1">
                     <i className="fas fa-envelope"></i>
                   </div>
                   <div className="ml-4">
                     <p className="font-semibold text-gray-900">Email Us</p>
                     <p className="text-gray-600">support@ecotrade.com</p>
                   </div>
                 </div>
                 <div className="flex items-start">
                   <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 flex-shrink-0 mt-1">
                     <i className="fas fa-phone-alt"></i>
                   </div>
                   <div className="ml-4">
                     <p className="font-semibold text-gray-900">Call Us</p>
                     <p className="text-gray-600">+234 800 123 4567</p>
                     <p className="text-gray-600">Mon - Fri: 9:00 AM - 6:00 PM</p>
                   </div>
                 </div>
               </div>
             </div>
             
             {/* FAQ */}
             <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
                <div className="space-y-3">
                  {faqs.map((faq, idx) => (
                    <motion.div 
                      key={idx} 
                      className="border border-gray-200 rounded-lg overflow-hidden"
                      initial={false}
                    >
                      <button 
                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                        className="w-full flex justify-between items-center px-4 py-3 bg-white hover:bg-gray-50 transition-colors text-left"
                      >
                         <span className="font-medium text-gray-800">{faq.q}</span>
                         <motion.i 
                            animate={{ rotate: openFaq === idx ? 180 : 0 }}
                            className="fas fa-chevron-down text-gray-400"
                         ></motion.i>
                      </button>
                      <motion.div 
                        initial="collapsed"
                        animate={openFaq === idx ? "open" : "collapsed"}
                        variants={{
                          open: { opacity: 1, height: "auto" },
                          collapsed: { opacity: 0, height: 0 }
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                         <div className="px-4 py-3 bg-gray-50 text-gray-600 text-sm border-t border-gray-200">
                           {faq.a}
                         </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
             </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;