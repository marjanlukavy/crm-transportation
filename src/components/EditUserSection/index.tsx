import { useState } from "react";
import { Col } from "react-bootstrap";
import withAdminAuth from "../../hocs/withAdminAuth";
import ToastMessage from "../../shared/ToastMessage";
import useFetchUsers from "../../utils/firebase/hooks/useFetchUsers";
import ListOfUsers from "./ListOfUsers";

const EditUsersSection = () => {
  const users = useFetchUsers();
  const [showToast, setShowToast] = useState(false);

  return (
    <Col
      xs={12}
      md={9}
      className={`main-content rounded text-center  d-flex align-items-center justify-content-center`}
    >
      <div
        className={`w-100 h-100 rounded d-flex flex-column justify-content-center align-items-center`}
      >
        <h1>Edit Users Section</h1>
        <ListOfUsers users={users} setShowToast={setShowToast} />
        <ToastMessage
          showToast={showToast}
          toastMessage={"User roles updated successfully"}
          onClose={() => setShowToast(false)}
        />
      </div>
    </Col>
  );
};

export default withAdminAuth(EditUsersSection);
