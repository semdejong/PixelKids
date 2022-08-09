import { Routes, Route } from "react-router-dom";

import AuthRouter from "./Pages/Auth";

function App() {
  return (
    <Routes>
      <Route path="auth/*" element={<AuthRouter />} />
    </Routes>
  );
}

export default App;
