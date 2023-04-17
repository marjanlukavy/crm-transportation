import useAuthUser from "../../hooks/useAuthUser";
import { convertTimestampToDate } from "../../utils/convertTimestampToDate";
import { Trip } from "../../utils/firebase/hooks/types";
import { useAuth } from "../../utils/firebase/hooks/useAuth";
import { useTrips } from "../../utils/firebase/hooks/useTrips";
import CustomSpinner from "../../shared/Spinner";
import withAdminAuth from "../../hocs/withAdminAuth";

const UserTrips = () => {
  const user = useAuth();

  const { trips, isLoading, isAdmin } = useTrips(user?.uid);

  if (isLoading) {
    return <CustomSpinner />;
  }

  return (
    <div className="w-100 px-4">
      <h1 className="my-4">{!isAdmin ? "My Trips" : "All Trips"}</h1>
      {trips.length ? (
        <ul className="list-group flex-row flex-wrap">
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
      ) : (
        <p>No Trips</p>
      )}
    </div>
  );
};

export default withAdminAuth(UserTrips);
