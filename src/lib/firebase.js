import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Placeholder configuration
const firebaseConfig = {
  apiKey: "AIzaSyPlaceholderKey123",
  authDomain: "vanprabha-mock.firebaseapp.com",
  projectId: "vanprabha-mock",
  storageBucket: "vanprabha-mock.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
