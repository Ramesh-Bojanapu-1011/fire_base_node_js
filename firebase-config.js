import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, get, update, remove } from 'firebase/database';

// Firebase configuration - Replace with your Firebase project credentials
const firebaseConfig = {
  apiKey: "AIzaSyB0g8TaPEvDFOen4uDwJLgnjv6XKHEDPjo",
  authDomain: "project-b5e2b.firebaseapp.com",
  databaseURL: "https://project-b5e2b-default-rtdb.firebaseio.com",
  projectId: "project-b5e2b",
  storageBucket: "project-b5e2b.firebasestorage.app",
  messagingSenderId: "915399444941",
  appId: "1:915399444941:web:83159f87590970c84a1c84",
  measurementId: "G-Z5P0P36PT8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
export const database = getDatabase(app);
export { ref, push, get, update, remove };