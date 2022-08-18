import { Routes, Route } from "react-router-dom";

import { ObjectPage, ObjectTypePage, UserPage, RolePage } from "./Pages";
import useFactorySideBar from "./Hooks/useFactorySideBar";

import SideBar from "../Components/SideBar";

export default function FactoryRouter() {
  const { topSideBar, bottomSideBar } = useFactorySideBar();

  return (
    <div className="flex h-full w-full">
      {/* //render sidebar */}
      <SideBar
        topSideBarItems={topSideBar}
        bottomSideBarItems={bottomSideBar}
      />
      <div className="p-4 w-full">
        <Routes>
          <Route path="objects" element={<ObjectPage />} />
          <Route path="objectType" element={<ObjectTypePage />} />
          <Route path="users" element={<UserPage />} />
          <Route path="roles" element={<RolePage />} />
        </Routes>
      </div>
    </div>
  );
}
