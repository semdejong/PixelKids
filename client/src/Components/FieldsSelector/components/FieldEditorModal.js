import { useEffect, useState } from "react";

import { Modal } from "antd";
import FieldAndObjectTypeForm from "../../FieldAndObjectTypeForm";

export default function FieldEditorModal({
  visible,
  setVisible,
  addField,
  updateMode,
  fieldToUpdate,
}) {
  const [name, setName] = useState(updateMode ? fieldToUpdate.name : "");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [reference, setReference] = useState("");
  const [multipleReference, setMultipleReference] = useState(false);
  const [permissions, setPermissions] = useState({
    read: [],
    write: [],
    update: [],
    delete: [],
  });

  const updatePermission = (permission, roles) => {
    setPermissions({ ...permissions, [permission]: roles });
  };

  useEffect(() => {}, []);

  const handleOk = async () => {
    addField({
      name,
      description,
      type,
      reference,
      multipleReference,
      permissions,
    });

    setName("");
    setDescription("");
    setType("");
    setReference("");
    setMultipleReference(false);
    setPermissions({
      read: [],
      write: [],
      update: [],
      delete: [],
    });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Modal
      title="Add/Edit a field"
      visible={visible}
      onOk={handleOk}
      //   confirmLoading={loading}
      onCancel={handleCancel}
    >
      <FieldAndObjectTypeForm
        field={true}
        name={name}
        description={description}
        type={type}
        reference={reference}
        multipleReference={multipleReference}
        permissions={permissions}
        setName={setName}
        setDescription={setDescription}
        setType={setType}
        setReference={setReference}
        setMultipleReference={setMultipleReference}
        updatePermission={updatePermission}
      />
    </Modal>
  );
}
