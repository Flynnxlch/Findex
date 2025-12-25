import { Plus, Minus, Search, Wallet } from 'lucide-react';
import React, { useState } from 'react';
import { useNotification } from './NotificationProvider.jsx';

const AdjustTokens = () => {
  const { showError, showSuccess } = useNotification();
  const [users, setUsers] = useState([
    { id: 1, username: 'alex_trader', email: 'alex@example.com', tokens: 124592.45 },
    { id: 2, username: 'crypto_master', email: 'crypto@example.com', tokens: 85620.30 },
    { id: 3, username: 'trader_pro', email: 'trader@example.com', tokens: 45230.10 },
  ]);
  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [adjustType, setAdjustType] = useState('add'); // 'add' or 'remove'
  const [searchTerm, setSearchTerm] = useState('');
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');

  const handleAdjust = (user, type) => {
    setSelectedUser(user);
    setAdjustType(type);
    setShowAdjustModal(true);
    setAmount('');
    setReason('');
  };

  const handleConfirmAdjust = () => {
    const adjustAmount = parseFloat(amount);
    if (isNaN(adjustAmount) || adjustAmount <= 0) {
      showError('Please enter a valid amount');
      return;
    }

    setUsers(users.map(user => 
      user.id === selectedUser.id 
        ? { 
            ...user, 
            tokens: adjustType === 'add' 
              ? user.tokens + adjustAmount 
              : Math.max(0, user.tokens - adjustAmount)
          }
        : user
    ));
    
    // Log the adjustment
    console.log(`${adjustType === 'add' ? 'Added' : 'Removed'} ${adjustAmount} tokens from ${selectedUser.username}. Reason: ${reason}`);
    
    showSuccess(
      `${adjustType === 'add' ? 'Added' : 'Removed'} ${adjustAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} tokens ${adjustType === 'add' ? 'to' : 'from'} ${selectedUser.username}`
    );
    
    setShowAdjustModal(false);
    setSelectedUser(null);
    setAmount('');
    setReason('');
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Adjust User Tokens</h2>
          <p className="text-muted-text">Add or remove tokens from user accounts</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-text" />
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-surface-dark border border-border-dark rounded-lg text-white placeholder:text-muted-text focus:outline-none focus:border-primary transition-colors"
        />
      </div>

      {/* Users Table */}
      <div className="bg-surface-dark border border-border-dark rounded-xl overflow-hidden">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-dark bg-surface-muted/50">
                <th className="text-left p-4 text-xs font-bold text-muted-text uppercase">User</th>
                <th className="text-left p-4 text-xs font-bold text-muted-text uppercase">Email</th>
                <th className="text-right p-4 text-xs font-bold text-muted-text uppercase">Current Tokens</th>
                <th className="text-center p-4 text-xs font-bold text-muted-text uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-border-dark/50 hover:bg-surface-muted/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <Wallet className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-white font-semibold">{user.username}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-muted-text">{user.email}</span>
                  </td>
                  <td className="p-4 text-right">
                    <span className="text-white font-mono font-semibold">{user.tokens.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleAdjust(user, 'add')}
                        className="px-4 py-2 bg-primary hover:bg-primary-hover text-background-dark font-semibold rounded-lg transition-all flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Add
                      </button>
                      <button
                        onClick={() => handleAdjust(user, 'remove')}
                        className="px-4 py-2 bg-danger hover:bg-danger/80 text-white font-semibold rounded-lg transition-all flex items-center gap-2"
                      >
                        <Minus className="w-4 h-4" />
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Adjust Modal */}
      {showAdjustModal && selectedUser && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-surface-dark border border-border-dark rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-white mb-2">
              {adjustType === 'add' ? 'Add' : 'Remove'} Tokens
            </h3>
            <p className="text-muted-text text-sm mb-4">
              User: <span className="text-white">{selectedUser.username}</span><br />
              Current Balance: <span className="text-white font-mono">{selectedUser.tokens.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-muted-text mb-2">
                  Amount to {adjustType === 'add' ? 'Add' : 'Remove'}
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-2 bg-background-dark border border-border-dark rounded-lg text-white"
                  placeholder="Enter amount"
                  min="0"
                  step="0.01"
                />
                {adjustType === 'remove' && amount && parseFloat(amount) > selectedUser.tokens && (
                  <p className="text-danger text-xs mt-1">Amount exceeds current balance</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-muted-text mb-2">Reason (Optional)</label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-4 py-2 bg-background-dark border border-border-dark rounded-lg text-white resize-none"
                  rows="3"
                  placeholder="Enter reason for this adjustment..."
                />
              </div>
              {amount && (
                <div className="p-3 bg-background-dark rounded-lg">
                  <p className="text-muted-text text-sm">New Balance:</p>
                  <p className="text-white font-mono font-bold text-lg">
                    {(adjustType === 'add' 
                      ? selectedUser.tokens + parseFloat(amount || 0)
                      : Math.max(0, selectedUser.tokens - parseFloat(amount || 0))
                    ).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
              )}
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAdjustModal(false)}
                className="flex-1 px-4 py-2 bg-surface-muted text-white rounded-lg hover:bg-surface-muted/80 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAdjust}
                disabled={!amount || parseFloat(amount) <= 0 || (adjustType === 'remove' && parseFloat(amount) > selectedUser.tokens)}
                className={`flex-1 px-4 py-2 font-semibold rounded-lg transition-all ${
                  adjustType === 'add'
                    ? 'bg-primary hover:bg-primary-hover text-background-dark'
                    : 'bg-danger hover:bg-danger/80 text-white'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                Confirm {adjustType === 'add' ? 'Add' : 'Remove'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdjustTokens;

