import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAlq2WKz-o1TQ0dOomB4onhLad4sx8EfmQ",
    authDomain: "react-e2bcb.firebaseapp.com",
    projectId: "react-e2bcb",
    storageBucket: "react-e2bcb.firebasestorage.app",
    messagingSenderId: "1060317073776",
    appId: "1:1060317073776:web:287af4b14ef5f1b978bfb5",
    measurementId: "G-1XXVX8DQLH"
  }
  export const firebaseApp = initializeApp(firebaseConfig);
  export const auth = getAuth(firebaseApp);
