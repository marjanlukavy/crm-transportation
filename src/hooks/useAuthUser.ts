import {
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../utils/firebase/config";
import { useAuth } from "../utils/firebase/hooks/useAuth";
import { UserData } from "./types";

const useAuthUser = (): UserData | null => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const authUser = useAuth();
  const fetchUser = async () => {
    if (authUser) {
      const userRef = doc(firestore, "users", authUser.uid);
      const userDoc: DocumentSnapshot<DocumentData> = await getDoc(userRef);

      if (userDoc.exists()) {
        setUserData({
          ...userDoc.data(),
          id: authUser.uid,
        } as unknown as UserData);
      }
    }
  };
  useEffect(() => {
    fetchUser();
  }, [authUser]);

  return userData;
};

export default useAuthUser;
