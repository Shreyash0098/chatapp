import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAtqVZohvda6ipI9BIUMqOvEXxS2vDlO7s",
  authDomain: "realtime-chatapp-c894c.firebaseapp.com",
  projectId: "realtime-chatapp-c894c",
  storageBucket: "realtime-chatapp-c894c.appspot.com",
  messagingSenderId: "777340646398",
  appId: "1:777340646398:web:1d8d4903b4d4552323c6af",
  measurementId: "G-N972H66216",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
