import { useState } from "react";
import { Button, Input, Select } from "antd";

import { addObjectType, getObjectTypes } from "../../API/Factory";
import Icon from "../../Components/Icon";
import FieldAndObjectTypeForm from "../../Components/FieldAndObjectTypeForm";
import FieldsSelector from "../../Components/FieldsSelector";

export default function ObjectTypePage() {
  const [isAddingNewObjectType, setIsAddingNewObjectType] = useState(false);

  const fields = [
    {
      name: "sems field",
      description: "sems field description",
      type: "string",
      reference: undefined,
      isRequired: true,
      permissions: { read: [], write: [], update: [], delete: [] },
    },
  ];

  const permissions = {
    read: [],
    write: [],
    update: [],
    delete: [],
  };

  return !isAddingNewObjectType ? (
    <ObjectList setIsAddingNewObjectType={setIsAddingNewObjectType} />
  ) : (
    <AddObjectType setIsAddingNewObjectType={setIsAddingNewObjectType} />
  );
}

const ObjectList = ({ setIsAddingNewObjectType }) => {
  return (
    <div className="flex flex-col relative w-full h-full">
      <div className="absolute bottom-10 right-10 ">
        <Button
          shape="circle"
          type="primary"
          size="large"
          onClick={() => setIsAddingNewObjectType(true)}
        >
          +
        </Button>
      </div>
    </div>
  );
};

const AddObjectType = ({ setIsAddingNewObjectType }) => {
  return (
    <div className="w-full h-full flex flex-col space-y-8">
      <div>
        <Button
          type="primary"
          shape="circle"
          size="large"
          onClick={() => setIsAddingNewObjectType(false)}
        >
          <Icon icon="fa-arrow-left" />
        </Button>
      </div>

      <FieldAndObjectTypeForm />
      <div>
        <span>Fields</span>
        <FieldsSelector />
      </div>
    </div>
  );
};

// <Button
//   type="primary"
//   onClick={() =>
//     addObjectType(
//       "Sems object",
//       "Sems first object type",
//       fields,
//       permissions
//     )
//   }
// >
//   add object
// </Button>

// <Button
//   type="primary"
//   onClick={() => {
//     console.log("sd");
//     getObjectTypes();
//   }}
// >
//   get objects
// </Button>
