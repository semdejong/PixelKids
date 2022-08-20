import React from "react";
import { Button } from "antd";
import SideBarItem from "./SideBarItem";

export default function SideBar({ topSideBarItems, bottomSideBarItems }) {
  return (
    <div className="h-full w-64 shadow-lg border border-b-4">
      <div className="flex flex-col justify-between items-center w-full h-full p-4">
        {/* top sidebar */}
        <div className="flex flex-col items-center h-full w-full overflow-hidden space-y-8">
          {topSideBarItems
            .filter((item) => item.show)
            .map((item, index) => (
              <div key={index} className="flex items-center w-full">
                <SideBarItem
                  label={item.label}
                  icon={item.icon}
                  onClick={item.onClick}
                />
              </div>
            ))}
        </div>
        {/* bottom sidebar */}
        <div className="flex flex-col justify-end items-center h-full w-full overflow-hidden space-y-8 pb-4">
          {bottomSideBarItems
            .filter((item) => item.show)
            .map((item, index) => (
              <div key={index} className="flex items-center w-full">
                <SideBarItem
                  label={item.label}
                  icon={item.icon}
                  onClick={item.onClick}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
