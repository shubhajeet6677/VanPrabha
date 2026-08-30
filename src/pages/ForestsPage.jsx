import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { FORESTS_LIST } from '../data/mockData';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { 
  Trees as ForestIcon, 
  Sprout, 
  Droplets, 
  ArrowLeft, 
  Battery, 
  Clock, 
  Wifi, 
  WifiOff, 
  PlusCircle, 
  MapPin, 
  Layers,
  ChevronRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export default function ForestsPage() {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'all';

  const [forests, setForests] = useState(FORESTS_LIST);
  const [selectedForest, setSelectedForest] = useState(null);
  const [selectedSensor, setSelectedSensor] = useState(null);

  // New Forest form state
  const [newForestName, setNewForestName] = useState('');
  const [newForestAbbr, setNewForestAbbr] = useState('');
  const [newForestLocation, setNewForestLocation] = useState('');
  const [newForestDivision, setNewForestDivision] = useState('North');
  const [newForestZone, setNewForestZone] = useState('North Zone 2');
  const [addedSuccess, setAddedSuccess] = useState(false);

  const handleAddForest = (e) => {
    e.preventDefault();
    if (!newForestName || !newForestAbbr) return;

    const abbrUpper = newForestAbbr.toUpperCase();
    const createdForest = {
      id: `forest-${Date.now()}`,
      name: newForestName,
      abbr: abbrUpper,
      division: newForestDivision,
      zone: newForestZone,
      location: newForestLocation || 'Forest Reserve',
      sensors: {
        tree: [
          { id: `${abbrUpper}TA1`, name: `${newForestName} Forest Node #1`, latestReading: '25.0 °C', unit: '°C', status: 'Online', sparkline: [24, 25, 25, 25, 25, 25, 25], battery: 98, lastPing: 'Just now', history: Array.from({ length: 30 }, (_, i) => ({ day: `Day ${i + 1}`, reading: 25 })) },
          { id: `${abbrUpper}TA2`, name: `${newForestName} Forest Node #2`, latestReading: '20.0 cm/h', unit: 'cm/h', status: 'Online', sparkline: [19, 20, 20, 20, 20, 20, 20], battery: 94, lastPing: '1 min ago', history: Array.from({ length: 30 }, (_, i) => ({ day: `Day ${i + 1}`, reading: 20 })) },
          { id: `${abbrUpper}TA3`, name: `${newForestName} Forest Node #3`, latestReading: '90 %', unit: '%', status: 'Online', sparkline: [88, 90, 90, 90, 90, 90, 90], battery: 96, lastPing: '2 mins ago', history: Array.from({ length: 30 }, (_, i) => ({ day: `Day ${i + 1}`, reading: 90 })) },
          { id: `${abbrUpper}TA4`, name: `${newForestName} Forest Node #4`, latestReading: '1500 µmol', unit: 'µmol', status: 'Online', sparkline: [1480, 1500, 1500, 1500, 1500, 1500, 1500], battery: 92, lastPing: '3 mins ago', history: Array.from({ length: 30 }, (_, i) => ({ day: `Day ${i + 1}`, reading: 1500 })) }
        ],
        soil: [
          { id: `${abbrUpper}SA1`, name: `${newForestName} Soil Node #1`, latestReading: '50 %', unit: '%', status: 'Online', sparkline: [48, 50, 50, 50, 50, 50, 50], battery: 97, lastPing: 'Just now', history: Array.from({ length: 30 }, (_, i) => ({ day: `Day ${i + 1}`, reading: 50 })) },
          { id: `${abbrUpper}SA2`, name: `${newForestName} Soil Node #2`, latestReading: '145/40/115', unit: 'ppm', status: 'Online', sparkline: [140, 145, 145, 145, 145, 145, 145], battery: 93, lastPing: '2 mins ago', history: Array.from({ length: 30 }, (_, i) => ({ day: `Day ${i + 1}`, reading: 145 })) },
          { id: `${abbrUpper}SA3`, name: `${newForestName} Soil Node #3`, latestReading: '6.6 pH', unit: 'pH', status: 'Online', sparkline: [6.5, 6.6, 6.6, 6.6, 6.6, 6.6, 6.6], battery: 95, lastPing: '4 mins ago', history: Array.from({ length: 30 }, (_, i) => ({ day: `Day ${i + 1}`, reading: 6.6 })) },
          { id: `${abbrUpper}SA4`, name: `${newForestName} Soil Node #4`, latestReading: '1.2 dS/m', unit: 'dS/m', status: 'Online', sparkline: [1.1, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2], battery: 90, lastPing: '1 min ago', history: Array.from({ length: 30 }, (_, i) => ({ day: `Day ${i + 1}`, reading: 1.2 })) }
        ],
        water: [
          { id: `${abbrUpper}WA1`, name: `${newForestName} Water Node #1`, latestReading: '2.2 m', unit: 'm', status: 'Online', sparkline: [2.1, 2.2, 2.2, 2.2, 2.2, 2.2, 2.2], battery: 94, lastPing: 'Just now', history: Array.from({ length: 30 }, (_, i) => ({ day: `Day ${i + 1}`, reading: 2.2 })) },
          { id: `${abbrUpper}WA2`, name: `${newForestName} Water Node #2`, latestReading: '7.8 mg/L', unit: 'mg/L', status: 'Online', sparkline: [7.5, 7.8, 7.8, 7.8, 7.8, 7.8, 7.8], battery: 98, lastPing: '3 mins ago', history: Array.from({ length: 30 }, (_, i) => ({ day: `Day ${i + 1}`, reading: 7.8 })) },
          { id: `${abbrUpper}WA3`, name: `${newForestName} Water Node #3`, latestReading: '2.9 NTU', unit: 'NTU', status: 'Online', sparkline: [2.8, 2.9, 2.9, 2.9, 2.9, 2.9, 2.9], battery: 89, lastPing: '5 mins ago', history: Array.from({ length: 30 }, (_, i) => ({ day: `Day ${i + 1}`, reading: 2.9 })) },
          { id: `${abbrUpper}WA4`, name: `${newForestName} Water Node #4`, latestReading: '21.0 °C', unit: '°C', status: 'Online', sparkline: [20, 21, 21, 21, 21, 21, 21], battery: 93, lastPing: '2 mins ago', history: Array.from({ length: 30 }, (_, i) => ({ day: `Day ${i + 1}`, reading: 21 })) }
        ]
      }
    };

    setForests([createdForest, ...forests]);
    setNewForestName('');
    setNewForestAbbr('');
    setNewForestLocation('');
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 3000);
  };

  const renderSparkline = (data) => {
    const chartData = data.map((val, i) => ({ val, i }));
    return (
      <div className="h-9 w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <Line type="monotone" dataKey="val" stroke="#2D6A4F" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <Layout>
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <ForestIcon className="w-6 h-6 text-[#2D6A4F]" />
            <h1 className="text-2xl font-bold text-[#1B4332] tracking-tight">
              Forest Reserves Directory
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Canopy & Ecosystem IoT Telemetry for Tree 🌳, Soil 🌱, & Water 💧 Nodes
          </p>
        </div>
      </div>

      {activeTab === 'add' ? (
        /* ADD NEW FOREST SUBTAB */
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm max-w-2xl mx-auto space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-[#1B4332] flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-[#2D6A4F]" />
              Register New Forest Reserve
            </h2>
          </div>

          {addedSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-md flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Forest Reserve registered successfully! 12 sensor nodes active.
            </div>
          )}

          <form onSubmit={handleAddForest} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Forest Name</label>
              <input
                type="text"
                required
                value={newForestName}
                onChange={(e) => setNewForestName(e.target.value)}
                placeholder="e.g. Central Ridge Forest"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Abbreviation Code (2 Letters)</label>
                <input
                  type="text"
                  required
                  maxLength={3}
                  value={newForestAbbr}
                  onChange={(e) => setNewForestAbbr(e.target.value)}
                  placeholder="e.g. CF"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] uppercase font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Geographic Location</label>
                <input
                  type="text"
                  value={newForestLocation}
                  onChange={(e) => setNewForestLocation(e.target.value)}
                  placeholder="e.g. Dhaula Kuan, Delhi"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Division</label>
                <select
                  value={newForestDivision}
                  onChange={(e) => setNewForestDivision(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                >
                  <option value="North">North Division</option>
                  <option value="South">South Division</option>
                  <option value="East">East Division</option>
                  <option value="West">West Division</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Assigned Zone</label>
                <select
                  value={newForestZone}
                  onChange={(e) => setNewForestZone(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                >
                  <option value="North Zone 2">North Zone 2</option>
                  <option value="South Zone 2">South Zone 2</option>
                  <option value="East Zone 2">East Zone 2</option>
                  <option value="West Zone 2">West Zone 2</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#1B4332] hover:bg-emerald-900 text-white font-bold text-xs rounded shadow-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              Register Forest Reserve
            </button>
          </form>
        </div>
      ) : activeTab === 'zones' ? (
        /* ZONE MANAGEMENT SUBTAB */
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-[#1B4332] flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#2D6A4F]" />
              Forest Reserves Zone Management Overview
            </h2>
            <p className="text-xs text-slate-500">Dense canopy coverage and wild reserve zoning</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {['North Zone 2', 'South Zone 2', 'East Zone 2', 'West Zone 2'].map((z) => (
              <div key={z} className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-xs font-bold text-slate-900 block">{z}</span>
                <span className="text-2xl font-extrabold text-[#1B4332] block mt-1">12 Forest Nodes</span>
                <span className="text-[11px] text-slate-500 mt-1 block">Wild Ecosystem Active</span>
              </div>
            ))}
          </div>
        </div>
      ) : selectedSensor ? (
        /* FULL SENSOR DETAIL PAGE VIEW */
        <div className="space-y-6">
          <button
            onClick={() => setSelectedSensor(null)}
            className="text-xs font-bold text-slate-600 hover:text-[#1B4332] flex items-center gap-1.5 transition-colors cursor-pointer bg-white px-3 py-1.5 rounded border border-slate-200 shadow-sm w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {selectedForest.name} Sensors
          </button>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-300 font-mono">
                    {selectedSensor.id}
                  </span>
                  <h2 className="text-xl font-bold text-[#1B4332]">
                    {selectedSensor.name}
                  </h2>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Location: {selectedForest.name} ({selectedForest.zone})
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 ${
                  selectedSensor.status === 'Online'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-red-100 text-red-800 border border-red-300'
                }`}>
                  {selectedSensor.status === 'Online' ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
                  {selectedSensor.status}
                </span>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700">
                  <Battery className="w-4 h-4 text-emerald-700" />
                  {selectedSensor.battery}% Battery
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-slate-100 border border-slate-200 text-xs font-medium text-slate-600">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  {selectedSensor.lastPing}
                </div>
              </div>
            </div>

            <div className="bg-[#1B4332] text-white p-6 rounded-xl shadow-inner flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-emerald-200 uppercase tracking-wider block">
                  Latest Telemetry Reading
                </span>
                <div className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-1">
                  {selectedSensor.latestReading}
                </div>
                <p className="text-xs text-emerald-200/80 mt-1">
                  Forest ecosystem optimal baseline
                </p>
              </div>
              
              <div className="bg-emerald-900/60 p-4 rounded-lg border border-emerald-700/50 text-right">
                <div className="text-xs font-bold text-emerald-100">Sensor Status</div>
                <div className="text-sm font-semibold text-emerald-300 mt-0.5">Continuous Monitoring Active</div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-bold text-[#1B4332] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#2D6A4F]" />
                30-Day Forest Telemetry Trend Chart
              </h3>
              
              <div className="h-72 w-full bg-slate-50/50 p-4 rounded-xl border border-slate-200">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={selectedSensor.history} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="day" tick={{ fontSize: 11 }} interval={4} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1B4332', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                      itemStyle={{ color: '#52B788' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="reading" 
                      stroke="#2D6A4F" 
                      strokeWidth={2.5}
                      dot={{ r: 3, fill: '#2D6A4F' }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>
      ) : selectedForest ? (
        /* FOREST SENSORS DETAIL VIEW (Tree, Soil, Water) */
        <div className="space-y-6">
          <button
            onClick={() => setSelectedForest(null)}
            className="text-xs font-bold text-slate-600 hover:text-[#1B4332] flex items-center gap-1.5 transition-colors cursor-pointer bg-white px-3 py-1.5 rounded border border-slate-200 shadow-sm w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Forests
          </button>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-[#1B4332] tracking-tight">
                  {selectedForest.name}
                </h2>
                <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-900 text-xs font-mono font-bold border border-emerald-300">
                  {selectedForest.abbr}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#2D6A4F]" /> {selectedForest.location}</span>
                <span className="flex items-center gap-1"><Layers className="w-3.5 h-3.5 text-[#2D6A4F]" /> {selectedForest.zone} ({selectedForest.division} Division)</span>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs font-bold text-[#1B4332]">
              <ForestIcon className="w-4 h-4 text-[#2D6A4F]" />
              12 IoT Sensor Nodes Active
            </div>
          </div>

          {/* SECTION 1: 🌳 Tree Sensors */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-[#1B4332] flex items-center gap-2 pb-2 border-b border-slate-100">
              🌳 Tree Sensors ({selectedForest.abbr}TA1 — {selectedForest.abbr}TA4)
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {selectedForest.sensors.tree.map((sensor) => (
                <div
                  key={sensor.id}
                  onClick={() => setSelectedSensor(sensor)}
                  className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-[#2D6A4F] transition-all cursor-pointer shadow-sm group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-slate-900 bg-slate-200 px-1.5 py-0.5 rounded">
                        {sensor.id}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        sensor.status === 'Online' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {sensor.status}
                      </span>
                    </div>

                    <div className="mt-3">
                      <div className="text-2xl font-extrabold text-[#1B4332] tracking-tight">
                        {sensor.latestReading}
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                        {sensor.name}
                      </div>
                    </div>
                  </div>

                  {renderSparkline(sensor.sparkline)}

                  <div className="mt-2 text-[10px] text-slate-400 font-medium flex items-center justify-between pt-2 border-t border-slate-100">
                    <span>Ping: {sensor.lastPing}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#2D6A4F]" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 2: 🌱 Soil Sensors */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-[#1B4332] flex items-center gap-2 pb-2 border-b border-slate-100">
              🌱 Soil Sensors ({selectedForest.abbr}SA1 — {selectedForest.abbr}SA4)
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {selectedForest.sensors.soil.map((sensor) => (
                <div
                  key={sensor.id}
                  onClick={() => setSelectedSensor(sensor)}
                  className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-[#2D6A4F] transition-all cursor-pointer shadow-sm group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-slate-900 bg-slate-200 px-1.5 py-0.5 rounded">
                        {sensor.id}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        sensor.status === 'Online' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {sensor.status}
                      </span>
                    </div>

                    <div className="mt-3">
                      <div className="text-2xl font-extrabold text-[#1B4332] tracking-tight">
                        {sensor.latestReading}
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                        {sensor.name}
                      </div>
                    </div>
                  </div>

                  {renderSparkline(sensor.sparkline)}

                  <div className="mt-2 text-[10px] text-slate-400 font-medium flex items-center justify-between pt-2 border-t border-slate-100">
                    <span>Ping: {sensor.lastPing}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#2D6A4F]" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 3: 💧 Water Sensors */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-[#1B4332] flex items-center gap-2 pb-2 border-b border-slate-100">
              💧 Water Sensors ({selectedForest.abbr}WA1 — {selectedForest.abbr}WA4)
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {selectedForest.sensors.water.map((sensor) => (
                <div
                  key={sensor.id}
                  onClick={() => setSelectedSensor(sensor)}
                  className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-[#2D6A4F] transition-all cursor-pointer shadow-sm group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-slate-900 bg-slate-200 px-1.5 py-0.5 rounded">
                        {sensor.id}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        sensor.status === 'Online' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {sensor.status}
                      </span>
                    </div>

                    <div className="mt-3">
                      <div className="text-2xl font-extrabold text-[#1B4332] tracking-tight">
                        {sensor.latestReading}
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                        {sensor.name}
                      </div>
                    </div>
                  </div>

                  {renderSparkline(sensor.sparkline)}

                  <div className="mt-2 text-[10px] text-slate-400 font-medium flex items-center justify-between pt-2 border-t border-slate-100">
                    <span>Ping: {sensor.lastPing}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#2D6A4F]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* LANDING GRID OF FOREST CARDS */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {forests.map((forest) => (
            <div
              key={forest.id}
              onClick={() => setSelectedForest(forest)}
              className="bg-white p-5 rounded-xl border border-slate-200 hover:border-[#2D6A4F] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#1B4332] border border-emerald-200 flex items-center justify-center font-mono font-extrabold text-sm group-hover:bg-[#1B4332] group-hover:text-white transition-colors">
                    {forest.abbr}
                  </div>
                  <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded">
                    12 Sensors
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#1B4332] group-hover:text-[#2D6A4F] transition-colors">
                  {forest.name}
                </h3>
                
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#2D6A4F]" />
                  {forest.location}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#1B4332]">
                <span className="text-slate-500 font-medium">{forest.zone}</span>
                <span className="flex items-center gap-1 group-hover:underline">
                  View Sensor Grid
                  <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}
