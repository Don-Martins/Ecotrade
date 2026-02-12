import React from 'react';
import { UserRole } from '../types';

interface SidebarProps {
  role: UserRole;
  activeTab: string;
  onTabChange: (tab: string) => void;
  isOpen: boolean;
  onCloseMobile: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ role, activeTab, onTabChange, isOpen, onCloseMobile }) => {
  const commonLinks = [
    { id: 'overview', label: 'Dashboard', icon: 'fa-chart-pie' },
  ];

  const sellerLinks = [
    { id: 'my-listings', label: 'My Listings', icon: 'fa-boxes' },
    { id: 'create-listing', label: 'Add Listing', icon: 'fa-plus-circle' },
    { id: 'orders', label: 'Orders', icon: 'fa-box-open' },
    { id: 'earnings', label: 'Earnings', icon: 'fa-wallet' },
    { id: 'messages', label: 'Messages', icon: 'fa-comment-dots' },
    { id: 'settings', label: 'Profile Settings', icon: 'fa-cog' },
  ];

  const buyerLinks = [
    { id: 'marketplace', label: 'Marketplace', icon: 'fa-store' },
    { id: 'my-orders', label: 'My Orders', icon: 'fa-shopping-bag' },
    { id: 'saved-items', label: 'Saved Items', icon: 'fa-heart' },
    { id: 'messages', label: 'Messages', icon: 'fa-comment-dots' },
    { id: 'settings', label: 'Profile Settings', icon: 'fa-user-cog' },
  ];

  const adminLinks = [
    { id: 'users', label: 'Users', icon: 'fa-users' },
    { id: 'listings', label: 'Listings', icon: 'fa-list-alt' },
    { id: 'orders', label: 'Orders', icon: 'fa-shopping-basket' },
    { id: 'payments', label: 'Payments', icon: 'fa-credit-card' },
    { id: 'reports', label: 'Reports', icon: 'fa-chart-line' },
    { id: 'settings', label: 'Settings', icon: 'fa-sliders-h' },
  ];

  let links = commonLinks;
  if (role === UserRole.SELLER) links = [commonLinks[0], ...sellerLinks];
  if (role === UserRole.BUYER) links = [commonLinks[0], ...buyerLinks];
  if (role === UserRole.ADMIN) links = [commonLinks[0], ...adminLinks];

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-gray-900 bg-opacity-50 z-20 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onCloseMobile}
      ></div>

      {/* Sidebar Content */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-100 transform transition-transform duration-300 ease-in-out flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
          <div className="h-16 flex items-center px-6 border-b border-gray-100">
             <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold mr-3">
                <i className="fas fa-recycle"></i>
             </div>
             <span className="font-bold text-xl text-gray-800 tracking-tight">EcoTrade</span>
          </div>
          
          <div className="flex-1 overflow-y-auto py-6 px-4">
             <div className="mb-6">
                <p className="text-xs uppercase text-gray-400 font-semibold tracking-wider mb-4 px-2">Menu</p>
                <div className="space-y-1">
                  {links.map(link => (
                    <button
                      key={link.id}
                      onClick={() => {
                        onTabChange(link.id);
                        onCloseMobile();
                      }}
                      className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                        activeTab === link.id 
                          ? 'bg-primary-50 text-primary-700' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <i className={`fas ${link.icon} w-5 text-center mr-3 transition-colors ${activeTab === link.id ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-600'}`}></i>
                      {link.label}
                    </button>
                  ))}
                </div>
             </div>
             
             {/* Dynamic Promo Box */}
             <div className="mt-auto">
               <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-4 text-white shadow-lg">
                  <p className="text-sm font-semibold mb-1">Premium Plan</p>
                  <p className="text-xs text-gray-400 mb-3">Unlock analytics & more.</p>
                  <button className="w-full bg-white text-gray-900 text-xs font-bold py-2 rounded-lg hover:bg-gray-100 transition-colors">
                     Upgrade Now
                  </button>
               </div>
             </div>
          </div>
          
          <div className="p-4 border-t border-gray-100">
             <div className="flex items-center">
                <img 
                   src={`https://ui-avatars.com/api/?name=${role}&background=10b981&color=fff`}
                   alt="User" 
                   className="w-9 h-9 rounded-full border border-gray-200"
                />
                <div className="ml-3">
                   <p className="text-sm font-medium text-gray-700 capitalize">{role}</p>
                   <p className="text-xs text-green-500 flex items-center"><span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span> Online</p>
                </div>
             </div>
          </div>
      </div>
    </>
  );
};

export default Sidebar;