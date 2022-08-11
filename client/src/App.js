//3rd library imports
import { Routes, Route } from "react-router-dom";

//Pages, hooks and API
import AuthRouter from "./Pages/Auth";
import FactoryRouter from "./Factory";
import useNavBar from "./hooks/useNavBar";

//Components
import Loader from "./Components/Loader";
import NoSessionRoute from "./Components/NoSessionRoute";
import ProtectedRoute from "./Components/ProtectedRoute";
import NavBar from "./Components/NavBar";

//Stylesheets

function App() {
  const { leftNavBar, rightNavBar } = useNavBar();

  return (
    <>
      <div className="h-screen overflow-hidden">
        <Loader />
        <NavBar leftNavbarItems={leftNavBar} rightNavBarItems={rightNavBar} />
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
      </div>
    </>
  );
}

export default App;
