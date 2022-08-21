import { InboxOutlined } from "@ant-design/icons";
import { message, Upload, Button } from "antd";
import React from "react";
const { Dragger } = Upload;

export default function File({ value, setValue, isArray, ...rest }) {
  console.log(value);
  const props = {
    name: "files",
    multiple: true,
    maxCount: isArray ? 10 : 1,
    showUploadList: false,
    action: "/api/file",
    onChange(info) {
      const { status } = info.file;

      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }

      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        console.log(info.file.response, info.file.response.data, info.fileList);
        setValue(
          isArray
            ? [...value, info.file.response.files[0]]
            : info.file.response.files[0]
        );
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },

    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <>
      <Dragger {...props} {...rest}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </Dragger>

      <div className="flex flex-col mt-4">
        {isArray
          ? value?.map((v, i) => (
              <div
                key={i}
                className="flex flex-row items-center space-x-4 mb-4"
              >
                <img src={v} alt={v} height="20px" width="20px" />
                <span>{v}</span>
                <Button
                  type="danger"
                  shape="circle"
                  onClick={() =>
                    setValue(value.filter((value, index) => index !== i))
                  }
                >
                  X
                </Button>
              </div>
            ))
          : value && (
              <div className="flex flex-row items-center space-x-4 mb-4">
                <img src={value} alt={value} height="20px" width="20px" />
                <span>{value}</span>
              </div>
            )}
      </div>
    </>
  );
}
