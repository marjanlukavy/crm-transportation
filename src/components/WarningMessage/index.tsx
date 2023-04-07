import SignIn from "../SignIn";
import Warning from "./Warning";

const WarningMessage = () => {
  return (
    <div
      className="position-absolute d-flex justify-content-center align-items-center"
      style={{
        background: "linear-gradient(90deg, #f06464 0%, #2b32b2 100%)",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 1,
      }}
    >
      <div className="d-flex flex-column">
        <Warning
          title="Warning"
          message="Please sign in or sign up to continue"
        />
        <SignIn />
      </div>
    </div>
  );
};

export default WarningMessage;
