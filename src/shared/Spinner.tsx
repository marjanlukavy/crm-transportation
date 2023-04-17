import React from "react";
import { Spinner as BootstrapSpinner } from "react-bootstrap";

const CustomSpinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 w-100">
      <BootstrapSpinner animation="grow" variant="primary" />
    </div>
  );
};

export default CustomSpinner;
