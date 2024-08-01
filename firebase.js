// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvRjgaBCtNwgT3kgzk_vtqdKdc0ixIXuY",
  authDomain: "inventory-management-e4401.firebaseapp.com",
  projectId: "inventory-management-e4401",
  storageBucket: "inventory-management-e4401.appspot.com",
  messagingSenderId: "525970914362",
  appId: "1:525970914362:web:45e607ba7d971b3c208903",
  measurementId: "G-3KV2HMFT1F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

// Initialize Analytics only on the client side
if (typeof window !== "undefined") {
  isSupported().then((yes) => {
    if (yes) {
      const analytics = getAnalytics(app);
    }
  }).catch((error) => {
    console.log("Analytics is not supported in this environment:", error);
  });
}

export { firestore };
