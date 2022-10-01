import { useState } from "react";
import { Button, Modal } from "antd";
import SmartForm from "../SmartForm";

export default function AddObject({ objectType }) {
  const [visible, setVisible] = useState(false);

  const openModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={() => openModal()}>
        Add
      </Button>
      <Modal
        title="Add Object"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <SmartForm objectType={objectType} cb={() => setVisible(false)} />
      </Modal>
    </>
  );
}
