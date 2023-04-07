import React from "react";
import { Toast } from "react-bootstrap";

const ToastMessage = ({ showToast, toastMessage, onClose }: any) => (
  <Toast
    onClose={onClose}
    show={showToast}
    delay={1000}
    autohide
    style={{ position: "fixed", bottom: 20, right: 20 }}
  >
    <Toast.Body>{toastMessage}</Toast.Body>
  </Toast>
);

export default ToastMessage;
