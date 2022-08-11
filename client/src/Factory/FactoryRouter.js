import React from "react";
import { Button } from "antd";

import useAuthHook from "../Pages/Auth/AuthPages/hooks/useAuthHook";

export default function FactoryRouter() {
  const { logout } = useAuthHook();

  return (
    <Button type="primary" onClick={logout}>
      Logout
    </Button>
  );
}
