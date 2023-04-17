import { useCallback, useState } from "react";
import { Table, Form, Button } from "react-bootstrap";
import { UserData } from "../../hooks/types";
import updateUserRoles from "../../utils/firebase/services/updateUserRole";
import { ListOfUsersProps, User } from "./types";

const ListOfUsers = ({ users, setShowToast }: ListOfUsersProps) => {
  const [usersToUpdate, setUsersToUpdate] = useState<User[]>([]);

  const handleRoleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>, user: User | UserData) => {
      const updatedUser = { ...user, role: event.target.value };
      setUsersToUpdate((prevUsers) =>
        prevUsers.find((u) => u.id === updatedUser.id)
          ? prevUsers.map((u) => (u.id === updatedUser.id ? updatedUser : u))
          : [...prevUsers, updatedUser]
      );
    },
    []
  );

  const handleUpdateClick = useCallback(() => {
    if (usersToUpdate.length > 0) {
      updateUserRoles(usersToUpdate, setShowToast);
    }
  }, [usersToUpdate, setShowToast]);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user: User | UserData) => {
          return (
            <tr
              key={user.id}
              style={{
                backgroundColor:
                  usersToUpdate.find((u) => u.id === user.id) &&
                  "rgba(0, 123, 255, 0.1)",
              }}
            >
              <td>
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    width="30"
                    height="30"
                    style={{ borderRadius: "50%" }}
                  />
                ) : (
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      borderRadius: "50%",
                      width: "30px",
                      height: "30px",
                      backgroundColor: "red",
                      margin: "auto",
                      color: "white",
                    }}
                  >
                    {user?.displayName?.[0] || ""}
                  </div>
                )}
              </td>
              <td>{user.displayName}</td>
              <td>{user.email}</td>
              <td>
                <Form.Select
                  value={
                    usersToUpdate.find((u) => u.id === user.id)?.role ||
                    user.role
                  }
                  onChange={(event) => handleRoleChange(event, user)}
                >
                  <option value="admin">Admin</option>
                  <option value="Водій">Водій</option>
                  <option value="Пасажир">Пасажир</option>
                  <option value="Диспетчер">Диспетчер</option>
                </Form.Select>
              </td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <td>
            <Button onClick={handleUpdateClick}>Change Role</Button>
          </td>
        </tr>
      </tfoot>
    </Table>
  );
};

export default ListOfUsers;
