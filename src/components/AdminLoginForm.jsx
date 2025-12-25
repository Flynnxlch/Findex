import { Eye, EyeOff, Mail, Lock, Shield } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLoginForm = ({ onBack }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Admin login validation (for MVP, you can hardcode or use env)
    // In production, this should call an API
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || 'admin@findex.com';
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';
    
    if (formData.email === adminEmail && formData.password === adminPassword) {
      // Set admin access
      localStorage.setItem('isAdmin', 'true');
      localStorage.setItem('isLoggedIn', 'true');
      window.dispatchEvent(new Event('loginStatusChanged'));
      // Navigate to admin dashboard
      navigate('/admin/dashboard');
    } else {
      setError('Invalid admin credentials');
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-6">
        <Shield className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold text-white">Admin Login</h2>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-danger/20 border border-danger/50 rounded-lg">
          <p className="text-danger text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-muted-text mb-2">
            Admin Email
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
              placeholder="Enter admin email"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-muted-text mb-2">
            Admin Password
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
              placeholder="Enter admin password"
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

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 px-4 py-3 bg-surface-muted text-white rounded-lg hover:bg-surface-muted/80 transition-colors font-semibold"
          >
            Back to User Login
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-3 bg-primary hover:bg-primary-hover text-background-dark font-bold rounded-lg transition-all shadow-neon-sm"
          >
            Admin Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminLoginForm;

