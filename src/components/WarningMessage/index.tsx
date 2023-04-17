import { Button } from "react-bootstrap";
import Alert from "react-bootstrap/esm/Alert";
import { useNavigate } from "react-router-dom";

const WarningMessage = ({ message }: { message?: string }) => {
  const navigate = useNavigate();
  return (
    <div
      className="position-absolute d-flex justify-content-center align-items-center flex-column"
      style={{
        background: "#ffe6c7",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 1,
      }}
    >
      <Alert variant="warning">{message}</Alert>
      <Button variant="dark" onClick={() => navigate("/profile")}>
        get back
      </Button>
    </div>
  );
};

export default WarningMessage;
