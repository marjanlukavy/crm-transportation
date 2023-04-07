import { useState } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import MainSection from "./components/MainSection";
import SideBar from "./components/Sidebar";
import WarningMessage from "./components/WarningMessage";

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <Container fluid className="p-0">
      {!authenticated && <WarningMessage />}
      <Row noGutters className="m-0">
        <SideBar />
        <MainSection />
      </Row>
    </Container>
  );
};

export default App;
