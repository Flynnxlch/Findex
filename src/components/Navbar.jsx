import { CandlestickChart, LayoutDashboard, LogIn, Play } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import DashboardButton from './DashboardButton.jsx';
import ProfilePicture from './ProfilePicture.jsx';

const Navbar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const admin = localStorage.getItem('isAdmin') === 'true';
      setIsLoggedIn(loggedIn);
      setIsAdmin(admin);
    };

    checkLoginStatus();
    
    // Listen for custom login status change event
    const handleLoginStatusChange = () => {
      checkLoginStatus();
    };
    
    window.addEventListener('loginStatusChanged', handleLoginStatusChange);
    window.addEventListener('storage', handleLoginStatusChange);
    
    return () => {
      window.removeEventListener('loginStatusChanged', handleLoginStatusChange);
      window.removeEventListener('storage', handleLoginStatusChange);
    };
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-border-dark/60 bg-background-dark/80 backdrop-blur-xl">
      <div className="w-full h-20 flex items-center justify-between relative px-2">
        {/* Left: logo */}
        <Link to="/" className="flex items-center gap-3 flex-[0_0_auto]">
          <div className="size-8 rounded-full bg-primary/15 flex items-center justify-center text-primary">
            <CandlestickChart className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-6 h-6 text-primary"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <rect x="4" y="3" width="4" height="18" rx="1.5" className="fill-current opacity-70" />
              <rect x="10" y="6" width="4" height="12" rx="1.5" className="fill-current" />
              <rect x="16" y="4" width="4" height="16" rx="1.5" className="fill-current opacity-50" />
            </svg>
            <h2 className="text-white text-lg font-extrabold tracking-tight">
              Fin<span className="text-primary">dex</span>
            </h2>
          </div>
        </Link>

        {/* Center: nav links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link to="/" className="text-muted-text hover:text-white transition-colors">
            Home
          </Link>
          <Link to="/market" className="text-muted-text hover:text-white transition-colors">
            Market
          </Link>
          <Link to="/help" className="text-muted-text hover:text-white transition-colors">
            Help
          </Link>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-3 flex-[0_0_auto] ml-3">
          {isLoggedIn ? (
            <>
              {!isAdmin && (
                <>
                  <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-surface-dark border border-border-dark rounded-lg">
                    <span className="text-muted-text text-xs">Tokens:</span>
                    <span className="text-white font-mono font-semibold">$124,592.45</span>
                  </div>
                  <ProfilePicture />
                  <DashboardButton />
                </>
              )}
              {isAdmin && (
                <Link
                  to="/admin/dashboard"
                  className="flex items-center gap-2 px-6 h-10 bg-primary hover:bg-primary-hover text-background-dark text-sm font-bold rounded-full transition-all shadow-neon-sm"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Admin Panel
                </Link>
              )}
            </>
          ) : (
            <>
              <Link
                to="/auth"
                className="hidden sm:flex px-6 h-10 items-center justify-center rounded-full text-slate-100 text-sm font-semibold hover:bg-white/5 transition-colors gap-2"
              >
            <LogIn className="w-4 h-4" />
            Login
              </Link>
              <Link
                to="/auth"
            className="flex px-6 h-10 items-center justify-center rounded-full bg-primary hover:bg-primary-hover text-background-dark text-sm font-bold transition-all shadow-neon-sm gap-2"
          >
            <Play className="w-4 h-4" />
                Join us
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


