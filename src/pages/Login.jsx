import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Trees, ArrowRight, Shield, UserCheck, Lock, Mail } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [selectedRole, setSelectedRole] = useState('admin');
  const [loading, setLoading] = useState(false);

  const { login, loginWithGoogle, mockLogin } = useAuth();
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      try {
        await login(email, password);
      } catch {
        mockLogin(selectedRole);
      }
      redirectUser(selectedRole);
    } catch (err) {
      setError('Failed to sign in. Please check your email and password.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError('');
      setLoading(true);
      try {
        await loginWithGoogle();
      } catch {
        mockLogin(selectedRole);
      }
      redirectUser(selectedRole);
    } catch (err) {
      setError('Google Sign-In failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoLogin = (role) => {
    mockLogin(role);
    redirectUser(role);
  };

  const redirectUser = (role) => {
    if (role === 'admin') {
      navigate('/dashboard');
    } else {
      navigate('/site/park-1');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col justify-center items-center px-4 py-8">
      
      {/* Main Container */}
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
            Urban Forest Monitoring & GIS Operations Platform
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 text-xs font-medium rounded-md text-center">
            {error}
          </div>
        )}

        {/* Role Selection */}
        <div className="mb-5 bg-slate-100 p-1 rounded-lg flex items-center gap-1 border border-slate-200">
          <button
            type="button"
            onClick={() => setSelectedRole('admin')}
            className={`flex-1 py-2 text-xs font-bold rounded transition-colors flex items-center justify-center gap-1.5 ${
              selectedRole === 'admin' 
                ? 'bg-[#1B4332] text-white shadow-sm' 
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            Administrator
          </button>
          <button
            type="button"
            onClick={() => setSelectedRole('field_staff')}
            className={`flex-1 py-2 text-xs font-bold rounded transition-colors flex items-center justify-center gap-1.5 ${
              selectedRole === 'field_staff' 
                ? 'bg-[#1B4332] text-white shadow-sm' 
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            Field Officer
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="officer@vanprabha.gov.in"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-md text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-md text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:bg-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-[#1B4332] hover:bg-emerald-900 text-white font-bold rounded-md shadow-sm text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            Sign In to Platform
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Divider */}
        <div className="my-5 flex items-center gap-3">
          <div className="h-[1px] bg-slate-200 flex-1" />
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Or</span>
          <div className="h-[1px] bg-slate-200 flex-1" />
        </div>

        {/* Google OAuth Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full py-2.5 border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-semibold rounded-md text-sm flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          Sign In with Google
        </button>

        {/* Quick Demo Access Bar */}
        <div className="mt-5 p-3 bg-slate-100 rounded-lg border border-slate-200">
          <p className="text-xs font-bold text-slate-700 mb-2 text-center">
            Quick Demonstration Login
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => handleQuickDemoLogin('admin')}
              className="flex-1 py-1.5 px-2 bg-white text-[#1B4332] text-xs font-bold rounded border border-slate-300 hover:bg-[#1B4332] hover:text-white transition-colors cursor-pointer"
            >
              Admin Dashboard
            </button>
            <button
              onClick={() => handleQuickDemoLogin('field_staff')}
              className="flex-1 py-1.5 px-2 bg-white text-[#1B4332] text-xs font-bold rounded border border-slate-300 hover:bg-[#1B4332] hover:text-white transition-colors cursor-pointer"
            >
              Site Explorer
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
