import { Coins, Users, Wallet, MessageSquare, TrendingUp, Activity } from 'lucide-react';
import React from 'react';
import ManageCoins from './ManageCoins.jsx';
import ManageUsers from './ManageUsers.jsx';
import AdjustTokens from './AdjustTokens.jsx';
import HandleTickets from './HandleTickets.jsx';
import SystemStatistics from './SystemStatistics.jsx';

const AdminDashboardContent = ({ activeMenu }) => {
  if (activeMenu === 'coins') {
    return <ManageCoins />;
  }

  if (activeMenu === 'users') {
    return <ManageUsers />;
  }

  if (activeMenu === 'tokens') {
    return <AdjustTokens />;
  }

  if (activeMenu === 'tickets') {
    return <HandleTickets />;
  }

  if (activeMenu === 'statistics') {
    return <SystemStatistics />;
  }

  // Default dashboard view
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
        <p className="text-muted-text">Manage your trading simulation platform</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-dark border border-border-dark rounded-xl p-6 hover:border-primary/50 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Coins className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-muted-text text-sm">Total Coins</p>
              <p className="text-white font-bold text-2xl">8</p>
            </div>
          </div>
        </div>

        <div className="bg-surface-dark border border-border-dark rounded-xl p-6 hover:border-primary/50 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-cyan/20 flex items-center justify-center">
              <Users className="w-6 h-6 text-cyan" />
            </div>
            <div>
              <p className="text-muted-text text-sm">Total Users</p>
              <p className="text-white font-bold text-2xl">1,234</p>
            </div>
          </div>
        </div>

        <div className="bg-surface-dark border border-border-dark rounded-xl p-6 hover:border-primary/50 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Wallet className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-muted-text text-sm">Total Tokens</p>
              <p className="text-white font-bold text-2xl">1.2M</p>
            </div>
          </div>
        </div>

        <div className="bg-surface-dark border border-border-dark rounded-xl p-6 hover:border-primary/50 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-danger/20 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-danger" />
            </div>
            <div>
              <p className="text-muted-text text-sm">Open Tickets</p>
              <p className="text-white font-bold text-2xl">12</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-surface-dark border border-border-dark rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('adminMenuChange', { detail: 'coins' }))}
            className="p-4 bg-background-dark border border-border-dark rounded-lg hover:border-primary transition-colors text-left"
          >
            <Coins className="w-6 h-6 text-primary mb-2" />
            <h4 className="text-white font-semibold mb-1">Manage Coins</h4>
            <p className="text-muted-text text-sm">Create, edit, or delete coins and set volatility</p>
          </button>

          <button
            onClick={() => window.dispatchEvent(new CustomEvent('adminMenuChange', { detail: 'users' }))}
            className="p-4 bg-background-dark border border-border-dark rounded-lg hover:border-primary transition-colors text-left"
          >
            <Users className="w-6 h-6 text-cyan mb-2" />
            <h4 className="text-white font-semibold mb-1">Manage Users</h4>
            <p className="text-muted-text text-sm">View, edit, or delete user accounts</p>
          </button>

          <button
            onClick={() => window.dispatchEvent(new CustomEvent('adminMenuChange', { detail: 'tokens' }))}
            className="p-4 bg-background-dark border border-border-dark rounded-lg hover:border-primary transition-colors text-left"
          >
            <Wallet className="w-6 h-6 text-primary mb-2" />
            <h4 className="text-white font-semibold mb-1">Adjust Tokens</h4>
            <p className="text-muted-text text-sm">Add or remove tokens from user accounts</p>
          </button>

          <button
            onClick={() => window.dispatchEvent(new CustomEvent('adminMenuChange', { detail: 'tickets' }))}
            className="p-4 bg-background-dark border border-border-dark rounded-lg hover:border-primary transition-colors text-left"
          >
            <MessageSquare className="w-6 h-6 text-danger mb-2" />
            <h4 className="text-white font-semibold mb-1">Handle Tickets</h4>
            <p className="text-muted-text text-sm">View and respond to user support tickets</p>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-surface-dark border border-border-dark rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">Recent Activity</h3>
          <Activity className="w-5 h-5 text-muted-text" />
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-background-dark rounded-lg">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <div className="flex-1">
              <p className="text-white text-sm">New coin "DOGE" created</p>
              <p className="text-muted-text text-xs">2 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-background-dark rounded-lg">
            <div className="w-2 h-2 rounded-full bg-cyan"></div>
            <div className="flex-1">
              <p className="text-white text-sm">User "john_doe" registered</p>
              <p className="text-muted-text text-xs">15 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-background-dark rounded-lg">
            <div className="w-2 h-2 rounded-full bg-danger"></div>
            <div className="flex-1">
              <p className="text-white text-sm">New support ticket #1234</p>
              <p className="text-muted-text text-xs">1 hour ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardContent;

