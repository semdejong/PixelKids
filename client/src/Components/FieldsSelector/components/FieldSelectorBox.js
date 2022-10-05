import { useState } from "react";

import FieldSelectorButton from "./FieldSelectorButton";
import FieldSelectorCards from "./FieldSelectorCards";
import FieldEditorModal from "./FieldEditorModal";
import notification from "../../Notification";

export default function FieldSelectorBox({ fields, setFields }) {
  const [visible, setVisible] = useState(false);

  const addField = (field) => {
    if (fields.find((f) => f.name === field.name)) {
      notification(
        "Field not added",
        `reason: the field ${field.name} already exists`,
        "error"
      );
      return false;
    }

    if (field.name.trim() === "") {
      notification(
        "Field not added",
        `reason: the field name cannot be empty`,
        "error"
      );
      return false;
    }
    if (!field.type) {
      notification(
        "Field not added",
        `reason: the field ${field.name} has no type`,
        "error"
      );
      return false;
    }

    if (
      field.type === "reference" &&
      (!field.reference || !field.referenceField)
    ) {
      notification(
        "Field not added",
        `reason: the field ${field.name} is a reference field and must have a reference and reference field`,
        "error"
      );
      return false;
    }

    setFields([...fields, field]);
    setVisible(false);

    return true;
  };

  const deleteField = (fieldName) => {
    setFields(fields.filter((field) => field.name !== fieldName));
  };

  return (
    <div className="flex flex-col w-1/3 max-h-96 border border-gray-200 rounded-md justify-between items-center p-4 overflow-auto">
      <FieldSelectorCards fields={fields} deleteField={deleteField} />
      <FieldEditorModal
        visible={visible}
        setVisible={setVisible}
        addField={addField}
      />
      <FieldSelectorButton onClick={() => setVisible(!visible)} />
    </div>
  );
}
