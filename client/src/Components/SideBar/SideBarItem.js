import React from "react";

export default function SideBarItem({ label, icon, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex flex-row justify-center items-center h-12 w-full cursor-pointer border border-1 shadow-md space-x-4 hover:bg-gray-100 hover:shadow-lg"
    >
      <div className="text-lg">
        <i class={`fa-solid ${icon}`} />
      </div>
      <div>{label}</div>
    </div>
  );
}
