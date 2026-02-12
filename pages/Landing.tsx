import React from 'react';
import ListingCard from '../components/ListingCard';
import { MOCK_LISTINGS } from '../constants';
import { motion } from 'framer-motion';

interface LandingProps {
  onNavigate: (page: string) => void;
  onViewListing: (id: string) => void;
}

const Landing: React.FC<LandingProps> = ({ onNavigate, onViewListing }) => {
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <motion.div 
      className="w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* High Converting Hero Section */}
      <section className="relative bg-white overflow-hidden pt-16 pb-20 lg:pt-32 lg:pb-28">
        <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 z-0 h-full overflow-hidden">
           <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-green-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/4"></div>
           <div className="absolute bottom-0 left-0 w-[50rem] h-[50rem] bg-blue-50 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/4"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Text Content */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="text-center lg:text-left"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-100 text-green-700 text-xs font-semibold mb-6">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                The #1 Circular Economy Marketplace
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-5xl lg:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-6">
                Turn Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">Waste</span> Into <span className="text-gray-900">Wealth</span>.
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                EcoTrade connects businesses, recyclers, and aggregators in a secure marketplace. Trade plastics, metals, and electronics with transparent pricing and verified partners.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate('register')}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-primary-500/20 transition-all"
                >
                  Start Selling Now
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate('marketplace')}
                  className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg transition-all"
                >
                  Browse Materials
                </motion.button>
              </motion.div>

              <motion.div variants={fadeInUp} className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-gray-400 grayscale opacity-70">
                 <div className="flex -space-x-3 mr-4">
                    {[1, 2, 3, 4].map(i => (
                       <img key={i} className="w-10 h-10 rounded-full border-2 border-white" src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                    ))}
                    <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">+2k</div>
                 </div>
                 <div className="text-sm font-medium text-gray-500">
                    Trusted by <span className="text-gray-900 font-bold">2,000+</span> businesses
                 </div>
              </motion.div>
            </motion.div>

            {/* Hero Image */}
            <motion.div 
               initial={{ opacity: 0, x: 50 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8 }}
               className="relative lg:h-[600px] w-full hidden lg:block"
            >
               <div className="absolute inset-0 bg-gray-200 rounded-3xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500">
                  <img src="https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover" alt="Dashboard Preview" />
                  
                  {/* Floating Card 1 */}
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-10 left-10 bg-white p-4 rounded-xl shadow-lg flex items-center gap-3 z-10"
                  >
                     <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600"><i className="fas fa-check"></i></div>
                     <div>
                        <p className="text-xs text-gray-500">New Sale</p>
                        <p className="font-bold text-gray-900">+ ₦45,000</p>
                     </div>
                  </motion.div>

                  {/* Floating Card 2 */}
                  <motion.div 
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-20 right-10 bg-white p-4 rounded-xl shadow-lg z-10 max-w-xs"
                  >
                     <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded">PET Plastic</span>
                        <span className="text-xs text-gray-400">Just now</span>
                     </div>
                     <p className="font-bold text-gray-800 text-sm">500kg Purchase Request Sent</p>
                  </motion.div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Streamlined process for sustainable trading in 3 simple steps.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {[
              { 
                icon: 'fa-boxes', 
                title: '1. Sellers List Materials', 
                desc: 'Verified sellers post details about their recyclable stock including type, quantity, and price.' 
              },
              { 
                icon: 'fa-paper-plane', 
                title: '2. Buyers Send Requests', 
                desc: 'Buyers browse the marketplace and send purchase requests or negotiate directly.' 
              },
              { 
                icon: 'fa-hand-holding-usd', 
                title: '3. Secure Payment & Pickup', 
                desc: 'Payments are held in escrow until materials are verified and picked up safely.' 
              }
            ].map((step, idx) => (
              <motion.div 
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="group p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 text-center relative z-0"
              >
                <div className="w-20 h-20 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center text-3xl mb-6 mx-auto group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                  <i className={`fas ${step.icon}`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             variants={fadeInUp}
             className="flex justify-between items-end mb-12"
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Listings</h2>
              <p className="text-gray-600">Fresh materials just added to the marketplace</p>
            </div>
            <button 
              onClick={() => onNavigate('marketplace')}
              className="text-primary-600 font-semibold hover:text-primary-700 flex items-center transition-colors group"
            >
              View All <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
            </button>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {MOCK_LISTINGS.slice(0, 4).map((listing) => (
              <motion.div key={listing.id} variants={fadeInUp}>
                <ListingCard 
                  listing={listing} 
                  onClick={onViewListing} 
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose EcoTrade?</h2>
            <p className="text-gray-600">The most trusted platform for industrial recycling.</p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {[
              { title: 'Secure Payments', icon: 'fa-lock', desc: 'Escrow protection for every trade.' },
              { title: 'Verified Sellers', icon: 'fa-user-check', desc: 'Strict ID verification process.' },
              { title: 'Fast Transactions', icon: 'fa-bolt', desc: 'Close deals in hours, not weeks.' },
              { title: 'Sustainable Impact', icon: 'fa-leaf', desc: 'Track your carbon footprint reduction.' },
            ].map((feature, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-primary-100 transition-all duration-300"
              >
                 <div className="w-16 h-16 rounded-full bg-secondary-50 flex items-center justify-center text-secondary-600 text-2xl mb-6">
                    <i className={`fas ${feature.icon}`}></i>
                 </div>
                 <h3 className="font-bold text-lg text-gray-900 mb-3">{feature.title}</h3>
                 <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary-700 relative overflow-hidden">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-primary-600 opacity-50 blur-3xl"
        ></motion.div>
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-primary-500 opacity-50 blur-3xl"
        ></motion.div>
        
        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to maximize your recycling potential?</h2>
            <p className="text-primary-100 text-xl mb-10 max-w-2xl mx-auto">Join thousands of businesses trading sustainably on EcoTrade today. Sign up is free and easy.</p>
            <motion.button 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               onClick={() => onNavigate('register')}
               className="bg-white text-primary-700 hover:bg-gray-100 px-12 py-5 rounded-xl font-bold text-lg shadow-2xl transition-all duration-300"
            >
              Start Selling Today
            </motion.button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Landing;