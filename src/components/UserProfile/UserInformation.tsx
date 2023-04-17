import { Col, Row, Image, Container } from "react-bootstrap";
import { UserInformationProps } from "../../hooks/types";

const UserInformation = ({
  photoURL,
  displayName,
  email,
  phone,
  role,
  description,
  age,
}: UserInformationProps) => {
  return (
    <Container className="mr-1">
      <Row className="align-items-center flex-column">
        <Col md="auto" className="text-center">
          {photoURL ? (
            <Image
              src={photoURL}
              alt="User avatar"
              roundedCircle
              className="mb-3"
            />
          ) : (
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                borderRadius: "50%",
                width: "50px",
                height: "50px",
                backgroundColor: "red",
                margin: "auto",
                color: "white",
                fontSize: "20px",
              }}
            >
              {displayName?.[0]}
            </div>
          )}
          <h4>{displayName}</h4>
        </Col>
        <Col md className="d-flex flex-column">
          <p>
            <strong>Email:</strong> {email}
          </p>
          {phone && (
            <p>
              <strong>Phone Number:</strong> {phone}
            </p>
          )}
          <p>
            <strong>Role:</strong> {role}
          </p>
          <p>
            <strong>Age:</strong> {age}
          </p>
          <p>
            <strong>About me:</strong> {description}
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default UserInformation;
