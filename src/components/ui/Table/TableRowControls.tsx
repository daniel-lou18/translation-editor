import { Save, X } from "lucide-react";
import { Button } from "../button";
import Container from "../Container";

type TableRowControlsProps = {
  handleSave: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleCancel: () => void;
  isSaving: boolean;
};

export default function TableRowControls({
  handleSave,
  handleCancel,
  isSaving,
}: TableRowControlsProps) {
  return (
    <Container className="flex items-center">
      <Button
        variant="ghost"
        className="w-8 h-8"
        onClick={handleSave}
        disabled={isSaving}
      >
        <Save />
      </Button>
      <Button variant="ghost" className="w-8 h-8" onClick={handleCancel}>
        <X />
      </Button>
    </Container>
  );
}
