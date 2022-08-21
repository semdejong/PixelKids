import { Button } from "antd";

export default function FieldSelectorButton({ onClick }) {
  return (
    <Button type="link" size="large" onClick={onClick}>
      + Add a field
    </Button>
  );
}
