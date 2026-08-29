import React from 'react';
import { Trees, Bell, LogOut, User } from 'lucide-react';
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
    <header className="sticky top-0 z-50 bg-[#1B4332] border-b border-emerald-800 text-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Brand / Logo */}
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-[#2D6A4F] text-white flex items-center justify-center border border-emerald-600/30">
            <Trees className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-lg text-white tracking-tight block leading-tight">
              VanPrabha
            </span>
            <span className="text-[11px] text-emerald-200/80 font-medium block">
              Urban Forest Operations Platform
            </span>
          </div>
        </Link>

        {/* Center: Active Alerts Summary */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md bg-emerald-950/60 border border-emerald-800/80 text-xs text-emerald-100 font-medium">
          <Bell className="w-4 h-4 text-amber-400" />
          <span>Active Operations Alerts:</span>
          <span className="font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded text-[11px] border border-amber-500/30">
            {activeAlertsCount}
          </span>
        </div>

        {/* Right: User Information & Logout */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-900 border border-emerald-700 flex items-center justify-center text-white font-bold text-xs">
              {currentUser?.email ? currentUser.email[0].toUpperCase() : <User className="w-4 h-4" />}
            </div>
            <div className="text-left hidden md:block">
              <div className="text-xs font-bold text-white leading-tight">
                {currentUser?.email || "Operations User"}
              </div>
              <div className="text-[11px] text-emerald-300 font-medium">
                {userRole === 'admin' ? 'Administrator' : 'Field Staff'}
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 py-1.5 px-3 rounded-md bg-emerald-900/60 hover:bg-emerald-800 text-xs font-semibold text-emerald-100 border border-emerald-700 transition-colors"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Log Out</span>
          </button>
        </div>

      </div>
    </header>
  );
}
