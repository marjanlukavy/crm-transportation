import { useEffect, useState } from "react";
import useAuthUser from "../../../hooks/useAuthUser";
import { getAllTrips } from "../services/getAllTrips";
import { getTripsByUser } from "../services/getTripsByUser";
import { Trip } from "./types";

export const useTrips = (userId?: string) => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const loggedUser = useAuthUser();
  console.log(!loggedUser?.isAdmin);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setIsLoading(true);
        const trips = !loggedUser?.isAdmin
          ? await getTripsByUser(userId)
          : await getAllTrips();
        console.log(trips);

        setTrips(trips);
        setIsLoading(false);
      } catch (error) {
        setError(error as Error | null);
        setIsLoading(false);
      }
    };
    fetchTrips();
  }, [userId]);

  return { trips, isLoading, error, isAdmin: loggedUser?.isAdmin };
};
