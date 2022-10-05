import React from "react";
import { Tag } from "antd";

import useLoading from "../../hooks/useLoading";
import useUsers from "../../hooks/useUsers";
import useRoles from "../../hooks/useRoles";

import { Table } from "../../Components";
import { String, MultiEnum } from "../../Components/SmartFields/DataTypes";

export default function UserPage() {
  const { users, updateUser, loading, changePagination, page, limit } =
    useUsers();
  const { roles: fetchedRoles } = useRoles();
  const { startLoading, stopLoading } = useLoading();

  if (loading || !users) {
    startLoading();
    return <></>;
  }

  stopLoading();

  const columns = [
    {
      title: "Fullname",
      dataIndex: "fullname",
      align: "center",
      key: "fullname",
      render: (text, record) => {
        return (
          <String
            data={text}
            inlineEditing={true}
            editable={true}
            onChange={async (value) =>
              updateUser(record._id, "fullname", value)
            }
          />
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      align: "center",
      key: "email",
      render: (text, record) => {
        return (
          <String
            data={text}
            inlineEditing={true}
            editable={true}
            onChange={async (value) => updateUser(record._id, "email", value)}
          />
        );
      },
    },
    {
      title: "Password",
      dataIndex: "password",
      align: "center",
      key: "password",
      render: () => {
        return "*******";
      },
    },
    {
      title: "Roles",
      dataIndex: "roles",
      align: "center",
      key: "roles",
      render: (roles, record) => {
        return (
          <MultiEnum
            data={
              Array.isArray(roles)
                ? record.isAdmin
                  ? [...roles, { _id: "admin", name: "Admin" }]
                  : [...roles]
                : []
            }
            options={
              fetchedRoles
                ? [...fetchedRoles.data.roles, { _id: "admin", name: "Admin" }]
                : [{ _id: "admin", name: "Admin" }]
            }
            inlineEditing={true}
            editable={true}
            onChange={async (value) => updateUser(record._id, "roles", value)}
          />
        );
      },
    },
  ];

  return (
    <div className="w-full h-full">
      <Table
        className="w-full"
        columns={columns}
        data={users.data.users}
        amountOfItems={users.data.amount}
        page={page}
        limit={limit}
        changePagination={changePagination}
      />
    </div>
  );
}
