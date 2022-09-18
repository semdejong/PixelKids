import { useEffect, useState } from "react";
import { Button } from "antd";

import useObjects from "../../hooks/useObjects";

import Fields from "../Fields";

export default function SmartForm({
  objectType,
  cb,
  editMode = false,
  object,
}) {
  const [value, setValue] = useState(
    editMode ? JSON.parse(JSON.stringify(object)) : {}
  );

  const { createObject, refetch, loading } = useObjects();

  useEffect(() => {
    if (!editMode) {
      objectType.fields.forEach((field) => {
        value[field.name] = field.multipleReference ? [] : "";
      });
    }

    setValue(value);
  }, []);

  const updateField = (fieldName, newValue) => {
    setValue({
      ...value,
      [fieldName]: newValue,
    });
  };

  const handleSubmit = async () => {
    const result = await createObject(objectType._id, value);
    if (result) {
      await refetch();
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
          {editMode ? "Edit" : "Create"}
        </Button>
      </div>
    </div>
  );
}
