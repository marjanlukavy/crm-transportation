import {
  signInWithPhoneNumber,
  RecaptchaVerifier,
  ConfirmationResult,
} from "firebase/auth";
import { useEffect, useMemo, useRef, useState } from "react";
import { auth, firestore } from "../../utils/firebase/config";
import { Form, Button } from "react-bootstrap";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { doc, collection, setDoc, getDoc } from "firebase/firestore";

const PhoneNumber = ({ setShowPhoneNumber }: any) => {
  const [confirmation, setConfirmation] = useState<ConfirmationResult | null>(
    null
  );
  const [phoneNumber, setPhoneNumber] = useState("");
  const recaptchaRef = useRef<RecaptchaVerifier | null>(null);
  const [verificationCode, setVerificationCode] = useState("");

  useEffect(() => {
    const recaptchaContainer = document.getElementById("recaptcha-container");
    if (recaptchaContainer) {
      recaptchaRef.current = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "normal",
          callback: () => {},
        },
        auth
      );
      recaptchaRef.current.render().catch((error) => {
        console.log("RecaptchaVerifier render failed", error);
      });
    }
  }, []);

  const parsedPhoneNumber = useMemo(() => {
    return parsePhoneNumberFromString(phoneNumber, "UA");
  }, [phoneNumber]);

  const handlePhoneNumberSignIn = async () => {
    if (!phoneNumber) return;

    if (!parsedPhoneNumber) {
      console.log("Invalid phone number format");
      return;
    }
    const formattedPhoneNumber = parsedPhoneNumber.format("E.164");
    if (!formattedPhoneNumber || !recaptchaRef.current) return;

    try {
      const result = await signInWithPhoneNumber(
        auth,
        formattedPhoneNumber,
        recaptchaRef.current
      );
      setConfirmation(result);
    } catch (error) {
      console.log("Phone number sign-in failed", error);
    }
  };

  const handleVerificationCodeSubmit = async () => {
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
        displayName: "a",
        email: "a",
        photoURL: "a",
        provider: "Phonne Number",
        createdAt: new Date(),
        isAdmin: false,
        role: "Водій",
        phoneNumber: phoneNumber,
      });

      console.log("New user signed up successfully");
    } catch (error) {
      console.log("Verification code submit failed", error);
    }
  };

  return (
    <div>
      <Form.Group controlId="formBasicPhoneNumber">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="tel"
          placeholder="+380"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </Form.Group>
      <button onClick={() => setShowPhoneNumber(false)}>Go back</button>
      {confirmation && (
        <Form.Group controlId="formBasicVerificationCode">
          <Form.Label>Verification Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter verification code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
        </Form.Group>
      )}

      {!confirmation && <div id="recaptcha-container"></div>}

      {!confirmation ? (
        <Button
          variant="primary"
          type="button"
          onClick={handlePhoneNumberSignIn}
        >
          Sign In/Sign up with Phone Number
        </Button>
      ) : null}
      {confirmation && (
        <Button
          variant="primary"
          type="button"
          onClick={handleVerificationCodeSubmit}
        >
          Submit Verification Code
        </Button>
      )}
    </div>
  );
};
export default PhoneNumber;
