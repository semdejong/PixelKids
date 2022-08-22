import React from "react";
import { DatePicker, Button } from "antd";

import Icon from "../../Icon";

export default function Date({ value, setValue, isArray, ...props }) {
  return !isArray ? (
    <DatePicker value={value} onChange={(e) => setValue(e)} {...props} />
  ) : (
    <>
      {value?.map((v, i) => (
        <div key={i} className="flex flex-row items-center space-x-4 mb-4">
          <DatePicker
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
            size="small"
            onClick={() =>
              setValue(value.filter((value, index) => index !== i))
            }
          >
            <Icon icon="fa-times" />
          </Button>
        </div>
      ))}
      <div>
        <Button
          type="primary"
          onClick={() => {
            setValue(value ? [...value, ""] : [""]);
          }}
        >
          Add
        </Button>
      </div>
    </>
  );
}
