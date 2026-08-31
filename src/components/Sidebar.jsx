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
  Activity,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';

export default function Sidebar({ isOpen, isCollapsed, toggleCollapse }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, logout } = useAuth();

  // Submenu open states derived directly from location.pathname
  const [parksOpen, setParksOpen] = useState(() => location.pathname.startsWith('/parks'));
  const [forestsOpen, setForestsOpen] = useState(() => location.pathname.startsWith('/forests'));
  const [litterOpen, setLitterOpen] = useState(() => location.pathname.startsWith('/litter'));

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <aside 
      className={`fixed top-0 left-0 z-40 h-screen bg-[#1B4332] text-white flex flex-col justify-between border-r border-emerald-900 shadow-lg transition-all duration-300 overflow-x-hidden max-w-full ${
        isCollapsed ? 'w-64 lg:w-20' : 'w-64'
      } ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      <div className="w-full max-w-full overflow-x-hidden">
        {/* Brand Header */}
        <div className="h-16 px-4 border-b border-emerald-800/80 flex items-center justify-between overflow-x-hidden w-full max-w-full">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-md bg-[#2D6A4F] text-white flex items-center justify-center border border-emerald-600/30 shrink-0">
              <Trees className="w-5 h-5" />
            </div>
            {!isCollapsed && (
              <div className="truncate min-w-0">
                <h1 className="font-bold text-base text-white tracking-tight leading-tight truncate">
                  VanPrabha
                </h1>
                <p className="text-[10px] text-emerald-200/80 font-medium truncate">
                  Urban Forest Operations
                </p>
              </div>
            )}
          </div>

          {/* Desktop Sidebar Collapse Toggle */}
          <button
            onClick={toggleCollapse}
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            className="hidden lg:flex p-1.5 rounded-md hover:bg-emerald-800/60 text-emerald-300 hover:text-white transition-colors cursor-pointer shrink-0"
          >
            {isCollapsed ? (
              <PanelLeftOpen className="w-4 h-4" />
            ) : (
              <PanelLeftClose className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-2 overflow-y-auto overflow-x-hidden max-h-[calc(100vh-140px)] w-full max-w-full">
          
          {/* Dashboard */}
          <div className="relative group w-full max-w-full">
            <button
              onClick={() => navigate('/dashboard')}
              title={isCollapsed ? "Dashboard" : undefined}
              className={`relative overflow-hidden w-full max-w-full flex ${
                isCollapsed 
                  ? 'flex-col items-center justify-center py-2 px-1 text-center' 
                  : 'flex-row items-center gap-3 px-3 py-2.5'
                } rounded-lg text-xs font-semibold transition-all duration-200 ease-in-out cursor-pointer ${isActive('/dashboard')
                  ? 'bg-[#2D6A4F] text-white shadow-sm'
                  : 'text-emerald-100/90 hover:bg-emerald-900/60 hover:text-white'
                }`}
            >
              <span
                className={`absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#52B788] rounded-r transition-all duration-200 ease-in-out ${isActive('/dashboard') ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
                  }`}
              />
              <LayoutDashboard className="w-5 h-5 text-emerald-300 shrink-0" />
              <span className={isCollapsed ? "text-[10px] font-semibold text-emerald-200/90 leading-tight text-center truncate w-full max-w-full mt-1" : "text-xs font-semibold truncate"}>
                Dashboard
              </span>
            </button>
          </div>

          {/* PARKS SECTION */}
          <div className="relative group w-full max-w-full">
            <button
              onClick={() => {
                setParksOpen(!parksOpen);
                if (!parksOpen && !location.pathname.startsWith('/parks')) {
                  navigate('/parks');
                }
              }}
              title={isCollapsed ? "Parks" : undefined}
              className={`relative overflow-hidden w-full max-w-full flex ${
                isCollapsed 
                  ? 'flex-col items-center justify-center py-2 px-1 text-center' 
                  : 'flex-row items-center justify-between px-3 py-2.5'
                } rounded-lg text-xs font-semibold transition-all duration-200 ease-in-out cursor-pointer ${location.pathname.startsWith('/parks')
                  ? 'bg-emerald-900/80 text-white'
                  : 'text-emerald-100/90 hover:bg-emerald-900/60 hover:text-white'
                }`}
            >
              <span
                className={`absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#52B788] rounded-r transition-all duration-200 ease-in-out ${location.pathname.startsWith('/parks') ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
                  }`}
              />
              <div className={`flex ${isCollapsed ? 'flex-col items-center justify-center w-full max-w-full' : 'flex-row items-center gap-3 overflow-hidden'}`}>
                <TreePine className="w-5 h-5 text-emerald-300 shrink-0" />
                <span className={isCollapsed ? "text-[10px] font-semibold text-emerald-200/90 leading-tight text-center truncate w-full max-w-full mt-1" : "text-xs font-semibold truncate"}>
                  Parks
                </span>
              </div>
              {!isCollapsed && (
                parksOpen ? (
                  <ChevronDown className="w-4 h-4 text-emerald-300 shrink-0" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-emerald-400 shrink-0" />
                )
              )}
            </button>

            {/* Parks Suboptions */}
            {parksOpen && !isCollapsed && (
              <div className="mt-1 ml-4 pl-3 border-l border-emerald-700/60 space-y-1 overflow-x-hidden">
                <button
                  onClick={() => navigate('/parks')}
                  className={`relative overflow-hidden w-full flex items-center gap-2 px-2.5 py-1.5 rounded text-[11px] font-medium transition-all duration-200 ease-in-out cursor-pointer ${isActive('/parks') ? 'bg-[#2D6A4F] text-white font-bold pl-3.5' : 'text-emerald-200/80 hover:text-white'
                    }`}
                >
                  <span
                    className={`absolute left-0 top-1 bottom-1 w-1 bg-[#52B788] rounded-r transition-all duration-200 ease-in-out ${isActive('/parks') ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
                      }`}
                  />
                  <TreePine className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                  <span className="truncate">All Parks</span>
                </button>
                <button
                  onClick={() => navigate('/parks?tab=add')}
                  className={`relative overflow-hidden w-full flex items-center gap-2 px-2.5 py-1.5 rounded text-[11px] font-medium transition-all duration-200 ease-in-out cursor-pointer ${location.search.includes('tab=add') ? 'bg-[#2D6A4F] text-white font-bold pl-3.5' : 'text-emerald-200/80 hover:text-white'
                    }`}
                >
                  <span
                    className={`absolute left-0 top-1 bottom-1 w-1 bg-[#52B788] rounded-r transition-all duration-200 ease-in-out ${location.search.includes('tab=add') ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
                      }`}
                  />
                  <PlusCircle className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                  <span className="truncate">Add New Park</span>
                </button>
                <button
                  onClick={() => navigate('/parks?tab=zones')}
                  className={`relative overflow-hidden w-full flex items-center gap-2 px-2.5 py-1.5 rounded text-[11px] font-medium transition-all duration-200 ease-in-out cursor-pointer ${location.search.includes('tab=zones') ? 'bg-[#2D6A4F] text-white font-bold pl-3.5' : 'text-emerald-200/80 hover:text-white'
                    }`}
                >
                  <span
                    className={`absolute left-0 top-1 bottom-1 w-1 bg-[#52B788] rounded-r transition-all duration-200 ease-in-out ${location.search.includes('tab=zones') ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
                      }`}
                  />
                  <Map className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                  <span className="truncate">Zone Management</span>
                </button>
              </div>
            )}
          </div>

          {/* FORESTS SECTION */}
          <div className="relative group w-full max-w-full">
            <button
              onClick={() => {
                setForestsOpen(!forestsOpen);
                if (!forestsOpen && !location.pathname.startsWith('/forests')) {
                  navigate('/forests');
                }
              }}
              title={isCollapsed ? "Forests" : undefined}
              className={`relative overflow-hidden w-full max-w-full flex ${
                isCollapsed 
                  ? 'flex-col items-center justify-center py-2 px-1 text-center' 
                  : 'flex-row items-center justify-between px-3 py-2.5'
                } rounded-lg text-xs font-semibold transition-all duration-200 ease-in-out cursor-pointer ${location.pathname.startsWith('/forests')
                  ? 'bg-emerald-900/80 text-white'
                  : 'text-emerald-100/90 hover:bg-emerald-900/60 hover:text-white'
                }`}
            >
              <span
                className={`absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#52B788] rounded-r transition-all duration-200 ease-in-out ${location.pathname.startsWith('/forests') ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
                  }`}
              />
              <div className={`flex ${isCollapsed ? 'flex-col items-center justify-center w-full max-w-full' : 'flex-row items-center gap-3 overflow-hidden'}`}>
                <ForestIcon className="w-5 h-5 text-emerald-300 shrink-0" />
                <span className={isCollapsed ? "text-[10px] font-semibold text-emerald-200/90 leading-tight text-center truncate w-full max-w-full mt-1" : "text-xs font-semibold truncate"}>
                  Forests
                </span>
              </div>
              {!isCollapsed && (
                forestsOpen ? (
                  <ChevronDown className="w-4 h-4 text-emerald-300 shrink-0" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-emerald-400 shrink-0" />
                )
              )}
            </button>

            {/* Forests Suboptions */}
            {forestsOpen && !isCollapsed && (
              <div className="mt-1 ml-4 pl-3 border-l border-emerald-700/60 space-y-1 overflow-x-hidden">
                <button
                  onClick={() => navigate('/forests')}
                  className={`relative overflow-hidden w-full flex items-center gap-2 px-2.5 py-1.5 rounded text-[11px] font-medium transition-all duration-200 ease-in-out cursor-pointer ${isActive('/forests') ? 'bg-[#2D6A4F] text-white font-bold pl-3.5' : 'text-emerald-200/80 hover:text-white'
                    }`}
                >
                  <span
                    className={`absolute left-0 top-1 bottom-1 w-1 bg-[#52B788] rounded-r transition-all duration-200 ease-in-out ${isActive('/forests') ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
                      }`}
                  />
                  <ForestIcon className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                  <span className="truncate">All Forests</span>
                </button>
                <button
                  onClick={() => navigate('/forests?tab=add')}
                  className={`relative overflow-hidden w-full flex items-center gap-2 px-2.5 py-1.5 rounded text-[11px] font-medium transition-all duration-200 ease-in-out cursor-pointer ${location.search.includes('tab=add') ? 'bg-[#2D6A4F] text-white font-bold pl-3.5' : 'text-emerald-200/80 hover:text-white'
                    }`}
                >
                  <span
                    className={`absolute left-0 top-1 bottom-1 w-1 bg-[#52B788] rounded-r transition-all duration-200 ease-in-out ${location.search.includes('tab=add') ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
                      }`}
                  />
                  <PlusCircle className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                  <span className="truncate">Add New Forest</span>
                </button>
                <button
                  onClick={() => navigate('/forests?tab=zones')}
                  className={`relative overflow-hidden w-full flex items-center gap-2 px-2.5 py-1.5 rounded text-[11px] font-medium transition-all duration-200 ease-in-out cursor-pointer ${location.search.includes('tab=zones') ? 'bg-[#2D6A4F] text-white font-bold pl-3.5' : 'text-emerald-200/80 hover:text-white'
                    }`}
                >
                  <span
                    className={`absolute left-0 top-1 bottom-1 w-1 bg-[#52B788] rounded-r transition-all duration-200 ease-in-out ${location.search.includes('tab=zones') ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
                      }`}
                  />
                  <Map className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                  <span className="truncate">Zone Management</span>
                </button>
              </div>
            )}
          </div>

          {/* LITTER DETECTION SECTION */}
          <div className="relative group w-full max-w-full">
            <button
              onClick={() => {
                setLitterOpen(!litterOpen);
                if (!litterOpen && !location.pathname.startsWith('/litter')) {
                  navigate('/litter/live');
                }
              }}
              title={isCollapsed ? "Litter Detection" : undefined}
              className={`relative overflow-hidden w-full max-w-full flex ${
                isCollapsed 
                  ? 'flex-col items-center justify-center py-2 px-1 text-center' 
                  : 'flex-row items-center justify-between px-3 py-2.5'
                } rounded-lg text-xs font-semibold transition-all duration-200 ease-in-out cursor-pointer ${location.pathname.startsWith('/litter')
                  ? 'bg-emerald-900/80 text-white'
                  : 'text-emerald-100/90 hover:bg-emerald-900/60 hover:text-white'
                }`}
            >
              <span
                className={`absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#52B788] rounded-r transition-all duration-200 ease-in-out ${location.pathname.startsWith('/litter') ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
                  }`}
              />
              <div className={`flex ${isCollapsed ? 'flex-col items-center justify-center w-full max-w-full' : 'flex-row items-center gap-3 overflow-hidden'}`}>
                <Trash2 className="w-5 h-5 text-emerald-300 shrink-0" />
                <span className={isCollapsed ? "text-[10px] font-semibold text-emerald-200/90 leading-tight text-center truncate w-full max-w-full mt-1" : "text-xs font-semibold truncate"}>
                  Litter
                </span>
              </div>
              {!isCollapsed && (
                litterOpen ? (
                  <ChevronDown className="w-4 h-4 text-emerald-300 shrink-0" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-emerald-400 shrink-0" />
                )
              )}
            </button>

            {/* Litter Detection Suboptions */}
            {litterOpen && !isCollapsed && (
              <div className="mt-1 ml-4 pl-3 border-l border-emerald-700/60 space-y-1 overflow-x-hidden">
                <button
                  onClick={() => navigate('/litter/live')}
                  className={`relative overflow-hidden w-full flex items-center gap-2 px-2.5 py-1.5 rounded text-[11px] font-medium transition-all duration-200 ease-in-out cursor-pointer ${isActive('/litter/live') || isActive('/litter') ? 'bg-[#2D6A4F] text-white font-bold pl-3.5' : 'text-emerald-200/80 hover:text-white'
                    }`}
                >
                  <span
                    className={`absolute left-0 top-1 bottom-1 w-1 bg-[#52B788] rounded-r transition-all duration-200 ease-in-out ${isActive('/litter/live') || isActive('/litter') ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
                      }`}
                  />
                  <Activity className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                  <span className="truncate">Live Feed</span>
                </button>
                <button
                  onClick={() => navigate('/litter/cameras')}
                  className={`relative overflow-hidden w-full flex items-center gap-2 px-2.5 py-1.5 rounded text-[11px] font-medium transition-all duration-200 ease-in-out cursor-pointer ${isActive('/litter/cameras') ? 'bg-[#2D6A4F] text-white font-bold pl-3.5' : 'text-emerald-200/80 hover:text-white'
                    }`}
                >
                  <span
                    className={`absolute left-0 top-1 bottom-1 w-1 bg-[#52B788] rounded-r transition-all duration-200 ease-in-out ${isActive('/litter/cameras') ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
                      }`}
                  />
                  <Camera className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                  <span className="truncate">Camera Management</span>
                </button>
                <button
                  onClick={() => navigate('/litter/history')}
                  className={`relative overflow-hidden w-full flex items-center gap-2 px-2.5 py-1.5 rounded text-[11px] font-medium transition-all duration-200 ease-in-out cursor-pointer ${isActive('/litter/history') ? 'bg-[#2D6A4F] text-white font-bold pl-3.5' : 'text-emerald-200/80 hover:text-white'
                    }`}
                >
                  <span
                    className={`absolute left-0 top-1 bottom-1 w-1 bg-[#52B788] rounded-r transition-all duration-200 ease-in-out ${isActive('/litter/history') ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
                      }`}
                  />
                  <History className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                  <span className="truncate">Detection History</span>
                </button>
                <button
                  onClick={() => navigate('/litter/heatmap')}
                  className={`relative overflow-hidden w-full flex items-center gap-2 px-2.5 py-1.5 rounded text-[11px] font-medium transition-all duration-200 ease-in-out cursor-pointer ${isActive('/litter/heatmap') ? 'bg-[#2D6A4F] text-white font-bold pl-3.5' : 'text-emerald-200/80 hover:text-white'
                    }`}
                >
                  <span
                    className={`absolute left-0 top-1 bottom-1 w-1 bg-[#52B788] rounded-r transition-all duration-200 ease-in-out ${isActive('/litter/heatmap') ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
                      }`}
                  />
                  <Map className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                  <span className="truncate">Heatmap</span>
                </button>
              </div>
            )}
          </div>

          {/* ALERTS SECTION */}
          <div className="relative group w-full max-w-full">
            <button
              onClick={() => navigate('/alerts')}
              title={isCollapsed ? "Alerts" : undefined}
              className={`relative overflow-hidden w-full max-w-full flex ${
                isCollapsed 
                  ? 'flex-col items-center justify-center py-2 px-1 text-center' 
                  : 'flex-row items-center justify-between px-3 py-2.5'
                } rounded-lg text-xs font-semibold transition-all duration-200 ease-in-out cursor-pointer ${location.pathname.startsWith('/alerts')
                  ? 'bg-[#2D6A4F] text-white shadow-sm'
                  : 'text-emerald-100/90 hover:bg-emerald-900/60 hover:text-white'
                }`}
            >
              <span
                className={`absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#52B788] rounded-r transition-all duration-200 ease-in-out ${location.pathname.startsWith('/alerts') ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
                  }`}
              />
              <div className={`flex ${isCollapsed ? 'flex-col items-center justify-center w-full max-w-full' : 'flex-row items-center gap-3 overflow-hidden'}`}>
                <Bell className="w-5 h-5 text-amber-400 shrink-0" />
                <span className={isCollapsed ? "text-[10px] font-semibold text-emerald-200/90 leading-tight text-center truncate w-full max-w-full mt-1" : "text-xs font-semibold truncate"}>
                  Alerts
                </span>
              </div>
              {!isCollapsed && (
                <span className="bg-[#E63946] text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm animate-alert-pulse shrink-0">
                  5 Active
                </span>
              )}
            </button>
          </div>

        </nav>
      </div>

      {/* Officer Profile & Logout */}
      <div className="p-3 border-t border-emerald-800/80 bg-emerald-950/40 space-y-3 overflow-x-hidden w-full max-w-full">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-2.5 overflow-hidden'}`}>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#52B788] via-[#2D6A4F] to-[#1B4332] border-2 border-emerald-400/60 shadow-md flex items-center justify-center text-white font-extrabold text-sm shrink-0">
            {currentUser?.fullName ? currentUser.fullName[0].toUpperCase() : 'R'}
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden min-w-0">
              <h4 className="text-xs font-bold text-white truncate leading-tight">
                {currentUser?.fullName || 'Rajiv Menon'}
              </h4>
              <p className="text-[10px] text-emerald-300 truncate">
                {currentUser?.role || 'Director General'} ({currentUser?.officerId || 'VP-DG-001'})
              </p>
            </div>
          )}
        </div>

        <button
          onClick={handleLogout}
          title="Logout"
          className={`w-full max-w-full flex items-center justify-center gap-2 py-1.5 ${isCollapsed ? 'px-2' : 'px-3'} rounded bg-emerald-900/80 hover:bg-red-900/80 text-xs font-semibold text-emerald-100 hover:text-white border border-emerald-700/60 hover:border-red-700 transition-colors cursor-pointer overflow-hidden`}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!isCollapsed && <span className="truncate">Logout</span>}
        </button>
      </div>
    </aside>
  );
}
