import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Trees, 
  LayoutDashboard, 
  TreePine, 
  Trees as ForestIcon, 
  Trash2, 
  Bell, 
  ChevronDown, 
  ChevronRight, 
  LogOut, 
  User,
  PlusCircle,
  Map,
  Camera,
  History,
  Activity
} from 'lucide-react';

export default function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, logout } = useAuth();

  // Submenu open states
  const [parksOpen, setParksOpen] = useState(location.pathname.startsWith('/parks'));
  const [forestsOpen, setForestsOpen] = useState(location.pathname.startsWith('/forests'));
  const [litterOpen, setLitterOpen] = useState(location.pathname.startsWith('/litter'));

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <aside 
      className={`fixed top-0 left-0 z-40 h-screen w-64 bg-[#1B4332] text-white flex flex-col justify-between border-r border-emerald-900 shadow-lg transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      <div>
        {/* Brand Header */}
        <div className="h-16 px-5 border-b border-emerald-800/80 flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-[#2D6A4F] text-white flex items-center justify-center border border-emerald-600/30">
            <Trees className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-base text-white tracking-tight leading-tight">
              VanPrabha
            </h1>
            <p className="text-[10px] text-emerald-200/80 font-medium">
              Urban Forest Operations
            </p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-140px)]">
          
          {/* Dashboard */}
          <button
            onClick={() => navigate('/dashboard')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              isActive('/dashboard') 
                ? 'bg-[#2D6A4F] text-white shadow-sm' 
                : 'text-emerald-100/90 hover:bg-emerald-900/60 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-emerald-300" />
            Dashboard
          </button>

          {/* PARKS SECTION */}
          <div>
            <button
              onClick={() => {
                setParksOpen(!parksOpen);
                if (!parksOpen && !location.pathname.startsWith('/parks')) {
                  navigate('/parks');
                }
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                location.pathname.startsWith('/parks')
                  ? 'bg-emerald-900/80 text-white'
                  : 'text-emerald-100/90 hover:bg-emerald-900/60 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <TreePine className="w-4 h-4 text-emerald-300" />
                <span>Parks</span>
              </div>
              {parksOpen ? (
                <ChevronDown className="w-3.5 h-3.5 text-emerald-300" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
              )}
            </button>

            {/* Parks Suboptions */}
            {parksOpen && (
              <div className="mt-1 ml-4 pl-3 border-l border-emerald-700/60 space-y-1">
                <button
                  onClick={() => navigate('/parks')}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                    isActive('/parks') ? 'bg-[#2D6A4F] text-white font-bold' : 'text-emerald-200/80 hover:text-white'
                  }`}
                >
                  <TreePine className="w-3 h-3 text-emerald-300" />
                  All Parks
                </button>
                <button
                  onClick={() => navigate('/parks?tab=add')}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                    location.search.includes('tab=add') ? 'bg-[#2D6A4F] text-white font-bold' : 'text-emerald-200/80 hover:text-white'
                  }`}
                >
                  <PlusCircle className="w-3 h-3 text-emerald-300" />
                  Add New Park
                </button>
                <button
                  onClick={() => navigate('/parks?tab=zones')}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                    location.search.includes('tab=zones') ? 'bg-[#2D6A4F] text-white font-bold' : 'text-emerald-200/80 hover:text-white'
                  }`}
                >
                  <Map className="w-3 h-3 text-emerald-300" />
                  Zone Management
                </button>
              </div>
            )}
          </div>

          {/* FORESTS SECTION */}
          <div>
            <button
              onClick={() => {
                setForestsOpen(!forestsOpen);
                if (!forestsOpen && !location.pathname.startsWith('/forests')) {
                  navigate('/forests');
                }
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                location.pathname.startsWith('/forests')
                  ? 'bg-emerald-900/80 text-white'
                  : 'text-emerald-100/90 hover:bg-emerald-900/60 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <ForestIcon className="w-4 h-4 text-emerald-300" />
                <span>Forests</span>
              </div>
              {forestsOpen ? (
                <ChevronDown className="w-3.5 h-3.5 text-emerald-300" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
              )}
            </button>

            {/* Forests Suboptions */}
            {forestsOpen && (
              <div className="mt-1 ml-4 pl-3 border-l border-emerald-700/60 space-y-1">
                <button
                  onClick={() => navigate('/forests')}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                    isActive('/forests') ? 'bg-[#2D6A4F] text-white font-bold' : 'text-emerald-200/80 hover:text-white'
                  }`}
                >
                  <ForestIcon className="w-3 h-3 text-emerald-300" />
                  All Forests
                </button>
                <button
                  onClick={() => navigate('/forests?tab=add')}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                    location.search.includes('tab=add') ? 'bg-[#2D6A4F] text-white font-bold' : 'text-emerald-200/80 hover:text-white'
                  }`}
                >
                  <PlusCircle className="w-3 h-3 text-emerald-300" />
                  Add New Forest
                </button>
                <button
                  onClick={() => navigate('/forests?tab=zones')}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                    location.search.includes('tab=zones') ? 'bg-[#2D6A4F] text-white font-bold' : 'text-emerald-200/80 hover:text-white'
                  }`}
                >
                  <Map className="w-3 h-3 text-emerald-300" />
                  Zone Management
                </button>
              </div>
            )}
          </div>

          {/* LITTER DETECTION SECTION */}
          <div>
            <button
              onClick={() => {
                setLitterOpen(!litterOpen);
                if (!litterOpen && !location.pathname.startsWith('/litter')) {
                  navigate('/litter/live');
                }
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                location.pathname.startsWith('/litter')
                  ? 'bg-emerald-900/80 text-white'
                  : 'text-emerald-100/90 hover:bg-emerald-900/60 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Trash2 className="w-4 h-4 text-emerald-300" />
                <span>Litter Detection</span>
              </div>
              {litterOpen ? (
                <ChevronDown className="w-3.5 h-3.5 text-emerald-300" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
              )}
            </button>

            {/* Litter Detection Suboptions */}
            {litterOpen && (
              <div className="mt-1 ml-4 pl-3 border-l border-emerald-700/60 space-y-1">
                <button
                  onClick={() => navigate('/litter/live')}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                    isActive('/litter/live') || isActive('/litter') ? 'bg-[#2D6A4F] text-white font-bold' : 'text-emerald-200/80 hover:text-white'
                  }`}
                >
                  <Activity className="w-3 h-3 text-emerald-300" />
                  Live Feed
                </button>
                <button
                  onClick={() => navigate('/litter/cameras')}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                    isActive('/litter/cameras') ? 'bg-[#2D6A4F] text-white font-bold' : 'text-emerald-200/80 hover:text-white'
                  }`}
                >
                  <Camera className="w-3 h-3 text-emerald-300" />
                  Camera Management
                </button>
                <button
                  onClick={() => navigate('/litter/history')}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                    isActive('/litter/history') ? 'bg-[#2D6A4F] text-white font-bold' : 'text-emerald-200/80 hover:text-white'
                  }`}
                >
                  <History className="w-3 h-3 text-emerald-300" />
                  Detection History
                </button>
                <button
                  onClick={() => navigate('/litter/heatmap')}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                    isActive('/litter/heatmap') ? 'bg-[#2D6A4F] text-white font-bold' : 'text-emerald-200/80 hover:text-white'
                  }`}
                >
                  <Map className="w-3 h-3 text-emerald-300" />
                  Heatmap
                </button>
              </div>
            )}
          </div>

          {/* ALERTS SECTION */}
          <button
            onClick={() => navigate('/alerts')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              isActive('/alerts') 
                ? 'bg-[#2D6A4F] text-white shadow-sm' 
                : 'text-emerald-100/90 hover:bg-emerald-900/60 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4 text-amber-400" />
              <span>Alerts</span>
            </div>
            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold px-1.5 py-0.5 rounded">
              5 Active
            </span>
          </button>

        </nav>
      </div>

      {/* Officer Profile & Logout */}
      <div className="p-4 border-t border-emerald-800/80 bg-emerald-950/40 space-y-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#2D6A4F] border border-emerald-600 flex items-center justify-center text-white font-bold text-xs">
            {currentUser?.fullName ? currentUser.fullName[0].toUpperCase() : <User className="w-4 h-4" />}
          </div>
          <div className="overflow-hidden">
            <h4 className="text-xs font-bold text-white truncate leading-tight">
              {currentUser?.fullName || 'Officer'}
            </h4>
            <p className="text-[10px] text-emerald-300 truncate">
              {currentUser?.role || 'System Admin'} ({currentUser?.officerId || 'VP-001'})
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-1.5 px-3 rounded bg-emerald-900/80 hover:bg-red-900/80 text-xs font-semibold text-emerald-100 hover:text-white border border-emerald-700/60 hover:border-red-700 transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
