import { useEffect, useState } from "react";
import { Button } from "antd";

import useObjects from "../../hooks/useObjects";

import Fields from "../Fields";

export default function SmartForm({ objectType, cb }) {
  const [value, setValue] = useState({});

  const { createObject, loading } = useObjects();

  useEffect(() => {
    objectType.fields.forEach((field) => {
      value[field.name] = field.multipleReference ? [] : "";
    });

    setValue(value);
  }, []);

  const updateField = (fieldName, newValue) => {
    setValue({
      ...value,
      [fieldName]: newValue,
    });
  };

  const handleSubmit = async () => {
    if (await createObject(objectType._id, value)) {
      cb();
    }
  };

  return (
    <div className="space-y-6">
      {objectType.fields.map((field) => (
        <div>
          <span>
            {field.name} ({field.type}) {field.multipleReference && "*"}
          </span>
          <Fields
            field={field}
            value={value}
            setValue={(newValue) => updateField(field.name, newValue)}
          />
        </div>
      ))}
      <div className="w-full flex flex-row justify-end">
        <Button type="primary" onClick={handleSubmit}>
          Create
        </Button>
      </div>
    </div>
  );
}
