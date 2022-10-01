import React, { useEffect, useState } from "react";
import { Spin } from "antd";

import useObjects from "../../../hooks/useObjects";
import useLoading from "../../../hooks/useLoading";

import Icon from "../../Icon";

export default function ObjectTypeCard({ objectType, setSelected }) {
  const [numOfObjects, setNumOfObjects] = useState();
  const { amountOfObjects, loading } = useObjects();

  useEffect(() => {
    (async () => {
      const x = await amountOfObjects(objectType._id);
      setNumOfObjects(x);
    })();
  }, [objectType._id]);

  return (
    <div
      className="w-full h-24 flex flex-row border border-gray-200 rounded-lg shadow-md p-4 hover:shadow-lg cursor-pointer"
      onClick={() => setSelected(objectType._id)}
    >
      <div className="flex flex-col w-1/2">
        <span className="font-thin text-xl">{objectType.name}</span>
        <span className="text-gray-600 font-thin text-md">
          {objectType.description.substring(0, 45)}
          <br />
          {objectType.description.substring(45, 90)}
          {objectType.description.length > 45 && "..."}
        </span>
      </div>
      <div className="flex flex-col w-1/3">
        <span className="text-gray-600 font-thin text-xl">Objects</span>
        <span className="font-thin text-md">
          {typeof numOfObjects === "number" ? numOfObjects : <Spin />}
        </span>
      </div>
      <div className="flex flex-col w-1/3">
        <span className="text-gray-600 font-thin text-xl">Fields</span>
        <span className="font-thin text-md">{objectType.fields.length}</span>
      </div>
      <div className="flex flex-col w-1/3 h-full justify-center items-end mr-8">
        <Icon icon={"fa-chevron-right"} />
      </div>
    </div>
  );
}
