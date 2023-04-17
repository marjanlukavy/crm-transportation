import { ComponentType, useEffect } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useNavigate } from "react-router-dom";

type WithAdminAuthProps = {};

const withAdminAuth =
  <P extends object>(WrappedComponent: ComponentType<any>) =>
  (props: P & WithAdminAuthProps) => {
    const navigate = useNavigate();
    const user = useAuthUser();

    useEffect(() => {
      if (user && !user.isAdmin) {
        navigate("/profile");
      }
    }, [user, navigate]);

    return user && user.isAdmin ? <WrappedComponent {...props} /> : null;
  };

export default withAdminAuth;
