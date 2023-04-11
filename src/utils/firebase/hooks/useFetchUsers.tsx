import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../config";
import useAuthUser from "../../../hooks/useAuthUser";
import { UserData } from "../../../hooks/types";

const useFetchUsers = () => {
  const currentUser = useAuthUser();
  const [users, setUsers] = useState<UserData[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (currentUser && currentUser.isAdmin) {
        const usersCollection = collection(firestore, "users");
        const usersSnapshot = await getDocs(usersCollection);
        const usersList = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          displayName: doc.data().displayName,
          email: doc.data().email,
          photoURL: doc.data().photoURL,
          provider: doc.data().provider,
          isAdmin: doc.data().isAdmin,
          role: doc.data().role,
          createdAt: doc.data().createdAt,
        }));
        setUsers(usersList);
      }
    };

    fetchUsers();
  }, [currentUser]);

  return users;
};

export default useFetchUsers;
