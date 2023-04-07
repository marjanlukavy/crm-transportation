import React from "react";
import { Col, Container, Alert } from "react-bootstrap";
import { BiError } from "react-icons/bi";
import styles from "./Sidebar.module.css";

const SideBar = () => {
  return (
    <Col
      xs={12}
      md={3}
      className={`${styles.sidebar} d-flex align-items-center justify-content-center p-0 m-0`}
    >
      <Container className="my-5">
        <Alert
          variant="warning"
          className="d-flex justify-content-center align-items-center"
        >
          <div className="mr-3">
            <BiError size="3em" />
          </div>
          <div>
            <h3>Warning</h3>
            <p>Please sign in or sign up to continue</p>
          </div>
        </Alert>
      </Container>
    </Col>
  );
};

export default SideBar;
