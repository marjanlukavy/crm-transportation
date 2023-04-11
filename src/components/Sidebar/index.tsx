import React from "react";
import { Col } from "react-bootstrap";
import { UserData } from "../../hooks/types";
import useAuthentication from "../../hooks/useAuthentication";
import useAuthUser from "../../hooks/useAuthUser";
import styles from "./Sidebar.module.css";
import SidebarAction from "./SidebarActionButton";
import SidebarNav from "./SidebarNav";

const SideBar = () => {
  const currentUser: UserData | null = useAuthUser();
  const { handleLogout } = useAuthentication();
  return (
    <Col xs={12} md={3} className={`${styles.sidebar} d-flex flex-column`}>
      <SidebarNav currentUser={currentUser} isAdmin={currentUser?.isAdmin} />
      <SidebarAction handleLogout={handleLogout} />
    </Col>
  );
};

export default SideBar;
