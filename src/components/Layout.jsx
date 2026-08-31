import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Menu, Bell, ShieldCheck, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useLocation } from 'react-router-dom';

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem('vanprabha_sidebar_collapsed');
    return saved ? JSON.parse(saved) : false;
  });
  const { currentUser } = useAuth();
  const location = useLocation();

  const toggleCollapse = () => {
    setIsCollapsed(prev => {
      const next = !prev;
      localStorage.setItem('vanprabha_sidebar_collapsed', JSON.stringify(next));
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex font-sans overflow-x-hidden">
      {/* Sidebar Navigation */}
      <Sidebar 
        isOpen={sidebarOpen} 
        isCollapsed={isCollapsed}
        toggleCollapse={toggleCollapse}
      />

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)} 
          className="fixed inset-0 z-30 bg-slate-900/50 lg:hidden"
        />
      )}

      {/* Main Content Viewport Area */}
      <div className={`flex-1 transition-all duration-300 flex flex-col min-w-0 ${
        isCollapsed ? 'lg:ml-20' : 'lg:ml-64'
      }`}>
        
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
            <div className="flex items-center gap-2.5 border-l border-emerald-800/80 pl-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#52B788] via-[#2D6A4F] to-[#1B4332] border-2 border-emerald-400/60 shadow-md flex items-center justify-center text-white text-xs font-black tracking-wider shrink-0">
                {currentUser?.fullName ? currentUser.fullName[0].toUpperCase() : 'R'}
              </div>
              <div className="text-left hidden md:block">
                <span className="text-xs font-bold block leading-tight text-white">
                  {currentUser?.fullName || 'Rajiv Menon'}
                </span>
                <span className="text-[10px] text-emerald-300 font-medium block">
                  {currentUser?.role || 'Director General'}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content with Fade Transition */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 pb-12 flex flex-col justify-between">
          <div key={location.pathname + location.search} className="animate-page-fade">
            {children}
          </div>

          {/* Footer Bar */}
          <footer className="mt-12 pt-6 border-t border-slate-200/80 text-xs text-slate-500 font-medium flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>VanPrabha Operations System • Active Telemetry Monitoring</span>
            </div>
            <div>
              Urban Forest & Bio-reserve Operations Headquarters © {new Date().getFullYear()}
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

