import { useState } from "react";
import { Table, Popconfirm, Modal } from "antd";

import useLoading from "../../hooks/useLoading";
import useObjects from "../../hooks/useObjects";

import SmartForm from "../SmartForm";
import Icon from "../Icon";

export default function ObjectTableAdmin({ objectType }) {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const { objects, loading, deleteObject } = useObjects(objectType._id);

  const { startLoading, stopLoading } = useLoading();

  if (loading || !objects?.data) {
    startLoading();
    return <></>;
  }
  stopLoading();

  const handleCancel = () => {
    setVisible(false);
  };

  const openEditMode = (object) => {
    setSelected(JSON.parse(JSON.stringify(object)));
    setVisible(true);
  };

  const columns = [
    ...objectType?.fields?.map((field) => {
      return {
        title: field.name,
        dataIndex: field.name,
        key: field.name,
      };
    }),
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          <a style={{ marginRight: 16 }} onClick={() => openEditMode(record)}>
            <Icon icon={"fa-pen-to-square"} />
          </a>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => {
              deleteObject(record._id);
            }}
          >
            <span className="text-red-500 cursor-pointer">
              <Icon icon="fa-trash" />
            </span>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div>
      <Modal
        title="Edit Object"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <SmartForm
          objectType={objectType}
          cb={() => setVisible(false)}
          editMode={true}
          object={selected}
        />
      </Modal>
      <Table
        columns={columns}
        dataSource={
          Array.isArray(objects?.data)
            ? objects?.data?.map((object) => {
                return { ...object.data, _id: object._id };
              })
            : []
        }
      />
    </div>
  );
}
