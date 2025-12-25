import { TrendingUp, Users, Coins, Wallet, Activity, BarChart3 } from 'lucide-react';
import React from 'react';

const SystemStatistics = () => {
  const stats = {
    totalUsers: 1234,
    activeUsers: 856,
    totalCoins: 8,
    totalTokens: 1200000,
    totalTrades: 45678,
    totalVolume: 5678900,
    avgVolatility: 65,
    openTickets: 12,
  };

  const recentActivity = [
    { type: 'user_registered', count: 23, change: '+5.2%' },
    { type: 'trades_executed', count: 456, change: '+12.3%' },
    { type: 'tokens_distributed', count: 50000, change: '+8.1%' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">System Statistics</h2>
        <p className="text-muted-text">Overview of platform performance and metrics</p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-dark border border-border-dark rounded-xl p-6 hover:border-primary/50 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-muted-text text-sm">Total Users</p>
              <p className="text-white font-bold text-2xl">{stats.totalUsers.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-primary text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>Active: {stats.activeUsers}</span>
          </div>
        </div>

        <div className="bg-surface-dark border border-border-dark rounded-xl p-6 hover:border-primary/50 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-cyan/20 flex items-center justify-center">
              <Coins className="w-6 h-6 text-cyan" />
            </div>
            <div>
              <p className="text-muted-text text-sm">Total Coins</p>
              <p className="text-white font-bold text-2xl">{stats.totalCoins}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-cyan text-sm">
            <Activity className="w-4 h-4" />
            <span>Avg Volatility: {stats.avgVolatility}</span>
          </div>
        </div>

        <div className="bg-surface-dark border border-border-dark rounded-xl p-6 hover:border-primary/50 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Wallet className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-muted-text text-sm">Total Tokens</p>
              <p className="text-white font-bold text-2xl">{(stats.totalTokens / 1000000).toFixed(2)}M</p>
            </div>
          </div>
          <div className="text-muted-text text-sm">
            In circulation
          </div>
        </div>

        <div className="bg-surface-dark border border-border-dark rounded-xl p-6 hover:border-primary/50 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-danger/20 flex items-center justify-center">
              <Activity className="w-6 h-6 text-danger" />
            </div>
            <div>
              <p className="text-muted-text text-sm">Total Trades</p>
              <p className="text-white font-bold text-2xl">{stats.totalTrades.toLocaleString()}</p>
            </div>
          </div>
          <div className="text-muted-text text-sm">
            All time
          </div>
        </div>
      </div>

      {/* Trading Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface-dark border border-border-dark rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="w-6 h-6 text-primary" />
            <h3 className="text-lg font-bold text-white">Trading Volume</h3>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-text text-sm">24h Volume</span>
                <span className="text-white font-bold">${(stats.totalVolume / 1000000).toFixed(2)}M</span>
              </div>
              <div className="h-2 bg-background-dark rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '75%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-text text-sm">7d Volume</span>
                <span className="text-white font-bold">${((stats.totalVolume * 7) / 1000000).toFixed(2)}M</span>
              </div>
              <div className="h-2 bg-background-dark rounded-full overflow-hidden">
                <div className="h-full bg-cyan rounded-full" style={{ width: '85%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-text text-sm">30d Volume</span>
                <span className="text-white font-bold">${((stats.totalVolume * 30) / 1000000).toFixed(2)}M</span>
              </div>
              <div className="h-2 bg-background-dark rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '100%' }} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface-dark border border-border-dark rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-6 h-6 text-cyan" />
            <h3 className="text-lg font-bold text-white">Recent Activity</h3>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-background-dark rounded-lg">
                <div>
                  <p className="text-white font-semibold capitalize">{activity.type.replace('_', ' ')}</p>
                  <p className="text-muted-text text-sm">{activity.count.toLocaleString()} in last 24h</p>
                </div>
                <div className="text-primary font-semibold">{activity.change}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Health */}
      <div className="bg-surface-dark border border-border-dark rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">System Health</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-background-dark rounded-lg">
            <p className="text-muted-text text-sm mb-2">Server Status</p>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span className="text-white font-semibold">Online</span>
            </div>
          </div>
          <div className="p-4 bg-background-dark rounded-lg">
            <p className="text-muted-text text-sm mb-2">Database</p>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span className="text-white font-semibold">Connected</span>
            </div>
          </div>
          <div className="p-4 bg-background-dark rounded-lg">
            <p className="text-muted-text text-sm mb-2">WebSocket</p>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span className="text-white font-semibold">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemStatistics;

