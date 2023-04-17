import { Form } from "react-bootstrap";
import { EmailPasswordFieldsProps } from "./types";

const EmailPasswordFields = ({
  emailRef,
  passwordRef,
}: EmailPasswordFieldsProps) => (
  <div className="d-flex flex-column">
    <Form.Group controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" ref={emailRef} />
    </Form.Group>
    <Form.Group controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" ref={passwordRef} />
    </Form.Group>
  </div>
);

export default EmailPasswordFields;
