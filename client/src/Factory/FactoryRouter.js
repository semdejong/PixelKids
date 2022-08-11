import { Routes, Route } from "react-router-dom";

import { ObjectPage, ObjectTypePage, UserPage } from "./Pages";
import useFactorySideBar from "./Hooks/useFactorySideBar";

import SideBar from "../Components/SideBar";

export default function FactoryRouter() {
  const { topSideBar, bottomSideBar } = useFactorySideBar();

  return (
    <div className="flex h-full">
      {/* //render sidebar */}
      <SideBar
        topSideBarItems={topSideBar}
        bottomSideBarItems={bottomSideBar}
      />
      <div className="p-4">
        <Routes>
          <Route path="objects" element={<ObjectPage />} />
          <Route path="objectType" element={<ObjectTypePage />} />
          <Route path="users" element={<UserPage />} />
        </Routes>
      </div>
    </div>
  );
}
