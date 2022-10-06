import React from "react";
import {
  String,
  Number,
  Percentage,
  Reference,
  Date,
  Boolean,
  File,
  Image,
} from "./Components";

export default function Fields({ field, value, setValue }) {
  let Component;

  if (field.type === "string") {
    Component = (
      <String
        isArray={field.multipleReference}
        value={value[field.name]}
        setValue={setValue}
      />
    );
  } else if (field.type === "number") {
    Component = (
      <Number
        isArray={field.multipleReference}
        value={value[field.name]}
        setValue={setValue}
      />
    );
  } else if (field.type === "boolean") {
    Component = (
      <Boolean
        isArray={field.multipleReference}
        value={value[field.name]}
        setValue={setValue}
      />
    );
  } else if (field.type === "date") {
    Component = (
      <Date
        isArray={field.multipleReference}
        value={value[field.name]}
        setValue={setValue}
      />
    );
  } else if (field.type === "percentage") {
    Component = (
      <Percentage
        isArray={field.multipleReference}
        value={value[field.name]}
        setValue={setValue}
      />
    );
  } else if (field.type === "reference") {
    Component = (
      <Reference
        isArray={field.multipleReference}
        objectTypeID={field?.reference?._id || field?.reference}
        fieldID={field.referenceField}
        value={value[field.name]}
        setValue={setValue}
      />
    );
  } else if (field.type === "file") {
    Component = (
      <File
        isArray={field.multipleReference}
        value={value[field.name]}
        setValue={setValue}
      />
    );
  } else if (field.type === "image") {
    Component = (
      <Image
        isArray={field.multipleReference}
        value={value[field.name]}
        setValue={setValue}
      />
    );
  } else {
    Component = (
      <String
        isArray={field.multipleReference}
        value={value[field.name]}
        setValue={setValue}
      />
    );
  }

  return Component;
}
