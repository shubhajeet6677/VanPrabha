import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('vanprabha_officer');
      return saved ? JSON.parse(saved) : {
        fullName: 'Vikram Singh',
        officerId: 'VP-DG-001',
        division: 'North',
        zone: 'North Zone 1',
        role: 'Director General'
      };
    } catch {
      return {
        fullName: 'Vikram Singh',
        officerId: 'VP-DG-001',
        division: 'North',
        zone: 'North Zone 1',
        role: 'Director General'
      };
    }
  });

  const loginOfficer = (officerData) => {
    setCurrentUser(officerData);
    try {
      localStorage.setItem('vanprabha_officer', JSON.stringify(officerData));
    } catch (e) {
      console.error("Storage error", e);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('vanprabha_officer');
    } catch (e) {
      console.error("Storage clear error", e);
    }
  };

  const value = {
    currentUser,
    userRole: currentUser?.role || 'Director General',
    loginOfficer,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
