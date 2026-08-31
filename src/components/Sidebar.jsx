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
      className={`fixed top-0 left-0 z-40 h-screen bg-[#1B4332] text-white flex flex-col justify-between border-r border-emerald-900 shadow-lg transition-all duration-300 overflow-x-hidden max-w-full ${isCollapsed ? 'w-64 lg:w-20' : 'w-64'
        } ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
    >
      <div>
        {/* Brand Header */}
        <div className="h-16 px-4 border-b border-emerald-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-md bg-[#2D6A4F] text-white flex items-center justify-center border border-emerald-600/30 shrink-0">
              <Trees className="w-5 h-5" />
            </div>
            {!isCollapsed && (
              <div className="truncate">
                <h1 className="font-bold text-base text-white tracking-tight leading-tight">
                  VanPrabha
                </h1>
                <p className="text-[10px] text-emerald-200/80 font-medium">
                  Urban Forest Operations
                </p>
              </div>
            )}
          </div>

          {/* Desktop Sidebar Collapse Toggle */}
          <button
            onClick={toggleCollapse}
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            className="hidden lg:flex p-1.5 rounded-md hover:bg-emerald-800/60 text-emerald-300 hover:text-white transition-colors cursor-pointer"
          >
            {isCollapsed ? (
              <PanelLeftOpen className="w-4 h-4" />
            ) : (
              <PanelLeftClose className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1.5 overflow-y-auto overflow-x-hidden max-h-[calc(100vh-140px)] w-full max-w-full">

          {/* Dashboard */}
          <div className="relative group w-full">
            <button
              onClick={() => navigate('/dashboard')}
              className={`relative overflow-hidden w-full flex ${isCollapsed
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
              <span className={isCollapsed ? "text-[10px] font-semibold text-emerald-200/90 leading-tight text-center truncate max-w-full mt-1" : "text-xs font-semibold"}>
                Dashboard
              </span>
            </button>

            {/* Hover Tooltip */}
            <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden lg:block">
              <div className="bg-slate-900/95 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-xl border border-emerald-500/30 whitespace-nowrap relative">
                Dashboard Overview
                <div className="absolute top-1/2 -translate-y-1/2 -left-1 w-0 h-0 border-y-4 border-y-transparent border-r-4 border-r-slate-900/95" />
              </div>
            </div>
          </div>

          {/* PARKS SECTION */}
          <div className="relative group w-full">
            <button
              onClick={() => {
                setParksOpen(!parksOpen);
                if (!parksOpen && !location.pathname.startsWith('/parks')) {
                  navigate('/parks');
                }
              }}
              className={`relative overflow-hidden w-full flex ${isCollapsed
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
              <div className={`flex ${isCollapsed ? 'flex-col items-center justify-center' : 'flex-row items-center gap-3'}`}>
                <TreePine className="w-5 h-5 text-emerald-300 shrink-0" />
                <span className={isCollapsed ? "text-[10px] font-semibold text-emerald-200/90 leading-tight text-center truncate max-w-full mt-1" : "text-xs font-semibold"}>
                  Parks
                </span>
              </div>
              {!isCollapsed && (
                parksOpen ? (
                  <ChevronDown className="w-4 h-4 text-emerald-300" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-emerald-400" />
                )
              )}
            </button>

            {/* Hover Tooltip */}
            <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden lg:block">
              <div className="bg-slate-900/95 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-xl border border-emerald-500/30 whitespace-nowrap relative">
                Parks Operations
                <div className="absolute top-1/2 -translate-y-1/2 -left-1 w-0 h-0 border-y-4 border-y-transparent border-r-4 border-r-slate-900/95" />
              </div>
            </div>

            {/* Parks Suboptions */}
            {parksOpen && !isCollapsed && (
              <div className="mt-1 ml-4 pl-3 border-l border-emerald-700/60 space-y-1 overflow-x-hidden max-w-[calc(100%-1rem)]">
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
                  All Parks
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
                  Add New Park
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
                  Zone Management
                </button>
              </div>
            )}
          </div>

          {/* FORESTS SECTION */}
          <div className="relative group w-full">
            <button
              onClick={() => {
                setForestsOpen(!forestsOpen);
                if (!forestsOpen && !location.pathname.startsWith('/forests')) {
                  navigate('/forests');
                }
              }}
              className={`relative overflow-hidden w-full flex ${isCollapsed
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
              <div className={`flex ${isCollapsed ? 'flex-col items-center justify-center' : 'flex-row items-center gap-3'}`}>
                <ForestIcon className="w-5 h-5 text-emerald-300 shrink-0" />
                <span className={isCollapsed ? "text-[10px] font-semibold text-emerald-200/90 leading-tight text-center truncate max-w-full mt-1" : "text-xs font-semibold"}>
                  Forests
                </span>
              </div>
              {!isCollapsed && (
                forestsOpen ? (
                  <ChevronDown className="w-4 h-4 text-emerald-300" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-emerald-400" />
                )
              )}
            </button>

            {/* Hover Tooltip */}
            <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden lg:block">
              <div className="bg-slate-900/95 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-xl border border-emerald-500/30 whitespace-nowrap relative">
                Forest Reserves
                <div className="absolute top-1/2 -translate-y-1/2 -left-1 w-0 h-0 border-y-4 border-y-transparent border-r-4 border-r-slate-900/95" />
              </div>
            </div>

            {/* Forests Suboptions */}
            {forestsOpen && !isCollapsed && (
              <div className="mt-1 ml-4 pl-3 border-l border-emerald-700/60 space-y-1 overflow-x-hidden max-w-[calc(100%-1rem)]">
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
                  All Forests
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
                  Add New Forest
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
                  Zone Management
                </button>
              </div>
            )}
          </div>

          {/* LITTER DETECTION SECTION */}
          <div className="relative group w-full">
            <button
              onClick={() => {
                setLitterOpen(!litterOpen);
                if (!litterOpen && !location.pathname.startsWith('/litter')) {
                  navigate('/litter/live');
                }
              }}
              className={`relative overflow-hidden w-full flex ${isCollapsed
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
              <div className={`flex ${isCollapsed ? 'flex-col items-center justify-center' : 'flex-row items-center gap-3'}`}>
                <Trash2 className="w-5 h-5 text-emerald-300 shrink-0" />
                <span className={isCollapsed ? "text-[10px] font-semibold text-emerald-200/90 leading-tight text-center truncate max-w-full mt-1" : "text-xs font-semibold"}>
                  Litter
                </span>
              </div>
              {!isCollapsed && (
                litterOpen ? (
                  <ChevronDown className="w-4 h-4 text-emerald-300" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-emerald-400" />
                )
              )}
            </button>

            {/* Hover Tooltip */}
            <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden lg:block">
              <div className="bg-slate-900/95 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-xl border border-emerald-500/30 whitespace-nowrap relative">
                Litter Detection & AI Feeds
                <div className="absolute top-1/2 -translate-y-1/2 -left-1 w-0 h-0 border-y-4 border-y-transparent border-r-4 border-r-slate-900/95" />
              </div>
            </div>

            {/* Litter Detection Suboptions */}
            {litterOpen && !isCollapsed && (
              <div className="mt-1 ml-4 pl-3 border-l border-emerald-700/60 space-y-1 overflow-x-hidden max-w-[calc(100%-1rem)]">
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
                  Live Feed
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
                  Camera Management
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
                  Detection History
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
                  Heatmap
                </button>
              </div>
            )}
          </div>

          {/* ALERTS SECTION */}
          <div className="relative group w-full">
            <button
              onClick={() => navigate('/alerts')}
              className={`relative overflow-hidden w-full flex ${isCollapsed
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
              <div className={`flex ${isCollapsed ? 'flex-col items-center justify-center' : 'flex-row items-center gap-3'}`}>
                <Bell className="w-5 h-5 text-amber-400 shrink-0" />
                <span className={isCollapsed ? "text-[10px] font-semibold text-emerald-200/90 leading-tight text-center truncate max-w-full mt-1" : "text-xs font-semibold"}>
                  Alerts
                </span>
              </div>
              {!isCollapsed && (
                <span className="bg-[#E63946] text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm animate-alert-pulse">
                  5 Active
                </span>
              )}
            </button>

            {/* Hover Tooltip */}
            <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden lg:block">
              <div className="bg-slate-900/95 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-xl border border-emerald-500/30 whitespace-nowrap relative">
                Active Operations Alerts (5 Active)
                <div className="absolute top-1/2 -translate-y-1/2 -left-1 w-0 h-0 border-y-4 border-y-transparent border-r-4 border-r-slate-900/95" />
              </div>
            </div>
          </div>

        </nav>
      </div>

      {/* Officer Profile & Logout */}
      <div className="p-3 border-t border-emerald-800/80 bg-emerald-950/40 space-y-3 overflow-x-hidden max-w-full">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-2.5'}`}>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#52B788] via-[#2D6A4F] to-[#1B4332] border-2 border-emerald-400/60 shadow-md flex items-center justify-center text-white font-extrabold text-sm shrink-0">
            {currentUser?.fullName ? currentUser.fullName[0].toUpperCase() : 'R'}
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden">
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
          className={`w-full flex items-center justify-center gap-2 py-1.5 ${isCollapsed ? 'px-2' : 'px-3'} rounded bg-emerald-900/80 hover:bg-red-900/80 text-xs font-semibold text-emerald-100 hover:text-white border border-emerald-700/60 hover:border-red-700 transition-colors cursor-pointer`}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
