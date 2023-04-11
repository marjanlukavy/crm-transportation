import { Col, Row, Card } from "react-bootstrap";
import useAuthUser from "../../hooks/useAuthUser";
import { useTrips } from "../../utils/firebase/hooks/useTrips";

const UserProfile = () => {
  const currentUser = useAuthUser();
  const { trips } = useTrips(currentUser?.id);
  const tripsLength = trips.length;

  return currentUser ? (
    <Row className="">
      <Col className="mt-5" style={{ maxWidth: "300px" }}>
        <Card style={{ borderRadius: "15px" }}>
          <Card.Body className="p-0 d-flex">
            <div className="d-flex flex-column text-black">
              <div className="flex-shrink-0 text-center py-2 position-relative">
                <img
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    borderRadius: "10px",
                  }}
                  src={currentUser.photoURL}
                  alt="Generic placeholder image"
                />
              </div>
              <div className="flex-grow-1 ms-3 d-flex flex-column ">
                <Card.Title>{currentUser.displayName}</Card.Title>
                <Card.Text>{currentUser.email}</Card.Text>

                <div className="d-flex flex-column text-left rounded-3 p-2">
                  <div>
                    <p className="small text-muted mb-1">
                      Connected Trips - {tripsLength}
                    </p>
                  </div>

                  <div>
                    <p className="small text-muted mb-1">Rating - 8.5</p>
                  </div>
                </div>
                <div className="w-100">
                  <p className="m-0 bg-danger ">{currentUser.role}</p>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  ) : null;
};

export default UserProfile;
