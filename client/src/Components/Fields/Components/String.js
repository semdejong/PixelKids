import { Button, Input } from "antd";

import Icon from "../../Icon";

export default function String({ value, setValue, isArray, ...props }) {
  return !isArray ? (
    <Input
      value={value}
      onChange={(e) => e.target.value && setValue(e.target.value)}
    />
  ) : (
    <>
      {value?.map((v, i) => (
        <div className="flex flex-row items-center space-x-4 mb-4">
          <Input
            value={v}
            onChange={(e) => {
              value[i] = e.target.value;
              setValue([...value]);
            }}
          />{" "}
          <Button
            type="danger"
            shape="circle"
            size="small"
            onClick={() =>
              setValue(value.filter((value, index) => index !== i))
            }
          >
            <Icon icon="fa-times" />
          </Button>
        </div>
      ))}

      <Button
        type="primary"
        onClick={() => {
          setValue(value ? [...value, ""] : [""]);
        }}
      >
        Add
      </Button>
    </>
  );
}
