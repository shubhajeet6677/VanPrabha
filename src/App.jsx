import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ParksPage from './pages/ParksPage';
import ForestsPage from './pages/ForestsPage';
import LitterDetectionPage from './pages/LitterDetectionPage';
import AlertsPage from './pages/AlertsPage';

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/parks" 
              element={
                <ProtectedRoute>
                  <ParksPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/parks/:parkId" 
              element={
                <ProtectedRoute>
                  <ParksPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/parks/:parkId/:sensorId" 
              element={
                <ProtectedRoute>
                  <ParksPage />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/forests" 
              element={
                <ProtectedRoute>
                  <ForestsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/forests/:forestId" 
              element={
                <ProtectedRoute>
                  <ForestsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/forests/:forestId/:sensorId" 
              element={
                <ProtectedRoute>
                  <ForestsPage />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/litter" 
              element={
                <ProtectedRoute>
                  <LitterDetectionPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/litter/:subTab" 
              element={
                <ProtectedRoute>
                  <LitterDetectionPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/litter/:siteId/:cameraId" 
              element={
                <ProtectedRoute>
                  <LitterDetectionPage />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/alerts" 
              element={
                <ProtectedRoute>
                  <AlertsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/alerts/:siteId" 
              element={
                <ProtectedRoute>
                  <AlertsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/alerts/:siteId/:issueId" 
              element={
                <ProtectedRoute>
                  <AlertsPage />
                </ProtectedRoute>
              } 
            />

            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

