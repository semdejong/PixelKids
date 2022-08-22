import { useState } from "react";
import { Button, Modal } from "antd";

export default function AddObject() {
  const [visible, setVisible] = useState(false);

  const openModal = () => {
    setVisible(true);
  };

  const handleOk = async () => {
    // setLoading(true);
    // const response = await addRole(name, description);
    // if (response.status === 200) {
    //   setVisible(false);
    //   setLoading(false);
    // } else {
    //   setLoading(false);
    //   notification(
    //     response.data.message,
    //     `The following error occurred: ${response.data.message}`,
    //     "error"
    //   );
    // }
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
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
}
