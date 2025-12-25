import { Upload, X } from 'lucide-react';
import React from 'react';

const EditUserModal = ({ selectedUser, formData, onFormChange, onImageChange, onRemoveImage, onClose, onUpdate }) => {
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-surface-dark border border-border-dark rounded-xl p-6 w-full max-w-md">
        <h3 className="text-xl font-bold text-white mb-4">Edit User</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-muted-text mb-2">Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => onFormChange({ ...formData, username: e.target.value })}
              className="w-full px-4 py-2 bg-background-dark border border-border-dark rounded-lg text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-muted-text mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => onFormChange({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 bg-background-dark border border-border-dark rounded-lg text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-muted-text mb-2">Profile Picture</label>
            {formData.profilePicture ? (
              <div className="relative inline-block">
                <img 
                  src={formData.profilePicture} 
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border-2 border-primary"
                />
                <button
                  type="button"
                  onClick={onRemoveImage}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-danger rounded-full flex items-center justify-center hover:bg-danger/80 transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            ) : (
              <label className="flex items-center gap-2 px-4 py-3 bg-background-dark border border-border-dark rounded-lg cursor-pointer hover:border-primary transition-colors w-fit">
                <Upload className="w-5 h-5 text-muted-text" />
                <span className="text-muted-text text-sm">Upload profile picture</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={onImageChange}
                  className="hidden"
                />
              </label>
            )}
            <p className="text-xs text-muted-text mt-1">JPG, PNG or WEBP. Max size 2MB</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-muted-text mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => onFormChange({ ...formData, status: e.target.value })}
              className="w-full px-4 py-2 bg-background-dark border border-border-dark rounded-lg text-white"
            >
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="banned">Banned</option>
            </select>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-surface-muted text-white rounded-lg hover:bg-surface-muted/80 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onUpdate}
            className="flex-1 px-4 py-2 bg-primary hover:bg-primary-hover text-background-dark font-semibold rounded-lg transition-all"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;

