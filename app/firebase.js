// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDWUGgYhAG_HLAV9s8L4KreOhsDv_FOeic",
  authDomain: "houselook-fd529.firebaseapp.com",
  databaseURL: "https://houselook-fd529-default-rtdb.firebaseio.com",
  projectId: "houselook-fd529",
  storageBucket: "houselook-fd529.appspot.com",
  messagingSenderId: "115183142097",
  appId: "1:115183142097:web:46f012dfa8fa8a79cbf1f0",
  measurementId: "G-FYK54PL7PZ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getDatabase(app);
export const firestoreDB = getFirestore(app);
