import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  userRole: UserRole;
  onLogin: () => void;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, onNavigate, userRole, onLogin, onLogout }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar 
        currentPage={currentPage} 
        onNavigate={onNavigate} 
        userRole={userRole}
        onLogin={onLogin}
        onLogout={onLogout}
      />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;