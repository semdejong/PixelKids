import { Button, Input } from "antd";
export default function String({ value, setValue, isArray, ...props }) {
  return !isArray ? (
    <Input value={value} onChange={(e) => setValue(e.target.value)} />
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
            onClick={() =>
              setValue(value.filter((value, index) => index !== i))
            }
          >
            X
          </Button>
        </div>
      ))}

      <Button
        type="primary"
        onClick={() => {
          setValue([...value, ""]);
        }}
      >
        Add
      </Button>
    </>
  );
}
