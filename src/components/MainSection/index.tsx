import { Routes, Route } from "react-router-dom";

import Col from "react-bootstrap/esm/Col";
import styles from "./MainSection.module.css";
import UserProfile from "./UserProfile";
import EditUsersSection from "../EditUserSection";
import Trips from "../AdminTrips";

const MainSection = () => {
  return (
    <Col
      className={`main-content rounded text-center ${styles.mainContent} d-flex align-items-center justify-content-center`}
    >
      <div
        className={`w-100 h-100 ${styles.contentContainer} rounded d-flex justify-content-center align-items-center`}
      >
        <UserProfile />
      </div>
    </Col>
  );
};

export default MainSection;
