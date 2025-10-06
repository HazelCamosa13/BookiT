// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIS13HfZ55cvwRiTfbL-bDUUp6vevKZQE",
  authDomain: "bookit-53e0e.firebaseapp.com",
  projectId: "bookit-53e0e",
  storageBucket: "bookit-53e0e.firebasestorage.app",
  messagingSenderId: "173330711632",
  appId: "1:173330711632:web:ff4b5e88baed35c0f83d55"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)