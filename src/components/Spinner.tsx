import React from "react";
import { Spinner as BootstrapSpinner } from "react-bootstrap";

const CustomSpinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <BootstrapSpinner animation="border" variant="primary" />
    </div>
  );
};

export default CustomSpinner;
