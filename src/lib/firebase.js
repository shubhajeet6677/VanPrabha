import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAn4zCXC3n2AKmNtCkreTDijLnAeHmBMMk",
  authDomain: "vanprabha.firebaseapp.com",
  projectId: "vanprabha",
  storageBucket: "vanprabha.firebasestorage.app",
  messagingSenderId: "727105156480",
  appId: "1:727105156480:web:13088422cda2b830d77d65",
  measurementId: "G-B1S6TH0CNX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
