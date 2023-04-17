import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Col } from "react-bootstrap";
import { UserData } from "../../hooks/types";
import useAuthentication from "../../hooks/useAuthentication";
import useAuthUser from "../../hooks/useAuthUser";
import styles from "./Sidebar.module.css";
import SidebarAction from "./SidebarActionButton";
import SidebarNav from "./SidebarNav";
import { useEffect } from "react";

const SideBar = () => {
  const currentUser: UserData | null = useAuthUser();
  const { handleLogout } = useAuthentication();

  return (
    <Col xs="auto" md={2} className={`${styles.sidebar} `}>
      <SidebarNav currentUser={currentUser} isAdmin={currentUser?.isAdmin} />
      <SidebarAction handleLogout={handleLogout} />
    </Col>
  );
};

export default SideBar;
