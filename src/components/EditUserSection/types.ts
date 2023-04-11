export interface User {
  id: string;
  name: string;
  lastName: string;
  photoURL: string;
  role: string;
}

export interface ListOfUsersProps {
  users: User[];
  setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
}
