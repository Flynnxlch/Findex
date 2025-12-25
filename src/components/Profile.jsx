import { Camera, User } from 'lucide-react';
import React, { useState } from 'react';

const Profile = () => {
  const [formData, setFormData] = useState({
    username: localStorage.getItem('username') || 'Alex',
    bio: localStorage.getItem('bio') || 'Crypto enthusiast and trader',
    profilePicture: localStorage.getItem('profilePicture') || null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result;
        setFormData({
          ...formData,
          profilePicture: imageData,
        });
        // Save to localStorage
        localStorage.setItem('profilePicture', imageData);
        // Trigger update event for navbar
        window.dispatchEvent(new Event('profilePictureUpdated'));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save to localStorage
    localStorage.setItem('username', formData.username);
    localStorage.setItem('bio', formData.bio);
    if (formData.profilePicture) {
      localStorage.setItem('profilePicture', formData.profilePicture);
    }
    // Trigger update event for navbar
    window.dispatchEvent(new Event('profilePictureUpdated'));
    window.dispatchEvent(new Event('profileUpdated'));
    // Handle profile update
    console.log('Profile updated', formData);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Profile Settings</h2>
      
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        {/* Profile Picture */}
        <div>
          <label className="block text-sm font-semibold text-muted-text mb-2">
            Profile Picture
          </label>
          <div className="flex items-center gap-6">
            <div className="relative">
              {formData.profilePicture ? (
                <img
                  src={formData.profilePicture}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-2 border-primary"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-surface-muted border-2 border-border-dark flex items-center justify-center">
                  <User className="w-12 h-12 text-muted-text" />
                </div>
              )}
              <label className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary-hover transition-colors">
                <Camera className="w-4 h-4 text-background-dark" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
            <div>
              <p className="text-sm text-muted-text mb-1">Upload a new profile picture</p>
              <p className="text-xs text-muted-text">JPG, PNG or WEBP. Max size 2MB</p>
            </div>
          </div>
        </div>

        {/* Username */}
        <div>
          <label className="block text-sm font-semibold text-muted-text mb-2">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-surface-dark border border-border-dark rounded-lg text-white placeholder:text-muted-text focus:outline-none focus:border-primary transition-colors"
            placeholder="Enter your username"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-semibold text-muted-text mb-2">
            Bio
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 bg-surface-dark border border-border-dark rounded-lg text-white placeholder:text-muted-text focus:outline-none focus:border-primary transition-colors resize-none"
            placeholder="Tell us about yourself..."
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-primary hover:bg-primary-hover text-background-dark font-bold rounded-lg transition-all shadow-neon-sm"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;

