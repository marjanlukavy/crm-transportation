import { useState, useEffect } from "react";
import { Toast } from "react-bootstrap";
import { useMessage } from "../utils/providers/MessageProvider";

const ToastMessage = ({ showToast, toastMessage, onClose }: any) => {
  const { message } = useMessage();
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (message) {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
    }
  }, [message]);

  return (
    <Toast
      onClose={onClose}
      show={showToast || showMessage}
      delay={1000}
      autohide
      style={{ position: "fixed", bottom: 20, right: 20 }}
    >
      <Toast.Body>{!message ? toastMessage : message}</Toast.Body>
    </Toast>
  );
};

export default ToastMessage;
