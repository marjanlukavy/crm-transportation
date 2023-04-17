import { ConfirmationResult, signInWithPhoneNumber } from "firebase/auth";
import { doc, collection, setDoc, getDoc } from "firebase/firestore";
import parsePhoneNumberFromString from "libphonenumber-js";
import { auth, firestore } from "../config";

export const handlePhoneNumberSignIn = async (
  phoneNumber: string,
  recaptchaVerifier: any, // You can type this more specifically if you want
  setConfirmation: (result: ConfirmationResult) => void,
  handleError: (error: any) => void
) => {
  if (!phoneNumber) return;

  const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumber, "UA");
  if (!parsedPhoneNumber) {
    console.log("Invalid phone number format");
    return;
  }
  const formattedPhoneNumber = parsedPhoneNumber.format("E.164");
  if (!formattedPhoneNumber || !recaptchaVerifier) return;

  try {
    const result = await signInWithPhoneNumber(
      auth,
      formattedPhoneNumber,
      recaptchaVerifier
    );
    setConfirmation(result);
  } catch (error) {
    handleError(error);
  }
};

export const handleVerificationCodeSubmit = async (
  confirmation: ConfirmationResult | null,
  verificationCode: string,
  phoneNumber: string,
  handleSignUpSuccess: () => void,
  handleError: (error: any) => void
) => {
  if (!confirmation || !verificationCode) return;

  try {
    await confirmation.confirm(verificationCode);
    const user = auth.currentUser;
    const userDocRef = doc(collection(firestore, "users"), user?.uid);

    const userDocSnapshot = await getDoc(userDocRef);
    if (userDocSnapshot.exists()) {
      console.log("User already exists in database, logging in...");
      return;
    }

    // Save the phone number to Firestore
    await setDoc(userDocRef, {
      displayName: "",
      email: "",
      photoURL: "",
      provider: "Phonne Number",
      createdAt: new Date(),
      isAdmin: false,
      role: "Водій",
      phoneNumber: phoneNumber,
    });

    handleSignUpSuccess();
  } catch (error) {
    handleError(error);
  }
};
