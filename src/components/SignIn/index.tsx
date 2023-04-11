import { Form } from "react-bootstrap";
import { useRef } from "react";
import useAuthentication from "../../hooks/useAuthentication";

import { useAuth } from "../../utils/firebase/hooks/useAuth";
import PhoneNumber from "./PhoneNumber";
import AuthenticationButtons from "./AuthenticationButtons";
import ToastMessage from "./ToastMessage";
import EmailPasswordFields from "./EmailPasswordFields";

const SignIn = () => {
  const {
    isLoading,
    toastMessage,
    showToast,
    setToastMessage,
    setShowToast,
    handleSignup,
    handleLogin,
    handleLogout,
  } = useAuthentication();

  const currentUser = useAuth();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onSubmitSignup = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const emailValue = emailRef.current?.value;
    const passwordValue = passwordRef.current?.value;

    if (emailValue && passwordValue) {
      handleSignup(emailValue, passwordValue);
    }
  };

  const onSubmitLogin = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const emailValue = emailRef.current?.value;
    const passwordValue = passwordRef.current?.value;

    if (emailValue && passwordValue) {
      handleLogin(emailValue, passwordValue);
    }
  };

  return (
    <div>
      <Form onSubmit={onSubmitSignup}>
        <EmailPasswordFields
          emailRef={emailRef}
          passwordRef={passwordRef}
          currentUser={currentUser}
        />
        <AuthenticationButtons
          isLoading={isLoading}
          currentUser={currentUser}
          handleSignup={onSubmitLogin}
          handleLogin={onSubmitLogin}
        />
      </Form>
      <ToastMessage
        showToast={showToast}
        toastMessage={toastMessage}
        setToastMessage={setToastMessage}
        setShowToast={setShowToast}
      />
      {/* <PhoneNumber /> */}
    </div>
  );
};

export default SignIn;
