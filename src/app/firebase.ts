import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // For Authentication
import { getFirestore } from "firebase/firestore"; // For Firestore 
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyAI6ZLf6DBoVadK6frfBDA9-WbmY_I08qY",
  authDomain: "edulift-a7cb8.firebaseapp.com",
  projectId: "edulift-a7cb8",
  storageBucket: "edulift-a7cb8.appspot.com",
  messagingSenderId: "151510430569",
  appId: "1:151510430569:web:0c43c99e341f45a07ec3f8",
  measurementId: "G-EFLZ08R5YV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialize auth here
const db = getFirestore(app); // Initialize Firestore

export { app, auth, db };