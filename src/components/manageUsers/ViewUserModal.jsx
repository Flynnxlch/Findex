import { Camera } from 'lucide-react';
import React from 'react';

const ViewUserModal = ({ selectedUser, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-surface-dark border border-border-dark rounded-xl p-6 w-full max-w-md">
        <h3 className="text-xl font-bold text-white mb-4">User Details</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4 mb-4">
            {selectedUser.profilePicture ? (
              <img 
                src={selectedUser.profilePicture} 
                alt={selectedUser.username}
                className="w-16 h-16 rounded-full object-cover border-2 border-primary"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                <Camera className="w-8 h-8 text-primary" />
              </div>
            )}
            <div>
              <p className="text-white font-semibold text-lg">{selectedUser.username}</p>
              <p className="text-muted-text text-sm">{selectedUser.email}</p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-muted-text mb-1">Username</label>
            <p className="text-white">{selectedUser.username}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-muted-text mb-1">Email</label>
            <p className="text-white">{selectedUser.email}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-muted-text mb-1">Tokens</label>
            <p className="text-white font-mono">{selectedUser.tokens.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-muted-text mb-1">Join Date</label>
            <p className="text-white">{selectedUser.joinDate}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-muted-text mb-1">Status</label>
            <span className={`px-3 py-1 rounded-lg text-sm font-semibold inline-block ${
              selectedUser.status === 'active' ? 'bg-primary/20 text-primary' : 'bg-danger/20 text-danger'
            }`}>
              {selectedUser.status}
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-full mt-6 px-4 py-2 bg-primary hover:bg-primary-hover text-background-dark font-semibold rounded-lg transition-all"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewUserModal;

