// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "renteasy-773f4.firebaseapp.com",
    projectId: "renteasy-773f4",
    storageBucket: "renteasy-773f4.firebasestorage.app",
    messagingSenderId: "428048192627",
    appId: "1:428048192627:web:4ab1eec678671a2aa38606"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);