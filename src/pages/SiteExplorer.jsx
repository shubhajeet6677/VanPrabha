import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { PARKS, HISTORICAL_30_DAYS, INITIAL_LITTER_FEED, INITIAL_FIELD_LOGS } from '../data/mockData';
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
  FileText, 
  Loader2,
  Trash2
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
      role: "Field Officer",
      date: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
      note: newLogNote,
      photoUrl: newLogPhotoUrl || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80"
    };

    try {
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
    temperature: { name: 'Temperature', unit: '°C', color: '#DC2626', key: 'temperature' },
    soilMoisture: { name: 'Soil Moisture', unit: '%', color: '#2D6A4F', key: 'soilMoisture' },
    humidity: { name: 'Humidity', unit: '%', color: '#2563EB', key: 'humidity' },
    nitrogen: { name: 'Nitrogen (NPK)', unit: 'ppm', color: '#D97706', key: 'nitrogen' }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-slate-800 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Top Header: Site Title & Operations Info */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <button
              onClick={() => navigate('/dashboard')}
              className="text-xs font-semibold text-slate-600 hover:text-[#1B4332] flex items-center gap-1.5 mb-2 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Operations Dashboard
            </button>
            
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold text-[#1B4332] tracking-tight">
                {currentPark.name}
              </h1>
              <span className={`text-xs px-2.5 py-0.5 rounded font-bold ${
                currentPark.status === 'critical' ? 'bg-red-100 text-red-800 border border-red-200' :
                currentPark.status === 'warning' ? 'bg-amber-100 text-amber-900 border border-amber-200' : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
              }`}>
                {currentPark.status.toUpperCase()} STATUS
              </span>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600 mt-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#2D6A4F]" />
                {currentPark.location}
              </span>
              <span className="flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-[#2D6A4F]" />
                {currentPark.zone}
              </span>
              <span className="flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-[#2D6A4F]" />
                Assigned: <strong className="text-slate-900">{currentPark.assignedStaff}</strong>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
            <div className="text-right">
              <div className="text-xs text-slate-500 font-medium">IoT Sensor Network</div>
              <div className="text-base font-bold text-[#1B4332]">{currentPark.sensorsCount} Nodes Active</div>
            </div>
          </div>
        </div>

        {/* SECTION 1: 4 Live Sensor Reading Cards + 30-Day Historical Recharts */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-[#1B4332] flex items-center gap-2">
            <Thermometer className="w-4 h-4 text-[#2D6A4F]" />
            Live Telemetry & 30-Day Trend History
          </h2>

          {/* 4 Telemetry Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div 
              onClick={() => setActiveMetric('temperature')}
              className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                activeMetric === 'temperature' ? 'bg-[#1B4332] text-white border-[#1B4332]' : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold opacity-90">Temperature</span>
                <Thermometer className="w-4 h-4" />
              </div>
              <div className="text-2xl font-bold mt-2">{currentPark.temp}</div>
              <div className="text-xs opacity-75 mt-1">Optimal forest range</div>
            </div>

            <div 
              onClick={() => setActiveMetric('soilMoisture')}
              className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                activeMetric === 'soilMoisture' ? 'bg-[#1B4332] text-white border-[#1B4332]' : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold opacity-90">Soil Moisture</span>
                <Droplets className="w-4 h-4" />
              </div>
              <div className="text-2xl font-bold mt-2">{currentPark.soilMoisture}</div>
              <div className="text-xs opacity-75 mt-1">Target hydration &gt; 30%</div>
            </div>

            <div 
              onClick={() => setActiveMetric('nitrogen')}
              className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                activeMetric === 'nitrogen' ? 'bg-[#1B4332] text-white border-[#1B4332]' : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold opacity-90">NPK Ratio</span>
                <Sprout className="w-4 h-4" />
              </div>
              <div className="text-2xl font-bold mt-2">{currentPark.npk}</div>
              <div className="text-xs opacity-75 mt-1">N / P / K Ratio (ppm)</div>
            </div>

            <div 
              onClick={() => setActiveMetric('humidity')}
              className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                activeMetric === 'humidity' ? 'bg-[#1B4332] text-white border-[#1B4332]' : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold opacity-90">Relative Humidity</span>
                <Wind className="w-4 h-4" />
              </div>
              <div className="text-2xl font-bold mt-2">{currentPark.humidity}</div>
              <div className="text-xs opacity-75 mt-1">Micro-climate moisture</div>
            </div>
          </div>

          {/* 30-Day Historical Line Chart */}
          <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 pb-2 border-b border-slate-100 gap-2">
              <div>
                <h3 className="text-sm font-bold text-[#1B4332]">
                  30-Day Historical Telemetry ({metricConfigs[activeMetric].name})
                </h3>
                <p className="text-xs text-slate-500">
                  Continuous sensor readings recorded over the past month
                </p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded bg-slate-100 text-slate-800 border border-slate-200 self-start sm:self-auto">
                Metric: {metricConfigs[activeMetric].name} ({metricConfigs[activeMetric].unit})
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={HISTORICAL_30_DAYS} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} interval={4} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1B4332', borderRadius: '6px', color: '#fff', fontSize: '12px' }}
                    itemStyle={{ color: '#52B788' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey={metricConfigs[activeMetric].key} 
                    stroke={metricConfigs[activeMetric].color} 
                    strokeWidth={2}
                    dot={{ r: 2.5, fill: metricConfigs[activeMetric].color }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* SECTION 2: Litter Watch Feed */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-[#1B4332] flex items-center gap-2">
                <Trash2 className="w-4 h-4 text-red-600" />
                Litter Watch Detections
              </h2>
              <p className="text-xs text-slate-500">
                Automated camera & field staff waste detection feed
              </p>
            </div>

            <button
              onClick={() => setIsUploadingLitter(!isUploadingLitter)}
              className="py-2 px-3.5 bg-[#1B4332] hover:bg-emerald-900 text-white font-semibold text-xs rounded-md shadow-sm flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              Upload Inspection Photo
            </button>
          </div>

          {/* Upload Expandable Box */}
          {isUploadingLitter && (
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Upload Waste Inspection Photo</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setLitterSource('Camera')}
                    className={`text-xs font-bold px-2.5 py-1 rounded ${
                      litterSource === 'Camera' ? 'bg-[#1B4332] text-white' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    AI Camera
                  </button>
                  <button
                    onClick={() => setLitterSource('Staff')}
                    className={`text-xs font-bold px-2.5 py-1 rounded ${
                      litterSource === 'Staff' ? 'bg-[#1B4332] text-white' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    Staff Upload
                  </button>
                </div>
              </div>

              {litterAnalyzing ? (
                <div className="py-6 text-center space-y-2">
                  <Loader2 className="w-6 h-6 text-[#2D6A4F] animate-spin mx-auto" />
                  <p className="text-xs font-bold text-slate-900">Analyzing Photo for Waste Items...</p>
                </div>
              ) : (
                <label className="border-2 border-dashed border-slate-300 hover:border-slate-400 bg-white p-6 rounded-lg text-center cursor-pointer block">
                  <Camera className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                  <span className="text-xs font-bold text-slate-800 block">Click to select photo for analysis</span>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleLitterPhotoUpload} 
                    className="hidden" 
                  />
                </label>
              )}
            </div>
          )}

          {/* Feed Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {litterFeed.map((item) => (
              <div 
                key={item.id}
                className="bg-slate-50 rounded-lg border border-slate-200 overflow-hidden flex flex-col justify-between"
              >
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src={item.photoUrl} 
                    alt="Litter Detection" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 flex gap-1">
                    <span className="bg-slate-900/80 text-white text-[11px] font-bold px-2 py-0.5 rounded">
                      {item.source}
                    </span>
                    <span className="bg-[#1B4332]/90 text-emerald-200 text-[11px] font-bold px-2 py-0.5 rounded">
                      {item.confidence}% Confidence
                    </span>
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                      item.status === 'Cleaned' 
                        ? 'bg-emerald-700 text-white' 
                        : 'bg-amber-500 text-white'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>

                <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      {item.detectedItems}
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" />
                      {item.timestamp}
                    </div>
                  </div>

                  <button
                    onClick={() => toggleLitterStatus(item.id)}
                    className={`w-full py-1.5 px-3 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      item.status === 'Cleaned'
                        ? 'bg-slate-200 text-slate-800 hover:bg-slate-300'
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

        {/* SECTION 3: Field Logs */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="pb-2 border-b border-slate-100">
            <h2 className="text-base font-bold text-[#1B4332] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#2D6A4F]" />
              Field Officer Inspection Logs
            </h2>
            <p className="text-xs text-slate-500">
              Operational logs synchronized with Firestore
            </p>
          </div>

          {/* Form to submit new log */}
          <form onSubmit={handleAddLog} className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold text-slate-800">Record New Field Log Entry</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={newLogAuthor}
                onChange={(e) => setNewLogAuthor(e.target.value)}
                placeholder="Officer Name / Role"
                className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
              />
              <input
                type="text"
                value={newLogPhotoUrl}
                onChange={(e) => setNewLogPhotoUrl(e.target.value)}
                placeholder="Optional Photo URL"
                className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
              />
            </div>
            <textarea
              rows={3}
              value={newLogNote}
              onChange={(e) => setNewLogNote(e.target.value)}
              placeholder="Enter inspection findings, maintenance notes, or soil observations..."
              className="w-full p-3 text-xs bg-white border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
              required
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmittingLog}
                className="py-2 px-4 bg-[#1B4332] hover:bg-emerald-900 text-white font-semibold text-xs rounded shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {isSubmittingLog ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <PlusCircle className="w-3.5 h-3.5" />
                )}
                Save Log to Firestore
              </button>
            </div>
          </form>

          {/* List of Logs */}
          <div className="space-y-3">
            {fieldLogs.map((log) => (
              <div 
                key={log.id}
                className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex flex-col md:flex-row gap-4 justify-between items-start"
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{log.author}</span>
                    <span className="text-[11px] font-semibold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded">
                      {log.role}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium ml-auto md:ml-0">
                      {log.date}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 leading-normal pt-1">
                    {log.note}
                  </p>
                </div>

                {log.photoUrl && (
                  <div className="w-full md:w-32 h-20 rounded overflow-hidden flex-shrink-0 border border-slate-200">
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
