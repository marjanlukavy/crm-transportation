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
  uid: any;
  phone?: string;
  id?: string;
  displayName?: string;
  email?: string;
  photoURL?: string;
  provider?: string;
  isAdmin: boolean;
  role?: string;
  createdAt: DocumentData;
  age?: string;
  description?: string;
}

export type UserProfileProps = Pick<UserData, "id">;

export type UserInformationProps = Pick<
  UserData,
  | "id"
  | "photoURL"
  | "displayName"
  | "email"
  | "phone"
  | "role"
  | "age"
  | "description"
>;

export type UpdatedUserData = Partial<UserInformationProps> &
  Record<string, any>;
