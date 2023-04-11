import { writeBatch, doc } from "firebase/firestore";
import { User } from "../../../components/EditUserSection/types";
import { firestore } from "../config";

const updateUserRoles = async (
  usersToUpdate: User[],
  setShowToast: (value: boolean) => void
) => {
  const batch = writeBatch(firestore);

  usersToUpdate.forEach((user) => {
    const userRef = doc(firestore, "users", user.id);
    batch.update(userRef, { role: user.role });
  });

  await batch.commit();
  setShowToast(true);
};

export default updateUserRoles;
