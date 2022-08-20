import { useState } from "react";

import FieldSelectorButton from "./FieldSelectorButton";
import FieldSelectorCards from "./FieldSelectorCards";
import FieldEditorModal from "./FieldEditorModal";

export default function FieldSelectorBox({ fields, setFields }) {
  const [visible, setVisible] = useState(false);

  const addField = (field) => {
    setFields([...fields, field]);
    setVisible(false);
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
