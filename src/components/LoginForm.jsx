import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onForgotPassword, onSubmit, onAdminAccess, showAdminLogin, onShowAdminLogin }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [clickTimes, setClickTimes] = useState([]);
  const clickTimeoutRef = useRef(null);
  
  useEffect(() => {
    return () => {
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Set login status
    localStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('justLoggedIn', 'true');
    // Trigger custom event for Navbar update
    window.dispatchEvent(new Event('loginStatusChanged'));
    onSubmit(formData);
    // Navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-muted-text mb-2">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-text" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 bg-surface-dark border border-border-dark rounded-lg text-white placeholder:text-muted-text focus:outline-none focus:border-primary transition-colors"
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-muted-text mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-text" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-12 py-3 bg-surface-dark border border-border-dark rounded-lg text-white placeholder:text-muted-text focus:outline-none focus:border-primary transition-colors"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-text hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-sm text-primary hover:text-primary-hover transition-colors"
          >
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          onClick={(e) => {
            // Secret admin access: 7 clicks with max 500ms between each click
            const now = Date.now();
            let newClickTimes = [...clickTimes];
            
            // Remove clicks older than 500ms from the last click
            if (newClickTimes.length > 0) {
              const lastClickTime = newClickTimes[newClickTimes.length - 1];
              if (now - lastClickTime > 500) {
                // Reset if gap is too long
                newClickTimes = [];
              }
            }
            
            // Add current click
            newClickTimes.push(now);
            
            // Check if we have 7 clicks
            if (newClickTimes.length >= 7) {
              e.preventDefault();
              // Show admin login section instead of direct access
              if (onShowAdminLogin) {
                onShowAdminLogin();
              }
              setClickTimes([]);
              return;
            }
            
            setClickTimes(newClickTimes);
            
            // Clear timeout and set new one to reset after 500ms of no clicks
            if (clickTimeoutRef.current) {
              clearTimeout(clickTimeoutRef.current);
            }
            clickTimeoutRef.current = setTimeout(() => {
              setClickTimes([]);
            }, 500);
          }}
          className="w-full py-3 bg-primary hover:bg-primary-hover text-background-dark font-bold rounded-lg transition-all shadow-neon-sm"
        >
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;

