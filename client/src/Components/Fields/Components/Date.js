import React from "react";
import { DatePicker, Button } from "antd";
import moment from "moment";

import Icon from "../../Icon";

export default function Date({ value, setValue, isArray, ...props }) {
  return !isArray ? (
    <DatePicker
      value={
        typeof value === "string" && value.length > 0
          ? moment(value, "YYYY-MM-DD")
          : value
      }
      onChange={(e) => setValue(e)}
      {...props}
    />
  ) : (
    <>
      {value?.map((v, i) => (
        <div key={i} className="flex flex-row items-center space-x-4 mb-4">
          <DatePicker
            value={
              typeof value === "object" && !value._isAMomentObject && value[i]
                ? moment(v, "YYYY-MM-DD")
                : v
            }
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
