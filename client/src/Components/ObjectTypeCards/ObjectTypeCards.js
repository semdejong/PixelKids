import React from "react";

import { ObjectTypeCard } from "./Components";

export default function ObjectTypeCards({ objectTypes, setSelected }) {
  return (
    <div className="h-full w-full overflow-auto flex flex-col p-4 space-y-4">
      {objectTypes.map((objectType) => (
        <ObjectTypeCard objectType={objectType} setSelected={setSelected} />
      ))}
    </div>
  );
}
