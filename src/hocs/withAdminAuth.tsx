import { ComponentType, useEffect } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/firebase/hooks/useAuth";

type WithAdminAuthProps = {};

const withAdminAuth =
  <P extends object>(WrappedComponent: ComponentType<any>) =>
  (props: P & WithAdminAuthProps) => {
    const navigate = useNavigate();
    const user = useAuthUser();
    const currentUser = useAuth();
    if (currentUser === null) {
      navigate("/login");
    }

    return currentUser != null ? <WrappedComponent {...props} /> : null;
  };

export default withAdminAuth;
