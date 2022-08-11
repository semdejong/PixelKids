import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import useLoading from "../../hooks/useLoading";

import "./Loader.css";

export default function Loader() {
  const { isLoading } = useLoading();

  const antIcon = <LoadingOutlined style={{ fontSize: 64 }} spin />;
  return (
    <>
      {isLoading ? (
        <div className="overlay">
          <Spin indicator={antIcon} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
