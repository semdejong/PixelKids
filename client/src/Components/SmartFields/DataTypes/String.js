import { useState } from "react";
import { Input, Spin } from "antd";

//onChange should be an async function
export default function String({ data, inlineEditing, editable, onChange }) {
  const [hovering, setHovering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(data);

  const stopEditing = async () => {
    setHovering(false);
    if (value !== data) {
      setLoading(true);
      await onChange(value);
      setLoading(false);
    }
  };

  if (loading) {
    return <Spin />;
  }

  return (
    <div
      onMouseOver={() => setHovering(true)}
      onMouseOut={stopEditing}
      className="max-w-24"
    >
      {!hovering || !inlineEditing ? (
        <span>{data}</span>
      ) : (
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          contentEditable={editable}
        />
      )}
    </div>
  );
}
