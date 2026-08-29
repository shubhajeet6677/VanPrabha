import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SiteExplorer from './pages/SiteExplorer';

function ProtectedRoute({ children, allowedRole }) {
  const { currentUser, userRole } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // If a role requirement is specified and doesn't match, redirect appropriately
  if (allowedRole && userRole && userRole !== allowedRole) {
    if (userRole === 'admin') {
      return <Navigate to="/dashboard" replace />;
    } else {
      return <Navigate to="/site/park-1" replace />;
    }
  }

  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute allowedRole="admin">
                <Dashboard />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/site/:siteId" 
            element={
              <ProtectedRoute>
                <SiteExplorer />
              </ProtectedRoute>
            } 
          />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
