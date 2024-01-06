// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app"; //singleton pattern
// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from "firebase/auth";

import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqw8R4MMvlaUUekJfxk3s9mphsCxW9zRY",
  authDomain: "fintechnus.firebaseapp.com",
  projectId: "fintechnus",
  storageBucket: "fintechnus.appspot.com",
  messagingSenderId: "1098662793935",
  appId: "1:1098662793935:web:28c21177f6737aaf7f9dba"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage()
const auth = getAuth(app);

export { app, db, storage,auth }