import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getDatabase, ref, push, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBJGxOOCJNvRcbV7Ii0onMJn1D2cH6L0VQ",
  authDomain: "apphosting-6d08c.firebaseapp.com",
  databaseURL: "https://apphosting-6d08c-default-rtdb.firebaseio.com",
  projectId: "apphosting-6d08c",
  storageBucket: "apphosting-6d08c.firebasestorage.app",
  messagingSenderId: "715326468338",
  appId: "1:715326468338:web:e651006d944cc36a98e06b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup, database, ref, push, onValue };