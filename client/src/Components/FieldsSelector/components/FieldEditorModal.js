import { useEffect, useState } from "react";

import { Modal } from "antd";
import FieldAndObjectTypeForm from "../../FieldAndObjectTypeForm";

export default function FieldEditorModal({ visible, setVisible }) {
  useEffect(() => {}, []);

  const handleOk = async () => {};

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
      <FieldAndObjectTypeForm field={true} />
    </Modal>
  );
}
