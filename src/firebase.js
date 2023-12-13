// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmoO3i1F_uVUSUeYWTxmwjBzh4xpX2qFY",
  authDomain: "teamconnect-ebfc4.firebaseapp.com",
  projectId: "teamconnect-ebfc4",
  storageBucket: "teamconnect-ebfc4.appspot.com",
  messagingSenderId: "387244123287",
  appId: "1:387244123287:web:13fc3c9ac1718e18d475d2",
  measurementId: "G-PQSPER346V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app)
const auth=getAuth(app)


export {db,auth}

export const onAuthChanged = (callback) => {
  return onAuthStateChanged(auth, callback)
}