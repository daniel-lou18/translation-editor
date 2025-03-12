import { Tm, NormalizedTms } from "@/types/Tm";
import Combobox from "@/components/ui/Combobox";

type SelectTmProps = {
  tms: NormalizedTms;
  currentTm: Tm | null;
  onSelect: (tmId: string) => void;
};

export default function SelectTm({ tms, currentTm, onSelect }: SelectTmProps) {
  const items = Object.values(tms).map((tm) => ({
    label: tm.name,
    value: String(tm.id),
  }));
  const currentId = currentTm ? String(currentTm.id) : null;

  return (
    <Combobox
      name="tm"
      items={items}
      value={currentId || ""}
      onChange={onSelect}
      className="border border-border h-9"
    />
  );
}
