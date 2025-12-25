import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { NotificationProvider } from './components/NotificationProvider.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Market from './pages/Market.jsx';
import Help from './pages/Help.jsx';
import Auth from './pages/Auth.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';

const AppContent = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/auth';
  const isDashboardPage = location.pathname === '/dashboard';
  const isAdminDashboardPage = location.pathname === '/admin/dashboard';

  return (
    <div className="bg-background-dark text-slate-100 min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/market" element={<Market />} />
        <Route path="/help" element={<Help />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
      {!isAuthPage && !isDashboardPage && !isAdminDashboardPage && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <NotificationProvider>
      <Router>
        <AppContent />
      </Router>
    </NotificationProvider>
  );
};

export default App;


