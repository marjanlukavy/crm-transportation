import {
  signInWithPhoneNumber,
  RecaptchaVerifier,
  ConfirmationResult,
} from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { auth } from "../../utils/firebase/config";
import { Form, Button } from "react-bootstrap";
import { parsePhoneNumberFromString } from "libphonenumber-js";

const PhoneNumber = () => {
  const [confirmation, setConfirmation] = useState<ConfirmationResult | null>(
    null
  );
  const [verificationCode, setVerificationCode] = useState("");
  const phoneNumberRef = useRef<HTMLInputElement | null>(null);
  const recaptchaRef = useRef<RecaptchaVerifier | null>(null);

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

  const handlePhoneNumberSignIn = async () => {
    const phoneNumber = phoneNumberRef.current?.value;
    if (!phoneNumber) return;

    const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumber, "UA");
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
          placeholder="Enter phone number"
          ref={phoneNumberRef}
        />
      </Form.Group>

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
      <div id="recaptcha-container"></div>
      <Button variant="primary" type="button" onClick={handlePhoneNumberSignIn}>
        Sign In with Phone Number
      </Button>
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
