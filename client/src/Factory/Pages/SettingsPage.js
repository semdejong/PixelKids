import { useState } from "react";
import { Input, Button, Tooltip, Modal } from "antd";
import { CopyOutlined, EyeOutlined } from "@ant-design/icons";

import useLoading from "../../hooks/useLoading";
import { getApiKey } from "../../API/Auth";

export default function SettingsPage() {
  const [APIKey, setAPIKey] = useState("***********************");
  const [MFAModelVisible, setMFAModelVisible] = useState(false);

  const { startLoading, stopLoading } = useLoading();

  const regenerateAPIKey = async () => {
    startLoading();
    const response = await getApiKey();
    stopLoading();
    setAPIKey(response.data.apiKey);
  };

  const closeMFAModel = () => {
    setMFAModelVisible(false);
  };

  return (
    <>
      <Modal
        visible={MFAModelVisible}
        title="Setup MFA"
        onCancel={closeMFAModel}
      >
        QR code
      </Modal>
      <div className="h-full w-full overflow-auto flex flex-col p-4 space-y-4">
        <h1 className="text-4xl font-thin">Settings</h1>
        <div>
          <h2 className="text-2xl font-thin">API Key</h2>
          <div className="flex flex-col space-y-2 w-1/4">
            <Input.Group compact>
              <Input style={{ width: "calc(100%  - 50px)" }} value={APIKey} />
              {APIKey.includes("*") ? (
                <Tooltip title="Show API key">
                  <Button
                    icon={<EyeOutlined />}
                    type="primary"
                    onClick={regenerateAPIKey}
                  />
                </Tooltip>
              ) : (
                <Tooltip title="Copy API Key">
                  <Button
                    icon={<CopyOutlined />}
                    type="primary"
                    onClick={() => navigator.clipboard.writeText(APIKey)}
                  />
                </Tooltip>
              )}
            </Input.Group>
            <span className="text-xs font-thin text-gray-600">
              * Your API key will be only shown once. If you lose it, you will
              have to regenerate it by clicking on the eye button.
            </span>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-thin">MFA</h2>
          <div className="flex flex-col space-y-2 w-1/4">
            <Button
              type="primary"
              onClick={() => {
                setMFAModelVisible(true);
              }}
            >
              Setup MFA
            </Button>
            <span className="text-xs font-thin text-gray-600">
              * Multi-factor authentication is not yet implemented.
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
