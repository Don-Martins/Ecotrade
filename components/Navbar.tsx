import React, { useState } from 'react';
import { UserRole } from '../types';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  userRole: UserRole;
  onLogin: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, userRole, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', value: 'home' },
    { name: 'About Us', value: 'about' },
    { name: 'Marketplace', value: 'marketplace' },
    { name: 'Contact', value: 'contact' },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button 
              onClick={() => onNavigate('home')}
              className="flex-shrink-0 flex items-center gap-2 cursor-pointer"
            >
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold">
                <i className="fas fa-recycle"></i>
              </div>
              <span className="font-bold text-xl text-gray-800 tracking-tight">EcoTrade</span>
            </button>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.value}
                onClick={() => onNavigate(link.value)}
                className={`${
                  currentPage === link.value
                    ? 'text-primary-600 font-semibold'
                    : 'text-gray-500 hover:text-primary-600'
                } transition-colors duration-200 text-sm font-medium relative group`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary-600 transform origin-left transition-transform duration-200 ${currentPage === link.value ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {userRole === UserRole.GUEST ? (
              <>
                <button
                  onClick={() => onNavigate('login')}
                  className="text-gray-600 hover:text-primary-600 font-medium text-sm transition-colors duration-200"
                >
                  Log In
                </button>
                <button
                  onClick={() => onNavigate('register')}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center"
                >
                  Get Started
                </button>
              </>
            ) : (
              <div className="flex items-center gap-4">
                 <button
                  onClick={() => onNavigate('dashboard')}
                  className="bg-secondary-800 hover:bg-secondary-900 text-white px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-md flex items-center gap-2"
                >
                  <i className="fas fa-columns"></i> Dashboard
                </button>
                <button
                  onClick={onLogout}
                  className="text-gray-500 hover:text-red-600 font-medium text-sm transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none transition-colors duration-200"
            >
              <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-b border-gray-100">
          {navLinks.map((link) => (
            <button
              key={link.value}
              onClick={() => {
                onNavigate(link.value);
                setIsOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-colors duration-200"
            >
              {link.name}
            </button>
          ))}
           {userRole !== UserRole.GUEST && (
             <button
              onClick={() => {
                onNavigate('dashboard');
                setIsOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-primary-600 bg-primary-50 mt-2"
            >
              Dashboard
            </button>
           )}
           {userRole === UserRole.GUEST ? (
            <>
             <button
              onClick={() => {
                onNavigate('login');
                setIsOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 mt-2"
            >
              Log In
            </button>
             <button
              onClick={() => {
                onNavigate('register');
                setIsOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-primary-600 hover:bg-gray-50"
            >
              Register
            </button>
            </>
           ) : (
             <button
              onClick={onLogout}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
           )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;