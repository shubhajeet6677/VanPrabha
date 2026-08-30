import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Trees, ShieldCheck, ArrowRight } from 'lucide-react';
import { DIVISIONS, DIVISION_ZONES, ROLES, OFFICERS } from '../data/mockData';

export default function Login() {
  const { loginOfficer } = useAuth();
  const navigate = useNavigate();

  const [division, setDivision] = useState(DIVISIONS[0]);
  const [zone, setZone] = useState(DIVISION_ZONES[DIVISIONS[0]][0]);
  const [role, setRole] = useState(ROLES[0]);
  const [fullName, setFullName] = useState('');
  const [officerId, setOfficerId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleDivisionChange = (e) => {
    const selectedDiv = e.target.value;
    setDivision(selectedDiv);
    setZone(DIVISION_ZONES[selectedDiv][0]);
  };

  // Auto match officer when ID is typed/selected
  const handleOfficerIdChange = (idVal) => {
    setOfficerId(idVal);
    const matched = OFFICERS.find(o => o.id.toLowerCase() === idVal.trim().toLowerCase());
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !officerId.trim() || !password.trim()) {
      setError('Please fill in all required officer credentials.');
      return;
    }

    loginOfficer({
      division,
      zone,
      role,
      fullName: fullName.trim(),
      officerId: officerId.trim()
    });

    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col justify-center items-center px-4 py-10 font-sans">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
        
        {/* Header Branding */}
        <div className="text-center mb-6">
          <div className="inline-flex p-3 rounded-lg bg-[#1B4332] text-white mb-3 shadow-sm">
            <Trees className="w-8 h-8" />
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
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 text-xs font-medium rounded-md text-center">
            {error}
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
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-md text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:bg-white"
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
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-md text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:bg-white"
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
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-md text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:bg-white"
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
            <label className="block text-xs font-bold text-slate-700 mb-1">
              4. Full Name
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Rajiv Menon"
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-md text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:bg-white"
            />
          </div>

          {/* 5. Officer ID */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
              <span>5. Officer ID</span>
              <span className="text-[10px] text-slate-400 font-normal">e.g. VP-DG-001</span>
            </label>
            <input
              type="text"
              required
              value={officerId}
              onChange={(e) => handleOfficerIdChange(e.target.value)}
              placeholder="VP-DG-001"
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-md text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:bg-white font-mono"
            />
          </div>

          {/* 6. Password (Masked) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              6. Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-md text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:bg-white"
            />
          </div>

          {/* Single Login Button */}
          <button
            type="submit"
            className="w-full mt-2 py-3 bg-[#1B4332] hover:bg-emerald-900 text-white font-bold rounded-md shadow-sm text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            Login
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
}
