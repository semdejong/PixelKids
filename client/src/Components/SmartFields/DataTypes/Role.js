import { useState } from "react";
import { Spin, Select, Tag } from "antd";

import { arraysMatch } from "../../../Functions";

export default function MultiEnum({
  data,
  options,
  inlineEditing,
  editable,
  onChange,
}) {
  const [hovering, setHovering] = useState(false);
  const [selectOpen, setSelectOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(
    data.map((dataPoint) => dataPoint._id) || []
  );

  const stopEditing = async () => {
    setHovering(false);
    if (
      !arraysMatch(
        data.map((dataPoint) => dataPoint._id),
        value
      )
    ) {
      setLoading(true);
      await onChange(value);
      setLoading(false);
    }
  };

  if (loading) {
    return <Spin />;
  }

  return (
    <div onMouseOver={() => setHovering(true)} onMouseOut={stopEditing}>
      {(!hovering || !inlineEditing) && !selectOpen ? (
        <>
          {value.map((dataPoint) => {
            const option = options.find(
              (option) => option._id === dataPoint && !option.isArchived
            );
            return (
              <>{option ? <Tag key={dataPoint}>{option.name}</Tag> : <></>}</>
            );
          })}
          {value.length < 1 && (
            <div>
              <span>No options selected</span>
            </div>
          )}
        </>
      ) : (
        <Select
          mode="multiple"
          onDropdownVisibleChange={() => setSelectOpen(!selectOpen)}
          open={selectOpen}
          value={value.filter((val) =>
            options.find((option) => option._id === val && !option.isArchived)
          )}
          disabled={!editable}
          showArrow
          onChange={setValue}
        >
          {options
            .filter((option) => !option.isArchived)
            .map((option) => (
              <Select.Option value={option._id}>{option.name}</Select.Option>
            ))}
        </Select>
      )}
    </div>
  );
}
