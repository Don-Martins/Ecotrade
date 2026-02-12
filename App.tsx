import React, { useState } from 'react';
import Landing from './pages/Landing';
import About from './pages/About';
import Contact from './pages/Contact';
import Marketplace from './pages/Marketplace';
import ListingDetails from './pages/ListingDetails';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './components/Layout';
import { UserRole } from './types';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [userRole, setUserRole] = useState<UserRole>(UserRole.GUEST);
  const [selectedListingId, setSelectedListingId] = useState<string | null>(null);

  const navigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (role: UserRole = UserRole.SELLER) => {
    setUserRole(role);
    navigate('dashboard');
  };

  const handleLogout = () => {
    setUserRole(UserRole.GUEST);
    navigate('home');
  };

  const handleViewListing = (id: string) => {
    setSelectedListingId(id);
    navigate('listing-details');
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return <Landing key="home" onNavigate={navigate} onViewListing={handleViewListing} />;
      case 'about':
        return <About key="about" onNavigate={navigate} />;
      case 'contact':
        return <Contact key="contact" />;
      case 'marketplace':
        return <Marketplace key="marketplace" onViewListing={handleViewListing} />;
      case 'listing-details':
        if (selectedListingId) {
          return <ListingDetails key="details" listingId={selectedListingId} onBack={() => navigate('marketplace')} />;
        }
        return <Marketplace key="marketplace" onViewListing={handleViewListing} />;
      case 'login':
        return <Login key="login" onLogin={handleLogin} onNavigate={navigate} />;
      case 'register':
        return <Register key="register" onLogin={handleLogin} onNavigate={navigate} />;
      default:
        return <Landing key="home" onNavigate={navigate} onViewListing={handleViewListing} />;
    }
  };

  // Render Dashboard without public layout (except sidebar)
  if (currentPage === 'dashboard' && userRole !== UserRole.GUEST) {
    return (
      <AnimatePresence mode="wait">
        <Dashboard key="dashboard" initialRole={userRole} onLogout={handleLogout} />
      </AnimatePresence>
    );
  }

  return (
    <Layout 
      currentPage={currentPage} 
      onNavigate={navigate} 
      userRole={userRole}
      onLogin={() => navigate('login')}
      onLogout={handleLogout}
    >
      <AnimatePresence mode="wait">
        {renderContent()}
      </AnimatePresence>
    </Layout>
  );
}

export default App;