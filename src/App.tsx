import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import MainSection from "./components/MainSection";
import SideBar from "./components/Sidebar";
import WarningMessage from "./components/WarningMessage";
import { useAuth } from "./utils/firebase/hooks/useAuth";
import EditUsersSection from "./components/EditUserSection";
import Trips from "./components/AdminTrips";
import UserTrips from "./components/UserTrips";
import CustomSpinner from "./components/Spinner";

const App = () => {
  const currentUser = useAuth();

  if (currentUser === undefined) {
    return <CustomSpinner />;
  }

  if (!currentUser) {
    return <WarningMessage />;
  }

  return (
    <BrowserRouter>
      <Container fluid className="p-0">
        <Row noGutters className="m-0 d-flex flex-nowrap">
          <SideBar />
          <Routes>
            <Route path="/" element={<MainSection />} />
            <Route path="/edit-users" element={<EditUsersSection />} />
            <Route path="/edit-trips" element={<Trips />} />
            <Route path="/trips" element={<UserTrips />} />
          </Routes>
        </Row>
      </Container>
    </BrowserRouter>
  );
};

export default App;
