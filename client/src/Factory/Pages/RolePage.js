import { Button, Tooltip } from "antd";

import useLoading from "../../hooks/useLoading";
import useRoles from "../../hooks/useRoles";

import { Table } from "../../Components";
import { String } from "../../Components/SmartFields/DataTypes";
import AddRoleModal from "../../Components/AddRoleModal";

export default function UserPage() {
  const {
    roles,
    deleteRole,
    updateRole,
    loading,
    changePagination,
    page,
    limit,
  } = useRoles();
  const { startLoading, stopLoading } = useLoading();

  if (loading || !roles) {
    startLoading();
    return <></>;
  }

  stopLoading();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      align: "center",
      key: "name",
      render: (text, record) => {
        return (
          <String
            data={text}
            inlineEditing={true}
            editable={true}
            onChange={async (value) => updateRole(record._id, "name", value)}
          />
        );
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      align: "center",
      key: "description",
      render: (text, record) => {
        return (
          <String
            data={text}
            inlineEditing={true}
            editable={true}
            onChange={async (value) =>
              updateRole(record._id, "description", value)
            }
          />
        );
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      width: 150,
      align: "center",
      fixed: "right",
      render: (_, record) => {
        return (
          <div className="flex flex-row items-center space-x-4">
            <div>
              <Tooltip title="Delete role" placement="top">
                <Button
                  type="danger"
                  shape="circle"
                  onClick={() => deleteRole(record._id)}
                >
                  <i className="fas fa-trash-alt" />
                </Button>
              </Tooltip>
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="w-full h-full flex flex-col items-end space-y-2">
      <AddRoleModal />
      <div className="w-full h-full flex flex-col">
        <Table
          className="w-full"
          columns={columns}
          data={roles.data.roles}
          amountOfItems={roles.data.amount}
          rowKey={(obj) => obj._id}
          page={page}
          limit={limit}
          changePagination={changePagination}
        />
      </div>
    </div>
  );
}
