import FieldSelectorCard from "./FieldSelectorCard";

export default function FieldSelectorCards({ fields, deleteField }) {
  return (
    <div className="w-full space-y-3">
      {fields?.map((field) => (
        <FieldSelectorCard
          field={field}
          deleteField={() => deleteField(field.name)}
        />
      ))}
    </div>
  );
}
