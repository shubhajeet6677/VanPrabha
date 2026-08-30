import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import SkeletonLoader from './SkeletonLoader';
import { Menu, Bell, ShieldCheck, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useLocation } from 'react-router-dom';

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const location = useLocation();

  // Route change skeleton loading effect (at least 600ms duration)
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [location.pathname, location.search]);

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex font-sans">
      {/* Sidebar Navigation */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)} 
          className="fixed inset-0 z-30 bg-slate-900/50 lg:hidden"
        />
      )}

      {/* Main Content Viewport Area */}
      <div className="flex-1 lg:ml-64 flex flex-col min-w-0">
        
        {/* Top Header Bar */}
        <header className="sticky top-0 z-20 h-16 bg-[#1B4332] border-b border-emerald-800 text-white shadow-sm px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-md hover:bg-emerald-900 text-emerald-100 lg:hidden focus:outline-none"
              aria-label="Toggle Navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-emerald-100 hidden sm:inline">
                Division: <strong className="text-white">{currentUser?.division || 'North'}</strong>
              </span>
              <span className="text-xs text-emerald-400 hidden sm:inline">•</span>
              <span className="text-xs font-bold text-emerald-100 hidden sm:inline">
                Zone: <strong className="text-white">{currentUser?.zone || 'North Zone 1'}</strong>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Active Alerts Count Chip with red pulse */}
            <Link 
              to="/alerts" 
              className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-emerald-950/70 border border-emerald-800 text-xs text-emerald-100 font-medium hover:border-amber-500/60 transition-colors"
            >
              <Bell className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">Operations Alerts:</span>
              <span className="font-bold text-white bg-[#E63946] px-2 py-0.5 rounded text-[11px] border border-red-400/40 animate-alert-pulse">
                5 Active
              </span>
            </Link>

            {/* Officer Profile Details */}
            <div className="flex items-center gap-2 border-l border-emerald-800 pl-3">
              <div className="w-7 h-7 rounded-full bg-emerald-900 border border-emerald-700 flex items-center justify-center text-white text-xs font-bold">
                {currentUser?.fullName ? currentUser.fullName[0].toUpperCase() : <User className="w-3.5 h-3.5" />}
              </div>
              <div className="text-left hidden md:block">
                <span className="text-xs font-bold block leading-tight text-white">
                  {currentUser?.fullName || 'Officer Vikram'}
                </span>
                <span className="text-[10px] text-emerald-300 block">
                  {currentUser?.role || 'Director General'}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content with Fade Transition & Skeleton Load */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
          {loading ? (
            <SkeletonLoader />
          ) : (
            <div key={location.pathname + location.search} className="animate-page-fade">
              {children}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

