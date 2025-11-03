
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAOjvz1K0_RAZwb1BKqRGjrDFKOFArCi8A",
  authDomain: "lifestyle-46a11.firebaseapp.com",
  projectId: "lifestyle-46a11",
  storageBucket: "lifestyle-46a11.firebasestorage.app",
  messagingSenderId: "853178107062",
  appId: "1:853178107062:web:d9c88ecb3d8066be92d217"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);