import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import ToastMessage from "../../shared/ToastMessage";
import { createTrip } from "../../utils/firebase/services/createTrip";
import { useTripForm } from "../../utils/providers/TripFormContext";
import TripCreation from "./TripCreation";

function CreateTripForm() {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const { carNumber, from, to, passengers, userId } = useTripForm();
  const handleCloseToast = () => setShowToast(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const trip = {
      carNumber,
      from,
      to,
      passengers,
      userId,
    };
    try {
      await createTrip(trip);
      setToastMessage("Trip created successfully!");
      setShowToast(true);
    } catch (error) {
      console.error("Error creating trip: ", error);
      setToastMessage("Error creating trip. Please try again.");
      setShowToast(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto">
      <TripCreation />
      <button type="submit" className="btn btn-primary">
        Create Trip
      </button>
      <ToastMessage
        showToast={showToast}
        toastMessage={toastMessage}
        onClose={handleCloseToast}
      />
    </form>
  );
}
export default CreateTripForm;
