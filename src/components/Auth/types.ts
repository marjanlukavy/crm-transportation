import { User } from "../EditUserSection/types";

export interface EmailPasswordFieldsProps {
  emailRef: React.RefObject<HTMLInputElement>;
  passwordRef: React.RefObject<HTMLInputElement>;
}

export interface AuthenticationButtonsProps {
  isLoading: boolean;
  currentUser: User;
  handleSignup: () => void;
  handleLogin: () => void;
  handleShowPhoneNumber: () => void;
}
