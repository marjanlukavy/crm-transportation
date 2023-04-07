import React from "react";
import { Col } from "react-bootstrap";
import styles from "./MainSection.module.css";

const MainSection = () => {
  return (
    <Col
      xs={12}
      md={9}
      className={`main-content rounded text-center ${styles.mainContent} d-flex align-items-center justify-content-center`}
    >
      <div className={`w-100 h-100 ${styles.contentContainer} rounded`}></div>
    </Col>
  );
};

export default MainSection;
