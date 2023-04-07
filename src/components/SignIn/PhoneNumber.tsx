import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  getAuth,
  PhoneAuthProvider,
  ConfirmationResult,
} from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { auth } from "../../utils/firebase/config";
import { Form, Button } from "react-bootstrap";
import { parsePhoneNumberFromString } from "libphonenumber-js";

const PhoneNumber = () => {
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [verificationCode, setVerificationCode] = useState("");
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const recaptchaVerifier = useRef<any>(null);

  useEffect(() => {
    const recaptchaContainer = document.getElementById("recaptcha-container");
    if (recaptchaContainer) {
      recaptchaVerifier.current = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "normal",
          callback: (response: any) => {
            // reCAPTCHA solved, you can enable the sign-in button, for example
          },
        },
        auth
      );
      recaptchaVerifier.current.render().catch((error: any) => {
        console.log("RecaptchaVerifier render failed", error);
      });
    }
  }, []);

  const handlePhoneNumberSignIn = async () => {
    const phoneNumberValue = phoneNumberRef.current?.value;
    if (phoneNumberValue) {
      try {
        const parsedPhoneNumber = parsePhoneNumberFromString(
          phoneNumberValue,
          "UA"
        );
        const formattedPhoneNumber = parsedPhoneNumber?.format("E.164");

        if (formattedPhoneNumber && recaptchaVerifier.current) {
          const confirmation = await signInWithPhoneNumber(
            auth,
            formattedPhoneNumber,
            recaptchaVerifier.current
          );
          setConfirmationResult(confirmation);
        } else {
          console.log("Invalid phone number format");
        }
      } catch (error) {
        console.log("Phone number sign-in failed", error);
      }
    }
  };

  const handleVerificationCodeSubmit = async () => {
    if (confirmationResult && verificationCode) {
      try {
        await confirmationResult.confirm(verificationCode);
      } catch (error) {
        console.log("Verification code submit failed", error);
      }
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
      {confirmationResult && (
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
      {confirmationResult && (
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
