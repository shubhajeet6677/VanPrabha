import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight, Crosshair, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Restrained icons without excessive drop shadows or glowing neon
const createCustomIcon = (status) => {
  let bgColor = '#2D6A4F'; // Muted dark forest green
  let border = '#FFFFFF';

  if (status === 'warning') {
    bgColor = '#D97706'; // Professional amber warning
  } else if (status === 'critical') {
    bgColor = '#DC2626'; // Professional dark red critical
  }

  const svgMarker = `
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="14" cy="14" r="10" fill="${bgColor}" stroke="${border}" stroke-width="2.5"/>
      <circle cx="14" cy="14" r="4" fill="#FFFFFF"/>
    </svg>
  `;

  return L.divIcon({
    html: `<div style="display: flex; align-items: center; justify-content: center;">${svgMarker}</div>`,
    className: 'custom-leaflet-marker',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14]
  });
};

// Icon for user's pinpointed location
const createUserLocationIcon = () => {
  const svg = `
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="12" fill="#2563EB" stroke="#FFFFFF" stroke-width="3"/>
      <circle cx="16" cy="16" r="5" fill="#FFFFFF"/>
    </svg>
  `;
  return L.divIcon({
    html: `<div style="display: flex; align-items: center; justify-content: center;">${svg}</div>`,
    className: 'user-location-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
};

// Map controller to fly to location
function MapRecenter({ center, zoom }) {
  const map = useMap();
  if (center) {
    map.flyTo(center, zoom || 13, { duration: 1.2 });
  }
  return null;
}

export default function ParkMap({ parks, selectedParkId, onSelectPark }) {
  const navigate = useNavigate();
  // Default Center: New Delhi (28.6139, 77.2090)
  const defaultCenter = [28.6139, 77.2090];
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [userLocation, setUserLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState('');
  const [isLocating, setIsLocating] = useState(false);

  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      setLocationStatus('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    setLocationStatus('Locating your position...');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = [position.coords.latitude, position.coords.longitude];
        setUserLocation(coords);
        setMapCenter(coords);
        setIsLocating(false);
        setLocationStatus('Location pinpointed');
      },
      (error) => {
        setIsLocating(false);
        setLocationStatus('Unable to access location. Please check browser permissions.');
        console.warn('Geolocation error:', error);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return (
    <div className="w-full h-full min-h-[420px] rounded-xl overflow-hidden border border-slate-200 bg-slate-50 relative z-0">
      
      {/* Geolocation Button Bar */}
      <div className="absolute top-3 right-3 z-[1000] flex flex-col items-end gap-1.5">
        <button
          onClick={handleLocateMe}
          disabled={isLocating}
          className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 px-3.5 py-2 rounded-lg text-xs font-semibold shadow-sm flex items-center gap-2 cursor-pointer transition-colors"
          title="Pinpoint current GPS location"
        >
          <Crosshair className={`w-4 h-4 text-emerald-700 ${isLocating ? 'animate-spin' : ''}`} />
          {isLocating ? 'Pinpointing Location...' : 'Pinpoint My Location'}
        </button>

        {locationStatus && (
          <div className="bg-slate-900/90 backdrop-blur-sm text-white text-[11px] px-2.5 py-1 rounded-md shadow-sm">
            {locationStatus}
          </div>
        )}
      </div>

      <MapContainer
        center={defaultCenter}
        zoom={12}
        scrollWheelZoom={false}
        className="w-full h-full"
        style={{ background: '#F8FAFC' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapRecenter center={mapCenter} zoom={13} />

        {/* User Location Marker */}
        {userLocation && (
          <Marker position={userLocation} icon={createUserLocationIcon()}>
            <Popup>
              <div className="p-1 font-sans text-xs">
                <strong className="text-blue-700 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> Your Current Location
                </strong>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Park Pins */}
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
              <div className="p-1 min-w-[210px] font-sans">
                <div className="flex items-center gap-2 mb-1">
                  {park.status === 'normal' && <CheckCircle2 className="w-4 h-4 text-emerald-700" />}
                  {park.status === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-600" />}
                  {park.status === 'critical' && <ShieldAlert className="w-4 h-4 text-red-600" />}
                  <span className="font-bold text-sm text-slate-900">{park.name}</span>
                </div>
                <p className="text-xs text-slate-500 mb-2">{park.location}</p>
                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-100 p-2 rounded mb-2 border border-slate-200">
                  <div>
                    <span className="text-slate-500 block text-[11px]">Temperature</span>
                    <span className="font-semibold text-slate-900">{park.temp}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Soil Moisture</span>
                    <span className="font-semibold text-slate-900">{park.soilMoisture}</span>
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/site/${park.id}`)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-[#1B4332] text-white text-xs font-semibold rounded hover:bg-emerald-900 transition-colors"
                >
                  View Reserve Details
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
