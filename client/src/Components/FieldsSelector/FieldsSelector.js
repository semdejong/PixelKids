import React from "react";

import FieldSelectorBox from "./components/FieldSelectorBox";

export default function FieldsSelector({ fields, setFields }) {
  return <FieldSelectorBox fields={fields} setFields={setFields} />;
}
