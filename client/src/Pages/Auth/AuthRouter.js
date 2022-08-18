import { Routes, Route } from "react-router-dom";

import { LoginPage, RegisterPage } from "./AuthPages";

export default function AuthRouter() {
  return (
    <Routes>
      <Route path="register" element={<RegisterPage />} />
      <Route path="login" element={<LoginPage />} />
    </Routes>
  );
}
