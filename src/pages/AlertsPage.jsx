import React, { useState } from 'react';
import Layout from '../components/Layout';
import { ALERT_SITES } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
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
  Bell, 
  AlertTriangle, 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  MapPin, 
  Activity, 
  User, 
  Send,
  ChevronRight,
  TrendingDown
} from 'lucide-react';

export default function AlertsPage() {
  const { currentUser } = useAuth();
  const officerName = currentUser?.fullName || 'Officer Vikram Singh';

  const [sites, setSites] = useState(ALERT_SITES);
  const [selectedSite, setSelectedSite] = useState(null);
  const [selectedIssue, setSelectedIssue] = useState(null);

  // New Action Log Note state
  const [actionNote, setActionNote] = useState('');

  // Perform action on issue (Acknowledge / Escalate / Mark Resolved)
  const handleAction = (actionType) => {
    if (!selectedIssue || !selectedSite) return;

    const timestamp = new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });
    const logEntry = {
      officer: `${officerName} (${currentUser?.role || 'Director General'})`,
      timestamp,
      action: `Action taken: ${actionType}.${actionNote ? ` Note: ${actionNote}` : ''}`
    };

    const newStatus = actionType === 'Mark Resolved' ? 'Resolved' : actionType === 'Acknowledge' ? 'Acknowledged' : 'Escalated';

    const updatedIssue = {
      ...selectedIssue,
      status: newStatus,
      actionLogs: [...selectedIssue.actionLogs, logEntry]
    };

    setSelectedIssue(updatedIssue);
    setActionNote('');

    // If resolved, update site active alerts count
    if (actionType === 'Mark Resolved') {
      const updatedSiteIssues = selectedSite.issues.map(iss => iss.id === selectedIssue.id ? updatedIssue : iss);
      const remainingActive = updatedSiteIssues.filter(i => i.status !== 'Resolved').length;

      const updatedSite = {
        ...selectedSite,
        activeAlertsCount: remainingActive,
        hasActiveAlerts: remainingActive > 0,
        issues: updatedSiteIssues
      };

      setSelectedSite(updatedSite);
      setSites(sites.map(s => s.id === updatedSite.id ? updatedSite : s));
    }
  };

  return (
    <Layout>
      {/* Title Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Bell className="w-6 h-6 text-amber-500" />
            <h1 className="text-2xl font-bold text-[#1B4332] tracking-tight">
              Operational Alerts & Sensor Anomalies
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-Time Alert Dispatch, Abnormal Sensor Telemetry Analysis, & Resolution Log
          </p>
        </div>
      </div>

      {selectedIssue ? (
        /* ISSUE FULL DETAIL VIEW */
        <div className="space-y-6">
          <button
            onClick={() => setSelectedIssue(null)}
            className="text-xs font-bold text-slate-600 hover:text-[#1B4332] flex items-center gap-1.5 transition-colors cursor-pointer bg-white px-3 py-1.5 rounded border border-slate-200 shadow-sm w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {selectedSite.name} Issues
          </button>

          <div className="bg-white p-6 rounded-xl border border-red-200 shadow-sm space-y-6">
            
            {/* Issue Title & Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-extrabold px-2.5 py-0.5 rounded ${
                    selectedIssue.severity === 'Critical'
                      ? 'bg-red-100 text-red-800 border border-red-300'
                      : 'bg-amber-100 text-amber-900 border border-amber-300'
                  }`}>
                    {selectedIssue.severity.toUpperCase()}
                  </span>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded ${
                    selectedIssue.status === 'Resolved'
                      ? 'bg-emerald-100 text-emerald-800'
                      : selectedIssue.status === 'Acknowledged'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    Status: {selectedIssue.status}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-red-700 mt-2">
                  {selectedIssue.title}
                </h2>
                <p className="text-xs text-slate-600 mt-1 leading-normal">
                  {selectedIssue.description}
                </p>
              </div>

              <div className="flex flex-col items-end gap-1 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  Detected: <strong>{selectedIssue.timeAgo}</strong>
                </span>
                <span>Timestamp: {selectedIssue.timestamp}</span>
              </div>
            </div>

            {/* Affected Sensor ID & Location Tile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
              <div>
                <span className="text-xs text-slate-500 font-medium block">Affected Sensor ID & Type</span>
                <span className="text-sm font-extrabold text-[#1B4332] font-mono mt-0.5 block">
                  {selectedIssue.affectedSensorId} — {selectedIssue.sensorType}
                </span>
              </div>

              <div>
                <span className="text-xs text-slate-500 font-medium block">Exact Physical Location</span>
                <span className="text-sm font-bold text-slate-900 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-4 h-4 text-[#2D6A4F]" />
                  {selectedIssue.location}
                </span>
              </div>
            </div>

            {/* Abnormal Sensor Recharts Line Chart */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-[#1B4332] flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-red-600" />
                Abnormal Telemetry Timeline (Reading Deviation)
              </h3>
              
              <div className="h-64 w-full bg-slate-50 p-4 rounded-xl border border-slate-200">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={selectedIssue.abnormalTrend} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="time" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#991B1B', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                      itemStyle={{ color: '#FCA5A5' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="reading" 
                      stroke="#DC2626" 
                      strokeWidth={2.5}
                      dot={{ r: 4, fill: '#DC2626' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
              <h3 className="text-xs font-bold text-slate-800">Execute Field Action</h3>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => handleAction('Acknowledge')}
                  className="flex-1 py-2 px-4 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded shadow-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Acknowledge Issue
                </button>

                <button
                  onClick={() => handleAction('Escalate')}
                  className="flex-1 py-2 px-4 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded shadow-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <AlertTriangle className="w-4 h-4" />
                  Escalate to Conservator
                </button>

                <button
                  onClick={() => handleAction('Mark Resolved')}
                  className="flex-1 py-2 px-4 bg-[#1B4332] hover:bg-emerald-900 text-white font-bold text-xs rounded shadow-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Mark Resolved
                </button>
              </div>

              {/* Action Note Input */}
              <div className="flex gap-2 pt-2">
                <input
                  type="text"
                  value={actionNote}
                  onChange={(e) => setActionNote(e.target.value)}
                  placeholder="Optional field action note or inspection comment..."
                  className="flex-1 px-3 py-2 text-xs bg-white border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                />
              </div>
            </div>

            {/* Action Log History */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#2D6A4F]" />
                Officer Action Log ({selectedIssue.actionLogs.length} Entries)
              </h3>

              <div className="space-y-2">
                {selectedIssue.actionLogs.map((log, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{log.officer}</span>
                      <span className="text-[10px] text-slate-400 font-medium">{log.timestamp}</span>
                    </div>
                    <p className="text-slate-700">{log.action}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      ) : selectedSite ? (
        /* LIST OF ISSUE BOXES FOR SELECTED SITE */
        <div className="space-y-6">
          <button
            onClick={() => setSelectedSite(null)}
            className="text-xs font-bold text-slate-600 hover:text-[#1B4332] flex items-center gap-1.5 transition-colors cursor-pointer bg-white px-3 py-1.5 rounded border border-slate-200 shadow-sm w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Alert Sites
          </button>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-bold text-[#1B4332]">
                  {selectedSite.name} — Active Alerts & Issues
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Select an issue to inspect abnormal telemetry data and dispatch field actions
                </p>
              </div>
              <span className={`text-xs font-extrabold px-3 py-1 rounded ${
                selectedSite.hasActiveAlerts ? 'bg-red-100 text-red-800 border border-red-300' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {selectedSite.activeAlertsCount} Active Alert{selectedSite.activeAlertsCount !== 1 ? 's' : ''}
              </span>
            </div>

            {selectedSite.issues.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 rounded-lg border border-slate-200 text-xs font-semibold text-slate-500">
                All systems normal for {selectedSite.name}. No active issues logged.
              </div>
            ) : (
              <div className="space-y-4">
                {selectedSite.issues.map((issue) => (
                  <div
                    key={issue.id}
                    onClick={() => setSelectedIssue(issue)}
                    className="p-4 rounded-xl border-2 border-red-500 bg-red-50/20 hover:bg-red-50/50 transition-all cursor-pointer shadow-sm group space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-red-700 group-hover:underline">
                        {issue.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded ${
                          issue.severity === 'Critical'
                            ? 'bg-red-600 text-white'
                            : 'bg-amber-500 text-white'
                        }`}>
                          {issue.severity}
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium">
                          {issue.timeAgo}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600">
                      {issue.description}
                    </p>

                    <div className="pt-2 border-t border-red-200/60 flex items-center justify-between text-xs font-bold text-red-700">
                      <span>Affected Sensor: {issue.affectedSensorId} ({issue.location})</span>
                      <span className="flex items-center gap-1 group-hover:underline">
                        Inspect Full Issue Detail
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* LANDING GRID OF SITE BOXES */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sites.map((site) => (
            <div
              key={site.id}
              onClick={() => setSelectedSite(site)}
              className={`p-5 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between group ${
                site.hasActiveAlerts
                  ? 'bg-red-50/30 border-red-500 hover:bg-red-50/70 shadow-sm'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-lg border ${
                    site.hasActiveAlerts
                      ? 'bg-red-100 text-red-700 border-red-300'
                      : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}>
                    <ShieldAlert className="w-5 h-5" />
                  </div>

                  {site.hasActiveAlerts ? (
                    <span className="text-xs font-extrabold text-red-800 bg-red-100 border border-red-300 px-2.5 py-1 rounded">
                      {site.activeAlertsCount} Active Alert{site.activeAlertsCount > 1 ? 's' : ''}
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded">
                      0 Alerts
                    </span>
                  )}
                </div>

                {/* Site Name with conditional red styling */}
                <h3 className={`text-base font-bold transition-colors ${
                  site.hasActiveAlerts ? 'text-red-700 group-hover:text-red-900' : 'text-slate-900 group-hover:text-[#1B4332]'
                }`}>
                  {site.name}
                </h3>
                
                <p className="text-xs text-slate-500 mt-1">
                  Type: {site.type} Site • {site.hasActiveAlerts ? 'Attention Required' : 'All Systems Normal'}
                </p>
              </div>

              <div className={`mt-4 pt-3 border-t flex items-center justify-between text-xs font-semibold ${
                site.hasActiveAlerts ? 'border-red-200 text-red-700' : 'border-slate-100 text-[#1B4332]'
              }`}>
                <span>{site.hasActiveAlerts ? 'Review Issue List' : 'View Site Status'}</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}
