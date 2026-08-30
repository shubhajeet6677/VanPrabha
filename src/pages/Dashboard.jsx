import React, { useState } from 'react';
import Layout from '../components/Layout';
import ParkMap from '../components/ParkMap';
import { PARKS_LIST, SENSOR_SUMMARY } from '../data/mockData';
import { ResponsiveContainer, LineChart, Line } from 'recharts';
import { 
  TreePine, 
  Cpu, 
  Bell, 
  WifiOff, 
  MapPin, 
  Activity, 
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [selectedParkId, setSelectedParkId] = useState(null);

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

  return (
    <Layout>
      <div className="space-y-6">
        
        {/* ROW 1: Key Performance Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.title}
                className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between"
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

        {/* ROW 2: GIS Map & Active Alerts Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Map Container (8/12) */}
          <div className="lg:col-span-8 bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
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
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2D6A4F]"></span> Normal
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D97706]"></span> Warning
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626]"></span> Critical
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
          <div className="lg:col-span-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                <h2 className="text-base font-bold text-[#1B4332] flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-red-600" />
                  Active Canopy Alerts
                </h2>
                <span className="text-xs font-bold text-red-800 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                  5 Alerts Active
                </span>
              </div>

              <div className="space-y-3">
                <div 
                  onClick={() => navigate('/alerts')}
                  className="p-3 bg-red-50/50 rounded-lg border border-red-200 hover:border-red-400 transition-all cursor-pointer space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-red-700">Lodhi Park</span>
                    <span className="text-[10px] font-extrabold bg-red-600 text-white px-2 py-0.5 rounded">Critical</span>
                  </div>
                  <p className="text-xs text-slate-700">Soil Moisture critically low — Sensor LPSA2 (14%)</p>
                </div>

                <div 
                  onClick={() => navigate('/alerts')}
                  className="p-3 bg-red-50/50 rounded-lg border border-red-200 hover:border-red-400 transition-all cursor-pointer space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-red-700">Sanjay Park</span>
                    <span className="text-[10px] font-extrabold bg-red-600 text-white px-2 py-0.5 rounded">Critical</span>
                  </div>
                  <p className="text-xs text-slate-700">Thermal anomaly canopy temperature spike (34.1 °C)</p>
                </div>

                <div 
                  onClick={() => navigate('/alerts')}
                  className="p-3 bg-amber-50/50 rounded-lg border border-amber-200 hover:border-amber-400 transition-all cursor-pointer space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-800">Central Ridge Forest</span>
                    <span className="text-[10px] font-extrabold bg-amber-500 text-white px-2 py-0.5 rounded">Warning</span>
                  </div>
                  <p className="text-xs text-slate-700">Aquatic Dissolved Oxygen anomaly (7.9 mg/L)</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('/alerts')}
              className="w-full py-2 bg-[#1B4332] hover:bg-emerald-900 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer"
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
