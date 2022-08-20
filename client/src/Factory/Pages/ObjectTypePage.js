import { useState } from "react";
import { Button, Table, Typography, Tag, Popconfirm } from "antd";

import useLoading from "../../hooks/useLoading";
import useObjectTypes from "../../hooks/useObjectTypes";

import Icon from "../../Components/Icon";
import FieldAndObjectTypeForm from "../../Components/FieldAndObjectTypeForm";
import FieldsSelector from "../../Components/FieldsSelector";

export default function ObjectTypePage() {
  const [isAddingNewObjectType, setIsAddingNewObjectType] = useState(false);

  const { objectTypes, loading, addObjectType } = useObjectTypes();

  return !isAddingNewObjectType ? (
    <ObjectList
      setIsAddingNewObjectType={setIsAddingNewObjectType}
      objectTypes={objectTypes}
      loading={loading}
    />
  ) : (
    <AddObjectType
      setIsAddingNewObjectType={setIsAddingNewObjectType}
      addObjectType={addObjectType}
    />
  );
}

const ObjectList = ({ setIsAddingNewObjectType, objectTypes, loading }) => {
  const { startLoading, stopLoading } = useLoading();

  const { Paragraph } = Typography;

  if (loading || !objectTypes) {
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
    },
    {
      title: "Description",
      dataIndex: "description",
      align: "center",
      key: "description",
      render: (text) => {
        return text.length > 45 ? text.substring(1, 45) + "..." : text;
      },
    },
    {
      title: "Fields",
      dataIndex: "fields",
      align: "center",
      key: "fields",
      render: (fields) => {
        return fields.map((field) => <Tag>{field.name}</Tag>);
      },
    },
    {
      title: "Permissions",
      align: "center",
      children: [
        {
          title: "Read",
          dataIndex: "read",
          align: "center",
          key: "read",
          render: (roles) => {
            return roles.map((role) => <Tag>{role.name}</Tag>);
          },
        },
        {
          title: "Write",
          dataIndex: "write",
          align: "center",
          key: "write",
          render: (roles) => {
            return roles.map((role) => <Tag>{role.name}</Tag>);
          },
        },
        {
          title: "Update",
          dataIndex: "update",
          align: "center",
          key: "update",
          render: (roles) => {
            return roles.map((role) => <Tag>{role.name}</Tag>);
          },
        },
        {
          title: "Delete",
          dataIndex: "delete",
          align: "center",
          key: "delete",
          render: (roles) => {
            return roles.map((role) => <Tag>{role.name}</Tag>);
          },
        },
      ],
    },
    {
      title: "Actions",
      dataIndex: "Actions",
      align: "center",
      render: (_, record) => {
        return (
          <Popconfirm title="Sure to delete?" onConfirm={() => {}}>
            <span className="text-red-500 cursor-pointer text-xl">
              <Icon icon="fa-trash" />
            </span>
          </Popconfirm>
        );
      },
    },
  ];

  console.log(
    objectTypes.data.objectTypes.map((objectType) => {
      return {
        ...objectType,
        read: [...objectType.permissions.read],
        write: [...objectType.permissions.write],
        update: [...objectType.permissions.update],
        delete: [...objectType.permissions.delete],
      };
    })
  );

  return (
    <div className="flex flex-col relative w-full h-full">
      <div className="absolute bottom-10 right-10 ">
        <Button
          shape="circle"
          type="primary"
          size="large"
          onClick={() => setIsAddingNewObjectType(true)}
        >
          +
        </Button>
      </div>
      <Table
        className="w-full"
        columns={columns}
        dataSource={objectTypes.data.objectTypes.map((objectType) => {
          return {
            ...objectType,
            read: [...objectType.permissions.read],
            write: [...objectType.permissions.write],
            update: [...objectType.permissions.update],
            delete: [...objectType.permissions.delete],
          };
        })}
      />
    </div>
  );
};

const AddObjectType = ({ setIsAddingNewObjectType, addObjectType }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [permissions, setPermissions] = useState({
    read: [],
    write: [],
    update: [],
    delete: [],
  });
  const [fields, setFields] = useState([]);

  const updatePermission = (permission, roles) => {
    setPermissions({ ...permissions, [permission]: roles });
  };

  const createObjectType = () => {
    setIsAddingNewObjectType(false);
    addObjectType(name, description, fields, permissions);
  };
  return (
    <div className="w-full h-full flex flex-col space-y-8">
      <div>
        <Button
          type="primary"
          shape="circle"
          size="large"
          onClick={() => setIsAddingNewObjectType(false)}
        >
          <Icon icon="fa-arrow-left" />
        </Button>
      </div>

      <FieldAndObjectTypeForm
        name={name}
        description={description}
        permissions={permissions}
        setName={setName}
        setDescription={setDescription}
        updatePermission={updatePermission}
      />
      <div>
        <span>Fields</span>
        <FieldsSelector fields={fields} setFields={setFields} />
      </div>
      <div className="w-full flex justify-end">
        <Button type="primary" onClick={createObjectType}>
          Create
        </Button>
      </div>
    </div>
  );
};

// <Button
//   type="primary"
//   onClick={() =>
//     addObjectType(
//       "Sems object",
//       "Sems first object type",
//       fields,
//       permissions
//     )
//   }
// >
//   add object
// </Button>

// <Button
//   type="primary"
//   onClick={() => {
//     console.log("sd");
//     getObjectTypes();
//   }}
// >
//   get objects
// </Button>
