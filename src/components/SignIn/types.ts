export interface EmailPasswordFieldsProps {
  emailRef: React.RefObject<HTMLInputElement>;
  passwordRef: React.RefObject<HTMLInputElement>;
  currentUser: { email: string } | null;
}
