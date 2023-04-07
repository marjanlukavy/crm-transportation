import React from "react";
import { Alert } from "react-bootstrap";
import { BiError } from "react-icons/bi";
import { WarningProps } from "../../utils/mainSectionTypes";

const Warning = ({ title, message }: WarningProps) => {
  return (
    <div className="d-inline-flex">
      <Alert
        variant="warning"
        className="d-flex justify-content-center align-items-center"
      >
        <div className="mr-3">
          <BiError size="3em" />
        </div>
        <div>
          <h3>{title}</h3>
          <p>{message}</p>
        </div>
      </Alert>
    </div>
  );
};

export default Warning;
