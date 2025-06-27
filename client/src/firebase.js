// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-fce61.firebaseapp.com",
  projectId: "mern-blog-fce61",
  storageBucket: "mern-blog-fce61.firebasestorage.app",
  messagingSenderId: "453967794184",
  appId: "1:453967794184:web:69091640df2ced2aa081bd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
