import React, { useState, useMemo } from 'react';
import Layout from '../components/Layout';
import ParkMap from '../components/ParkMap';
import Tooltip from '../components/Tooltip';
import { PARKS_LIST } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import { 
  TreePine, 
  Cpu, 
  Bell, 
  WifiOff, 
  MapPin, 
  Activity, 
  ChevronRight,
  ShieldAlert,
  CloudSun,
  Clock,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [selectedParkId, setSelectedParkId] = useState(null);

  const officerName = currentUser?.fullName || 'Officer Vikram';

  // Dynamic Greeting based on officer name and time of day
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return `Good morning, ${officerName}`;
    } else if (hour >= 12 && hour < 17) {
      return `Good afternoon, ${officerName}`;
    } else if (hour >= 17 && hour < 21) {
      return `Good evening, ${officerName}`;
    } else {
      return `Welcome back, ${officerName}`;
    }
  }, [officerName]);

  const stats = [
    {
      title: "Total Monitored Sites",
      value: "12",
      label: "6 Parks & 6 Forests",
      icon: TreePine,
      badgeColor: "text-emerald-800 bg-emerald-100/70"
    },
    {
      title: "Active IoT Sensors",
      value: "144",
      label: "Canopy, Soil, & Water Nodes",
      icon: Cpu,
      badgeColor: "text-[#1B4332] bg-slate-100"
    },
    {
      title: "Active Alerts",
      value: "5",
      label: "Requires Officer Review",
      icon: Bell,
      badgeColor: "text-amber-800 bg-amber-100/80"
    },
    {
      title: "Offline Sensors",
      value: "2",
      label: "Scheduled Field Check",
      icon: WifiOff,
      badgeColor: "text-red-800 bg-red-100/70"
    }
  ];

  const mapParks = PARKS_LIST.map((p, idx) => ({
    id: p.id,
    name: p.name,
    location: p.location,
    lat: 28.5933 + (idx * 0.02 - 0.04),
    lng: 77.2197 + (idx * 0.02 - 0.04),
    status: idx === 0 ? 'warning' : idx === 1 ? 'critical' : 'normal',
    sensorsCount: 12,
    alertsCount: idx === 0 ? 2 : idx === 1 ? 1 : 0
  }));

  // Quick Sensor Telemetry Cards for Dashboard
  const sensorReadings = [
    { id: 'LPTA1', park: 'Lodhi Park', type: 'Tree Sensor', reading: '1.4 mm growth', status: 'Online', time: 'Updated 3 mins ago' },
    { id: 'LPSA2', park: 'Lodhi Park', type: 'Soil Sensor', reading: 'Moisture 23%', status: 'Online', alert: true, time: 'Updated 3 mins ago' },
    { id: 'SVTA2', park: 'Sanjay Van', type: 'Tree Sensor', reading: '20.0 cm/h sap flow', status: 'Online', time: 'Updated 3 mins ago' },
    { id: 'CRWA1', park: 'Central Ridge', type: 'Water Sensor', reading: '7.9 mg/L DO', status: 'Offline', time: 'Updated 3 mins ago' }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        
        {/* DASHBOARD HEADER WITH DYNAMIC GREETING & WEATHER WIDGET */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600 animate-pulse" />
              <h1 className="text-2xl font-extrabold text-[#1B4332] tracking-tight">
                {greeting}
              </h1>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Urban Forest & Bio-reserve Operations Intelligence Headquarters
            </p>
          </div>

          {/* WEATHER WIDGET: Delhi | 34°C | Partly Cloudy */}
          <div className="flex items-center gap-3 bg-gradient-to-r from-emerald-50 to-teal-50/80 px-4 py-2.5 rounded-lg border border-emerald-200/80 shadow-xs shrink-0">
            <div className="p-2 rounded-full bg-amber-100 text-amber-600">
              <CloudSun className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold text-[#1B4332]">34°C</span>
                <span className="text-xs font-bold text-slate-700">Partly Cloudy</span>
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                Delhi, National Capital Region
              </div>
            </div>
          </div>
        </div>

        {/* ROW 1: Key Performance Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.title}
                className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between card-hover cursor-default"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-600">
                    {stat.title}
                  </span>
                  <div className={`p-2 rounded-md ${stat.badgeColor}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-3xl font-bold text-[#1B4332] tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* SENSOR TILES WITH "Updated 3 mins ago" TIMESTAMP */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="text-xs font-bold text-[#1B4332] flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-600" />
              Live Sensor Telemetry Quick-Look
            </h3>
            <span className="text-[11px] text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Telemetry Sync Active
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {sensorReadings.map((sensor) => (
              <div 
                key={sensor.id} 
                className="p-3 bg-slate-50 border border-slate-200 rounded-lg card-hover space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <Tooltip text={`${sensor.type} · ${sensor.park} · Zone Monitored`}>
                    <span className="font-mono text-xs font-bold text-emerald-900 bg-emerald-100/80 px-1.5 py-0.5 rounded border border-emerald-300/60 hover:bg-emerald-200 transition-colors cursor-help">
                      {sensor.id}
                    </span>
                  </Tooltip>
                  <span 
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      sensor.status === 'Online' 
                        ? 'bg-emerald-100 text-emerald-800 status-glow-online' 
                        : 'bg-red-100 text-red-800 status-glow-offline'
                    }`}
                  >
                    {sensor.status.toUpperCase()}
                  </span>
                </div>
                <div className="text-xs font-semibold text-slate-800 truncate">
                  {sensor.park} ({sensor.type})
                </div>
                <div className="text-sm font-bold text-[#1B4332]">
                  {sensor.reading}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium pt-1 border-t border-slate-200">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {sensor.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ROW 2: GIS Map & Active Alerts Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Map Container (8/12) */}
          <div className="lg:col-span-8 bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col card-hover">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 pb-2 border-b border-slate-100 gap-2">
              <div>
                <h2 className="text-base font-bold text-[#1B4332] flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#2D6A4F]" />
                  Forest & Park Reserves GIS Overview Map
                </h2>
                <p className="text-xs text-slate-500">
                  Interactive telemetry markers & GIS zoning across National Capital Region
                </p>
              </div>
              
              <div className="flex items-center gap-3 text-xs font-medium text-slate-600">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2D6A4F] status-glow-online"></span> Normal
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D97706]"></span> Warning
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626] status-glow-offline"></span> Critical
                </span>
              </div>
            </div>

            <div className="flex-1 min-h-[400px] relative">
              <ParkMap 
                parks={mapParks} 
                selectedParkId={selectedParkId} 
                onSelectPark={(id) => setSelectedParkId(id)} 
              />
            </div>
          </div>

          {/* Active Alerts Summary Panel (4/12) */}
          <div className="lg:col-span-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4 card-hover">
            <div>
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                <h2 className="text-base font-bold text-[#1B4332] flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-red-600 animate-pulse" />
                  Active Canopy Alerts
                </h2>
                <span className="text-xs font-bold text-white bg-[#E63946] px-2 py-0.5 rounded shadow-sm animate-alert-pulse">
                  5 Active
                </span>
              </div>

              <div className="space-y-3">
                <div 
                  onClick={() => navigate('/alerts')}
                  className="p-3 bg-red-50/50 rounded-lg border border-red-200 hover:border-red-400 transition-all cursor-pointer space-y-1 card-hover"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-red-700">Lodhi Park</span>
                    <span className="text-[10px] font-extrabold bg-red-600 text-white px-2 py-0.5 rounded status-glow-offline">Critical</span>
                  </div>
                  <p className="text-xs text-slate-700">Soil Moisture critically low — Sensor LPSA2 (14%)</p>
                  <div className="text-[10px] text-slate-400 font-medium">Updated 3 mins ago</div>
                </div>

                <div 
                  onClick={() => navigate('/alerts')}
                  className="p-3 bg-red-50/50 rounded-lg border border-red-200 hover:border-red-400 transition-all cursor-pointer space-y-1 card-hover"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-red-700">Sanjay Park</span>
                    <span className="text-[10px] font-extrabold bg-red-600 text-white px-2 py-0.5 rounded status-glow-offline">Critical</span>
                  </div>
                  <p className="text-xs text-slate-700">Thermal anomaly canopy temperature spike (34.1 °C)</p>
                  <div className="text-[10px] text-slate-400 font-medium">Updated 5 mins ago</div>
                </div>

                <div 
                  onClick={() => navigate('/alerts')}
                  className="p-3 bg-amber-50/50 rounded-lg border border-amber-200 hover:border-amber-400 transition-all cursor-pointer space-y-1 card-hover"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-800">Central Ridge Forest</span>
                    <span className="text-[10px] font-extrabold bg-amber-500 text-white px-2 py-0.5 rounded">Warning</span>
                  </div>
                  <p className="text-xs text-slate-700">Aquatic Dissolved Oxygen anomaly (7.9 mg/L)</p>
                  <div className="text-[10px] text-slate-400 font-medium">Updated 12 mins ago</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('/alerts')}
              className="w-full py-2.5 bg-[#1B4332] hover:bg-emerald-900 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer shadow-sm"
            >
              Open Alerts Operations Portal
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </Layout>
  );
}
