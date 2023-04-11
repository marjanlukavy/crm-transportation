import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../config";
import { Trip } from "../hooks/types";

export const getAllTrips = async (): Promise<Trip[]> => {
  const tripsCollection = collection(firestore, "trips");
  const tripsSnapshot = await getDocs(tripsCollection);

  const trips: Trip[] = [];
  tripsSnapshot.forEach((doc) => {
    trips.push({
      id: doc.id,
      carNumber: doc.data().carNumber,
      from: doc.data().from.toDate(),
      to: doc.data().to.toDate(),
      passengers: doc.data().passengers,
      userId: doc.data().userId,
    });
  });

  return trips;
};
