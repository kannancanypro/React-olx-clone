// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import {getAuth} from 'firebase/auth'
import 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuYzJHHIH7E-wW9EVL9Q4Ov-5qqhpqVGI",
  authDomain: "olxclone-411d7.firebaseapp.com",
  projectId: "olxclone-411d7",
  storageBucket: "olxclone-411d7.appspot.com",
  messagingSenderId: "525969411038",
  appId: "1:525969411038:web:9504c5e2383b96edd92b4f",
  measurementId: "G-4K96FHZLQM"
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);
 const db = getFirestore(FirebaseApp)
 const analytics = getAnalytics(FirebaseApp);




export  {FirebaseApp,db,analytics}
