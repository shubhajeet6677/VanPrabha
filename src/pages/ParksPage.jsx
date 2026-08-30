import React, { useState } from 'react';
import { useSearchParams, useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Tooltip from '../components/Tooltip';
import Breadcrumbs from '../components/Breadcrumbs';
import { useToast } from '../contexts/ToastContext';
import { formatRelativeTime } from '../lib/timeUtils';
import { PARKS_LIST } from '../data/mockData';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip as RechartsTooltip, 
  CartesianGrid 
} from 'recharts';
import { 
  TreePine, 
  Sprout, 
  Droplets, 
  Sun,
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
  CheckCircle2,
  AlertTriangle,
  Check
} from 'lucide-react';

export default function ParksPage() {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'all';
  const { parkId, sensorId } = useParams();
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();

  const [parks, setParks] = useState(PARKS_LIST);

  // Helper to slugify park names
  const getParkSlug = (park) => park.name.toLowerCase().replace(/\s+/g, '-');

  // Derive selected Park and Sensor from URL params
  const selectedPark = parkId
    ? parks.find(p => 
        p.id.toLowerCase() === parkId.toLowerCase() ||
        getParkSlug(p) === parkId.toLowerCase() ||
        p.abbr.toLowerCase() === parkId.toLowerCase() ||
        p.name.toLowerCase().replace(/[^a-z0-9]/g, '') === parkId.toLowerCase().replace(/[^a-z0-9]/g, '')
      )
    : null;

  const allSensorsInSelectedPark = selectedPark
    ? [
        ...(selectedPark.sensors.tree || []),
        ...(selectedPark.sensors.soil || []),
        ...(selectedPark.sensors.water || []),
        ...(selectedPark.sensors.ambient || [])
      ]
    : [];

  const selectedSensor = (selectedPark && sensorId)
    ? allSensorsInSelectedPark.find(s => s.id.toLowerCase() === sensorId.toLowerCase())
    : null;

  const currentParkSlug = selectedPark ? getParkSlug(selectedPark) : '';

  // New Park form state & validation
  const [newParkName, setNewParkName] = useState('');
  const [newParkAbbr, setNewParkAbbr] = useState('');
  const [newParkLocation, setNewParkLocation] = useState('');
  const [newParkDivision, setNewParkDivision] = useState('North');
  const [newParkZone, setNewParkZone] = useState('North Zone 1');
  const [formTouched, setFormTouched] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleAddPark = (e) => {
    e.preventDefault();
    setFormTouched(true);

    if (!newParkName.trim() || !newParkAbbr.trim()) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      showError('Please fill in all required park details.');
      return;
    }

    const abbrUpper = newParkAbbr.toUpperCase();
    const createdPark = {
      id: `park-${Date.now()}`,
      name: newParkName.trim(),
      abbr: abbrUpper,
      division: newParkDivision,
      zone: newParkZone,
      location: newParkLocation.trim() || 'New Delhi',
      sensors: {
        tree: [
          { id: `${abbrUpper}TA1`, name: `${newParkName} Tree Node #1`, latestReading: '1.2mm growth', unit: 'mm', status: 'Online', sparkline: [1.0, 1.1, 1.2, 1.2, 1.2, 1.2, 1.2], battery: 98, lastPing: 'Just now', history: Array.from({ length: 30 }, (_, i) => ({ day: `Day ${i + 1}`, reading: 1.2 })) },
          { id: `${abbrUpper}TA2`, name: `${newParkName} Tree Node #2`, latestReading: '0.8mm growth', unit: 'mm', status: 'Online', sparkline: [0.6, 0.7, 0.8, 0.8, 0.8, 0.8, 0.8], battery: 92, lastPing: '1 min ago', history: Array.from({ length: 30 }, (_, i) => ({ day: `Day ${i + 1}`, reading: 0.8 })) },
          { id: `${abbrUpper}TA3`, name: `${newParkName} Tree Node #3`, latestReading: '1.5mm growth', unit: 'mm', status: 'Online', sparkline: [1.2, 1.4, 1.5, 1.5, 1.5, 1.5, 1.5], battery: 95, lastPing: '2 mins ago', history: Array.from({ length: 30 }, (_, i) => ({ day: `Day ${i + 1}`, reading: 1.5 })) },
          { id: `${abbrUpper}TA4`, name: `${newParkName} Tree Node #4`, latestReading: '0.3mm growth', unit: 'mm', status: 'Offline', sparkline: [0.3, 0.3, 0, 0, 0, 0, 0], battery: 10, lastPing: '4 hours ago', history: Array.from({ length: 30 }, (_, i) => ({ day: `Day ${i + 1}`, reading: 0.3 })) }
        ],
        soil: [
          { id: `${abbrUpper}SA1`, name: `${newParkName} Soil Node #1`, latestReading: 'N=42, P=18, K=28, Moisture=58%', unit: '%', status: 'Online', sparkline: [52, 54, 56, 58, 58, 58, 58], battery: 96, lastPing: 'Just now', history: Array.from({ length: 30 }, (_, i) => ({ day: `Day ${i + 1}`, reading: 58 })) },
          { id: `${abbrUpper}SA2`, name: `${newParkName} Soil Node #2`, latestReading: 'N=31, P=12, K=22, Moisture=23%', unit: '%', status: 'Online', isAlert: true, alertMessage: 'CRITICAL: Low soil moisture threshold (23%)', sparkline: [48, 40, 32, 26, 23, 23, 23], battery: 88, lastPing: '1 min ago', history: Array.from({ length: 30 }, (_, i) => ({ day: `Day ${i + 1}`, reading: 23 })) },
          { id: `${abbrUpper}SA3`, name: `${newParkName} Soil Node #3`, latestReading: 'N=55, P=24, K=35, Moisture=61%', unit: '%', status: 'Online', sparkline: [58, 59, 61, 61, 61, 61, 61], battery: 94, lastPing: '4 mins ago', history: Array.from({ length: 30 }, (_, i) => ({ day: `Day ${i + 1}`, reading: 61 })) },
          { id: `${abbrUpper}SA4`, name: `${newParkName} Soil Node #4`, latestReading: 'N=38, P=15, K=19, Moisture=54%', unit: '%', status: 'Online', sparkline: [50, 52, 54, 54, 54, 54, 54], battery: 91, lastPing: '2 mins ago', history: Array.from({ length: 30 }, (_, i) => ({ day: `Day ${i + 1}`, reading: 54 })) }
        ],
        water: [
          { id: `${abbrUpper}WA1`, name: `${newParkName} Water Node #1`, latestReading: 'Turbidity=3.2 NTU, Temp=28°C, Flow=1.4 L/s', unit: 'NTU', status: 'Online', sparkline: [3.0, 3.1, 3.2, 3.2, 3.2, 3.2, 3.2], battery: 92, lastPing: 'Just now', history: Array.from({ length: 30 }, (_, i) => ({ day: `Day ${i + 1}`, reading: 3.2 })) },
          { id: `${abbrUpper}WA2`, name: `${newParkName} Water Node #2`, latestReading: 'Turbidity=7.8 NTU, Temp=29°C, Flow=1.1 L/s', unit: 'NTU', status: 'Online', sparkline: [7.2, 7.5, 7.8, 7.8, 7.8, 7.8, 7.8], battery: 97, lastPing: '3 mins ago', history: Array.from({ length: 30 }, (_, i) => ({ day: `Day ${i + 1}`, reading: 7.8 })) },
          { id: `${abbrUpper}WA3`, name: `${newParkName} Water Node #3`, latestReading: 'Turbidity=4.1 NTU, Temp=27°C, Flow=1.6 L/s', unit: 'NTU', status: 'Online', sparkline: [3.9, 4.0, 4.1, 4.1, 4.1, 4.1, 4.1], battery: 85, lastPing: '5 mins ago', history: Array.from({ length: 30 }, (_, i) => ({ day: `Day ${i + 1}`, reading: 4.1 })) },
          { id: `${abbrUpper}WA4`, name: `${newParkName} Water Node #4`, latestReading: 'Turbidity=2.9 NTU, Temp=28°C, Flow=0.9 L/s', unit: 'NTU', status: 'Offline', sparkline: [2.9, 2.9, 0, 0, 0, 0, 0], battery: 5, lastPing: '1 day ago', history: Array.from({ length: 30 }, (_, i) => ({ day: `Day ${i + 1}`, reading: 2.9 })) }
        ],
        ambient: [
          { id: `${abbrUpper}AM1`, name: 'Main Gate Ambient Station', location: 'Main Gate', latestReading: 'Temp=34°C, Humidity=72%', unit: '°C & %', status: 'Online', sparkline: [32, 33, 34, 34, 34, 34, 34], battery: 97, lastPing: '1 min ago', history: Array.from({ length: 30 }, (_, i) => ({ day: `Day ${i + 1}`, reading: 34 })) },
          { id: `${abbrUpper}AM2`, name: 'North Trail Ambient Station', location: 'North Trail', latestReading: 'Temp=32°C, Humidity=68%', unit: '°C & %', status: 'Online', sparkline: [30, 31, 32, 32, 32, 32, 32], battery: 94, lastPing: '3 mins ago', history: Array.from({ length: 30 }, (_, i) => ({ day: `Day ${i + 1}`, reading: 32 })) },
          { id: `${abbrUpper}AM3`, name: 'Picnic Zone Ambient Station', location: 'Picnic Zone', latestReading: 'Temp=36°C, Humidity=75%', unit: '°C & %', status: 'Online', sparkline: [34, 35, 36, 36, 36, 36, 36], battery: 91, lastPing: '2 mins ago', history: Array.from({ length: 30 }, (_, i) => ({ day: `Day ${i + 1}`, reading: 36 })) },
          { id: `${abbrUpper}AM4`, name: 'East Entrance Ambient Station', location: 'East Entrance', latestReading: 'Temp=33°C, Humidity=70%', unit: '°C & %', status: 'Online', sparkline: [31, 32, 33, 33, 33, 33, 33], battery: 95, lastPing: '4 mins ago', history: Array.from({ length: 30 }, (_, i) => ({ day: `Day ${i + 1}`, reading: 33 })) }
        ]
      }
    };

    setParks([createdPark, ...parks]);
    setNewParkName('');
    setNewParkAbbr('');
    setNewParkLocation('');
    setFormTouched(false);
    showSuccess(`Park "${createdPark.name}" registered successfully! All telemetry nodes active.`);
  };

  // Build dynamic breadcrumb items
  const breadcrumbItems = [
    { label: 'Parks', link: '/parks' },
    ...(activeTab === 'add' ? [{ label: 'Add New Park' }] : []),
    ...(activeTab === 'zones' ? [{ label: 'Zone Management' }] : []),
    ...(selectedPark ? [{ label: selectedPark.name, link: `/parks/${currentParkSlug}` }] : []),
    ...(selectedSensor ? [{ label: selectedSensor.id }] : [])
  ];

  // Helper to render sparkline mini chart
  const renderSparkline = (data, isAlert) => {
    const chartData = data.map((val, i) => ({ val, i }));
    return (
      <div className="h-9 w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <Line 
              type="monotone" 
              dataKey="val" 
              stroke={isAlert ? "#DC2626" : "#2D6A4F"} 
              strokeWidth={2} 
              dot={false} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <Layout>
      {/* Breadcrumb Trail */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <TreePine className="w-6 h-6 text-[#2D6A4F]" />
            <h1 className="text-2xl font-bold text-[#1B4332] tracking-tight">
              Urban Parks Telemetry Operations
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time IoT Sensor Monitoring for Tree 🌳, Soil 🌱, Water 💧, & Ambient 🌤️ Nodes
          </p>
        </div>
      </div>

      {/* Subtab View Handler */}
      {activeTab === 'add' ? (
        /* ADD NEW PARK SUBTAB */
        <div className={`bg-white p-6 rounded-xl border border-slate-200 shadow-sm max-w-2xl mx-auto space-y-4 ${isShaking ? 'animate-shake' : ''}`}>
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-[#1B4332] flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-[#2D6A4F]" />
              Register New Urban Park Site
            </h2>
          </div>

          <form onSubmit={handleAddPark} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                <span>Park Name *</span>
                {newParkName.trim() ? (
                  <span className="text-emerald-600 text-[11px] font-semibold flex items-center gap-1">
                    <Check className="w-3 h-3" /> Valid
                  </span>
                ) : formTouched ? (
                  <span className="text-red-500 text-[11px] font-semibold">This field is required</span>
                ) : null}
              </label>
              <input
                type="text"
                value={newParkName}
                onChange={(e) => setNewParkName(e.target.value)}
                placeholder="e.g. Lodhi Park"
                className={`w-full px-3 py-2 text-xs bg-slate-50 border rounded focus:outline-none transition-colors ${
                  formTouched && !newParkName.trim()
                    ? 'border-red-500 bg-red-50/30'
                    : newParkName.trim()
                    ? 'border-emerald-500 bg-emerald-50/20'
                    : 'border-slate-300'
                }`}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                  <span>Abbreviation Code (2-3 Letters) *</span>
                  {newParkAbbr.trim() ? (
                    <span className="text-emerald-600 text-[11px] font-semibold flex items-center gap-1">
                      <Check className="w-3 h-3" /> Valid
                    </span>
                  ) : formTouched ? (
                    <span className="text-red-500 text-[11px] font-semibold">This field is required</span>
                  ) : null}
                </label>
                <input
                  type="text"
                  maxLength={3}
                  value={newParkAbbr}
                  onChange={(e) => setNewParkAbbr(e.target.value)}
                  placeholder="e.g. LP"
                  className={`w-full px-3 py-2 text-xs bg-slate-50 border rounded focus:outline-none uppercase font-mono transition-colors ${
                    formTouched && !newParkAbbr.trim()
                      ? 'border-red-500 bg-red-50/30'
                      : newParkAbbr.trim()
                      ? 'border-emerald-500 bg-emerald-50/20'
                      : 'border-slate-300'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Geographic Location</label>
                <input
                  type="text"
                  value={newParkLocation}
                  onChange={(e) => setNewParkLocation(e.target.value)}
                  placeholder="e.g. Central New Delhi"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Division</label>
                <select
                  value={newParkDivision}
                  onChange={(e) => setNewParkDivision(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded focus:outline-none"
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
                  value={newParkZone}
                  onChange={(e) => setNewParkZone(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded focus:outline-none"
                >
                  <option value="North Zone 1">North Zone 1</option>
                  <option value="South Zone 1">South Zone 1</option>
                  <option value="East Zone 1">East Zone 1</option>
                  <option value="West Zone 1">West Zone 1</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#1B4332] hover:bg-emerald-900 text-white font-bold text-xs rounded shadow-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              Add Park to System
            </button>
          </form>
        </div>
      ) : activeTab === 'zones' ? (
        /* ZONE MANAGEMENT SUBTAB */
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-[#1B4332] flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#2D6A4F]" />
              Parks Zone Management Overview
            </h2>
            <p className="text-xs text-slate-500">Administrative zone distribution and sensor node density</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {['North Zone 1', 'South Zone 1', 'South Zone 2', 'West Zone 1'].map((z) => (
              <div key={z} className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-xs font-bold text-slate-900 block">{z}</span>
                <span className="text-2xl font-extrabold text-[#1B4332] block mt-1">16 Telemetry Nodes</span>
                <span className="text-[11px] text-slate-500 mt-1 block">Active Monitoring Operational</span>
              </div>
            ))}
          </div>
        </div>
      ) : selectedSensor ? (
        /* FULL SENSOR DETAIL PAGE VIEW */
        <div className="space-y-6">
          <button
            onClick={() => navigate(`/parks/${currentParkSlug}`)}
            className="text-xs font-bold text-slate-600 hover:text-[#1B4332] flex items-center gap-1.5 transition-colors cursor-pointer bg-white px-3 py-1.5 rounded border border-slate-200 shadow-sm w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {selectedPark.name} Sensors
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
                  Location: {selectedPark.name} ({selectedPark.zone})
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

            {/* Alert Banner if present */}
            {selectedSensor.isAlert && (
              <div className="p-3 bg-red-100 border-2 border-red-500 text-red-900 rounded-lg text-xs font-extrabold flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
                {selectedSensor.alertMessage || 'CRITICAL SENSOR ALERT DETECTED'}
              </div>
            )}

            {/* Large Current Reading Tile */}
            <div className={`p-6 rounded-xl shadow-inner flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-white ${
              selectedSensor.isAlert ? 'bg-red-900' : 'bg-[#1B4332]'
            }`}>
              <div>
                <span className="text-xs font-semibold text-emerald-200 uppercase tracking-wider block">
                  Latest Telemetry Reading
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1">
                  {selectedSensor.latestReading}
                </div>
                <p className="text-xs text-emerald-200/80 mt-1">
                  {selectedSensor.isAlert ? 'Critical deviation flagged by threshold rules' : 'Optimal operational threshold verified'}
                </p>
              </div>
              
              <div className="bg-white/10 p-4 rounded-lg border border-white/20 text-right">
                <div className="text-xs font-bold">Node Telemetry</div>
                <div className="text-sm font-semibold mt-0.5">Continuous Data Stream</div>
              </div>
            </div>

            {/* 30-Day Recharts Line Chart */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-[#1B4332] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#2D6A4F]" />
                30-Day Historical Sensor Trend Chart
              </h3>
              
              <div className="h-72 w-full bg-slate-50/50 p-4 rounded-xl border border-slate-200">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={selectedSensor.history} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="day" tick={{ fontSize: 11 }} interval={4} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: selectedSensor.isAlert ? '#7F1D1D' : '#1B4332', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                      itemStyle={{ color: '#52B788' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="reading" 
                      stroke={selectedSensor.isAlert ? '#DC2626' : '#2D6A4F'} 
                      strokeWidth={2.5}
                      dot={{ r: 3, fill: selectedSensor.isAlert ? '#DC2626' : '#2D6A4F' }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>
      ) : selectedPark ? (
        /* PARK SENSORS DETAIL VIEW (Tree 🌳, Soil 🌱, Water 💧, Ambient 🌤️) */
        <div className="space-y-6">
          <button
            onClick={() => navigate('/parks')}
            className="text-xs font-bold text-slate-600 hover:text-[#1B4332] flex items-center gap-1.5 transition-colors cursor-pointer bg-white px-3 py-1.5 rounded border border-slate-200 shadow-sm w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Parks
          </button>

          {/* Park Header Info */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-[#1B4332] tracking-tight">
                  {selectedPark.name}
                </h2>
                <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-900 text-xs font-mono font-bold border border-emerald-300">
                  {selectedPark.abbr}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#2D6A4F]" /> {selectedPark.location}</span>
                <span className="flex items-center gap-1"><Layers className="w-3.5 h-3.5 text-[#2D6A4F]" /> {selectedPark.zone} ({selectedPark.division} Division)</span>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs font-bold text-[#1B4332]">
              <TreePine className="w-4 h-4 text-[#2D6A4F]" />
              16 Telemetry Sensors Active
            </div>
          </div>

          {/* SECTION 1: 🌳 Tree Sensors */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 card-hover">
            <h3 className="sticky top-16 z-10 bg-[#1B4332] text-white p-3 rounded-lg shadow-md text-sm font-bold flex items-center gap-2 border-b border-emerald-800">
              🌳 Tree Sensors ({selectedPark.abbr}TA1 — {selectedPark.abbr}TA4)
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {selectedPark.sensors.tree.map((sensor) => (
                <div
                  key={sensor.id}
                  onClick={() => navigate(`/parks/${currentParkSlug}/${sensor.id}`)}
                  className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-[#2D6A4F] transition-all cursor-pointer shadow-sm group flex flex-col justify-between card-hover"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <Tooltip text={`Tree Sensor · ${selectedPark.name} · ${selectedPark.zone}`}>
                        <span className="text-xs font-mono font-bold text-slate-900 bg-slate-200 px-1.5 py-0.5 rounded hover:bg-slate-300 transition-colors cursor-help">
                          {sensor.id}
                        </span>
                      </Tooltip>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        sensor.status === 'Online' ? 'bg-emerald-100 text-emerald-800 status-glow-online' : 'bg-red-100 text-red-800 status-glow-offline'
                      }`}>
                        {sensor.status}
                      </span>
                    </div>

                    <div className="mt-3">
                      <div className="text-xl font-extrabold text-[#1B4332] tracking-tight">
                        {sensor.latestReading}
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                        {sensor.name}
                      </div>
                    </div>
                  </div>

                  {renderSparkline(sensor.sparkline)}

                  <div className="mt-2 text-[10px] text-slate-400 font-medium flex items-center justify-between pt-2 border-t border-slate-100">
                    <span>Ping: {formatRelativeTime(sensor.lastPing)}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#2D6A4F]" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 2: 🌱 Soil Sensors */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 card-hover">
            <h3 className="sticky top-16 z-10 bg-[#1B4332] text-white p-3 rounded-lg shadow-md text-sm font-bold flex items-center gap-2 border-b border-emerald-800">
              🌱 Soil Sensors ({selectedPark.abbr}SA1 — {selectedPark.abbr}SA4)
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {selectedPark.sensors.soil.map((sensor) => (
                <div
                  key={sensor.id}
                  onClick={() => navigate(`/parks/${currentParkSlug}/${sensor.id}`)}
                  className={`p-4 rounded-lg border transition-all cursor-pointer shadow-sm group flex flex-col justify-between card-hover ${
                    sensor.isAlert 
                      ? 'bg-red-50/60 border-2 border-red-500 hover:bg-red-50' 
                      : 'bg-slate-50/50 border-slate-200 hover:bg-white hover:border-[#2D6A4F]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <Tooltip text={`Soil Sensor · ${selectedPark.name} · ${selectedPark.zone}`}>
                        <span className="text-xs font-mono font-bold text-slate-900 bg-slate-200 px-1.5 py-0.5 rounded hover:bg-slate-300 transition-colors cursor-help">
                          {sensor.id}
                        </span>
                      </Tooltip>
                      
                      {sensor.isAlert ? (
                        <span className="text-[10px] font-extrabold bg-red-600 text-white px-2 py-0.5 rounded flex items-center gap-1 animate-pulse status-glow-offline">
                          <AlertTriangle className="w-3 h-3" />
                          CRITICAL ALERT
                        </span>
                      ) : (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          sensor.status === 'Online' ? 'bg-emerald-100 text-emerald-800 status-glow-online' : 'bg-red-100 text-red-800 status-glow-offline'
                        }`}>
                          {sensor.status}
                        </span>
                      )}
                    </div>

                    <div className="mt-3">
                      <div className={`text-sm font-extrabold tracking-tight leading-snug ${
                        sensor.isAlert ? 'text-red-700' : 'text-[#1B4332]'
                      }`}>
                        {sensor.latestReading}
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                        {sensor.name}
                      </div>
                    </div>
                  </div>

                  {renderSparkline(sensor.sparkline, sensor.isAlert)}

                  <div className="mt-2 text-[10px] text-slate-400 font-medium flex items-center justify-between pt-2 border-t border-slate-100">
                    <span>Ping: {formatRelativeTime(sensor.lastPing)}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#2D6A4F]" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 3: 💧 Water Sensors */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 card-hover">
            <h3 className="sticky top-16 z-10 bg-[#1B4332] text-white p-3 rounded-lg shadow-md text-sm font-bold flex items-center gap-2 border-b border-emerald-800">
              💧 Water Sensors ({selectedPark.abbr}WA1 — {selectedPark.abbr}WA4)
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {selectedPark.sensors.water.map((sensor) => (
                <div
                  key={sensor.id}
                  onClick={() => navigate(`/parks/${currentParkSlug}/${sensor.id}`)}
                  className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-[#2D6A4F] transition-all cursor-pointer shadow-sm group flex flex-col justify-between card-hover"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <Tooltip text={`Water Sensor · ${selectedPark.name} · ${selectedPark.zone}`}>
                        <span className="text-xs font-mono font-bold text-slate-900 bg-slate-200 px-1.5 py-0.5 rounded hover:bg-slate-300 transition-colors cursor-help">
                          {sensor.id}
                        </span>
                      </Tooltip>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        sensor.status === 'Online' ? 'bg-emerald-100 text-emerald-800 status-glow-online' : 'bg-red-100 text-red-800 status-glow-offline'
                      }`}>
                        {sensor.status}
                      </span>
                    </div>

                    <div className="mt-3">
                      <div className="text-xs font-extrabold text-[#1B4332] tracking-tight leading-snug">
                        {sensor.latestReading}
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                        {sensor.name}
                      </div>
                    </div>
                  </div>

                  {renderSparkline(sensor.sparkline)}

                  <div className="mt-2 text-[10px] text-slate-400 font-medium flex items-center justify-between pt-2 border-t border-slate-100">
                    <span>Ping: {formatRelativeTime(sensor.lastPing)}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#2D6A4F]" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 4: 🌤️ Ambient Sensors */}
          {selectedPark.sensors.ambient && (
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 card-hover">
              <h3 className="sticky top-16 z-10 bg-[#1B4332] text-white p-3 rounded-lg shadow-md text-sm font-bold flex items-center gap-2 border-b border-emerald-800">
                🌤️ Ambient Weather Stations (Main Gate, North Trail, Picnic Zone, East Entrance)
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {selectedPark.sensors.ambient.map((sensor) => (
                  <div
                    key={sensor.id}
                    onClick={() => navigate(`/parks/${currentParkSlug}/${sensor.id}`)}
                    className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-[#2D6A4F] transition-all cursor-pointer shadow-sm group flex flex-col justify-between card-hover"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <Tooltip text={`Ambient Station · ${sensor.location} · ${selectedPark.name}`}>
                          <span className="text-xs font-bold text-slate-900 bg-amber-100 text-amber-900 px-2 py-0.5 rounded cursor-help">
                            {sensor.location}
                          </span>
                        </Tooltip>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 status-glow-online">
                          {sensor.status}
                        </span>
                      </div>

                      <div className="mt-3">
                        <div className="text-sm font-extrabold text-[#1B4332] tracking-tight">
                          {sensor.latestReading}
                        </div>
                        <div className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                          {sensor.name}
                        </div>
                      </div>
                    </div>

                    {renderSparkline(sensor.sparkline)}

                    <div className="mt-2 text-[10px] text-slate-400 font-medium flex items-center justify-between pt-2 border-t border-slate-100">
                      <span>Ping: {formatRelativeTime(sensor.lastPing)}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#2D6A4F]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      ) : (
        /* LANDING GRID OF PARK CARDS */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {parks.map((park) => (
            <div
              key={park.id}
              onClick={() => navigate(`/parks/${getParkSlug(park)}`)}
              className="bg-white p-5 rounded-xl border border-slate-200 hover:border-[#2D6A4F] shadow-sm transition-all cursor-pointer flex flex-col justify-between group card-hover"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#1B4332] border border-emerald-200 flex items-center justify-center font-mono font-extrabold text-sm group-hover:bg-[#1B4332] group-hover:text-white transition-colors">
                    {park.abbr}
                  </div>
                  <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded">
                    16 Sensors
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#1B4332] group-hover:text-[#2D6A4F] transition-colors">
                  {park.name}
                </h3>
                
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#2D6A4F]" />
                  {park.location}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#1B4332]">
                <span className="text-slate-500 font-medium">{park.zone}</span>
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
