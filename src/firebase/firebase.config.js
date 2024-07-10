// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1BF9v1baY9Cd9lHfDNwEDCl1SORtT1ZI",
  authDomain: "email-password-auth-a10ed.firebaseapp.com",
  projectId: "email-password-auth-a10ed",
  storageBucket: "email-password-auth-a10ed.appspot.com",
  messagingSenderId: "26719193362",
  appId: "1:26719193362:web:0ad9f86e0dd11507e68bcb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export default auth;