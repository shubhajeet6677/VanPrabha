import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { LITTER_SITES } from '../data/mockData';
import { 
  Trash2, 
  Camera, 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Activity, 
  History, 
  Map,
  ChevronRight,
  SlidersHorizontal,
  Upload
} from 'lucide-react';

export default function LitterDetectionPage() {
  const { subTab } = useParams();
  const navigate = useNavigate();

  const [sites, setSites] = useState(LITTER_SITES);
  const [selectedSite, setSelectedSite] = useState(null);
  const [selectedCamera, setSelectedCamera] = useState(null);

  // Toggle detection status (Pending <-> Cleaned)
  const toggleDetectionStatus = (cardId) => {
    if (!selectedCamera) return;

    const updatedCamera = {
      ...selectedCamera,
      detectionCards: selectedCamera.detectionCards.map(c => 
        c.id === cardId ? { ...c, status: c.status === 'Pending' ? 'Cleaned' : 'Pending' } : c
      ),
      boundingBoxes: selectedCamera.boundingBoxes.map(b =>
        b.id === cardId ? { ...b, status: b.status === 'Pending' ? 'Cleaned' : 'Pending' } : b
      )
    };

    setSelectedCamera(updatedCamera);
  };

  return (
    <Layout>
      {/* Page Title & Navigation Bar */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Trash2 className="w-6 h-6 text-red-600" />
            <h1 className="text-2xl font-bold text-[#1B4332] tracking-tight">
              AI Litter Detection & Camera Surveillance
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Automated Computer Vision Stream Monitoring & Field Cleaning Dispatch
          </p>
        </div>
      </div>

      {subTab === 'cameras' ? (
        /* CAMERA MANAGEMENT VIEW */
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-[#1B4332] flex items-center gap-2">
              <Camera className="w-5 h-5 text-[#2D6A4F]" />
              Optical Camera Fleet Status
            </h2>
            <p className="text-xs text-slate-500">15 High-definition AI vision cameras active across sites</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sites.flatMap(s => s.cameras).map(cam => (
              <div key={cam.id} className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{cam.name}</span>
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                    ONLINE
                  </span>
                </div>
                <p className="text-xs text-slate-500">{cam.location}</p>
                <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-200">
                  AI Confidence Baseline: 94%
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : subTab === 'history' ? (
        /* DETECTION HISTORY VIEW */
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-[#1B4332] flex items-center gap-2">
              <History className="w-5 h-5 text-[#2D6A4F]" />
              Historical Litter Incident Log
            </h2>
            <p className="text-xs text-slate-500">Archive of resolved and pending waste detection logs</p>
          </div>

          <div className="space-y-3">
            {sites.flatMap(s => s.cameras.flatMap(c => c.detectionCards)).map((det, i) => (
              <div key={i} className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0 border border-slate-300">
                    <img src={det.snapshot} alt={det.item} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{det.item}</h4>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" /> {det.timestamp}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-[#1B4332]">{det.confidence}% AI Confidence</span>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded ${
                    det.status === 'Cleaned' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {det.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : subTab === 'heatmap' ? (
        /* HEATMAP VIEW */
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-[#1B4332] flex items-center gap-2">
              <Map className="w-5 h-5 text-[#2D6A4F]" />
              Park & Forest Waste Accumulation Heatmap
            </h2>
            <p className="text-xs text-slate-500">Geospatial waste accumulation density density map</p>
          </div>

          <div className="h-96 w-full bg-slate-100 rounded-lg flex items-center justify-center border border-slate-300 relative overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=1200&q=80" 
              alt="Heatmap background" 
              className="w-full h-full object-cover opacity-40 blur-[1px]" 
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950/40 via-red-500/20 to-amber-500/20" />
            <div className="absolute z-10 bg-white/90 backdrop-blur p-4 rounded-lg border border-slate-300 text-center shadow-lg">
              <Activity className="w-6 h-6 text-red-600 mx-auto mb-1" />
              <h3 className="text-xs font-bold text-slate-900">AI Heatmap Layer Operational</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Highest concentration noted near Lodhi Park Main Gate & Central Ridge Trail</p>
            </div>
          </div>
        </div>
      ) : selectedCamera ? (
        /* FULL CAMERA STREAM VIEW WITH PULSING LIVE BADGE & BOUNDING BOXES */
        <div className="space-y-6">
          <button
            onClick={() => setSelectedCamera(null)}
            className="text-xs font-bold text-slate-600 hover:text-[#1B4332] flex items-center gap-1.5 transition-colors cursor-pointer bg-white px-3 py-1.5 rounded border border-slate-200 shadow-sm w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {selectedSite.name} Camera Grid
          </button>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-6">
            
            {/* Camera Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-xl font-bold text-[#1B4332] flex items-center gap-2">
                  <Camera className="w-5 h-5 text-[#2D6A4F]" />
                  {selectedCamera.name}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Location: {selectedCamera.location} ({selectedSite.name})
                </p>
              </div>

              {/* Pulsing Red LIVE Badge */}
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                </span>
                <span className="text-xs font-extrabold text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-full uppercase tracking-wider">
                  LIVE ●
                </span>
              </div>
            </div>

            {/* Static Park Stream Image with Overlay Bounding Boxes */}
            <div className="relative w-full h-[420px] rounded-xl overflow-hidden bg-slate-900 shadow-inner border border-slate-300">
              <img 
                src={selectedCamera.streamUrl} 
                alt="Live Stream Feed" 
                className="w-full h-full object-cover opacity-90"
              />

              {/* Draw Bounding Boxes */}
              {selectedCamera.boundingBoxes.map((box) => (
                <div
                  key={box.id}
                  style={{
                    top: box.box.top,
                    left: box.box.left,
                    width: box.box.width,
                    height: box.box.height
                  }}
                  className={`absolute border-2 rounded transition-all cursor-pointer shadow-lg ${
                    box.status === 'Cleaned'
                      ? 'border-emerald-500 bg-emerald-500/10'
                      : 'border-red-500 bg-red-500/20 animate-pulse'
                  }`}
                >
                  <span className={`absolute -top-6 left-0 text-[10px] font-extrabold px-2 py-0.5 rounded shadow whitespace-nowrap text-white ${
                    box.status === 'Cleaned' ? 'bg-emerald-600' : 'bg-red-600'
                  }`}>
                    {box.label} ({box.confidence}%)
                  </span>
                </div>
              ))}

              {/* Stream Overlay info */}
              <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur text-white text-[11px] font-mono px-3 py-1.5 rounded flex items-center gap-3 border border-slate-700">
                <span>Stream ID: {selectedCamera.id}</span>
                <span>•</span>
                <span>1080p @ 30 FPS</span>
                <span>•</span>
                <span>AI Frame Inference: Active</span>
              </div>
            </div>

            {/* Detection Cards Below Frame */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-[#1B4332] flex items-center justify-between">
                <span>Detected Waste Items in Frame ({selectedCamera.detectionCards.length})</span>
                <span className="text-xs text-slate-500 font-normal">Click toggle button to update field status</span>
              </h3>

              {selectedCamera.detectionCards.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-lg border border-slate-200 text-xs font-semibold text-slate-500">
                  No active litter detections found in this camera stream. Area clear.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedCamera.detectionCards.map((card) => (
                    <div 
                      key={card.id}
                      className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg flex flex-col justify-between space-y-3"
                    >
                      <div className="flex gap-3">
                        <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 border border-slate-300">
                          <img src={card.snapshot} alt={card.item} className="w-full h-full object-cover" />
                        </div>
                        
                        <div className="flex-1 space-y-1">
                          <h4 className="text-xs font-bold text-slate-900">{card.item}</h4>
                          <span className="text-[11px] font-semibold text-[#2D6A4F] block">
                            {card.confidence}% Confidence
                          </span>
                          <span className="text-[10px] text-slate-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {card.timestamp}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-200 gap-2">
                        {/* Status Badge */}
                        <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded ${
                          card.status === 'Cleaned'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-red-100 text-red-800 border border-red-300'
                        }`}>
                          {card.status}
                        </span>

                        {/* Toggle Action Button */}
                        <button
                          onClick={() => toggleDetectionStatus(card.id)}
                          className={`py-1 px-3 rounded text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                            card.status === 'Cleaned'
                              ? 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                              : 'bg-[#1B4332] hover:bg-emerald-900 text-white'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {card.status === 'Cleaned' ? 'Mark Pending' : 'Mark Cleaned'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      ) : selectedSite ? (
        /* SITE'S 5 CAMERA CARDS GRID */
        <div className="space-y-6">
          <button
            onClick={() => setSelectedSite(null)}
            className="text-xs font-bold text-slate-600 hover:text-[#1B4332] flex items-center gap-1.5 transition-colors cursor-pointer bg-white px-3 py-1.5 rounded border border-slate-200 shadow-sm w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Sites
          </button>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h2 className="text-xl font-bold text-[#1B4332]">
                {selectedSite.name} — AI Surveillance Cameras (5 Cards)
              </h2>
              <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded">
                5 Cameras Provisioned
              </span>
            </div>

            {/* 5 Camera Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {selectedSite.cameras.map((cam) => (
                <div
                  key={cam.id}
                  onClick={() => setSelectedCamera(cam)}
                  className="bg-slate-50 rounded-xl border border-slate-200 hover:border-[#2D6A4F] hover:shadow-md transition-all cursor-pointer overflow-hidden flex flex-col justify-between group"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img 
                      src={cam.streamUrl} 
                      alt={cam.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur text-white text-[11px] font-bold px-2.5 py-0.5 rounded flex items-center gap-1">
                      <Camera className="w-3 h-3 text-emerald-400" />
                      {cam.name}
                    </div>
                    
                    {cam.detectionsCount > 0 ? (
                      <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded">
                        {cam.detectionsCount} Detection{cam.detectionsCount > 1 ? 's' : ''}
                      </div>
                    ) : (
                      <div className="absolute top-2 right-2 bg-emerald-700 text-white text-[10px] font-extrabold px-2 py-0.5 rounded">
                        Clear
                      </div>
                    )}
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#1B4332] transition-colors">
                        {cam.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {cam.location}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-xs font-semibold text-[#1B4332]">
                      <span>Open Stream & Detections</span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#2D6A4F]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* LANDING GRID OF PARK & FOREST NAME CARDS WITH CAMERA COUNTS */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sites.map((site) => (
            <div
              key={site.id}
              onClick={() => setSelectedSite(site)}
              className="bg-white p-5 rounded-xl border border-slate-200 hover:border-[#2D6A4F] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-lg bg-emerald-50 text-[#1B4332] border border-emerald-200 group-hover:bg-[#1B4332] group-hover:text-white transition-colors">
                    <Camera className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-emerald-900 bg-emerald-100 border border-emerald-300 px-2.5 py-1 rounded">
                    {site.cameraCount} Cameras
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#1B4332] group-hover:text-[#2D6A4F] transition-colors">
                  {site.name}
                </h3>
                
                <p className="text-xs text-slate-500 mt-1">
                  Type: {site.type} Site • 5 HD Vision Cameras Stream Active
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#1B4332]">
                <span>View Camera Feed</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#2D6A4F]" />
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}
