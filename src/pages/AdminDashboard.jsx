import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar.jsx';
import AdminDashboardContent from '../components/AdminDashboardContent.jsx';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('dashboard');

  useEffect(() => {
    // Check if user is admin
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isAdmin || !isLoggedIn) {
      navigate('/auth');
    }

    // Listen for menu change events
    const handleMenuChange = (event) => {
      setActiveMenu(event.detail);
    };
    window.addEventListener('adminMenuChange', handleMenuChange);
    
    return () => {
      window.removeEventListener('adminMenuChange', handleMenuChange);
    };
  }, [navigate]);

  return (
    <div className="flex h-screen pt-20 bg-background-dark">
      <AdminSidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <AdminDashboardContent activeMenu={activeMenu} />
      </div>
    </div>
  );
};

export default AdminDashboard;

