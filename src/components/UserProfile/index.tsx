import { Container, Row, Col, Image } from "react-bootstrap";
import useAuthUser from "../../hooks/useAuthUser";
import CustomSpinner from "../../shared/Spinner";
import EditProfile from "./EditProfile";
import UserInformation from "./UserInformation";

const UserProfile = () => {
  const currentUser = useAuthUser();
  if (currentUser === undefined) {
    return <CustomSpinner />;
  }

  return (
    <Container className="my-auto">
      <Row className="justify-content-center mx-1 rounded overflow-hidden">
        <Col xs={10} sm={8} md={6} lg={4} className="bg-primary text-white p-3">
          <UserInformation {...currentUser} />
        </Col>
        <Col
          xs={10}
          sm={8}
          md={6}
          lg={8}
          className="bg-secondary text-white p-3"
        >
          <EditProfile {...currentUser} />
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
