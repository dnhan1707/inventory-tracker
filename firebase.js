// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
import {getFirestore} from "firebase/firestore"

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export {firestore}