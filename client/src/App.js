//3rd library imports
import { Routes, Route } from "react-router-dom";

//Pages, hooks and API
import AuthRouter from "./Pages/Auth";

//Components
import Loader from "./Components/Loader";

//Stylesheets

function App() {
  return (
    <>
      <Loader />
      <Routes>
        <Route path="auth/*" element={<AuthRouter />} />
      </Routes>
    </>
  );
}

export default App;
