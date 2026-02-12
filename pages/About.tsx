import React from 'react';
import { motion } from 'framer-motion';

interface AboutProps {
  onNavigate?: (page: string) => void;
}

const About: React.FC<AboutProps> = ({ onNavigate }) => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  return (
    <motion.div 
      className="w-full bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Page Header Banner */}
      <div className="relative py-32 bg-gray-900 overflow-hidden">
         <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            src="https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=1920&auto=format&fit=crop" 
            className="absolute inset-0 w-full h-full object-cover opacity-30" 
            alt="Background" 
         />
         <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
         <div className="relative max-w-7xl mx-auto px-4 text-center">
            <motion.nav 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center mb-4 text-sm font-medium text-gray-400 space-x-2"
            >
               <span>Home</span>
               <span>/</span>
               <span className="text-white">About Us</span>
            </motion.nav>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              About EcoTrade
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-300 max-w-2xl mx-auto"
            >
              Organizing the world's recyclables and empowering sustainability through technology.
            </motion.p>
         </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <motion.div 
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="order-2 md:order-1 space-y-6"
          >
            <span className="text-primary-600 font-bold uppercase tracking-wider text-sm">Our Mission</span>
            <h2 className="text-3xl font-bold text-gray-900">Bridging the Gap</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              EcoTrade was founded to bridge the gap between waste generators and recycling industries. 
              In many developing regions, valuable recyclable materials end up in landfills due to a fragmented supply chain.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              We provide a digital infrastructure that brings transparency, fair pricing, and efficiency to the recycling ecosystem.
            </p>
          </motion.div>
          <motion.div 
             variants={slideInRight}
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             className="order-1 md:order-2"
          >
             <img src="https://images.unsplash.com/photo-1530587191325-3db32d826c18?q=80&w=800&auto=format&fit=crop" className="rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300" alt="Plastic sorting" />
          </motion.div>
        </div>

        {/* Vision Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
             variants={slideInLeft}
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
          >
             <img src="https://images.unsplash.com/photo-1472289065668-ce650ac443d2?q=80&w=800&auto=format&fit=crop" className="rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300" alt="Vision" />
          </motion.div>
          <motion.div 
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <span className="text-primary-600 font-bold uppercase tracking-wider text-sm">Our Vision</span>
            <h2 className="text-3xl font-bold text-gray-900">A Zero-Waste Future</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              We envision a world where waste is viewed as a resource. By creating a circular economy, we aim to eliminate waste 
              pollution while creating economic opportunities for millions of collectors and businesses globally.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Detailed Platform Process - Enhanced */}
      <div className="bg-gray-50 py-32">
        <div className="max-w-7xl mx-auto px-4">
           <motion.div 
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             variants={fadeInUp}
             className="text-center mb-20"
           >
             <h2 className="text-4xl font-extrabold text-gray-900 mb-4">How The Platform Works</h2>
             <p className="text-gray-600 text-lg max-w-2xl mx-auto">A seamless end-to-end experience designed for transparency and ease of use.</p>
           </motion.div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
             {[
               { step: '01', title: 'Register Account', desc: 'Sign up and verify your business identity to ensure a safe trading environment.' },
               { step: '02', title: 'Connect & List', desc: 'Sellers list stock with photos and specs; Buyers browse and send purchase requests.' },
               { step: '03', title: 'Negotiate Deal', desc: 'Agree on price, quantity, and logistics terms directly through our secure messaging.' },
               { step: '04', title: 'Secure Transact', desc: 'Payments are held in escrow and released only when goods are verified and delivered.' }
             ].map((item, i) => (
               <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative p-10 bg-white rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full min-h-[350px]"
               >
                  <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 font-bold text-xl mb-8">
                     {item.step}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-500 leading-relaxed flex-grow">{item.desc}</p>
                  
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-50 to-white rounded-bl-full -z-10 opacity-50"></div>
               </motion.div>
             ))}
           </div>
        </div>
      </div>

      {/* Statistics / Impact */}
      <div className="bg-primary-600 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-primary-500">
            {[
              { label: 'Active Businesses', val: '500+' },
              { label: 'Tons Recycled', val: '10k+' },
              { label: 'Traded Volume', val: '₦200M' }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-4"
              >
                 <div className="text-5xl font-bold mb-2">{stat.val}</div>
                 <div className="text-primary-200">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-24 bg-white text-center">
         <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto px-4"
         >
           <h2 className="text-3xl font-bold text-gray-900 mb-6">Join the Circular Economy</h2>
           <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
             Whether you're looking to buy sustainable materials or sell your scrap, EcoTrade is the platform for you.
           </p>
           <motion.button 
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             onClick={() => onNavigate && onNavigate('register')}
             className="bg-secondary-900 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-black transition-colors shadow-lg"
           >
             Get Started Now
           </motion.button>
         </motion.div>
      </section>
    </motion.div>
  );
};

export default About;