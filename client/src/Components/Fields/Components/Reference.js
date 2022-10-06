import React from "react";
import { Select, Button } from "antd";

import useObjects from "../../../hooks/useObjects";
import useLoading from "../../../hooks/useLoading";
import useUsers from "../../../hooks/useUsers";
import useRoles from "../../../hooks/useRoles";

import Icon from "../../../Components/Icon";

export default function Reference({
  objectTypeID,
  fieldID,
  value,
  setValue,
  isArray,
}) {
  const { objects } = useObjects(objectTypeID);
  const { users } = useUsers();
  const { roles } = useRoles();

  const { startLoading, stopLoading } = useLoading();

  if (
    !objects ||
    (!users && (fieldID === "fullname" || fieldID === "email")) ||
    (!roles && (fieldID === "name" || fieldID === "description"))
  ) {
    startLoading();
    return <></>;
  }

  stopLoading();

  let options = (
    <>
      {(Array.isArray(objects?.data) &&
        objects?.data?.map((objectData) => (
          <Select.Option value={objectData?._id}>
            {objectData?.data[fieldID]}
          </Select.Option>
        ))) ||
        []}

      {((fieldID === "fullname" || fieldID === "email") &&
      !objectTypeID &&
      Array.isArray(users?.data?.users)
        ? users?.data?.users?.map((userData) => (
            <Select.Option value={userData?._id}>
              {userData[fieldID]}
            </Select.Option>
          ))
        : []) || []}

      {((fieldID === "name" || fieldID === "description") &&
      !objectTypeID &&
      Array.isArray(users?.data?.users)
        ? roles?.data?.roles?.map((roleData) => (
            <Select.Option value={roleData?._id}>
              {roleData[fieldID]}
            </Select.Option>
          ))
        : []) || []}
    </>
  );

  return !isArray ? (
    <div>
      <Select
        placeholder="Select an object"
        value={value || null}
        onChange={(newValue) => {
          setValue(newValue);
        }}
      >
        {options}
      </Select>
    </div>
  ) : (
    <>
      {value?.map((v, i) => (
        <div className="flex flex-row items-center space-x-4 mb-4">
          <Select
            placeholder="Select an object"
            value={v || null}
            onChange={(newValue) => {
              value[i] = newValue;
              setValue([...value]);
            }}
          >
            {options}
          </Select>
          <Button
            type="danger"
            shape="circle"
            size="small"
            onClick={() =>
              setValue(value.filter((value, index) => index !== i))
            }
          >
            <Icon icon="fa-times" />
          </Button>
        </div>
      ))}

      <Button
        type="primary"
        onClick={() => {
          setValue(value ? [...value, ""] : [""]);
        }}
      >
        Add
      </Button>
    </>
  );
}
