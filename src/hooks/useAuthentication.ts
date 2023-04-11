import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../utils/firebase/config";

const useAuthentication = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleSignup = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await addUserToFirestore(userCredential.user, "member");
      setToastMessage("Sign up successful!");
      setShowToast(true);
    } catch (error) {
      console.log("Sign up failed", error);
      setToastMessage("Sign up failed. Please try again.");
      setShowToast(true);
    }
    setIsLoading(false);
  };

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setToastMessage("Log in successful!");
      setShowToast(true);
    } catch (error) {
      console.log("Log in failed", error);
      setToastMessage("Log in failed. Please try again.");
      setShowToast(true);
    }
    setIsLoading(false);
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
      setToastMessage("Log out successful!");
      setShowToast(true);
    } catch (error) {
      console.log("Log out failed", error);
      setToastMessage("Log out failed. Please try again.");
      setShowToast(true);
    }
    setIsLoading(false);
  };

  const addUserToFirestore = async (user: User, role: string) => {
    const userRef = doc(firestore, "users", user.uid);
    const userObj = {
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role,
    };
    try {
      await setDoc(userRef, userObj);
      console.log("User added to Firestore");
    } catch (error) {
      console.log("Error adding user to Firestore", error);
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
