import { Button, Checkbox } from "antd";
export default function Boolean({ value, setValue, isArray, ...props }) {
  return !isArray ? (
    <Checkbox checked={value} onChange={(e) => setValue(e.target.checked)} />
  ) : (
    <>
      {value?.map((v, i) => (
        <div key={i} className="flex flex-row items-center space-x-4 mb-4">
          <Checkbox
            checked={v}
            onChange={(e) => {
              value[i] = e.target.checked;
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
          setValue([...value, false]);
        }}
      >
        Add
      </Button>
    </>
  );
}
