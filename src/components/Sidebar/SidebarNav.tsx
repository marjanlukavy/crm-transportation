import { Link } from "react-router-dom";
import { UserData } from "../../hooks/types";

interface SidebarNavProps {
  currentUser: UserData | null;
  isAdmin?: boolean;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ currentUser }) => {
  return (
    <nav>
      <ul className="list-unstyled">
        {currentUser && currentUser.isAdmin ? (
          <>
            <li className="mb-4">
              <Link
                to="/edit-users"
                className="text-decoration-none text-secondary"
              >
                Edit Users
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/edit-trips"
                className="text-decoration-none text-secondary"
              >
                Edit trips
              </Link>
            </li>
          </>
        ) : null}
        <li className="mb-4">
          <Link to="/" className="text-decoration-none text-secondary">
            Home
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/trips" className="text-decoration-none text-secondary">
            My Trips
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SidebarNav;
