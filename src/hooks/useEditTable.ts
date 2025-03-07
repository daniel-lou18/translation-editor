import { MouseEvent, useState } from "react";

export function useEditTable<T extends { id: number }>(
  updateFn: (data: T) => void
) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<T>({ id: 0 } as T);

  const handleInputChange = (field: keyof T, value: string) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditFormData({ id: 0 } as T);
  };

  const handleSave = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!editFormData.id) return;
    setEditingId(null);
    updateFn(editFormData);
  };

  return {
    editingId,
    editFormData,
    setEditingId,
    setEditFormData,
    handleInputChange,
    handleCancel,
    handleSave,
  };
}
