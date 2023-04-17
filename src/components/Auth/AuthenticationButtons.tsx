import { Button } from "react-bootstrap";
import {
  signInWithGoogle,
  signInWithFacebook,
} from "../../utils/firebase/authMethods";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { ImExit, ImEnter } from "react-icons/im";
import { BsFillPhoneFill } from "react-icons/bs";
import { AuthenticationButtonsProps } from "./types";

const AuthenticationButtons = ({
  isLoading,
  currentUser,
  handleSignup,
  handleLogin,
  handleShowPhoneNumber,
}: AuthenticationButtonsProps) => {
  //Google
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log("Google sign-in failed", error);
    }
  };
  // Facebook
  const handleFacebookSignIn = async () => {
    try {
      await signInWithFacebook();
    } catch (error) {
      console.log("Facebook sign-in failed", error);
    }
  };

  const buttonStyles = {
    fontSize: "25px",
    backgroundColor: "rgb(246 238 215)",
    border: "1px solid #ffe6c7",
    gap: "10px",
  };
  return (
    <>
      <div
        className="d-flex gap-2 justify-content-between mt-4"
        style={{ gap: "10px" }}
      >
        <Button
          variant=""
          type="submit"
          disabled={isLoading || currentUser}
          className={` d-flex align-items-center auth-btn`}
          onClick={handleSignup}
          style={buttonStyles}
        >
          <ImExit />
          Sign Up
        </Button>

        <Button
          variant=""
          type="submit"
          disabled={isLoading || currentUser}
          className="d-flex align-items-center auth-btn"
          onClick={handleLogin}
          style={buttonStyles}
        >
          <ImEnter /> Log in
        </Button>
        <Button
          variant=""
          type="submit"
          disabled={isLoading || currentUser}
          className="d-flex align-items-center auth-btn"
          onClick={handleShowPhoneNumber}
          style={buttonStyles}
        >
          <BsFillPhoneFill /> Using Phone Number
        </Button>
        <Button
          variant=""
          disabled={isLoading || currentUser}
          onClick={handleGoogleSignIn}
          className="d-flex align-items-center auth-btn"
          style={buttonStyles}
        >
          <FcGoogle />
        </Button>
        <Button
          variant=""
          disabled={isLoading || currentUser}
          className="d-flex align-items-center auth-btn"
          onClick={handleFacebookSignIn}
          style={buttonStyles}
        >
          <BsFacebook />
        </Button>
      </div>
    </>
  );
};

export default AuthenticationButtons;
