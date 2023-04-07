import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDS2Tk2IAInQHHHxA26CEvSEsAypGEw5JU",
  authDomain: "react-crm-23aa0.firebaseapp.com",
  projectId: "react-crm-23aa0",
  storageBucket: "react-crm-23aa0.appspot.com",
  messagingSenderId: "183987276652",
  appId: "1:183987276652:web:3fa82e24863d60df4d0149",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
