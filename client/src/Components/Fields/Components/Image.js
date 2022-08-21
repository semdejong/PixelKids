import React from "react";
import File from "./File";

export default function Image({ value, setValue, isArray, ...props }) {
  return (
    <File
      value={value}
      setValue={setValue}
      isArray={isArray}
      accept="image/*"
      {...props}
    />
  );
}
