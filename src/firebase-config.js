// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_JJy9KfCIYkYjM43tC3lYbtqQDrydUCA",
  authDomain: "teck-geeks-7b799.firebaseapp.com",
  projectId: "teck-geeks-7b799",
  storageBucket: "teck-geeks-7b799.appspot.com",
  messagingSenderId: "154243487714",
  appId: "1:154243487714:web:4f9177bfa9149d25268bbb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
