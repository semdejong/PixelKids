//3rd library imports
import { Routes, Route } from "react-router-dom";

//Pages, hooks and API
import AuthRouter from "./Pages/Auth";
import FactoryRouter from "./Factory";

//Components
import Loader from "./Components/Loader";
import NoSessionRoute from "./Components/NoSessionRoute";
import ProtectedRoute from "./Components/ProtectedRoute";

//Stylesheets

function App() {
  return (
    <>
      <Loader />
      <Routes>
        <Route
          path="auth/*"
          element={<NoSessionRoute component={AuthRouter} />}
        ></Route>
        <Route
          path="factory/*"
          element={<ProtectedRoute component={FactoryRouter} />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
