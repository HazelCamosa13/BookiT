import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCRTLe6wEl1yzw1AOkFzkiWxEnUjizquC8",
  authDomain: "bookit-1d692.firebaseapp.com",
  projectId: "bookit-1d692",
  storageBucket: "bookit-1d692.firebasestorage.app",
  messagingSenderId: "105674560922",
  appId: "1:105674560922:web:7d9715b986fc926c945623",
  measurementId: "G-43E1D35PXG"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);