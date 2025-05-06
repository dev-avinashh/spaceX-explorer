import { FC } from "react";
import { useAuthStore } from "../store/auth.store";
import { Navigate } from "react-router-dom";

interface IProps {
  children: React.ReactNode;
}

const PrivateRoute: FC<IProps> = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
};

export default PrivateRoute;
