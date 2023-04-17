import { Alert, Form } from "react-bootstrap";
import { useRef, useState, useCallback, useEffect } from "react";
import useAuthentication from "../../hooks/useAuthentication";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../utils/firebase/hooks/useAuth";
import PhoneNumber from "./PhoneNumber";
import AuthenticationButtons from "./AuthenticationButtons";
import EmailPasswordFields from "./EmailPasswordFields";
import ToastMessage from "../../shared/ToastMessage";

const SignIn = () => {
  const {
    isLoading,
    toastMessage,
    showToast,
    setToastMessage,
    setShowToast,
    handleSignup,
    handleLogin,
  } = useAuthentication();
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);

  const currentUser = useAuth();
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (currentUser) navigate("/profile");
  }, [currentUser]);

  const onSubmitSignup = useCallback(
    (event: { preventDefault: () => void }) => {
      event.preventDefault();
      const emailValue = emailRef.current?.value;
      const passwordValue = passwordRef.current?.value;

      if (emailValue && passwordValue) {
        handleSignup(emailValue, passwordValue);
      }
    },
    [emailRef, handleSignup, passwordRef]
  );

  const onSubmitLogin = useCallback(
    (event: { preventDefault: () => void }) => {
      event.preventDefault();

      const emailValue = emailRef.current?.value;
      const passwordValue = passwordRef.current?.value;

      if (emailValue && passwordValue) {
        handleLogin(emailValue, passwordValue);
      }
    },
    [emailRef, handleLogin, passwordRef]
  );

  const handleShowPhoneNumber = () => {
    setShowPhoneNumber(true);
  };

  return (
    <div
      className="position-absolute d-flex justify-content-center align-items-center"
      style={{
        background: "#ffe6c7",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 1,
      }}
    >
      <Alert variant="warning">
        <Form>
          {!showPhoneNumber ? (
            <div
              className="d-flex align-items-center w-100"
              style={{ gap: "10px" }}
            >
              <div style={{ maxWidth: "282px" }} className="w-100">
                <EmailPasswordFields
                  emailRef={emailRef}
                  passwordRef={passwordRef}
                />
              </div>
            </div>
          ) : null}

          {!showPhoneNumber ? (
            <AuthenticationButtons
              isLoading={isLoading}
              currentUser={currentUser}
              handleSignup={onSubmitSignup}
              handleLogin={onSubmitLogin}
              handleShowPhoneNumber={handleShowPhoneNumber}
            />
          ) : (
            <PhoneNumber setShowPhoneNumber={setShowPhoneNumber} />
          )}
        </Form>
        <ToastMessage
          showToast={showToast}
          toastMessage={toastMessage}
          setToastMessage={setToastMessage}
          setShowToast={setShowToast}
        />
      </Alert>
    </div>
  );
};

export default SignIn;
