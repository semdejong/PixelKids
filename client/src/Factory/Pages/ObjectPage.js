import { useState } from "react";
import { Button } from "antd";

import useObjectTypes from "../../hooks/useObjectTypes";
import useLoading from "../../hooks/useLoading";
import useObjects from "../../hooks/useObjects";
import ObjectTypeCards from "../../Components/ObjectTypeCards";
import AddObject from "../../Components/AddObject";
import ObjectTableAdmin from "../../Components/ObjectTableAdmin";

export default function ObjectPage() {
  const [selected, setSelected] = useState(null);
  const [visible, setVisible] = useState(false);

  const { objectTypes } = useObjectTypes();
  const { startLoading, stopLoading } = useLoading();

  if (!objectTypes?.data) {
    startLoading();
    return <></>;
  }

  stopLoading();

  return !selected ? (
    <ObjectTypeCards
      objectTypes={objectTypes.data.objectTypes}
      setSelected={setSelected}
    />
  ) : (
    <Objects
      objectType={objectTypes.data.objectTypes.find(
        (objectType) => selected === objectType._id
      )}
      setSelected={setSelected}
    />
  );
}

function Objects({ objectType, setSelected }) {
  return (
    <div className="h-full w-full overflow-auto flex flex-col p-4 space-y-4">
      <div className="flex flex-row items-center justify-between w-full ">
        <div className="flex flex-row items-center space-x-4">
          <div>
            <Button type="primary" onClick={() => setSelected(null)}>
              Back
            </Button>
          </div>
          <span className="font-thin text-2xl uppercase">
            {objectType.name}
          </span>
        </div>
        <div className="flex flex-row items-center space-x-4">
          <div>
            <AddObject objectType={objectType} />
          </div>
        </div>
      </div>
      <ObjectTableAdmin objectType={objectType} />
    </div>
  );
}
