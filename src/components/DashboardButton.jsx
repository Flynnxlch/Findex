import { LayoutDashboard } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const DashboardButton = () => {
  return (
    <Link
      to="/dashboard"
      className="flex items-center gap-2 px-6 h-10 bg-primary hover:bg-primary-hover text-background-dark text-sm font-bold rounded-full transition-all shadow-neon-sm"
    >
      <LayoutDashboard className="w-4 h-4" />
      Dashboard
    </Link>
  );
};

export default DashboardButton;

