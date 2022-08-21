import { useState } from "react";
import { Image } from "../../Components/Fields/Components";

export default function ObjectPage() {
  const [value, setValue] = useState([]);

  return (
    <>
      <Image value={value} setValue={setValue} />
    </>
  );
}
