import { getDocs, query, collection, where } from "firebase/firestore";
import { firestore } from "../config";
import { Trip } from "../hooks/types";

export const getTripsByUser = async (userId: string): Promise<Trip[]> => {
  if (!userId) {
    throw new Error("User ID is missing");
  }

  const userTrips = await getDocs(
    query(
      collection(firestore, "trips"),
      where("userId", "==", userId.toString())
    )
  );

  const trips: Trip[] = [];
  userTrips.forEach((doc) => {
    trips.push({ id: doc.id, ...doc.data() } as Trip);
  });
  return trips;
};
