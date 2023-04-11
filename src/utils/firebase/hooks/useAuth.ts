import { auth } from "../config";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

export const useAuth = () => {
  const [user, setUser] = useState<any>();
  useEffect(() => {
    return onAuthStateChanged(auth, (user) => setUser(user));
  }, []);
  return user;
};
