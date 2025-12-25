import { BarChart3, Coins, LayoutDashboard, LogOut, MessageSquare, Users, Wallet } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminSidebar = ({ activeMenu, setActiveMenu }) => {
  const navigate = useNavigate();

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'coins', icon: Coins, label: 'Manage Coins' },
    { id: 'users', icon: Users, label: 'Manage Users' },
    { id: 'tokens', icon: Wallet, label: 'Adjust Tokens' },
    { id: 'tickets', icon: MessageSquare, label: 'Handle Tickets' },
    { id: 'statistics', icon: BarChart3, label: 'System Statistics' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('isLoggedIn');
    window.dispatchEvent(new Event('loginStatusChanged'));
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="w-64 bg-surface-dark border-r border-border-dark h-full flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border-dark">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-full bg-primary/15 flex items-center justify-center text-primary">
            <LayoutDashboard className="w-4 h-4" />
          </div>
          <h2 className="text-white text-lg font-extrabold tracking-tight">
            Admin <span className="text-primary">Panel</span>
          </h2>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 py-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={`w-full flex items-center gap-3 px-6 py-3 text-left transition-colors ${
                activeMenu === item.id
                  ? 'bg-primary/10 text-primary border-r-2 border-primary'
                  : 'text-muted-text hover:text-white hover:bg-surface-muted/30'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-border-dark">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-6 py-3 text-left text-danger hover:bg-danger/10 transition-colors rounded-lg"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Log out</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;

