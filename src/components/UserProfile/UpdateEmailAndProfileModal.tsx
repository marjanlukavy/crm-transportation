import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const UpdateEmailAndProfileModal = ({ onSubmit }: any) => {
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    onSubmit(event, password);
    handleCloseModal();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShowModal} className="mt-2">
        Update Email and Profile
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Email and Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default UpdateEmailAndProfileModal;
