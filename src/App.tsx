import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import SideBar from "./components/Sidebar";
import { useAuth } from "./utils/firebase/hooks/useAuth";

import CustomSpinner from "./shared/Spinner";
import { MessageProvider } from "./utils/providers/MessageProvider";
import AppRoutes from "./routes/AppRoutes";
import ToastMessage from "./shared/ToastMessage";

const App = () => {
  const currentUser = useAuth();

  if (currentUser === undefined) {
    return <CustomSpinner />;
  }

  return (
    <MessageProvider>
      <BrowserRouter>
        <Container fluid className="p-0">
          <Row className="m-0 d-flex flex-nowrap no-gutters">
            <SideBar />
            <AppRoutes />
          </Row>
          <ToastMessage />
        </Container>
      </BrowserRouter>
    </MessageProvider>
  );
};

export default App;
