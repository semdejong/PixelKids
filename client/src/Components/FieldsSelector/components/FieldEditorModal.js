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
  const [referenceField, setReferenceField] = useState("");
  const [multipleReference, setMultipleReference] = useState(false);
  const [required, setRequired] = useState(false);
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
    const response = addField({
      name,
      description,
      type,
      reference,
      referenceField,
      multipleReference,
      required,
      permissions,
    });

    if (response) {
      setName("");
      setDescription("");
      setType("");
      setReference("");
      setReferenceField("");
      setMultipleReference(false);
      setRequired(false);
      setPermissions({
        read: [],
        write: [],
        update: [],
        delete: [],
      });
    }
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
        referenceField={referenceField}
        multipleReference={multipleReference}
        required={required}
        permissions={permissions}
        setName={setName}
        setDescription={setDescription}
        setType={setType}
        setReference={setReference}
        setReferenceField={setReferenceField}
        setRequired={setRequired}
        setMultipleReference={setMultipleReference}
        updatePermission={updatePermission}
      />
    </Modal>
  );
}
