import React, { useState } from 'react';
import { useSearchParams, useParams, useNavigate } from 'react-router-dom';
import Layout from './Layout';
import Breadcrumbs from './Breadcrumbs';
import { useToast } from '../contexts/ToastContext';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid 
} from 'recharts';
import { 
  TreePine, 
  Trees as ForestIcon, 
  ArrowLeft, 
  Battery, 
  Clock, 
  Wifi, 
  WifiOff, 
  PlusCircle, 
  MapPin, 
  Layers,
  ChevronRight
} from 'lucide-react';

export default function TelemetryPage({
  siteType, // 'parks' | 'forests'
  initialSites,
  siteTitle,
  singleSiteTitle,
  baseRoute
}) {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'all';
  const routeParams = useParams();
  const siteId = routeParams.parkId || routeParams.forestId;
  const sensorId = routeParams.sensorId;
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();

  const [sites, setSites] = useState(initialSites);

  const getSiteSlug = (site) => site.name.toLowerCase().replace(/\s+/g, '-');

  const selectedSite = siteId
    ? sites.find(s => 
        s.id.toLowerCase() === siteId.toLowerCase() ||
        getSiteSlug(s) === siteId.toLowerCase() ||
        s.abbr.toLowerCase() === siteId.toLowerCase() ||
        s.name.toLowerCase().replace(/[^a-z0-9]/g, '') === siteId.toLowerCase().replace(/[^a-z0-9]/g, '')
      )
    : null;

  const allSensorsInSelectedSite = selectedSite
    ? [
        ...(selectedSite.sensors.tree || []),
        ...(selectedSite.sensors.soil || []),
        ...(selectedSite.sensors.water || []),
        ...(selectedSite.sensors.ambient || [])
      ]
    : [];

  const selectedSensor = (selectedSite && sensorId)
    ? allSensorsInSelectedSite.find(s => s.id.toLowerCase() === sensorId.toLowerCase())
    : null;

  const currentSiteSlug = selectedSite ? getSiteSlug(selectedSite) : '';

  // New site form state & validation
  const [newName, setNewName] = useState('');
  const [newAbbr, setNewAbbr] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newDivision, setNewDivision] = useState('North');
  const [newZone, setNewZone] = useState('North Zone 1');
  const [formTouched, setFormTouched] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleAddSite = (e) => {
    e.preventDefault();
    setFormTouched(true);

    if (!newName.trim() || !newAbbr.trim()) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      showError(`Please fill in all required ${singleSiteTitle.toLowerCase()} details.`);
      return;
    }

    const abbrUpper = newAbbr.toUpperCase();
    const createdSite = {
      id: `${siteType.slice(0, -1)}-${Date.now()}`,
      name: newName.trim(),
      abbr: abbrUpper,
      division: newDivision,
      zone: newZone,
      location: newLocation.trim() || 'Reserve Area',
      sensors: {
        tree: [
          { id: `${abbrUpper}TA1`, name: `${newName} Tree Node #1`, latestReading: '1.2mm growth', unit: 'mm', status: 'Online', sparkline: [1.0, 1.1, 1.2, 1.2, 1.2, 1.2, 1.2], battery: 98, lastPing: 'Just now', history: Array.from({ length: 30 }, (_, i) => ({ day: `Day ${i + 1}`, reading: 1.2 })) },
          { id: `${abbrUpper}TA2`, name: `${newName} Tree Node #2`, latestReading: '0.8mm growth', unit: 'mm', status: 'Online', sparkline: [0.6, 0.7, 0.8, 0.8, 0.8, 0.8, 0.8], battery: 92, lastPing: '1 min ago', history: Array.from({ length: 30 }, (_, i) => ({ day: `Day ${i + 1}`, reading: 0.8 })) }
        ],
        soil: [
          { id: `${abbrUpper}SA1`, name: `${newName} Soil Node #1`, latestReading: 'Moisture 58%', unit: '%', status: 'Online', sparkline: [52, 54, 56, 58, 58, 58, 58], battery: 96, lastPing: 'Just now', history: Array.from({ length: 30 }, (_, i) => ({ day: `Day ${i + 1}`, reading: 58 })) }
        ],
        water: [
          { id: `${abbrUpper}WA1`, name: `${newName} Water Node #1`, latestReading: 'Turbidity=3.2 NTU', unit: 'NTU', status: 'Online', sparkline: [3.0, 3.1, 3.2, 3.2, 3.2, 3.2, 3.2], battery: 92, lastPing: 'Just now', history: Array.from({ length: 30 }, (_, i) => ({ day: `Day ${i + 1}`, reading: 3.2 })) }
        ]
      }
    };

    setSites([createdSite, ...sites]);
    setNewName('');
    setNewAbbr('');
    setNewLocation('');
    setFormTouched(false);
    showSuccess(`${singleSiteTitle} "${createdSite.name}" registered successfully! All telemetry nodes active.`);
  };

  const breadcrumbItems = [
    { label: siteTitle, link: baseRoute },
    ...(activeTab === 'add' ? [{ label: `Add New ${singleSiteTitle}` }] : []),
    ...(activeTab === 'zones' ? [{ label: 'Zone Management' }] : []),
    ...(selectedSite ? [{ label: selectedSite.name, link: `${baseRoute}/${currentSiteSlug}` }] : []),
    ...(selectedSensor ? [{ label: selectedSensor.id }] : [])
  ];

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

  const IconComponent = siteType === 'parks' ? TreePine : ForestIcon;

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs items={breadcrumbItems} />

        {/* 1. SENSOR DETAILS VIEW */}
        {selectedSensor && selectedSite ? (
          <div className="space-y-6">
            <button
              onClick={() => navigate(`${baseRoute}/${currentSiteSlug}`)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2D6A4F] hover:text-[#1B4332] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to {selectedSite.name}
            </button>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {selectedSensor.id}
                  </span>
                  <h2 className="text-xl font-bold text-[#1B4332] mt-2">{selectedSensor.name}</h2>
                  <p className="text-xs text-slate-500 mt-1">Location: {selectedSite.name} • {selectedSite.zone}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
                    selectedSensor.status === 'Online' 
                      ? 'bg-emerald-100 text-emerald-800 status-glow-online' 
                      : 'bg-red-100 text-red-800 status-glow-offline'
                  }`}>
                    {selectedSensor.status === 'Online' ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
                    {selectedSensor.status}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full font-medium">
                    <Battery className="w-3.5 h-3.5 text-slate-700" />
                    {selectedSensor.battery}% Battery
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <span className="text-xs text-slate-500 font-medium">Current Reading</span>
                  <p className="text-lg font-bold text-slate-900 mt-1">{selectedSensor.latestReading}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <span className="text-xs text-slate-500 font-medium">Last Telemetry Ping</span>
                  <p className="text-base font-semibold text-slate-700 mt-1 flex items-center gap-1">
                    <Clock className="w-4 h-4 text-slate-400" />
                    {selectedSensor.lastPing}
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <span className="text-xs text-slate-500 font-medium">Historical Points</span>
                  <p className="text-base font-semibold text-slate-700 mt-1">30 Days Logged</p>
                </div>
              </div>

              {selectedSensor.history && (
                <div className="pt-4">
                  <h3 className="text-sm font-bold text-slate-900 mb-3">30-Day Sensor Reading History</h3>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={selectedSensor.history}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
                        <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                        <Line type="monotone" dataKey="reading" stroke="#2D6A4F" strokeWidth={2} dot={{ r: 2 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : selectedSite ? (
          /* 2. SITE DETAIL VIEW */
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <button
                  onClick={() => navigate(baseRoute)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2D6A4F] hover:text-[#1B4332] transition-colors mb-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to All {siteTitle}
                </button>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-[#1B4332]">{selectedSite.name}</h1>
                  <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-emerald-100 text-emerald-800">
                    {selectedSite.abbr}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {selectedSite.location} • {selectedSite.zone} ({selectedSite.division} Division)
                </p>
              </div>

              <button
                onClick={() => navigate(`${baseRoute}?tab=add`)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#2D6A4F] text-white font-medium text-xs rounded-lg hover:bg-[#1B4332] transition-colors shadow-sm cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                Add New {singleSiteTitle}
              </button>
            </div>

            {/* SENSORS SECTIONS */}
            {Object.entries(selectedSite.sensors).map(([category, sensorList]) => {
              if (!sensorList || sensorList.length === 0) return null;
              return (
                <div key={category} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                    <h3 className="text-sm font-bold text-[#1B4332] capitalize">
                      {category} Telemetry Nodes ({sensorList.length})
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {sensorList.map((sensor) => (
                      <div
                        key={sensor.id}
                        onClick={() => navigate(`${baseRoute}/${currentSiteSlug}/${sensor.id.toLowerCase()}`)}
                        className="p-4 rounded-lg border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer bg-slate-50/50 space-y-3"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                              {sensor.id}
                            </span>
                            <h4 className="text-xs font-bold text-slate-800 mt-1 line-clamp-1">{sensor.name}</h4>
                          </div>
                          <span className={`w-2.5 h-2.5 rounded-full ${sensor.status === 'Online' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                        </div>

                        <div>
                          <span className="text-[11px] text-slate-500 font-medium">Reading</span>
                          <p className="text-sm font-bold text-slate-900 leading-snug">{sensor.latestReading}</p>
                        </div>

                        {sensor.sparkline && renderSparkline(sensor.sparkline)}

                        <div className="flex justify-between items-center text-[10px] text-slate-500 pt-2 border-t border-slate-100">
                          <span className="flex items-center gap-1">
                            <Battery className="w-3 h-3" /> {sensor.battery}%
                          </span>
                          <span>{sensor.lastPing}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* 3. MAIN SITE DIRECTORY / TAB SECTIONS */
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-200">
              <div>
                <h1 className="text-2xl font-bold text-[#1B4332] flex items-center gap-2">
                  <IconComponent className="w-7 h-7 text-[#2D6A4F]" />
                  {siteTitle} Operational Directory
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Real-time telemetry and IoT node coverage across all monitored {siteTitle.toLowerCase()}.
                </p>
              </div>

              {/* Sub-tab Navigation */}
              <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg">
                <button
                  onClick={() => navigate(baseRoute)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                    activeTab === 'all' ? 'bg-white text-[#1B4332] shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All {siteTitle} ({sites.length})
                </button>
                <button
                  onClick={() => navigate(`${baseRoute}?tab=zones`)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                    activeTab === 'zones' ? 'bg-white text-[#1B4332] shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Zones Breakdown
                </button>
                <button
                  onClick={() => navigate(`${baseRoute}?tab=add`)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                    activeTab === 'add' ? 'bg-white text-[#1B4332] shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  + Add {singleSiteTitle}
                </button>
              </div>
            </div>

            {/* TAB CONTENT: ADD NEW SITE FORM */}
            {activeTab === 'add' && (
              <div className={`max-w-2xl mx-auto bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6 ${
                isShaking ? 'animate-shake' : ''
              }`}>
                <div>
                  <h2 className="text-lg font-bold text-[#1B4332] flex items-center gap-2">
                    <PlusCircle className="w-5 h-5 text-[#2D6A4F]" />
                    Register New {singleSiteTitle} Telemetry Area
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Add a new monitored site location and automatically provision telemetry nodes.
                  </p>
                </div>

                <form onSubmit={handleAddSite} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {singleSiteTitle} Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder={`e.g. ${siteType === 'parks' ? 'Nehru Park Reserve' : 'Aravali Southern Ridge'}`}
                      className={`w-full px-3 py-2 text-xs border rounded-lg ${
                        formTouched && !newName.trim() ? 'border-red-500' : 'border-slate-300'
                      }`}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Abbreviation <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={newAbbr}
                        onChange={(e) => setNewAbbr(e.target.value)}
                        placeholder="e.g. NP or ASR"
                        className={`w-full px-3 py-2 text-xs border rounded-lg ${
                          formTouched && !newAbbr.trim() ? 'border-red-500' : 'border-slate-300'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Location / Region
                      </label>
                      <input
                        type="text"
                        value={newLocation}
                        onChange={(e) => setNewLocation(e.target.value)}
                        placeholder="e.g. Chanakyapuri, New Delhi"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Division</label>
                      <select
                        value={newDivision}
                        onChange={(e) => setNewDivision(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                      >
                        <option value="North">North Division</option>
                        <option value="South">South Division</option>
                        <option value="East">East Division</option>
                        <option value="West">West Division</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Zone</label>
                      <select
                        value={newZone}
                        onChange={(e) => setNewZone(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                      >
                        <option value="North Zone 1">North Zone 1</option>
                        <option value="North Zone 2">North Zone 2</option>
                        <option value="South Zone 1">South Zone 1</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => navigate(baseRoute)}
                      className="px-4 py-2 border border-slate-300 text-slate-600 rounded-lg text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#2D6A4F] text-white rounded-lg text-xs font-semibold hover:bg-[#1B4332] transition-colors cursor-pointer"
                    >
                      Register {singleSiteTitle}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB CONTENT: ZONES BREAKDOWN */}
            {activeTab === 'zones' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {['North Zone 1', 'North Zone 2', 'South Zone 1'].map((zoneName) => {
                  const zoneSites = sites.filter(s => s.zone === zoneName);
                  return (
                    <div key={zoneName} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
                      <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                        <h3 className="text-sm font-bold text-[#1B4332] flex items-center gap-2">
                          <Layers className="w-4 h-4 text-[#2D6A4F]" />
                          {zoneName}
                        </h3>
                        <span className="text-xs font-semibold text-slate-500">
                          {zoneSites.length} {zoneSites.length === 1 ? singleSiteTitle : siteTitle}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {zoneSites.length > 0 ? (
                          zoneSites.map((s) => (
                            <div
                              key={s.id}
                              onClick={() => navigate(`${baseRoute}/${getSiteSlug(s)}`)}
                              className="p-3 bg-slate-50 rounded-lg hover:bg-emerald-50/50 transition-colors flex justify-between items-center cursor-pointer"
                            >
                              <div>
                                <h4 className="text-xs font-bold text-slate-800">{s.name}</h4>
                                <p className="text-[10px] text-slate-500">{s.location}</p>
                              </div>
                              <ChevronRight className="w-4 h-4 text-slate-400" />
                            </div>
                          ))
                        ) : (
                          <p className="text-xs text-slate-400 italic">No {siteTitle.toLowerCase()} assigned to this zone.</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* TAB CONTENT: ALL SITES GRID */}
            {activeTab === 'all' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sites.map((site) => {
                  const totalSensors = Object.values(site.sensors).reduce(
                    (acc, arr) => acc + (arr ? arr.length : 0), 0
                  );
                  const slug = getSiteSlug(site);

                  return (
                    <div
                      key={site.id}
                      onClick={() => navigate(`${baseRoute}/${slug}`)}
                      className="bg-white p-5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between space-y-4"
                    >
                      <div>
                        <div className="flex justify-between items-start">
                          <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded">
                            {site.abbr}
                          </span>
                          <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                            {site.zone}
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-[#1B4332] mt-3">{site.name}</h3>
                        <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          {site.location}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                        <span className="font-semibold text-slate-700">
                          {totalSensors} Telemetry Nodes
                        </span>
                        <span className="text-[#2D6A4F] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          View Site <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
