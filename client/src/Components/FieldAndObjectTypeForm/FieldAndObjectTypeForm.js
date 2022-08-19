import React, { useEffect } from "react";
import { Input, Select } from "antd";

import useRoles from "../../hooks/useRoles";

export default function FieldAndObjectTypeForm({ field }) {
  const { roles, changePagination } = useRoles();

  //   useEffect(() => {
  //     changePagination({ limit: 100, page: 1 });
  //   });

  if (!roles?.data) {
    return <></>;
  }

  const options = roles.data.roles.map((role) => (
    <Select.Option value={role.value}>{role.name}</Select.Option>
  ));

  return (
    <div className="w-full h-fullflex flex-col space-y-4">
      <div className="w-64">
        <span>Name of object type</span>
        <Input placeholder="name" />
      </div>
      <div className="h-24">
        <span>Description</span>
        <Input.TextArea placeholder="description" />
      </div>
      <div className="w-64">
        <span>type</span>
        <Input placeholder="name" />
      </div>

      <div className="w-full flex flex-col space-y-4">
        <span>Permissions</span>
        <div
          className={`w-full flex ${
            field && "flex-col space-y-2"
          } items-center justify-evenly`}
        >
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg font-thin">Read</p>
            <Select
              placeholder="Add roles to read group..."
              mode="multiple"
              showArrow
              className="w-64"
            >
              {options}
            </Select>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg font-thin">Write</p>
            <Select
              placeholder="Add roles to write group..."
              mode="multiple"
              showArrow
              className="w-64"
            >
              {options}
            </Select>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg font-thin">Update</p>
            <Select
              placeholder="Add roles to update group..."
              mode="multiple"
              showArrow
              className="w-64"
            >
              {options}
            </Select>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg font-thin">Delete</p>
            <Select
              placeholder="Add roles to delete group..."
              mode="multiple"
              showArrow
              className="w-64"
            >
              {options}
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
