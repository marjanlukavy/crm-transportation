import { Button } from "react-bootstrap";
import {
  signInWithGoogle,
  signInWithFacebook,
} from "../../utils/firebase/authMethods";

const AuthenticationButtons = ({
  isLoading,
  currentUser,
  handleSignup,
  handleLogin,
}: any) => {
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
  return (
    <>
      <Button
        variant="primary"
        type="submit"
        disabled={isLoading || currentUser}
        onClick={handleSignup}
      >
        {isLoading ? "Loading..." : "Sign Up"}
      </Button>

      <Button
        variant="primary"
        type="submit"
        disabled={isLoading || currentUser}
        onClick={handleLogin}
      >
        Log in
      </Button>
      <Button
        variant="primary"
        disabled={isLoading || currentUser}
        onClick={handleGoogleSignIn}
      >
        {isLoading ? "Loading..." : "Sign in with Google"}
      </Button>
      <Button
        variant="primary"
        disabled={isLoading || currentUser}
        onClick={handleFacebookSignIn}
      >
        {isLoading ? "Loading..." : "Sign in with Facebook"}
      </Button>
    </>
  );
};

export default AuthenticationButtons;
