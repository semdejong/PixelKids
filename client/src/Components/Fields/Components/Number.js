import { Button, InputNumber } from "antd";
export default function Number({ value, setValue, isArray, ...props }) {
  return !isArray ? (
    <InputNumber value={value} onChange={(e) => setValue(e)} {...props} />
  ) : (
    <>
      {value?.map((v, i) => (
        <div key={i} className="flex flex-row items-center space-x-4 mb-4">
          <InputNumber
            value={v}
            {...props}
            onChange={(e) => {
              value[i] = e;
              setValue([...value]);
            }}
          />
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
          setValue([...value, 0]);
        }}
      >
        Add
      </Button>
    </>
  );
}
