import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // For Authentication
import { getFirestore } from "firebase/firestore"; // For Firestore 
const firebaseConfig = {
  apiKey: "AIzaSyD9KgQwe0kAdnsY2t0QFykzwe6LSYlKkOI",
  authDomain: "codestorm-2024.firebaseapp.com",
  projectId: "codestorm-2024",
  storageBucket: "codestorm-2024.appspot.com",
  messagingSenderId: "990997196342",
  appId: "1:990997196342:web:f858086757e060a2287297"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

export { app,auth, db }; // Export b