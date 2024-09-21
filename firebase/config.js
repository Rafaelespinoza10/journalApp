// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth  } from 'firebase/auth'
import { getAnalytics } from "firebase/analytics";
import { getFirestore }from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHUhEaIGhhoUA407GAJ7GxBAvlWdw6EzQ",
  authDomain: "react-courses-2898b.firebaseapp.com",
  projectId: "react-courses-2898b",
  storageBucket: "react-courses-2898b.appspot.com",
  messagingSenderId: "138747623863",
  appId: "1:138747623863:web:931a40878ad40ef6a15032",
 // measurementId: "G-T0GJ7EH51S"
};

// Initialize Firebase
export const FireBaseApp = initializeApp( firebaseConfig );
export const FireBaseAnalytics = getAnalytics( FireBaseApp );
export const FireBaseAuth = getAuth( FireBaseApp );
export const FireBaseDB = getFirestore( FireBaseApp );
