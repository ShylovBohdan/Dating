import React from "react";
import { Navigate } from "react-router-dom";
import { useUserStore } from "../store/UserStore";

interface ProtectedRouteProps {
  userRole: string;
  requiredRole?: string;
  allowAllRegistered?: boolean;
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  userRole,
  requiredRole,
  allowAllRegistered,
  children,
}) => {
  const isAuthenticated = useUserStore.getState().isAuthenticated;
  console.log(isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (allowAllRegistered) {
    return children;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
