// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYSLB-MkLAQGVLd0dZp5qRX-F4GJ85l8g",
  authDomain: "my-survivor-care.firebaseapp.com",
  projectId: "my-survivor-care",
  storageBucket: "my-survivor-care.appspot.com",
  messagingSenderId: "893630953771",
  appId: "1:893630953771:web:d408c5488a620cf9e26d6e",
  measurementId: "G-XCQQ77LKBH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;
