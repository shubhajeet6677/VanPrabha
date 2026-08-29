import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, googleProvider } from '../lib/firebase';
import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  onAuthStateChanged,
  signOut
} from 'firebase/auth';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null); // 'admin' or 'field_staff'

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function loginWithGoogle() {
    return signInWithPopup(auth, googleProvider);
  }

  function logout() {
    return signOut(auth);
  }

  // Since we are using mock data for roles, we assign roles based on email or randomly for demo.
  function assignMockRole(email) {
    if (email && email.includes('admin')) {
      return 'admin';
    }
    return 'field_staff';
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        setUserRole(assignMockRole(user.email));
      } else {
        setUserRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userRole,
    login,
    loginWithGoogle,
    logout,
    // Add a mock login for demo purposes without actual Firebase credentials
    mockLogin: (role) => {
      setCurrentUser({ email: `demo@${role}.com`, uid: 'mock-uid-123' });
      setUserRole(role);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
