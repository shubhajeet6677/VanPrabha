import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { useNavigate } from 'react-router-dom';
import { Trees, ShieldCheck, ArrowRight, Check, AlertCircle } from 'lucide-react';
import { DIVISIONS, DIVISION_ZONES, ROLES, OFFICERS } from '../data/mockData';

export default function Login() {
  const { loginOfficer } = useAuth();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  const [division, setDivision] = useState(DIVISIONS[0]);
  const [zone, setZone] = useState(DIVISION_ZONES[DIVISIONS[0]][0]);
  const [role, setRole] = useState(ROLES[0]);
  const [fullName, setFullName] = useState('');
  const [officerId, setOfficerId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [formTouched, setFormTouched] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [capsLockOff, setCapsLockOff] = useState(false);

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

    // Auto detect role
    const detectedRole = detectRoleFromPrefix(formatted);
    if (detectedRole) {
      setRole(detectedRole);
    }

    // Match exact officer in mock dataset if present
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

  const handleKeyCapsCheck = (e) => {
    if (typeof e.getModifierState === 'function') {
      const isCapsOn = e.getModifierState('CapsLock');
      setCapsLockOff(!isCapsOn);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormTouched(true);

    const formattedId = officerId.trim();

    if (!fullName.trim() || !formattedId || !password.trim()) {
      const errMsg = 'Please fill in all required officer credentials.';
      setError(errMsg);
      showError(errMsg);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    // Check if officer ID exists or follows standard pattern
    const officerMatch = OFFICERS.find(o => o.id.toLowerCase() === formattedId.toLowerCase());
    const isValidFormat = /^VP-(DG|DC|ZC|CS|FW|LI|ADM|ADC)-\d{3}$/.test(formattedId);

    if (!officerMatch && !isValidFormat) {
      const helpfulErr = 'Officer ID not found. Your ID should look like VP-FW-001. Check your role prefix and try again.';
      setError(helpfulErr);
      showError(helpfulErr);
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

    setError('');
    loginOfficer(officerData);
    showSuccess(`Welcome back, Officer ${officerData.fullName}! Access granted.`);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col justify-center items-center px-4 py-10 font-sans">
      <div className={`w-full max-w-md bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm ${isShaking ? 'animate-shake' : ''}`}>
        
        {/* Header Branding */}
        <div className="text-center mb-6">
          <div className="inline-flex p-3 rounded-lg bg-[#1B4332] text-white mb-3 shadow-sm">
            <Trees className="w-8 h-8 text-emerald-400" />
          </div>
          <h1 className="text-2xl font-bold text-[#1B4332] tracking-tight">
            VanPrabha
          </h1>
          <p className="text-xs font-semibold text-[#2D6A4F] mt-1">
            "The Glow of Living Forests"
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Urban Forest Operations & Administration Portal
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 text-xs font-medium rounded-md text-left flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Form with exact required fields in order */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* 1. Division Dropdown */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              1. Division
            </label>
            <select
              value={division}
              onChange={handleDivisionChange}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-md text-xs font-medium text-slate-900 focus:outline-none"
            >
              {DIVISIONS.map((div) => (
                <option key={div} value={div}>
                  {div} Division
                </option>
              ))}
            </select>
          </div>

          {/* 2. Zone Dropdown */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              2. Zone
            </label>
            <select
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-md text-xs font-medium text-slate-900 focus:outline-none"
            >
              {DIVISION_ZONES[division].map((z) => (
                <option key={z} value={z}>
                  {z}
                </option>
              ))}
            </select>
          </div>

          {/* 3. Role Dropdown */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              3. Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-md text-xs font-medium text-slate-900 focus:outline-none"
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* 4. Full Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
              <span>4. Full Name *</span>
              {fullName.trim() ? (
                <span className="text-emerald-600 text-[11px] font-semibold flex items-center gap-1">
                  <Check className="w-3 h-3" /> Valid
                </span>
              ) : formTouched ? (
                <span className="text-red-500 text-[11px] font-semibold">This field is required</span>
              ) : null}
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Rajiv Menon"
              className={`w-full px-3 py-2.5 text-xs font-medium bg-slate-50 border rounded-md focus:outline-none transition-colors ${
                formTouched && !fullName.trim()
                  ? 'border-red-500 bg-red-50/30'
                  : fullName.trim()
                  ? 'border-emerald-500 bg-emerald-50/20'
                  : 'border-slate-300'
              }`}
            />
          </div>

          {/* 5. Officer ID */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
              <span>5. Officer ID *</span>
              {officerId.trim() ? (
                <span className="text-emerald-600 text-[11px] font-semibold flex items-center gap-1">
                  <Check className="w-3 h-3" /> Valid
                </span>
              ) : formTouched ? (
                <span className="text-red-500 text-[11px] font-semibold">This field is required</span>
              ) : (
                <span className="text-[10px] text-slate-400 font-normal">e.g. VP-FW-001</span>
              )}
            </label>
            <input
              type="text"
              value={officerId}
              onChange={handleOfficerIdChange}
              onKeyDown={handleKeyCapsCheck}
              onKeyUp={handleKeyCapsCheck}
              placeholder="VP-FW-001"
              className={`w-full px-3 py-2.5 text-xs font-medium font-mono bg-slate-50 border rounded-md focus:outline-none transition-colors uppercase ${
                formTouched && !officerId.trim()
                  ? 'border-red-500 bg-red-50/30'
                  : officerId.trim()
                  ? 'border-emerald-500 bg-emerald-50/20'
                  : 'border-slate-300'
              }`}
            />
            {capsLockOff && officerId.length > 0 && (
              <div className="text-amber-600 text-[11px] font-semibold mt-1 flex items-center gap-1">
                ⚠️ Caps Lock is off — IDs are uppercase
              </div>
            )}
          </div>

          {/* 6. Password (Masked) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
              <span>6. Password *</span>
              {password.trim() ? (
                <span className="text-emerald-600 text-[11px] font-semibold flex items-center gap-1">
                  <Check className="w-3 h-3" /> Valid
                </span>
              ) : formTouched ? (
                <span className="text-red-500 text-[11px] font-semibold">This field is required</span>
              ) : null}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className={`w-full px-3 py-2.5 text-xs font-medium bg-slate-50 border rounded-md focus:outline-none transition-colors ${
                formTouched && !password.trim()
                  ? 'border-red-500 bg-red-50/30'
                  : password.trim()
                  ? 'border-emerald-500 bg-emerald-50/20'
                  : 'border-slate-300'
              }`}
            />
          </div>

          {/* Single Login Button */}
          <button
            type="submit"
            className="w-full mt-2 py-3 bg-[#1B4332] hover:bg-emerald-900 text-white font-bold rounded-md shadow-sm text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Login
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
}

