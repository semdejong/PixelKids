import React, { useEffect, useState } from "react";
import { Checkbox, Input, Select } from "antd";

import useRoles from "../../hooks/useRoles";
import useObjectTypes from "../../hooks/useObjectTypes";

export default function FieldAndObjectTypeForm({
  name,
  description,
  permissions,
  type,
  reference,
  referenceField,
  required,
  multipleReference,
  setMultipleReference,
  setReference,
  setReferenceField,
  setType,
  setName,
  setRequired,
  setDescription,
  updatePermission,
  field,
}) {
  const { roles } = useRoles();
  const { objectTypes } = useObjectTypes();

  const [objectTypeFields, setObjectTypeFields] = useState([]);

  useEffect(() => {
    setObjectTypeFields(
      Array.isArray(objectTypes?.data?.objectTypes)
        ? objectTypes?.data?.objectTypes
            ?.find((objectType) => objectType._id === reference)
            ?.fields.map((field) => {
              return {
                label: field.name,
                value: field.name,
              };
            }) || []
        : []
    );
  }, [objectTypes, reference]);

  //   useEffect(() => {
  //     changePagination({ limit: 100, page: 1 }); (from roles)
  //   });

  if (!roles?.data || (field && !objectTypes?.data)) {
    return <></>;
  }

  const options = roles.data.roles.map((role) => (
    <Select.Option value={role._id}>{role.name}</Select.Option>
  ));

  return (
    <div className="w-full h-fullflex flex-col space-y-4">
      <div className="w-64">
        <span>Name (must be unique)</span>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="name"
        />
      </div>
      <div className="h-24">
        <span>Description</span>
        <Input.TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="description"
        />
      </div>
      {field && (
        <div
          className={`flex flex-row w-full items-center ${
            type === "reference" && "justify-center"
          }`}
        >
          <div className="w-1/3 flex flex-col ">
            <span>Type</span>
            <Select
              placeholder="type"
              value={type}
              className="w-11/12"
              onChange={setType}
            >
              <Select.Option value="reference">Reference</Select.Option>
              <Select.Option value="string">String</Select.Option>
              <Select.Option value="number">Number</Select.Option>
              <Select.Option value="boolean">Boolean</Select.Option>
              <Select.Option value="date">Date</Select.Option>
              <Select.Option value="image">Image</Select.Option>
              <Select.Option value="file">File</Select.Option>
              <Select.Option value="percentage">Percentage</Select.Option>
            </Select>
          </div>
          {type === "reference" && (
            <>
              <div className="w-1/3 flex flex-col ">
                <span>Reference</span>
                <Select
                  placeholder="reference"
                  value={reference}
                  onChange={setReference}
                  className="w-11/12"
                >
                  {objectTypes.data.objectTypes.map((objectType) => (
                    <Select.Option value={objectType._id}>
                      {objectType.name}
                    </Select.Option>
                  ))}
                  <Select.Option value="users">Users</Select.Option>
                  <Select.Option value="roles">Roles</Select.Option>
                </Select>
              </div>
              <div className="w-1/3 flex flex-col ">
                <span>Field</span>
                <Select
                  placeholder="field"
                  value={referenceField}
                  onChange={setReferenceField}
                  className="w-3/4"
                >
                  {objectTypeFields.map((objectTypeField) => (
                    <Select.Option value={objectTypeField.value}>
                      {objectTypeField.label}
                    </Select.Option>
                  ))}
                  {/* add user and role fields */}
                </Select>
              </div>
            </>
          )}
        </div>
      )}

      {field && (
        <div className="flex flex-col">
          <span>Array</span>
          <Checkbox
            checked={multipleReference}
            onChange={(e) => setMultipleReference(e.target.checked)}
          />
        </div>
      )}

      {field && (
        <div className="flex flex-col">
          <span>Required</span>
          <Checkbox
            checked={required}
            onChange={(e) => setRequired(e.target.checked)}
          />
        </div>
      )}

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
              value={permissions.read}
              onChange={(newValue) => updatePermission("read", newValue)}
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
              value={permissions.write}
              onChange={(newValue) => updatePermission("write", newValue)}
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
              value={permissions.update}
              onChange={(newValue) => updatePermission("update", newValue)}
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
              value={permissions.delete}
              onChange={(newValue) => updatePermission("delete", newValue)}
            >
              {options}
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
