import { DocumentData } from "firebase/firestore";

export type AuthenticationHook = {
  isLoading: boolean;
  toastMessage: string;
  showToast: boolean;
  setToastMessage: (message: string) => void;
  setShowToast: (show: boolean) => void;
  handleSignup: (email: string, password: string) => Promise<void>;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleLogout: () => Promise<void>;
};

export interface UserData {
  id?: string;
  displayName: string;
  email: string;
  photoURL: string;
  provider: string;
  isAdmin: boolean;
  role: string;
  createdAt: DocumentData;
}
