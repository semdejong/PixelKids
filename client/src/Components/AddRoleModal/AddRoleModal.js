import { useState } from "react";
import { Button, Input, Modal } from "antd";

import useRoles from "../../hooks/useRoles";

import notification from "../Notification";

export default function AddRoleModal() {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const { addRole } = useRoles();

  const openModal = () => {
    setName("");
    setDescription("");
    setVisible(true);
  };

  const handleOk = async () => {
    setLoading(true);
    const response = await addRole(name, description);
    if (response.status === 200) {
      setVisible(false);
      setLoading(false);
    } else {
      setLoading(false);
      notification(
        response.data.message,
        `The following error occurred: ${response.data.message}`,
        "error"
      );
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" shape="circle" onClick={openModal}>
        +
      </Button>
      <Modal
        title="Add a new role"
        visible={visible}
        onOk={handleOk}
        confirmLoading={loading}
        onCancel={handleCancel}
      >
        <div className="w-full flex flex-col space-y-2">
          <div className="w-full flex flex-col">
            <label className="w-full">Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="w-full flex flex-col">
            <label className="w-full">Description</label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
