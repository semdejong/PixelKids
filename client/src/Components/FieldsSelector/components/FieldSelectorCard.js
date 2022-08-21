import React from "react";
import useObjectTypes from "../../../hooks/useObjectTypes";
import Icon from "../../Icon";

import "./cardStyle.css";

export default function FieldSelectorCard({ field, deleteField }) {
  const { objectTypes } = useObjectTypes();

  return (
    <div className="h-20 w-full bg-white shadow rounded-md border border-gray-50 hover:shadow-md flex flex-col card-container overflow-hidden">
      <div
        className={` w-full h-1 ${
          field.required ? "bg-red-400" : "bg-green-400"
        }`}
      ></div>
      <div className="w-full h-full flex flex-row p-2">
        <div className="flex flex-col w-2/5">
          <span className="font-extralight text-lg text-gray-900">
            {field.name}
          </span>
          <span className="font-extralight text-sm text-gray-400 overflow-clip">
            {field.description}
          </span>
        </div>
        <div className="flex flex-col w-2/5">
          <span className="font-extralight text-lg text-gray-900">
            {field.type}
          </span>
          {field.type === "reference" && (
            <span className="font-extralight text-sm text-gray-400 overflow-clip">
              {objectTypes?.data?.objectTypes?.find(
                (objectType) => objectType._id === field.reference
              ).name || "Loading...."}
            </span>
          )}
        </div>
        <div className="flex flex-col w-1/5 items-center crud">
          <span className="text-lg text-gray-500 cursor-pointer">
            <Icon icon="fa-pen-to-square" />
          </span>

          <span
            className="text-lg text-red-500 cursor-pointer"
            onClick={deleteField}
          >
            <Icon icon="fa-trash" />
          </span>
        </div>
      </div>
    </div>
  );
}
