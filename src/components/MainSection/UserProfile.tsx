import React from "react";
import styles from "./MainSection.module.css";
import { Col, Container, Row, Button, Card } from "react-bootstrap";
import useAuthentication from "../../hooks/useAuthentication";
import { useAuth } from "../../utils/firebase/hooks/useAuth";
import useAuthUser from "../../hooks/useAuthUser";

const UserProfile = () => {
  const currentUser = useAuthUser();

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
              <div className="flex-grow-1 ms-3 d-flex flex-column align-items-center">
                <Card.Title>{currentUser.displayName}</Card.Title>
                <Card.Text>{currentUser.email}</Card.Text>

                <div
                  className="d-flex  rounded-3 p-2"
                  style={{ backgroundColor: "#efefef" }}
                >
                  <div>
                    <p className="small text-muted mb-1">Articles</p>
                    <p className="mb-0">41</p>
                  </div>
                  <div className="px-3">
                    <p className="small text-muted mb-1">Followers</p>
                    <p className="mb-0">976</p>
                  </div>
                  <div>
                    <p className="small text-muted mb-1">Rating</p>
                    <p className="mb-0">8.5</p>
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
