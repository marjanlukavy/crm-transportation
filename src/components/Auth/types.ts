export interface EmailPasswordFieldsProps {
  emailRef: React.RefObject<HTMLInputElement>;
  passwordRef: React.RefObject<HTMLInputElement>;
}

export interface AuthenticationButtonsProps {
  isLoading: boolean;
  currentUser: any;
  handleSignup: () => void;
  handleLogin: () => void;
  handleShowPhoneNumber: () => void;
}
