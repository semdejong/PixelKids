import React from "react";
import { useLocation, Navigate } from "react-router-dom";

export default function NoSessionRoute({
  component: Component,
  ...restOfProps
}) {
  const auth = document.cookie.includes("isAuth");
  const location = useLocation();

  return !auth ? (
    <Component {...restOfProps} />
  ) : (
    <Navigate to="/factory" state={{ from: location }} replace />
  );
}
