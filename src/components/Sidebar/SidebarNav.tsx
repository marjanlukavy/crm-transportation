import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaPlane, FaHome } from "react-icons/fa";
import { BiTrip } from "react-icons/bi";
import { UserData } from "../../hooks/types";

interface SidebarNavProps {
  currentUser?: UserData | null;
  isAdmin?: boolean;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ currentUser, isAdmin }) => {
  const admin = currentUser?.isAdmin;
  const linkClassName = "text-decoration-none text-secondary";

  return (
    <nav>
      <ul className="list-unstyled">
        <li className="mb-4">
          <Link
            to="/profile"
            className={`${linkClassName} d-flex align-items-center gap-2`}
          >
            <FaHome className="me-2" />
            Profile
          </Link>
        </li>
        {admin ? (
          <>
            <li className="mb-4">
              <Link to="/edit-users" className={linkClassName}>
                <FaUser className="me-2" />
                Edit Users
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/edit-trips" className={linkClassName}>
                <FaPlane className="me-2" />
                Edit trips
              </Link>
            </li>
          </>
        ) : null}
        {!admin && (
          <li className="mb-4">
            <Link to="/trips" className={linkClassName}>
              <BiTrip className="me-2" />
              My Trips
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default SidebarNav;
