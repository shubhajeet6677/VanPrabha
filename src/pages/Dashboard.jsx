import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ParkMap from '../components/ParkMap';
import { PARKS, ACTIVE_ALERTS, SENSOR_SUMMARY } from '../data/mockData';
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
      value: "6",
      label: "Urban Forest Reserves",
      icon: TreePine,
      badgeColor: "text-emerald-800 bg-emerald-100/70"
    },
    {
      title: "Active IoT Sensors",
      value: "42",
      label: "Canopy & Soil Nodes",
      icon: Cpu,
      badgeColor: "text-[#1B4332] bg-slate-100"
    },
    {
      title: "Active Alerts",
      value: "3",
      label: "Requires Operation Review",
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

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-slate-800 flex flex-col font-sans">
      <Navbar activeAlertsCount={ACTIVE_ALERTS.length} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* ROW 1: Key Performance Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.title}
                className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between"
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

        {/* ROW 2: GIS Map (Primary Visual Anchor) + Active Alerts Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Map Container (8/12) */}
          <div className="lg:col-span-8 bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 pb-2 border-b border-slate-100 gap-2">
              <div>
                <h2 className="text-base font-bold text-[#1B4332] flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#2D6A4F]" />
                  Forest Reserves GIS Overview Map
                </h2>
                <p className="text-xs text-slate-500">
                  Default location: New Delhi. Click pin markers or use location access button.
                </p>
              </div>
              
              {/* Legend */}
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

            <div className="flex-1 min-h-[420px] relative">
              <ParkMap 
                parks={PARKS} 
                selectedParkId={selectedParkId} 
                onSelectPark={(id) => setSelectedParkId(id)} 
              />
            </div>
          </div>

          {/* Active Alerts Panel (4/12) */}
          <div className="lg:col-span-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                <h2 className="text-base font-bold text-[#1B4332] flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-red-600" />
                  Active Canopy Alerts
                </h2>
                <span className="text-xs font-bold text-red-800 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                  {ACTIVE_ALERTS.length} Alerts
                </span>
              </div>

              <div className="space-y-3">
                {ACTIVE_ALERTS.map((alert) => (
                  <div
                    key={alert.id}
                    className="p-3 bg-slate-50 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                        alert.severity === 'critical' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-amber-100 text-amber-900'
                      }`}>
                        {alert.type}
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium">
                        {alert.time}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 mt-2">
                      {alert.siteName}
                    </h4>

                    <p className="text-xs text-slate-600 mt-1 leading-normal">
                      {alert.message}
                    </p>

                    <button
                      onClick={() => navigate(`/site/${alert.siteId}`)}
                      className="mt-2.5 text-xs font-semibold text-[#1B4332] hover:underline flex items-center gap-1"
                    >
                      Open Site Details
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-center">
              <span className="text-xs text-slate-500">
                Telemetry synchronized automatically
              </span>
            </div>
          </div>

        </div>

        {/* ROW 3: Sites List (Left) + 4 Aggregate Sensor Telemetry (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Sites Directory (5/12) */}
          <div className="lg:col-span-5 bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
              <h2 className="text-base font-bold text-[#1B4332] flex items-center gap-2">
                <TreePine className="w-4 h-4 text-[#2D6A4F]" />
                Monitored Forest Sites Directory
              </h2>
              <span className="text-xs text-slate-500 font-medium">6 Sites</span>
            </div>

            <div className="divide-y divide-slate-100 flex-1 overflow-y-auto max-h-[340px]">
              {PARKS.map((park) => (
                <div
                  key={park.id}
                  onClick={() => navigate(`/site/${park.id}`)}
                  className="py-3 px-2 hover:bg-slate-50 transition-colors cursor-pointer flex items-center justify-between rounded-md group"
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                      park.status === 'critical' ? 'bg-red-600' :
                      park.status === 'warning' ? 'bg-amber-500' : 'bg-emerald-600'
                    }`} />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#1B4332]">
                        {park.name}
                      </h4>
                      <p className="text-xs text-slate-500">{park.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-xs font-medium text-slate-700">
                        {park.sensorsCount} Nodes
                      </div>
                      {park.alertsCount > 0 ? (
                        <span className="text-xs font-semibold text-red-700">
                          {park.alertsCount} Alert{park.alertsCount > 1 ? 's' : ''}
                        </span>
                      ) : (
                        <span className="text-xs text-emerald-700 font-medium">Normal</span>
                      )}
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4 Sensor Telemetry Tiles (7/12) */}
          <div className="lg:col-span-7 bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
              <h2 className="text-base font-bold text-[#1B4332] flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#2D6A4F]" />
                Aggregate Sensor Telemetry
              </h2>
              <span className="text-xs text-slate-500 font-medium">Network Averages</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SENSOR_SUMMARY.map((sensor) => {
                const sparklineData = sensor.sparkline.map((val, idx) => ({ val, idx }));

                return (
                  <div
                    key={sensor.id}
                    className="p-3.5 bg-slate-50/80 rounded-lg border border-slate-200 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-slate-600">
                          {sensor.title}
                        </span>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                          sensor.isWarning ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'
                        }`}>
                          {sensor.status}
                        </span>
                      </div>
                      
                      <div className="text-2xl font-bold text-[#1B4332] mt-1">
                        {sensor.value}
                      </div>
                    </div>

                    {/* Sparkline Chart */}
                    <div className="h-10 w-full mt-2">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={sparklineData}>
                          <Line
                            type="monotone"
                            dataKey="val"
                            stroke={sensor.isWarning ? '#D97706' : '#2D6A4F'}
                            strokeWidth={2}
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="text-xs text-slate-500 font-medium mt-1">
                      {sensor.change}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
