import React from "react";
import { Select } from "antd";

import useObjects from "../../../hooks/useObjects";
import useLoading from "../../../hooks/useLoading";

export default function Reference({ objectTypeID, fieldID, value, setValue }) {
  const { objects } = useObjects(objectTypeID);

  const { startLoading, stopLoading } = useLoading();

  if (!objects) {
    startLoading();
    return <></>;
  }

  stopLoading();

  return (
    <div>
      <Select
        placeholder="Select an object"
        value={value || null}
        onChange={(newValue) => {
          setValue(newValue);
        }}
      >
        {objects?.data?.map((objectData) => (
          <Select.Option value={objectData._id}>
            {objectData?.data[fieldID]}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
}
