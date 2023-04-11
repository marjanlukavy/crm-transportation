import { createContext, useContext, useState } from "react";
import { UserData } from "../../hooks/types";

interface TripFormState {
  carNumber: string;
  setCarNumber: (value: string) => void;
  from: Date | null;
  setFrom: (date: Date | null) => void;
  to: Date | null;
  setTo: (date: Date | null) => void;
  passengers: number;
  setPassengers: (value: number) => void;
  userId: string;
  setUserId: (value: string) => void;
}

const TripFormContext = createContext<TripFormState | null>(null);

export const useTripForm = () => {
  const context = useContext(TripFormContext);
  if (!context) {
    throw new Error("useTripForm must be used within a TripFormProvider");
  }
  return context;
};

export const TripFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [carNumber, setCarNumber] = useState("");
  const [from, setFrom] = useState<Date | null>(new Date());
  const [to, setTo] = useState<Date | null>(new Date());
  const [passengers, setPassengers] = useState(0);
  const [userId, setUserId] = useState("");

  return (
    <TripFormContext.Provider
      value={{
        carNumber,
        setCarNumber,
        from,
        setFrom,
        to,
        setTo,
        passengers,
        setPassengers,
        userId,
        setUserId,
      }}
    >
      {children}
    </TripFormContext.Provider>
  );
};
