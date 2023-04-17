import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updateEmail,
  updateProfile,
} from "firebase/auth";
import { updateDoc, doc, collection } from "firebase/firestore";
import { UpdatedUserData } from "../../../hooks/types";
import { useMessage } from "../../providers/MessageProvider";
import { firestore } from "../config";

export const updateEmailAndUserProfile = async (
  id: string | undefined,
  fullName: string,
  age: string,
  description: string,
  email: string,
  phone: string,
  password: string
) => {
  const auth = getAuth();

  try {
    const usersCollectionRef = collection(firestore, "users");
    const userDocRef = doc(usersCollectionRef, id);

    const updatedFields: UpdatedUserData = {};
    if (fullName) updatedFields.displayName = fullName;
    if (age) updatedFields.age = age;
    if (email) {
      updatedFields.email = email;

      const user = auth.currentUser;
      if (!user) {
        throw new Error("No authenticated user.");
      }
      if (user.email !== null) {
        const credential = EmailAuthProvider.credential(user.email, password);
        await reauthenticateWithCredential(user, credential);
        await updateEmail(user, email);
      }
    }

    if (description) updatedFields.description = description;
    if (phone) updatedFields.phone = phone;
    await updateDoc(userDocRef, updatedFields);

    if (Object.keys(updatedFields).length === 0) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error updating user profile: ", error);
    console.log(error);

    return false;
  }
};
