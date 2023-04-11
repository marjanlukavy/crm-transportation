import React from "react";
import withAdminAuth from "../../hocs/withAdminAuth";
import { TripFormProvider } from "../../utils/providers/TripFormContext";
import CreateTripForm from "./CreateTripForm";

const Trips = () => {
  return (
    <TripFormProvider>
      <div>
        <CreateTripForm />
      </div>
    </TripFormProvider>
  );
};

export default withAdminAuth(Trips);
