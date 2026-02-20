import React, { useState } from 'react';
import { UserRole } from '../types';
import { motion } from 'framer-motion';

interface LoginProps {
  onLogin: (role: UserRole) => void;
  onNavigate: (page: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      let role = UserRole.SELLER;

      if (email === 'donmartinz@gmail.com' && password === 'donmartinz') {
        role = UserRole.ADMIN;
      } 
      else if (email.includes('admin')) {
        role = UserRole.ADMIN;
      } else if (email.includes('buyer')) {
        role = UserRole.BUYER;
      }

      onLogin(role);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-secondary-900 flex">
      {/* Left Side - Image/Branding */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 relative overflow-hidden items-center justify-center">
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.15 }}
          transition={{ duration: 1.5 }}
          src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1920&auto=format&fit=crop" 
          alt="Recycling" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 p-12 text-white max-w-lg">
           <motion.div 
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.3 }}
             className="w-16 h-16 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center text-3xl mb-8 border border-white/20"
           >
             <i className="fas fa-recycle"></i>
           </motion.div>
           <motion.h1 
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.4 }}
             className="text-5xl font-black mb-6 leading-tight"
           >
             Welcome back to EcoTrade
           </motion.h1>
           <motion.p 
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.5 }}
             className="text-xl text-white/80"
           >
             The world's leading marketplace for industrial recycling. Login to manage your listings and orders.
           </motion.p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-secondary-900">
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-8"
        >
          <div>
            <h2 className="text-3xl font-bold text-secondary-50 tracking-tight">Sign in</h2>
            <p className="mt-2 text-sm text-secondary-400">
              Don't have an account?{' '}
              <button onClick={() => onNavigate('register')} className="font-medium text-primary-400 hover:text-primary-300">
                Create free account
              </button>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-secondary-300">Email address</label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-4 py-3.5 border border-secondary-700 bg-secondary-800 rounded-xl shadow-sm placeholder-secondary-500 text-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all sm:text-sm"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-secondary-300">Password</label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-4 py-3.5 border border-secondary-700 bg-secondary-800 rounded-xl shadow-sm placeholder-secondary-500 text-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all sm:text-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-700 bg-secondary-800 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-secondary-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-primary-400 hover:text-primary-300">
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200"
              >
                {loading ? <i className="fas fa-circle-notch fa-spin"></i> : 'Sign in to Dashboard'}
              </motion.button>
            </div>
          </form>

          <div className="mt-6 p-4 bg-secondary-800 rounded-lg border border-secondary-700">
             <p className="text-xs text-center text-secondary-400">
               <strong>Demo Access:</strong> Admin (donmartinz@gmail.com / donmartinz), or use 'buyer@...' / 'seller@...'.
             </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
