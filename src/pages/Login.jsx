import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { useNavigate } from 'react-router-dom';
import { Trees, Eye, EyeOff, X, AlertCircle } from 'lucide-react';
import { DIVISIONS, DIVISION_ZONES, ROLES, OFFICERS } from '../data/mockData';

// Card Data for Left Panel Grid
const PHOTO_CARDS = [
  {
    id: 'petra',
    name: 'Petra',
    location: 'Jordan',
    image: 'https://images.unsplash.com/photo-1606210122158-eeb10e0823bf?w=800&q=80',
    wiki: 'https://en.wikipedia.org/wiki/Petra',
  },
  {
    id: 'chichen-itza',
    name: 'Chichén Itzá',
    location: 'Yucatan, Mexico',
    image: 'https://images.unsplash.com/photo-1568402102990-bc541580b59f?w=800&q=80',
    wiki: 'https://en.wikipedia.org/wiki/Chichen_Itza',
  },
  {
    id: 'machu-picchu',
    name: 'Machu Picchu',
    location: 'Peru',
    image: 'https://images.unsplash.com/photo-1567597243073-2d274aabecec?w=800&q=80',
    wiki: 'https://en.wikipedia.org/wiki/Machu_Picchu',
  },
  {
    id: 'gwk',
    name: 'Garuda Wisnu Kencana',
    location: 'Bali, Indonesia',
    image: 'https://images.unsplash.com/photo-1735611687262-242fff168cb6?w=800&q=80',
    wiki: 'https://en.wikipedia.org/wiki/Garuda_Wisnu_Kencana_cultural_park',
  },
];

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
  const [expandedCard, setExpandedCard] = useState(null);

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
          className="hidden md:block md:w-[45%] relative rounded-l-[20px] overflow-hidden p-[16px] select-none"
          style={{ backgroundColor: '#1B4332' }}
        >
          {/* 2x2 Photo Cards Grid */}
          <div className="grid grid-cols-2 grid-rows-2 gap-[10px] w-full h-full">
            {PHOTO_CARDS.map((card) => (
              <div
                key={card.id}
                onClick={() => setExpandedCard(card)}
                className="relative overflow-hidden rounded-[14px] cursor-pointer group w-full h-full select-none"
              >
                {/* Photo Background */}
                <img
                  src={card.image}
                  alt={card.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    transition: 'transform 400ms ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />

                {/* Dark Gradient Overlay */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)'
                  }}
                />

                {/* Bottom Left Info */}
                <div className="absolute bottom-[12px] left-[12px] right-[12px] z-10 flex flex-col justify-end pointer-events-none">
                  <span className="text-white font-bold text-[13px] leading-tight">
                    {card.name}
                  </span>
                  <span className="text-[#B7E4C7] font-normal text-[11px] leading-tight mt-[2px]">
                    {card.location}
                  </span>
                </div>

                {/* "Travel?" Pill Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(card.wiki, '_blank');
                  }}
                  className="absolute bottom-[12px] left-1/2 -translate-x-1/2 z-20 opacity-0 group-hover:opacity-100 text-white text-[11px] underline rounded-[20px] px-[12px] py-[5px] cursor-pointer whitespace-nowrap"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.35)',
                    transition: 'opacity 250ms ease',
                  }}
                >
                  Travel?
                </button>
              </div>
            ))}
          </div>

          {/* Full Panel Expanded View Overlay */}
          <div
            className={`absolute inset-0 z-30 overflow-hidden ${
              expandedCard 
                ? 'opacity-100 pointer-events-auto scale-100' 
                : 'opacity-0 pointer-events-none scale-95'
            }`}
            style={{ transition: 'all 400ms ease' }}
          >
            {expandedCard && (
              <div className="relative w-full h-full bg-[#1B4332]">
                {/* Photo Background */}
                <img
                  src={expandedCard.image}
                  alt={expandedCard.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Dark Gradient Overlay */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)'
                  }}
                />

                {/* Top Right Close Button */}
                <button
                  type="button"
                  onClick={() => setExpandedCard(null)}
                  className="absolute top-[16px] right-[16px] z-40 flex items-center justify-center text-white cursor-pointer"
                  style={{
                    width: '28px',
                    height: '28px',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '50%',
                    transition: 'background-color 200ms ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.5)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.3)')}
                  aria-label="Close expanded card"
                >
                  <X style={{ width: '20px', height: '20px' }} className="text-white" />
                </button>

                {/* Bottom Overlay Content */}
                <div className="absolute bottom-[24px] left-[24px] right-[24px] z-30 flex flex-col items-center text-center">
                  <h3 className="text-white font-bold text-[22px] leading-tight mb-[2px]">
                    {expandedCard.name}
                  </h3>
                  <p className="text-[#B7E4C7] text-[14px] leading-tight mb-[16px]">
                    {expandedCard.location}
                  </p>

                  {/* Larger "Travel?" Button */}
                  <button
                    type="button"
                    onClick={() => window.open(expandedCard.wiki, '_blank')}
                    className="text-white text-[13px] underline rounded-[20px] cursor-pointer"
                    style={{
                      padding: '8px 20px',
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255, 255, 255, 0.35)',
                    }}
                  >
                    Travel?
                  </button>
                </div>
              </div>
            )}
          </div>
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
