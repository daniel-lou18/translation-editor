import { DataType, TableRowMenuProps } from "./TableRowMenu";

export type TableRowProps<T extends DataType> = {
  data: T;
  editingId: number | null;
  handleInputChange: (field: keyof T, value: string) => void;
  editFormData: T;
  handleSave: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleCancel: () => void;
  isSaving: boolean;
  rowMenuData: Omit<TableRowMenuProps<T>, "data">;
};
