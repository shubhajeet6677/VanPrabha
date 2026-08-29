import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ParkMap from '../components/ParkMap';
import { PARKS, ACTIVE_ALERTS, SENSOR_SUMMARY } from '../data/mockData';
import { motion } from 'framer-motion';
import { ResponsiveContainer, LineChart, Line } from 'recharts';
import { 
  TreePine, 
  Cpu, 
  BellRing, 
  WifiOff, 
  MapPin, 
  Activity, 
  Thermometer, 
  Droplets, 
  Sprout, 
  Wind,
  ChevronRight,
  ShieldAlert,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [selectedParkId, setSelectedParkId] = useState(null);

  const stats = [
    {
      title: "Total Sites",
      value: "6",
      label: "Monitored Urban Reserves",
      icon: TreePine,
      color: "bg-emerald-50 text-[#1B4332] border-emerald-200"
    },
    {
      title: "Active Sensors",
      value: "42",
      label: "IoT Canopy & Soil Nodes",
      icon: Cpu,
      color: "bg-emerald-50 text-[#52B788] border-emerald-200"
    },
    {
      title: "Active Alerts",
      value: "3",
      label: "Requires Immediate Attention",
      icon: BellRing,
      color: "bg-amber-50 text-[#FFD166] border-amber-300",
      isGlow: true
    },
    {
      title: "Offline Sensors",
      value: "2",
      label: "Scheduled Field Maintenance",
      icon: WifiOff,
      color: "bg-red-50 text-[#E63946] border-red-200"
    }
  ];

  const getSensorIcon = (id) => {
    switch (id) {
      case 'temp': return Thermometer;
      case 'moisture': return Droplets;
      case 'npk': return Sprout;
      case 'humidity': return Wind;
      default: return Activity;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-slate-800 flex flex-col font-sans">
      <Navbar activeAlertsCount={ACTIVE_ALERTS.length} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* ROW 1: 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`p-5 rounded-2xl bg-white border shadow-sm relative overflow-hidden flex flex-col justify-between ${
                  stat.isGlow ? 'ring-2 ring-[#FFD166]/60 shadow-amber-100' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 tracking-wide uppercase">
                    {stat.title}
                  </span>
                  <div className={`p-2.5 rounded-xl border ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-3xl font-extrabold text-[#1B4332] tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-500 font-medium mt-1">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ROW 2: Leaflet Map (Left, Larger) + Active Alerts Panel (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Map Column (8/12) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-8 bg-white p-4 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col"
          >
            <div className="flex items-center justify-between mb-3 px-2">
              <div>
                <h2 className="text-lg font-bold text-[#1B4332] flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#52B788]" />
                  Forest Reserves Overview Map
                </h2>
                <p className="text-xs text-slate-500">
                  Live status pin markers: Green (Optimal), Yellow (Warning), Red (Critical Alert)
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium">
                <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-[#52B788]"></span> Normal
                </span>
                <span className="flex items-center gap-1.5 bg-amber-50 text-amber-800 px-2.5 py-1 rounded-full border border-amber-200">
                  <span className="w-2 h-2 rounded-full bg-[#FFD166]"></span> Warning
                </span>
                <span className="flex items-center gap-1.5 bg-red-50 text-red-800 px-2.5 py-1 rounded-full border border-red-200">
                  <span className="w-2 h-2 rounded-full bg-[#E63946]"></span> Critical
                </span>
              </div>
            </div>

            <div className="flex-1 min-h-[380px] relative">
              <ParkMap 
                parks={PARKS} 
                selectedParkId={selectedParkId} 
                onSelectPark={(id) => setSelectedParkId(id)} 
              />
            </div>
          </motion.div>

          {/* Active Alerts Panel (4/12) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4 bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-[#1B4332] flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-[#E63946]" />
                  Active Canopy Alerts
                </h2>
                <span className="text-xs font-bold text-[#E63946] bg-red-50 px-2.5 py-1 rounded-full border border-red-100">
                  {ACTIVE_ALERTS.length} Alerts
                </span>
              </div>

              <div className="space-y-3">
                {ACTIVE_ALERTS.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      alert.severity === 'critical'
                        ? 'bg-red-50/50 border-red-200 hover:border-red-300'
                        : 'bg-amber-50/50 border-amber-200 hover:border-amber-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                          alert.severity === 'critical' 
                            ? 'bg-[#E63946] text-white' 
                            : 'bg-[#FFD166] text-slate-900'
                        }`}>
                          {alert.type}
                        </span>
                        <h4 className="text-xs font-bold text-slate-800 mt-1.5">
                          {alert.siteName}
                        </h4>
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">
                        {alert.time}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {alert.message}
                    </p>

                    <button
                      onClick={() => navigate(`/site/${alert.siteId}`)}
                      className="mt-2.5 text-[11px] font-bold text-[#1B4332] hover:text-[#52B788] flex items-center gap-1 transition-colors"
                    >
                      Investigate Site
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-center">
              <span className="text-xs text-slate-400 font-medium">
                Automated telemetry synced 1 min ago
              </span>
            </div>
          </motion.div>

        </div>

        {/* ROW 3: Sites List (Left) + 4 Sensor Tiles with Sparklines (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Sites List (5/12) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5 bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-[#1B4332] flex items-center gap-2">
                <TreePine className="w-5 h-5 text-[#52B788]" />
                Monitored Forest Sites
              </h2>
              <span className="text-xs font-medium text-slate-500">6 Parks Active</span>
            </div>

            <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[340px] pr-1">
              {PARKS.map((park) => (
                <div
                  key={park.id}
                  onClick={() => navigate(`/site/${park.id}`)}
                  className="p-3.5 rounded-2xl border border-slate-100 hover:border-emerald-200 bg-slate-50/50 hover:bg-emerald-50/30 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                      park.status === 'critical' ? 'bg-[#E63946] animate-pulse' :
                      park.status === 'warning' ? 'bg-[#FFD166]' : 'bg-[#52B788]'
                    }`} />
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 group-hover:text-[#1B4332] transition-colors">
                        {park.name}
                      </h4>
                      <p className="text-[11px] text-slate-500">{park.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-xs font-medium text-slate-700">
                        {park.sensorsCount} Sensors
                      </div>
                      {park.alertsCount > 0 ? (
                        <span className="text-[10px] font-bold text-[#E63946]">
                          {park.alertsCount} Alert{park.alertsCount > 1 ? 's' : ''}
                        </span>
                      ) : (
                        <span className="text-[10px] text-emerald-600 font-medium">Optimal</span>
                      )}
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 4 Sensor Tiles with Sparklines (7/12) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-7 bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-[#1B4332] flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#52B788]" />
                Aggregate Sensor Telemetry
              </h2>
              <span className="text-xs font-medium text-slate-500">Real-time Averages</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SENSOR_SUMMARY.map((sensor) => {
                const Icon = getSensorIcon(sensor.id);
                const sparklineData = sensor.sparkline.map((val, idx) => ({ val, idx }));

                return (
                  <div
                    key={sensor.id}
                    className={`p-4 rounded-2xl border flex flex-col justify-between ${
                      sensor.isWarning
                        ? 'bg-amber-50/40 border-amber-200'
                        : 'bg-slate-50/50 border-slate-100'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-slate-500">
                          {sensor.title}
                        </span>
                        <Icon className={`w-4 h-4 ${sensor.isWarning ? 'text-amber-500' : 'text-[#52B788]'}`} />
                      </div>
                      <div className="flex items-baseline justify-between mt-1">
                        <span className="text-2xl font-bold text-[#1B4332]">
                          {sensor.value}
                        </span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          sensor.isWarning ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {sensor.status}
                        </span>
                      </div>
                    </div>

                    {/* Sparkline Chart */}
                    <div className="h-12 w-full mt-3">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={sparklineData}>
                          <Line
                            type="monotone"
                            dataKey="val"
                            stroke={sensor.isWarning ? '#FFD166' : '#52B788'}
                            strokeWidth={2.5}
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="text-[10px] text-slate-400 font-medium mt-1">
                      {sensor.change}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

        </div>

      </main>
    </div>
  );
}
