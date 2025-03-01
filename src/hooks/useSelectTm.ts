import { useTms } from "./useTms";
import { useState } from "react";
export function useSelectTm() {
  const { tms } = useTms();
  const [tmId, setTmId] = useState<string>("");

  const tmItems = tms.map((tm) => ({
    value: String(tm.id),
    label: tm.name,
  }));

  function onTmChange(value: string) {
    setTmId(value);
  }

  return { tmItems, tmId, onTmChange };
}
