// import { initializeApp } from "firebase/app";
const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
// import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// import { getStorage } from "firebase/storage";
const { getStorage } = require("firebase/storage");
const { getFirestore } = require("firebase/firestore");

// import { getFirestore } from "firebase/firestor
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
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();
const db = getFirestore();
// const analytics = getAnalytics(app);
module.exports = { app, auth, storage, db };
