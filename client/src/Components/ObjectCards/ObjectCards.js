import React from "react";

export default function ObjectCards({ objects }) {
  return (
    <div className="h-full w-full overflow-auto flex flex-col p-4 space-y-4">
      {objects.map((object) => (
        <ObjectCard object={object} />
      ))}
    </div>
  );
}
