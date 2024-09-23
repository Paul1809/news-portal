// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrTOX7sTzid8YUlFB2v9kduUkRwJdyOjg",
  authDomain: "services-48884.firebaseapp.com",
  projectId: "services-48884",
  storageBucket: "services-48884.appspot.com",
  messagingSenderId: "957264959058",
  appId: "1:957264959058:web:1c6a1a0d8457a7d27d318b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };