import { convertTimestampToDate } from "../../utils/convertTimestampToDate";
import { Trip } from "../../utils/firebase/hooks/types";
import { useAuth } from "../../utils/firebase/hooks/useAuth";
import { useTripsByUser } from "../../utils/firebase/hooks/useFetchTripsByUser";
import CustomSpinner from "../Spinner";

const UserTrips = () => {
  const user = useAuth();

  const { trips, isLoading, error } = useTripsByUser(user?.uid);

  if (isLoading) {
    return <CustomSpinner />;
  }
  console.log(trips);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container">
      <h1 className="my-4">My Trips</h1>
      <ul className="list-group">
        {trips.map((trip: Trip) => (
          <li className="list-group-item" key={trip.id}>
            <h5 className="mb-1">Car Number: {trip.carNumber}</h5>
            <p className="mb-1">
              From: {trip.from ? convertTimestampToDate(trip.from) : ""}
            </p>
            <p className="mb-1">
              To: {trip.to ? convertTimestampToDate(trip.to) : ""}
            </p>

            <p className="mb-1">Passengers: {trip.passengers}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserTrips;
