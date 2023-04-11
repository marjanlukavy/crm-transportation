import type { Timestamp } from "firebase/firestore";

export interface Trip {
  id: string;
  carNumber: string;
  from: Timestamp | null;
  to: Timestamp | null;
  passengers: number;
  userId: string;
}
