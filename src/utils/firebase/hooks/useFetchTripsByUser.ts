import { useEffect, useState } from "react";
import { getTripsByUser } from "../services/getTripsByUser";
import { Trip } from "./types";

export const useTripsByUser = (userId: string) => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) return;
    const fetchTripsByUser = async () => {
      try {
        setIsLoading(true);
        const trips = await getTripsByUser(userId);
        setTrips(trips);
        setIsLoading(false);
      } catch (error) {
        setError(error as Error | null);
        setIsLoading(false);
      }
    };
    fetchTripsByUser();
  }, [userId]);

  return { trips, isLoading, error };
};
