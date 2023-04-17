import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { auth, firestore } from "../utils/firebase/config";
import { useNavigate } from "react-router-dom";
import { useMessage } from "../utils/providers/MessageProvider";
import { FirebaseError } from "firebase/app";

const useAuthentication = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const { updateMessage } = useMessage();

  const handleSignup = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await addUserToFirestore(userCredential.user, "member");
      updateMessage("Sign up successful!");
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        console.log("Sign up failed: email already in use");
        updateMessage("Email already in use. Please try again.");
      } else {
        console.log("Sign up failed", error);
        updateMessage("Sign up failed. Please try again.");
      }
    }
    setIsLoading(false);
    setShowToast(true);
  };

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      updateMessage("Log in successful!");

      setShowToast(true);
    } catch (error) {
      console.log("Log in failed", error);
      updateMessage("Log in failed. Please try again.");
      setShowToast(true);
    }
    setIsLoading(false);
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
      navigate("/login");
      updateMessage("Log out successful!");
      setShowToast(true);
    } catch (error) {
      console.log("Log out failed", error);
      updateMessage("Log out failed. Please try again.");
      setShowToast(true);
    }
    setIsLoading(false);
  };

  const addUserToFirestore = async (user: User, role: string) => {
    const userRef = doc(firestore, "users", user.uid);
    const adminsSnapshot = await getDocs(collection(firestore, "admins"));
    const adminEmails = adminsSnapshot.docs.map((doc) => doc.data().email);
    const isAdmin = adminEmails.includes(user.email);
    const userObj = {
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role: isAdmin ? "admin" : "Водій",
      isAdmin,
    };
    try {
      await setDoc(userRef, userObj);
      updateMessage("User added to Firestore");
    } catch (error) {
      console.log("Error adding user to Firestore", error);
      updateMessage("Error adding user to Firestore");
    }
  };

  return {
    isLoading,
    toastMessage,
    showToast,
    setToastMessage,
    setShowToast,
    handleSignup,
    handleLogin,
    handleLogout,
  };
};

export default useAuthentication;
