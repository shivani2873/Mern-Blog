// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-cdc62.firebaseapp.com",
  projectId: "mern-blog-cdc62",
  storageBucket: "mern-blog-cdc62.firebasestorage.app",
  messagingSenderId: "284112124197",
  appId: "1:284112124197:web:fa09df9b4306d09852c2cc",
  measurementId: "G-48RP99TP5Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };