import React from "react";
import { Button } from "antd";

export default function NavBar({ leftNavbarItems, rightNavBarItems }) {
  return (
    <div className="h-20 w-screen shadow-lg">
      <div className="flex justify-between items-center h-full p-4">
        {/* left navbar */}
        <div className="flex items-center h-full overflow-hidden space-x-8">
          {leftNavbarItems
            .filter((item) => item.show)
            .map((item, index) => (
              <div key={index} className="flex items-center">
                <Button type={item.type} onClick={item.onClick}>
                  {item.label}
                </Button>
              </div>
            ))}
        </div>
        {/* right navbar */}
        <div className="flex items-center h-full overflow-hidden space-x-8">
          {rightNavBarItems
            .filter((item) => item.show)
            .map((item, index) => (
              <div key={index} className="flex items-center">
                <Button type={item.type} onClick={item.onClick}>
                  {item.label}
                </Button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
