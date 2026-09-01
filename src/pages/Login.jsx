import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { useNavigate } from 'react-router-dom';
import { Trees, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { DIVISIONS, DIVISION_ZONES, ROLES, OFFICERS } from '../data/mockData';

// Card Data for Coverflow Carousel
const PHOTO_CARDS = [
  {
    id: 'gulmarg',
    name: 'Gulmarg',
    location: 'Jammu & Kashmir, India',
    image: 'https://images.unsplash.com/photo-1666696760251-1047dc26ca1b?w=800&q=80',
    wiki: 'https://en.wikipedia.org/wiki/Gulmarg',
  },
  {
    id: 'rann-of-kutch',
    name: 'Rann of Kutch',
    location: 'Gujarat, India',
    image: 'https://images.unsplash.com/photo-1706013729724-caada9be0f97?w=800&q=80',
    wiki: 'https://en.wikipedia.org/wiki/Rann_of_Kutch',
  },
  {
    id: 'lodhi-garden',
    name: 'Lodhi Garden',
    location: 'New Delhi, India',
    image: 'https://images.unsplash.com/photo-1715633742301-5f6316c7dd4c?w=800&q=80',
    wiki: 'https://en.wikipedia.org/wiki/Lodi_Garden',
  },
  {
    id: 'living-root-bridge',
    name: 'Living Root Bridge',
    location: 'Meghalaya, India',
    image: 'https://images.unsplash.com/photo-1698429357860-1322a462bead?w=800&q=80',
    wiki: 'https://en.wikipedia.org/wiki/Living_root_bridges',
  },
  {
    id: 'jog-falls',
    name: 'Jog Falls',
    location: 'Karnataka, India',
    image: 'https://images.unsplash.com/photo-1622117655866-8b233395581a?w=800&q=80',
    wiki: 'https://en.wikipedia.org/wiki/Jog_Falls',
  },
];

// Position configs: index 0=FAR LEFT, 1=NEAR LEFT, 2=CENTER, 3=NEAR RIGHT, 4=FAR RIGHT
const POSITION_CONFIG = [
  {
    label: 'far-left',
    width: 160, height: 250, borderRadius: 14,
    zIndex: 4,
    transform: 'translateX(-380px) translateZ(-160px) rotateY(25deg)',
    opacity: 0.6,
    boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
    floatDuration: '4s', floatDelay: '1s',
  },
  {
    label: 'near-left',
    width: 200, height: 310, borderRadius: 16,
    zIndex: 7,
    transform: 'translateX(-210px) translateZ(-80px) rotateY(15deg)',
    opacity: 0.85,
    boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
    floatDuration: '3.5s', floatDelay: '0.5s',
  },
  {
    label: 'center',
    width: 240, height: 370, borderRadius: 18,
    zIndex: 10,
    transform: 'translateX(0px) translateZ(0px) rotateY(0deg)',
    opacity: 1,
    boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
    floatDuration: '3s', floatDelay: '0s',
  },
  {
    label: 'near-right',
    width: 200, height: 310, borderRadius: 16,
    zIndex: 7,
    transform: 'translateX(210px) translateZ(-80px) rotateY(-15deg)',
    opacity: 0.85,
    boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
    floatDuration: '3.5s', floatDelay: '0.5s',
  },
  {
    label: 'far-right',
    width: 160, height: 250, borderRadius: 14,
    zIndex: 4,
    transform: 'translateX(380px) translateZ(-160px) rotateY(-25deg)',
    opacity: 0.6,
    boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
    floatDuration: '4s', floatDelay: '1s',
  },
];

// CSS keyframe injection for float animations
const FLOAT_STYLE = `
  @keyframes floatCenter {
    from { transform: var(--card-transform) translateY(0px); }
    to   { transform: var(--card-transform) translateY(-12px); }
  }
  @keyframes floatNear {
    from { transform: var(--card-transform) translateY(0px); }
    to   { transform: var(--card-transform) translateY(-8px); }
  }
  @keyframes floatFar {
    from { transform: var(--card-transform) translateY(0px); }
    to   { transform: var(--card-transform) translateY(-6px); }
  }
`;

export default function Login() {
  const { loginOfficer } = useAuth();
  const { showSuccess } = useToast();
  const navigate = useNavigate();

  const [division, setDivision] = useState(DIVISIONS[0]);
  const [zone, setZone] = useState(DIVISION_ZONES[DIVISIONS[0]][0]);
  const [role, setRole] = useState(ROLES[0]);
  const [fullName, setFullName] = useState('');
  const [officerId, setOfficerId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorBanner, setErrorBanner] = useState('');
  const [formTouched, setFormTouched] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  // Mouse-zone carousel:
  // activeCardIdx = which card (0-4) is currently the center card.
  // Default: card index 2 = Lodhi Garden
  const [activeCardIdx, setActiveCardIdx] = useState(2);
  const [centerHovered, setCenterHovered] = useState(false);
  const panelRef = useRef(null);

  const handlePanelMouseMove = (e) => {
    const rect = panelRef.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = e.clientX - rect.left;
    const zone = Math.min(Math.floor((relX / rect.width) * 5), 4);
    // zone 0→card0, zone1→card1, …
    if (zone !== activeCardIdx) {
      setCenterHovered(false);
      setActiveCardIdx(zone);
    }
  };

  const handlePanelMouseLeave = () => {
    setCenterHovered(false);
    setActiveCardIdx(2); // return to Lodhi Garden
  };

  // Given activeCardIdx (the card that should be center),
  // return which PHOTO_CARDS index sits at position posIdx (0=far-left … 4=far-right).
  // posIdx=2 is always the center slot.
  const getCardAtPosition = (posIdx) => {
    // offset so that card[activeCardIdx] lands at posIdx=2
    return (posIdx - 2 + activeCardIdx + PHOTO_CARDS.length) % PHOTO_CARDS.length;
  };

  const handleDivisionChange = (e) => {
    const selectedDiv = e.target.value;
    setDivision(selectedDiv);
    setZone(DIVISION_ZONES[selectedDiv][0]);
  };

  // Helper to format Officer ID as VP-ROLE-000
  const formatOfficerId = (val) => {
    if (!val) return '';
    let clean = val.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (!clean) return '';

    if (clean.startsWith('VP')) {
      let rest = clean.slice(2);
      if (!rest) return 'VP';

      let prefix = '';
      let digits = '';

      if (rest.startsWith('ADC') || rest.startsWith('ADM')) {
        prefix = rest.slice(0, 3);
        digits = rest.slice(3);
      } else if (rest.length >= 2) {
        prefix = rest.slice(0, 2);
        digits = rest.slice(2);
      } else {
        prefix = rest;
      }

      let result = 'VP-' + prefix;
      if (digits) {
        result += '-' + digits.slice(0, 3);
      }
      return result;
    }

    if (clean.startsWith('ADC') || clean.startsWith('ADM')) {
      let prefix = clean.slice(0, 3);
      let digits = clean.slice(3);
      return 'VP-' + prefix + (digits ? '-' + digits.slice(0, 3) : '');
    }

    const match2 = clean.match(/^(DG|DC|ZC|CS|FW|LI)(.*)/);
    if (match2) {
      return 'VP-' + match2[1] + (match2[2] ? '-' + match2[2].slice(0, 3) : '');
    }

    return clean;
  };

  // Auto detect role from Officer ID prefix
  const detectRoleFromPrefix = (idVal) => {
    if (idVal.includes('VP-DG')) return 'Director General';
    if (idVal.includes('VP-DC')) return 'Division Conservator';
    if (idVal.includes('VP-ZC')) return 'Zone Conservator';
    if (idVal.includes('VP-CS')) return 'Cluster Supervisor';
    if (idVal.includes('VP-FW')) return 'Field Warden';
    if (idVal.includes('VP-LI')) return 'Litter Inspector';
    if (idVal.includes('VP-ADM')) return 'System Admin';
    if (idVal.includes('VP-ADC')) return 'Division Conservator';
    return null;
  };

  // Auto match officer when ID is typed/selected
  const handleOfficerIdChange = (e) => {
    const rawVal = e.target.value;
    const formatted = formatOfficerId(rawVal);
    setOfficerId(formatted);

    const detectedRole = detectRoleFromPrefix(formatted);
    if (detectedRole) {
      setRole(detectedRole);
    }

    const matched = OFFICERS.find(o => o.id.toLowerCase() === formatted.trim().toLowerCase());
    if (matched) {
      setFullName(matched.name);
      setRole(matched.role);
      if (matched.division !== 'All') {
        setDivision(matched.division);
        if (DIVISION_ZONES[matched.division]) {
          const matchedZone = DIVISION_ZONES[matched.division].find(z => z.includes(matched.zone) || matched.zone.includes(z)) || DIVISION_ZONES[matched.division][0];
          setZone(matchedZone);
        }
      }
    }
  };

  const isIdFormatValid = (id) => {
    if (!id) return true;
    return /^VP-(DG|DC|ZC|CS|FW|LI|ADM|ADC)-\d{3}$/.test(id.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormTouched(true);

    const formattedId = officerId.trim();

    if (!fullName.trim() || !formattedId || !password.trim()) {
      setErrorBanner('Incorrect credentials. Please try again.');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    const officerMatch = OFFICERS.find(o => o.id.toLowerCase() === formattedId.toLowerCase());
    const isValidFormat = isIdFormatValid(formattedId);

    if (!officerMatch && !isValidFormat) {
      setErrorBanner('Incorrect credentials. Please try again.');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    const officerData = {
      division,
      zone,
      role,
      fullName: fullName.trim(),
      officerId: formattedId
    };

    setErrorBanner('');
    loginOfficer(officerData);
    showSuccess(`Welcome back, ${officerData.fullName}! Access granted.`);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#2D6A4F] flex items-center justify-center p-4 sm:p-6 font-sans">
      {/* Outer Centered Card */}
      <div 
        className={`w-[95%] lg:w-[85%] max-w-[1150px] min-h-[640px] max-h-[860px] bg-[#FAFAF8] rounded-[20px] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-card-appear ${
          isShaking ? 'animate-shake' : ''
        }`}
      >
        
        {/* LEFT COLUMN (45% width on desktop, hidden on mobile) */}
        <div
          ref={panelRef}
          className="hidden md:flex md:w-[45%] relative rounded-l-[20px] overflow-hidden select-none flex-col items-center justify-between"
          style={{ backgroundColor: '#1B4332', padding: '20px 16px 20px' }}
          onMouseMove={handlePanelMouseMove}
          onMouseLeave={handlePanelMouseLeave}
        >
          {/* Inject float keyframes */}
          <style>{FLOAT_STYLE}</style>

          {/* Top-left VanPrabha Logo */}
          <div className="absolute top-[18px] left-[18px] flex items-center gap-2 z-20">
            <div className="w-7 h-7 rounded-md bg-[#2D6A4F] flex items-center justify-center border border-emerald-600/40">
              <Trees className="w-4 h-4 text-emerald-300" />
            </div>
            <span className="text-white font-bold text-[13px] tracking-tight">VanPrabha</span>
          </div>

          {/* Coverflow Carousel Stage */}
          <div
            className="flex-1 w-full flex items-center justify-center"
            style={{ perspective: '1000px' }}
          >
            <div
              className="relative"
              style={{ width: '90%', height: '85%' }}
            >
              {POSITION_CONFIG.map((pos, posIdx) => {
                const cardIdx = getCardAtPosition(posIdx);
                const card = PHOTO_CARDS[cardIdx];
                const isCenter = pos.label === 'center';
                const animName = isCenter ? 'floatCenter' : (pos.label.includes('near') ? 'floatNear' : 'floatFar');

                return (
                  <div
                    key={`pos-${posIdx}`}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      marginTop: `-${pos.height / 2}px`,
                      marginLeft: `-${pos.width / 2}px`,
                      width: `${pos.width}px`,
                      height: `${pos.height}px`,
                      borderRadius: `${pos.borderRadius}px`,
                      zIndex: pos.zIndex,
                      overflow: 'hidden',
                      opacity: pos.opacity,
                      boxShadow: pos.boxShadow,
                      '--card-transform': pos.transform,
                      animation: `${animName} ${pos.floatDuration} ${pos.floatDelay} ease-in-out infinite alternate`,
                      transition: 'transform 600ms cubic-bezier(0.4,0,0.2,1), opacity 600ms cubic-bezier(0.4,0,0.2,1), box-shadow 600ms cubic-bezier(0.4,0,0.2,1), width 600ms cubic-bezier(0.4,0,0.2,1), height 600ms cubic-bezier(0.4,0,0.2,1)',
                      cursor: isCenter ? 'pointer' : 'default',
                      transform: isCenter && centerHovered ? `${pos.transform} scale(1.04)` : undefined,
                    }}
                    onMouseEnter={isCenter ? () => setCenterHovered(true) : undefined}
                    onMouseLeave={isCenter ? () => setCenterHovered(false) : undefined}
                    onClick={isCenter ? () => window.open(card.wiki, '_blank') : undefined}
                  >
                    {/* Card image */}
                    <img
                      src={card.image}
                      alt={card.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        pointerEvents: 'none',
                        userSelect: 'none',
                      }}
                      draggable={false}
                    />

                    {/* Dark gradient overlay */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)',
                        pointerEvents: 'none',
                      }}
                    />

                    {/* Center card hover info */}
                    {isCenter && (
                      <div
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          padding: '14px 14px 12px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          textAlign: 'center',
                          opacity: centerHovered ? 1 : 0,
                          transition: 'opacity 300ms ease',
                          pointerEvents: centerHovered ? 'auto' : 'none',
                        }}
                      >
                        <span style={{ color: '#fff', fontWeight: 700, fontSize: '13px', lineHeight: '1.2', display: 'block' }}>
                          {card.name}
                        </span>
                        <span style={{ color: '#B7E4C7', fontSize: '11px', marginTop: '2px', display: 'block' }}>
                          {card.location}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); window.open(card.wiki, '_blank'); }}
                          style={{
                            marginTop: '8px',
                            color: '#fff',
                            fontSize: '11px',
                            textDecoration: 'underline',
                            background: 'rgba(255,255,255,0.15)',
                            backdropFilter: 'blur(8px)',
                            WebkitBackdropFilter: 'blur(8px)',
                            border: '1px solid rgba(255,255,255,0.35)',
                            borderRadius: '20px',
                            padding: '4px 12px',
                            cursor: 'pointer',
                            pointerEvents: 'auto',
                          }}
                        >
                          Travel?
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dot Indicators */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              marginBottom: '14px',
              zIndex: 20,
            }}
          >
            {PHOTO_CARDS.map((_, idx) => {
              const isActive = idx === activeCardIdx;
              return (
                <div
                  key={idx}
                  style={{
                    width: isActive ? '20px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    backgroundColor: isActive ? '#fff' : 'rgba(255,255,255,0.35)',
                    transition: 'all 300ms ease',
                  }}
                />
              );
            })}
          </div>

          {/* Bottom tagline */}
          <p
            style={{
              color: '#fff',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              fontSize: '15px',
              textAlign: 'center',
              lineHeight: '1.4',
              paddingBottom: '4px',
              zIndex: 20,
              letterSpacing: '-0.01em',
            }}
          >
            Protecting Forests,<br />One Sensor at a Time
          </p>
        </div>

        {/* RIGHT COLUMN (55% width on desktop, 100% on mobile) */}
        <div className="w-full md:w-[55%] bg-[#FAFAF8] p-6 sm:p-10 lg:p-12 flex flex-col justify-center overflow-y-auto">
          
          {/* Mobile Header Branding */}
          <div className="md:hidden flex items-center gap-2.5 mb-6">
            <div className="w-8 h-8 rounded-md bg-[#1B4332] text-white flex items-center justify-center">
              <Trees className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="text-base font-bold text-[#1B4332]">VanPrabha</span>
          </div>

          {/* Header Texts */}
          <div className="mb-7">
            <h1 className="text-[30px] font-bold text-[#1B4332] tracking-tight leading-tight">
              Welcome Back
            </h1>
            <p className="text-[14px] text-[#6B7280] mt-1 font-normal">
              Sign in to your VanPrabha account
            </p>
          </div>

          {/* Failed Login Error Banner */}
          {errorBanner && (
            <div className="mb-6 p-3.5 bg-red-50 border border-red-200 text-red-800 text-xs font-medium rounded-lg flex items-center justify-between animate-page-fade">
              <div className="flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{errorBanner}</span>
              </div>
              <button 
                onClick={() => setErrorBanner('')}
                className="text-red-500 hover:text-red-800 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Staggered Animated Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Field 1: Division Dropdown */}
            <div className="animate-stagger-1">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Division
              </label>
              <select
                value={division}
                onChange={handleDivisionChange}
                className="w-full px-4 py-[14px] text-[14px] bg-[#F3F4F6] border border-[#E5E7EB] rounded-[10px] text-slate-900 font-medium focus:outline-none focus:border-[#52B788] focus:ring-3 focus:ring-[#52B788]/15 transition-all duration-150 cursor-pointer"
              >
                {DIVISIONS.map((div) => (
                  <option key={div} value={div}>
                    {div} Division
                  </option>
                ))}
              </select>
            </div>

            {/* Field 2: Zone Dropdown */}
            <div className="animate-stagger-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Zone
              </label>
              <select
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                className="w-full px-4 py-[14px] text-[14px] bg-[#F3F4F6] border border-[#E5E7EB] rounded-[10px] text-slate-900 font-medium focus:outline-none focus:border-[#52B788] focus:ring-3 focus:ring-[#52B788]/15 transition-all duration-150 cursor-pointer"
              >
                {DIVISION_ZONES[division].map((z) => (
                  <option key={z} value={z}>
                    {z}
                  </option>
                ))}
              </select>
            </div>

            {/* Field 3: Role Dropdown */}
            <div className="animate-stagger-3">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-[14px] text-[14px] bg-[#F3F4F6] border border-[#E5E7EB] rounded-[10px] text-slate-900 font-medium focus:outline-none focus:border-[#52B788] focus:ring-3 focus:ring-[#52B788]/15 transition-all duration-150 cursor-pointer"
              >
                {ROLES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {/* Field 4: Full Name */}
            <div className="animate-stagger-4">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Rajiv Menon"
                className={`w-full px-4 py-[14px] text-[14px] bg-[#F3F4F6] border rounded-[10px] text-slate-900 font-medium focus:outline-none focus:border-[#52B788] focus:ring-3 focus:ring-[#52B788]/15 transition-all duration-150 ${
                  formTouched && !fullName.trim() ? 'border-red-500 bg-red-50/20' : 'border-[#E5E7EB]'
                }`}
              />
              {formTouched && !fullName.trim() && (
                <span className="text-red-500 text-[11px] font-medium mt-1 block">Required</span>
              )}
            </div>

            {/* Field 5: Officer ID */}
            <div className="animate-stagger-5">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Officer ID
              </label>
              <input
                type="text"
                value={officerId}
                onChange={handleOfficerIdChange}
                placeholder="VP-FW-001"
                className={`w-full px-4 py-[14px] text-[14px] bg-[#F3F4F6] border rounded-[10px] text-slate-900 font-medium focus:outline-none focus:border-[#52B788] focus:ring-3 focus:ring-[#52B788]/15 transition-all duration-150 uppercase ${
                  formTouched && (!officerId.trim() || !isIdFormatValid(officerId))
                    ? 'border-red-500 bg-red-50/20'
                    : 'border-[#E5E7EB]'
                }`}
              />
              {formTouched && !officerId.trim() ? (
                <span className="text-red-500 text-[11px] font-medium mt-1 block">Required</span>
              ) : formTouched && !isIdFormatValid(officerId) ? (
                <span className="text-red-500 text-[11px] font-medium mt-1 block">Should look like VP-FW-001</span>
              ) : null}
            </div>

            {/* Field 6: Password */}
            <div className="animate-stagger-6">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className={`w-full px-4 py-[14px] pr-11 text-[14px] bg-[#F3F4F6] border rounded-[10px] text-slate-900 font-medium focus:outline-none focus:border-[#52B788] focus:ring-3 focus:ring-[#52B788]/15 transition-all duration-150 ${
                    formTouched && !password.trim() ? 'border-red-500 bg-red-50/20' : 'border-[#E5E7EB]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors p-1 cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {formTouched && !password.trim() && (
                <span className="text-red-500 text-[11px] font-medium mt-1 block">Required</span>
              )}
            </div>

            {/* Sign In Button */}
            <div className="pt-2 animate-stagger-6">
              <button
                type="submit"
                className="w-full py-[14px] bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-bold text-[15px] rounded-[10px] shadow-sm hover:-translate-y-[1px] active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                Sign In
              </button>
            </div>
          </form>

          {/* Below Button Admin Text */}
          <div className="mt-6 text-center">
            <p className="text-[13px] text-[#9CA3AF]">
              Having trouble? Contact your System Admin
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
