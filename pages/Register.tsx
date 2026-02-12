import React, { useState } from 'react';
import { UserRole } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface RegisterProps {
  onLogin: (role: UserRole) => void;
  onNavigate: (page: string) => void;
}

const Register: React.FC<RegisterProps> = ({ onLogin, onNavigate }) => {
  const [step, setStep] = useState<'role' | 'form'>('role');
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.SELLER);
  const [loading, setLoading] = useState(false);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setStep('form');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onLogin(selectedRole);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Image/Branding */}
      <div className="hidden lg:flex w-1/2 bg-secondary-900 relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 z-0">
             <img 
               src="https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=1920&auto=format&fit=crop" 
               alt="Recycling" 
               className="w-full h-full object-cover opacity-40"
             />
        </div>
        <div className="relative z-10 p-12 text-white max-w-lg">
           <div className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center text-3xl mb-8">
             <i className="fas fa-leaf text-primary-400"></i>
           </div>
           <h1 className="text-5xl font-bold mb-6 leading-tight">Join the Circular Economy</h1>
           <p className="text-xl text-gray-300">
             Whether you're buying materials for production or selling scrap, EcoTrade provides the tools you need to grow.
           </p>
           
           <div className="mt-12 space-y-4">
              <div className="flex items-center">
                 <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400 mr-4"><i className="fas fa-check"></i></div>
                 <span className="text-gray-300">Verified Marketplace Participants</span>
              </div>
              <div className="flex items-center">
                 <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400 mr-4"><i className="fas fa-check"></i></div>
                 <span className="text-gray-300">Secure Escrow Payments</span>
              </div>
              <div className="flex items-center">
                 <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400 mr-4"><i className="fas fa-check"></i></div>
                 <span className="text-gray-300">Real-time Analytics</span>
              </div>
           </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white overflow-y-auto">
        <AnimatePresence mode="wait">
          {step === 'role' ? (
            <motion.div 
              key="role"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-lg"
            >
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Create an account</h2>
                <p className="mt-2 text-gray-600">Choose your primary goal to get started.</p>
              </div>
              
              <div className="space-y-4">
                <div 
                  onClick={() => handleRoleSelect(UserRole.SELLER)}
                  className="group relative p-6 border-2 border-gray-100 rounded-2xl hover:border-primary-500 cursor-pointer transition-all duration-200 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 text-xl group-hover:bg-green-100 transition-colors">
                           <i className="fas fa-dumpster"></i>
                        </div>
                        <div>
                           <h3 className="font-bold text-gray-900">I want to Sell</h3>
                           <p className="text-sm text-gray-500">List materials, manage inventory, earn money.</p>
                        </div>
                     </div>
                     <i className="fas fa-chevron-right text-gray-300 group-hover:text-primary-500"></i>
                  </div>
                </div>

                <div 
                  onClick={() => handleRoleSelect(UserRole.BUYER)}
                  className="group relative p-6 border-2 border-gray-100 rounded-2xl hover:border-blue-500 cursor-pointer transition-all duration-200 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 text-xl group-hover:bg-blue-100 transition-colors">
                           <i className="fas fa-industry"></i>
                        </div>
                        <div>
                           <h3 className="font-bold text-gray-900">I want to Buy</h3>
                           <p className="text-sm text-gray-500">Source raw materials, bulk orders, secure pay.</p>
                        </div>
                     </div>
                     <i className="fas fa-chevron-right text-gray-300 group-hover:text-blue-500"></i>
                  </div>
                </div>
              </div>

              <div className="mt-10 text-center">
                 <p className="text-sm text-gray-600">
                    Already have an account? <button onClick={() => onNavigate('login')} className="font-bold text-primary-600 hover:text-primary-700">Log in</button>
                 </p>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="form"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md space-y-6"
            >
               <div>
                  <button onClick={() => setStep('role')} className="text-sm text-gray-500 hover:text-gray-900 flex items-center mb-6">
                    <i className="fas fa-arrow-left mr-2"></i> Change Role
                  </button>
                  <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                    {selectedRole === UserRole.SELLER ? 'Seller Registration' : 'Buyer Registration'}
                  </h2>
               </div>

               <form className="space-y-5" onSubmit={handleSubmit}>
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input type="text" required className="mt-1 block w-full px-4 py-3 border border-gray-300 bg-white rounded-xl shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all sm:text-sm" />
                 </div>

                 <div>
                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input type="email" required className="mt-1 block w-full px-4 py-3 border border-gray-300 bg-white rounded-xl shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all sm:text-sm" />
                 </div>

                 <div>
                    <label className="block text-sm font-medium text-gray-700">
                      {selectedRole === UserRole.SELLER ? 'Business Name' : 'Company Name'}
                    </label>
                    <input type="text" required className="mt-1 block w-full px-4 py-3 border border-gray-300 bg-white rounded-xl shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all sm:text-sm" />
                 </div>

                 <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input type="password" required className="mt-1 block w-full px-4 py-3 border border-gray-300 bg-white rounded-xl shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all sm:text-sm" />
                 </div>

                 <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 focus:outline-none transition-all duration-200 mt-6"
                  >
                    {loading ? 'Creating Account...' : 'Complete Registration'}
                  </motion.button>
               </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Register;