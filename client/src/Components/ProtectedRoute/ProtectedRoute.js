import React from "react";
import { useLocation, Navigate } from "react-router-dom";

export default function ProtectedRoute({
  component: Component,
  ...restOfProps
}) {
  const auth = document.cookie.includes("isAuth");
  const location = useLocation();

  return auth ? (
    <Component {...restOfProps} />
  ) : (
    <Navigate to="/auth/login" state={{ from: location }} replace />
  );
}
