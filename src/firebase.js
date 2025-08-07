
// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration from the .env file
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY ||"AIzaSyAMzIhCgrURlQGs_u3Pd6ZMmf0Z-9csH7E",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAI || "professional-site-45264.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "professional-site-45264",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "professional-site-45264.firebasestorage.app",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "395888396936",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:395888396936:web:ae2385544ec96a94a3ad3d",
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-GM2FW25XLF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };               