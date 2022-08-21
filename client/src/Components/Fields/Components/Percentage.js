import React from "react";
import Number from "./Number";

export default function Percentage({ value, setValue, isArray, ...props }) {
  return (
    <Number
      value={value}
      setValue={setValue}
      isArray={isArray}
      min={0}
      max={100}
      addonAfter="%"
    />
  );
}
