import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary-800 text-secondary-50 pt-12 pb-6 border-t border-secondary-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1">
             <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-600 rounded-lg flex items-center justify-center text-white font-bold">
                  <i className="fas fa-recycle text-sm"></i>
                </div>
                <span className="font-bold text-xl tracking-tight text-secondary-50">EcoTrade</span>
              </div>
            <p className="text-secondary-400 text-sm leading-relaxed mb-4">
              Connect with buyers and sellers of recyclable materials in a secure, transparent marketplace.
            </p>
            <div className="flex space-x-4">
              {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                <a key={social} href="#" className="text-secondary-400 hover:text-primary-400 transition-colors duration-200">
                  <i className={`fab fa-${social} text-lg`}></i>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-secondary-50">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'About Us', 'Marketplace', 'Pricing', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-secondary-400 hover:text-primary-400 text-sm transition-colors duration-200">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-secondary-50">Legal</h3>
            <ul className="space-y-2">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Seller Agreement'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-secondary-400 hover:text-primary-400 text-sm transition-colors duration-200">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-secondary-50">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3 text-primary-500"></i>
                <span className="text-secondary-400 text-sm">123 Green Street, Victoria Island,<br />Lagos, Nigeria</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone mr-3 text-primary-500"></i>
                <span className="text-secondary-400 text-sm">+234 800 123 4567</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-3 text-primary-500"></i>
                <span className="text-secondary-400 text-sm">support@ecotrade.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-secondary-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-secondary-500 text-xs">
            &copy; {new Date().getFullYear()} EcoTrade Marketplace. All rights reserved.
          </p>
          <div className="flex space-x-2 mt-4 md:mt-0">
             <i className="fab fa-cc-visa text-secondary-500 text-2xl"></i>
             <i className="fab fa-cc-mastercard text-secondary-500 text-2xl"></i>
             <i className="fab fa-cc-paypal text-secondary-500 text-2xl"></i>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
