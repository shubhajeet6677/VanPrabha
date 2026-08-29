import React from 'react';
import { Trees, Bell, LogOut, User, ShieldCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Navbar({ activeAlertsCount = 3 }) {
  const { currentUser, userRole, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error("Logout error", err);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#1B4332]/95 backdrop-blur-md border-b border-emerald-800/40 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Logo & Brand */}
        <Link to="/dashboard" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#52B788] flex items-center justify-center text-[#1B4332] shadow-md group-hover:scale-105 transition-transform">
            <Trees className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <span className="font-bold text-xl tracking-tight text-white flex items-center gap-1.5">
              VanPrabha
              <span className="w-2 h-2 rounded-full bg-[#52B788] animate-pulse"></span>
            </span>
            <span className="text-[10px] text-emerald-200/70 uppercase tracking-wider block font-medium">
              Urban Forest Portal
            </span>
          </div>
        </Link>

        {/* Center: Alert Badge */}
        <div className="hidden md:flex items-center">
          <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#1B4332]/80 border border-[#FFD166]/30 shadow-inner">
            <div className="relative">
              <Bell className="w-4 h-4 text-[#FFD166]" />
              {activeAlertsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#E63946] rounded-full animate-ping" />
              )}
            </div>
            <span className="text-xs text-emerald-100 font-medium">
              Active Alerts: <span className="font-bold text-[#FFD166]">{activeAlertsCount}</span>
            </span>
          </div>
        </div>

        {/* Right: User Avatar & Role */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-semibold text-white">
                {currentUser?.email || "Admin User"}
              </div>
              <div className="text-[10px] text-[#52B788] font-medium flex items-center justify-end gap-1">
                <ShieldCheck className="w-3 h-3" />
                {userRole === 'admin' ? 'System Administrator' : 'Field Specialist'}
              </div>
            </div>
            <div className="w-9 h-9 rounded-full bg-emerald-800 border border-[#52B788]/40 flex items-center justify-center text-emerald-200 font-bold text-sm shadow">
              {currentUser?.email ? currentUser.email[0].toUpperCase() : <User className="w-5 h-5" />}
            </div>
          </div>

          <button
            onClick={handleLogout}
            title="Log Out"
            className="p-2 rounded-lg text-emerald-200/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>

      </div>
    </header>
  );
}
