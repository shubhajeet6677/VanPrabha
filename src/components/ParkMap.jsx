import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Custom icons based on status
const createCustomIcon = (status) => {
  let bgColor = '#52B788'; // normal (accent)
  let shadowColor = 'rgba(82, 183, 136, 0.4)';

  if (status === 'warning') {
    bgColor = '#FFD166'; // glow
    shadowColor = 'rgba(255, 209, 102, 0.5)';
  } else if (status === 'critical') {
    bgColor = '#E63946'; // danger
    shadowColor = 'rgba(230, 57, 70, 0.5)';
  }

  const svgMarker = `
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="12" fill="${bgColor}" stroke="#ffffff" stroke-width="3"/>
      <circle cx="16" cy="16" r="14" stroke="${bgColor}" stroke-opacity="0.5" stroke-width="2"/>
    </svg>
  `;

  return L.divIcon({
    html: `<div style="
      display: flex;
      align-items: center;
      justify-content: center;
      filter: drop-shadow(0 4px 6px ${shadowColor});
    ">${svgMarker}</div>`,
    className: 'custom-leaflet-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
};

export default function ParkMap({ parks, selectedParkId, onSelectPark }) {
  const navigate = useNavigate();
  // Center around Bengaluru average coords
  const defaultCenter = [12.9400, 77.6000];

  return (
    <div className="w-full h-full min-h-[380px] rounded-2xl overflow-hidden shadow-sm border border-emerald-900/10 relative z-0">
      <MapContainer
        center={defaultCenter}
        zoom={11}
        scrollWheelZoom={false}
        className="w-full h-full"
        style={{ background: '#FAFAF8' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {parks.map((park) => (
          <Marker
            key={park.id}
            position={[park.lat, park.lng]}
            icon={createCustomIcon(park.status)}
            eventHandlers={{
              click: () => {
                if (onSelectPark) onSelectPark(park.id);
              }
            }}
          >
            <Popup className="custom-popup">
              <div className="p-1 min-w-[200px]">
                <div className="flex items-center gap-2 mb-1">
                  {park.status === 'normal' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  {park.status === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-500" />}
                  {park.status === 'critical' && <ShieldAlert className="w-4 h-4 text-red-500" />}
                  <span className="font-semibold text-sm text-emerald-950">{park.name}</span>
                </div>
                <p className="text-xs text-slate-500 mb-2">{park.location}</p>
                <div className="grid grid-cols-2 gap-1 text-xs bg-slate-50 p-2 rounded-lg mb-2 border border-slate-100">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Temp</span>
                    <span className="font-medium text-emerald-900">{park.temp}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Moisture</span>
                    <span className="font-medium text-emerald-900">{park.soilMoisture}</span>
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/site/${park.id}`)}
                  className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 bg-[#1B4332] text-white text-xs font-medium rounded-lg hover:bg-emerald-900 transition-colors"
                >
                  View Details
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
