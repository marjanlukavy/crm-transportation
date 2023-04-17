import { FormEvent, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { UserProfileProps } from "../../hooks/types";
import { updateEmailAndUserProfile } from "../../utils/firebase/handlers/updateEmailAndUserProfile";
import { useMessage } from "../../utils/providers/MessageProvider";
import UpdateEmailAndProfileModal from "./UpdateEmailAndProfileModal";

const EditProfile = ({ id }: UserProfileProps) => {
  const { updateMessage } = useMessage();

  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+380");

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
    password: string
  ) => {
    event.preventDefault();

    try {
      const success = await updateEmailAndUserProfile(
        id,
        fullName,
        age,
        description,
        email,
        phone,
        password
      );

      if (success) {
        updateMessage("User profile updated successfully");
      } else {
        updateMessage("Failed to update user profile.Check Password");
      }
    } catch (error) {
      console.error("Error updating user profile: ", error);
    }
  };

  return (
    <Col>
      <Form>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            className="w-100"
          />
        </Form.Group>

        <Form.Group controlId="formAge">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter age"
            value={age}
            onChange={(event) => setAge(event.target.value)}
            className="w-100"
          />
        </Form.Group>
        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="w-100"
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-100"
          />
        </Form.Group>

        <Form.Group controlId="formPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Enter phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className="w-100"
          />
        </Form.Group>

        {/* <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button> */}
        <UpdateEmailAndProfileModal onSubmit={handleSubmit} />
      </Form>
    </Col>
  );
};

export default EditProfile;
