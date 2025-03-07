import { Input } from "@/components/ui/input";

type EditableCellProps<T> = {
  inputConfig: {
    field: keyof T;
    editFormData: T;
    onChange: (field: keyof T, value: string) => void;
  };
  displayConfig: {
    value: string;
  };
  isEditing: boolean;
};

export default function EditableCell<T>({
  inputConfig,
  displayConfig,
  isEditing,
}: EditableCellProps<T>) {
  return (
    <>
      {isEditing ? (
        <Input
          value={String(inputConfig.editFormData[inputConfig.field])}
          onChange={(e) =>
            inputConfig.onChange(inputConfig.field, e.target.value)
          }
          className="h-8"
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <div className="flex items-center gap-2">
          {displayConfig.value && displayConfig.value.length > 50
            ? `${displayConfig.value.slice(0, 50)}...`
            : displayConfig.value}
        </div>
      )}
    </>
  );
}
