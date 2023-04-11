import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../config";

export const createTrip = async (trip: {
  carNumber: string;
  from: Date | null;
  to: Date | null;
  passengers: number;
  userId: string;
}): Promise<void> => {
  try {
    await addDoc(collection(firestore, "trips"), trip);
  } catch (error) {
    throw new Error("Error creating trip");
  }
};
