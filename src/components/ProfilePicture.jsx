import { User, ChevronDown } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePicture = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState(localStorage.getItem('profilePicture') || null);
  const [username, setUsername] = useState(localStorage.getItem('username') || 'Alex');
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const updateProfile = () => {
      setProfilePicture(localStorage.getItem('profilePicture') || null);
      setUsername(localStorage.getItem('username') || 'Alex');
    };

    window.addEventListener('profilePictureUpdated', updateProfile);
    window.addEventListener('profileUpdated', updateProfile);
    
    return () => {
      window.removeEventListener('profilePictureUpdated', updateProfile);
      window.removeEventListener('profileUpdated', updateProfile);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    window.dispatchEvent(new Event('loginStatusChanged'));
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        {profilePicture ? (
          <img
            src={profilePicture}
            alt={username}
            className="w-10 h-10 rounded-full object-cover border-2 border-primary"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-surface-muted border-2 border-primary flex items-center justify-center">
            <User className="w-5 h-5 text-muted-text" />
          </div>
        )}
        <ChevronDown className={`w-4 h-4 text-muted-text transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-4 w-48 bg-surface-dark border border-border-dark rounded-xl shadow-2xl z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-border-dark">
            <p className="text-white font-semibold text-sm">
              {username.split(' ').length > 20 
                ? username.split(' ').slice(0, 20).join(' ') + '...'
                : username}
            </p>
            <p className="text-muted-text text-xs">View Profile</p>
          </div>
          <button
            onClick={() => {
              setIsOpen(false);
              navigate('/dashboard');
              // Trigger menu change to profile
              window.dispatchEvent(new CustomEvent('dashboardMenuChange', { detail: 'profile' }));
            }}
            className="w-full text-left px-4 py-3 text-white hover:bg-surface-muted transition-colors"
          >
            Profile Settings
          </button>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-3 text-danger hover:bg-danger/10 transition-colors"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePicture;

