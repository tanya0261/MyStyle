import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY ,
  authDomain: "loginmystyle.firebaseapp.com",
  projectId: "loginmystyle",
  storageBucket: "loginmystyle.firebasestorage.app",
  messagingSenderId: "194318271672",
  appId: "1:194318271672:web:1bbefa21c7c19b5aac604d"
};
console.log("Firebase Loaded");
console.log(import.meta.env.VITE_FIREBASE_APIKEY);

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()


export {auth, provider}