import { Route, Routes } from "react-router-dom";
import EditUsersSection from "../components/EditUserSection";
import Trips from "../components/AdminTrips";
import UserTrips from "../components/UserTrips";
import UserProfile from "../components/UserProfile";
import SignIn from "../components/Auth";
import WarningMessage from "../components/WarningMessage";

const AppRoutes = () => (
  <Routes>
    <Route path="/edit-users" element={<EditUsersSection />} />
    <Route path="/edit-trips" element={<Trips />} />
    <Route path="/trips" element={<UserTrips />} />
    <Route path="/login" element={<SignIn />} />
    <Route path="/profile" element={<UserProfile />} />
    <Route path="*" element={<WarningMessage message="Page not found" />} />
  </Routes>
);

export default AppRoutes;
