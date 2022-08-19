import { useState } from "react";

import FieldSelectorButton from "./FieldSelectorButton";
import FieldSelectorCards from "./FieldSelectorCards";
import FieldEditorModal from "./FieldEditorModal";

export default function FieldSelectorBox({ fields }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex flex-col w-1/3 max-h-96 border border-gray-200 rounded-md justify-between items-center p-4 overflow-auto">
      <FieldSelectorCards fields={fields} />
      <FieldEditorModal visible={visible} setVisible={setVisible} />
      <FieldSelectorButton onClick={() => setVisible(!visible)} />
    </div>
  );
}
