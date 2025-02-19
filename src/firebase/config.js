// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCp2ao7xNBItZ6G5dqhu1_PjZiQ0r5vd8A",
  authDomain: "journal-app-76f98.firebaseapp.com",
  projectId: "journal-app-76f98",
  storageBucket: "journal-app-76f98.firebasestorage.app",
  messagingSenderId: "1054899018208",
  appId: "1:1054899018208:web:59f371eccd1ea8c2cfb385"
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);