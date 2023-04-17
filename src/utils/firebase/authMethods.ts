import { auth, firestore } from "./config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    const adminsSnapshot = await getDocs(collection(firestore, "admins"));
    const adminEmails = adminsSnapshot.docs.map((doc) => doc.data().email);
    const isAdmin = adminEmails.includes(user.email);

    // Store the user in Firestore
    const userDocRef = doc(collection(firestore, "users"), user.uid);

    await setDoc(userDocRef, {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      provider: "Google",
      createdAt: new Date(),
      isAdmin,
      role: isAdmin ? "admin" : "Водій",
    });

    return user;
  } catch (error) {
    console.log(error);
  }
};

// Facebook
export const signInWithFacebook = async () => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    const user = result.user;

    // Store the user in Firestore
    const userDocRef = doc(collection(firestore, "users"), user.uid);
    await setDoc(userDocRef, {
      email: user.email,
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      createdAt: new Date(),
      role: "Водій",
    });
  } catch (error) {
    console.log(error);
  }
};

// Email and password
export const signup = async (email: string, password: string) => {
  try {
    const adminsSnapshot = await getDocs(collection(firestore, "admins"));
    const adminEmails = adminsSnapshot.docs.map((doc) => doc.data().email);
    const isAdmin = adminEmails.includes(email);

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Create a new user document in Firestore
    await setDoc(doc(collection(firestore, "users"), userCredential.user.uid), {
      email: userCredential.user.email,
      uid: userCredential.user.uid,
      createdAt: new Date(),
      role: isAdmin ? "admin" : "Водій",
    });

    return userCredential;
  } catch (error) {
    throw error;
  }
};

export const login = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
  return signOut(auth);
};
