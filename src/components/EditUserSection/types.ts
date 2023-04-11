import { UserData } from "../../hooks/types";
export type User = {
  id?: string;
  displayName?: string;
  email?: string;
  photoURL?: string;
  provider?: string;
  isAdmin?: boolean;
  role: string;
  createdAt?: any;
};

export interface ListOfUsersProps {
  users: User[] | UserData[];
  setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
}
