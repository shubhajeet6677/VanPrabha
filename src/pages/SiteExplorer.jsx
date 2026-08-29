import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { PARKS, HISTORICAL_30_DAYS, INITIAL_LITTER_FEED, INITIAL_FIELD_LOGS } from '../data/mockData';
import { motion as motionFramer, AnimatePresence as AnimatePresenceFramer } from 'framer-motion';
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
  ArrowLeft, 
  MapPin, 
  UserCheck, 
  Layers, 
  Thermometer, 
  Droplets, 
  Sprout, 
  Wind, 
  Upload, 
  Camera, 
  CheckCircle2, 
  Clock, 
  PlusCircle, 
  Sparkles, 
  FileText, 
  Loader2,
  Trash2,
  AlertTriangle
} from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';

export default function SiteExplorer() {
  const { siteId } = useParams();
  const navigate = useNavigate();

  // Find current park or default to first park
  const currentPark = PARKS.find(p => p.id === siteId) || PARKS[0];

  // State for active historical chart metric
  const [activeMetric, setActiveMetric] = useState('temperature');

  // State for Litter Watch
  const [litterFeed, setLitterFeed] = useState(INITIAL_LITTER_FEED);
  const [isUploadingLitter, setIsUploadingLitter] = useState(false);
  const [litterAnalyzing, setLitterAnalyzing] = useState(false);
  const [litterSource, setLitterSource] = useState('Staff');

  // State for Field Logs
  const [fieldLogs, setFieldLogs] = useState(INITIAL_FIELD_LOGS);
  const [newLogNote, setNewLogNote] = useState('');
  const [newLogAuthor, setNewLogAuthor] = useState('Field Officer');
  const [newLogPhotoUrl, setNewLogPhotoUrl] = useState('');
  const [isSubmittingLog, setIsSubmittingLog] = useState(false);

  // Attempt fetching from Firestore on load (with fallback)
  useEffect(() => {
    async function loadFirestoreLogs() {
      try {
        const q = query(collection(db, "field_logs"), orderBy("date", "desc"));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const docsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setFieldLogs(docsData);
        }
      } catch (e) {
        console.log("Firestore offline/placeholder mode: using initial field logs.", e);
      }
    }
    loadFirestoreLogs();
  }, []);

  // Handle Mock Photo Upload & Analysis for Litter Watch
  const handleLitterPhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLitterAnalyzing(true);
    const mockPreviewUrl = URL.createObjectURL(file);

    // Simulate AI model inference
    setTimeout(() => {
      const newCard = {
        id: `litter-${Date.now()}`,
        photoUrl: mockPreviewUrl,
        confidence: +(85 + Math.random() * 12).toFixed(1),
        source: litterSource,
        timestamp: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
        status: "Pending",
        detectedItems: "Plastic Waste & Discarded Container"
      };

      setLitterFeed(prev => [newCard, ...prev]);
      setLitterAnalyzing(false);
      setIsUploadingLitter(false);
    }, 2000);
  };

  // Toggle Litter status
  const toggleLitterStatus = (id) => {
    setLitterFeed(prev =>
      prev.map(item => item.id === id ? {
        ...item,
        status: item.status === 'Pending' ? 'Cleaned' : 'Pending'
      } : item)
    );
  };

  // Submit Field Log
  const handleAddLog = async (e) => {
    e.preventDefault();
    if (!newLogNote.trim()) return;

    setIsSubmittingLog(true);

    const logEntry = {
      author: newLogAuthor,
      role: "Field Staff",
      date: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
      note: newLogNote,
      photoUrl: newLogPhotoUrl || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80"
    };

    try {
      // Save to Firestore
      const docRef = await addDoc(collection(db, "field_logs"), logEntry);
      setFieldLogs(prev => [{ id: docRef.id, ...logEntry }, ...prev]);
    } catch (err) {
      console.log("Saving locally (Firestore fallback):", err);
      setFieldLogs(prev => [{ id: `log-${Date.now()}`, ...logEntry }, ...prev]);
    } finally {
      setNewLogNote('');
      setNewLogPhotoUrl('');
      setIsSubmittingLog(false);
    }
  };

  const metricConfigs = {
    temperature: { name: 'Temperature', unit: '°C', color: '#E63946', key: 'temperature' },
    soilMoisture: { name: 'Soil Moisture', unit: '%', color: '#52B788', key: 'soilMoisture' },
    humidity: { name: 'Humidity', unit: '%', color: '#3B82F6', key: 'humidity' },
    nitrogen: { name: 'Nitrogen (NPK)', unit: 'ppm', color: '#FFD166', key: 'nitrogen' }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-slate-800 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Top Header: Site Title & Info */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <button
              onClick={() => navigate('/dashboard')}
              className="text-xs font-semibold text-slate-500 hover:text-[#1B4332] flex items-center gap-1.5 mb-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1B4332] flex items-center gap-3 tracking-tight">
              {currentPark.name}
              <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                currentPark.status === 'critical' ? 'bg-red-100 text-red-800' :
                currentPark.status === 'warning' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {currentPark.status.toUpperCase()} STATUS
              </span>
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 mt-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#52B788]" />
                {currentPark.location}
              </span>
              <span className="flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-[#52B788]" />
                {currentPark.zone}
              </span>
              <span className="flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-[#52B788]" />
                Assigned: <strong className="text-slate-700">{currentPark.assignedStaff}</strong>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-emerald-50/50 p-3 rounded-2xl border border-emerald-100">
            <div className="text-right">
              <div className="text-xs text-slate-500">Live Sensors</div>
              <div className="text-lg font-bold text-[#1B4332]">{currentPark.sensorsCount} Nodes Active</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#1B4332] text-[#52B788] flex items-center justify-center font-bold">
              IoT
            </div>
          </div>
        </div>

        {/* SECTION 1: 4 Live Sensor Cards + 30-Day Historical Recharts */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-[#1B4332] flex items-center gap-2">
            <Thermometer className="w-5 h-5 text-[#52B788]" />
            Live Telemetry & 30-Day Trends
          </h2>

          {/* 4 Sensor Reading Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div 
              onClick={() => setActiveMetric('temperature')}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                activeMetric === 'temperature' ? 'bg-[#1B4332] text-white border-[#1B4332] shadow-lg' : 'bg-white border-slate-200 hover:border-emerald-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold opacity-80">Temperature</span>
                <Thermometer className="w-4 h-4" />
              </div>
              <div className="text-2xl font-bold mt-2">{currentPark.temp}</div>
              <div className="text-[10px] opacity-70 mt-1">Optimal forest range</div>
            </div>

            <div 
              onClick={() => setActiveMetric('soilMoisture')}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                activeMetric === 'soilMoisture' ? 'bg-[#1B4332] text-white border-[#1B4332] shadow-lg' : 'bg-white border-slate-200 hover:border-emerald-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold opacity-80">Soil Moisture</span>
                <Droplets className="w-4 h-4" />
              </div>
              <div className="text-2xl font-bold mt-2">{currentPark.soilMoisture}</div>
              <div className="text-[10px] opacity-70 mt-1">Target hydration &gt; 30%</div>
            </div>

            <div 
              onClick={() => setActiveMetric('nitrogen')}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                activeMetric === 'nitrogen' ? 'bg-[#1B4332] text-white border-[#1B4332] shadow-lg' : 'bg-white border-slate-200 hover:border-emerald-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold opacity-80">NPK Level</span>
                <Sprout className="w-4 h-4" />
              </div>
              <div className="text-2xl font-bold mt-2">{currentPark.npk}</div>
              <div className="text-[10px] opacity-70 mt-1">N / P / K Ratio (ppm)</div>
            </div>

            <div 
              onClick={() => setActiveMetric('humidity')}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                activeMetric === 'humidity' ? 'bg-[#1B4332] text-white border-[#1B4332] shadow-lg' : 'bg-white border-slate-200 hover:border-emerald-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold opacity-80">Relative Humidity</span>
                <Wind className="w-4 h-4" />
              </div>
              <div className="text-2xl font-bold mt-2">{currentPark.humidity}</div>
              <div className="text-[10px] opacity-70 mt-1">Micro-climate moisture</div>
            </div>
          </div>

          {/* Recharts 30-Day Historical Chart */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-[#1B4332]">
                  30-Day Trend History ({metricConfigs[activeMetric].name})
                </h3>
                <p className="text-xs text-slate-500">
                  Continuous sensor readings over the last month
                </p>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                Metric: {metricConfigs[activeMetric].name} ({metricConfigs[activeMetric].unit})
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={HISTORICAL_30_DAYS} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} interval={4} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1B4332', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                    itemStyle={{ color: '#52B788' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey={metricConfigs[activeMetric].key} 
                    stroke={metricConfigs[activeMetric].color} 
                    strokeWidth={3}
                    dot={{ r: 3, fill: metricConfigs[activeMetric].color }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* SECTION 2: Litter Watch & AI Photo Analysis */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-[#1B4332] flex items-center gap-2">
                <Trash2 className="w-5 h-5 text-[#E63946]" />
                Litter Watch AI Feed
              </h2>
              <p className="text-xs text-slate-500">
                Computer vision & field staff waste detection feed
              </p>
            </div>

            <button
              onClick={() => setIsUploadingLitter(!isUploadingLitter)}
              className="py-2.5 px-4 bg-[#1B4332] hover:bg-emerald-900 text-white font-semibold text-xs rounded-xl shadow-md flex items-center gap-2 transition-all"
            >
              <Upload className="w-4 h-4 text-[#52B788]" />
              Upload Inspection Photo
            </button>
          </div>

          {/* Upload UI Modal / Expandable Box */}
          <AnimatePresenceFramer>
            {isUploadingLitter && (
              <motionFramer
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden bg-slate-50 p-4 rounded-2xl border border-emerald-200 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1B4332]">AI Waste Detection Analysis</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setLitterSource('Camera')}
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-md ${
                        litterSource === 'Camera' ? 'bg-[#1B4332] text-white' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      Source: AI Camera
                    </button>
                    <button
                      onClick={() => setLitterSource('Staff')}
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-md ${
                        litterSource === 'Staff' ? 'bg-[#1B4332] text-white' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      Source: Staff Upload
                    </button>
                  </div>
                </div>

                {litterAnalyzing ? (
                  <div className="py-8 text-center space-y-2">
                    <Loader2 className="w-8 h-8 text-[#52B788] animate-spin mx-auto" />
                    <p className="text-xs font-semibold text-[#1B4332]">Analyzing Photo with Vision Model...</p>
                    <p className="text-[10px] text-slate-500">Detecting waste types and calculating confidence score</p>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-slate-300 hover:border-[#52B788] bg-white p-6 rounded-xl text-center cursor-pointer block transition-colors">
                    <Camera className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <span className="text-xs font-bold text-slate-700 block">Click to upload photo for instant AI analysis</span>
                    <span className="text-[10px] text-slate-400 block mt-1">Supports JPG, PNG (Simulates inference API)</span>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleLitterPhotoUpload} 
                      className="hidden" 
                    />
                  </label>
                )}
              </motionFramer>
            )}
          </AnimatePresenceFramer>

          {/* Feed Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {litterFeed.map((item) => (
              <div 
                key={item.id}
                className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between"
              >
                <div className="relative h-44 overflow-hidden group">
                  <img 
                    src={item.photoUrl} 
                    alt="Litter Detection" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 flex gap-1">
                    <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                      {item.source}
                    </span>
                    <span className="bg-[#1B4332]/80 backdrop-blur-md text-[#52B788] text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" />
                      {item.confidence}% Match
                    </span>
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      item.status === 'Cleaned' 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-[#FFD166] text-slate-900'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <div className="text-xs font-bold text-slate-800">
                      {item.detectedItems}
                    </div>
                    <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" />
                      {item.timestamp}
                    </div>
                  </div>

                  <button
                    onClick={() => toggleLitterStatus(item.id)}
                    className={`w-full py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                      item.status === 'Cleaned'
                        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                        : 'bg-[#1B4332] text-white hover:bg-emerald-900'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {item.status === 'Cleaned' ? 'Mark as Pending' : 'Mark as Cleaned'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: Field Log (Text note + Photo per visit) */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-bold text-[#1B4332] flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#52B788]" />
              Field Officer Inspection Logs
            </h2>
            <p className="text-xs text-slate-500">
              Synchronized log entries stored in Firestore
            </p>
          </div>

          {/* Form to submit new log */}
          <form onSubmit={handleAddLog} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold text-slate-700">Add New Site Visit Log</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={newLogAuthor}
                onChange={(e) => setNewLogAuthor(e.target.value)}
                placeholder="Officer Name / Role"
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#52B788]"
              />
              <input
                type="text"
                value={newLogPhotoUrl}
                onChange={(e) => setNewLogPhotoUrl(e.target.value)}
                placeholder="Optional Photo URL (or default demo photo)"
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#52B788]"
              />
            </div>
            <textarea
              rows={3}
              value={newLogNote}
              onChange={(e) => setNewLogNote(e.target.value)}
              placeholder="Enter inspection findings, maintenance notes, or soil observations..."
              className="w-full p-3 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#52B788]"
              required
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmittingLog}
                className="py-2 px-4 bg-[#1B4332] hover:bg-emerald-900 text-white font-semibold text-xs rounded-xl shadow-sm flex items-center gap-1.5 transition-colors"
              >
                {isSubmittingLog ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <PlusCircle className="w-3.5 h-3.5 text-[#52B788]" />
                )}
                Save Log to Firestore
              </button>
            </div>
          </form>

          {/* List of Logs */}
          <div className="space-y-4">
            {fieldLogs.map((log) => (
              <div 
                key={log.id}
                className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 flex flex-col md:flex-row gap-4 justify-between items-start"
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#1B4332]">{log.author}</span>
                    <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                      {log.role}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium ml-auto md:ml-0">
                      {log.date}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed pt-1">
                    {log.note}
                  </p>
                </div>

                {log.photoUrl && (
                  <div className="w-full md:w-32 h-24 rounded-xl overflow-hidden flex-shrink-0 border border-slate-200">
                    <img 
                      src={log.photoUrl} 
                      alt="Field inspection" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>

      </main>
    </div>
  );
}
