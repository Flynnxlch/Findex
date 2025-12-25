import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardSidebar from '../components/DashboardSidebar.jsx';
import DashboardContent from '../components/DashboardContent.jsx';
import Profile from '../components/Profile.jsx';
import Settings from '../components/Settings.jsx';
import QuestionTicket from '../components/QuestionTicket.jsx';
import LoginSuccessPopup from '../components/LoginSuccessPopup.jsx';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    // Check if user just logged in
    const justLoggedIn = sessionStorage.getItem('justLoggedIn');
    if (justLoggedIn === 'true') {
      setShowSuccessPopup(true);
      sessionStorage.removeItem('justLoggedIn');
    }

    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/auth');
    }

    // Listen for dashboard menu change event from profile picture
    const handleMenuChange = (event) => {
      setActiveMenu(event.detail);
    };
    window.addEventListener('dashboardMenuChange', handleMenuChange);
    
    return () => {
      window.removeEventListener('dashboardMenuChange', handleMenuChange);
    };
  }, [navigate]);

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <DashboardContent activeMenu="dashboard" />;
      case 'coins':
        return <DashboardContent activeMenu="coins" />;
      case 'profile':
        return <Profile />;
      case 'settings':
        return <Settings />;
      case 'help':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Help & Support</h2>
            <QuestionTicket />
          </div>
        );
      default:
        return <DashboardContent activeMenu="dashboard" />;
    }
  };

  return (
    <div className="flex h-screen pt-20 bg-background-dark">
      <DashboardSidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {renderContent()}
      </div>
      {showSuccessPopup && (
        <LoginSuccessPopup onClose={() => setShowSuccessPopup(false)} />
      )}
    </div>
  );
};

export default Dashboard;

