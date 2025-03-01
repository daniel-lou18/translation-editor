import { useTms } from "./useTms";
import { useState } from "react";
export function useSelectTm() {
  const { tms } = useTms();
  const [tmId, setTmId] = useState(0);

  const tmItems = tms.map((tm) => ({
    value: tm.id,
    label: tm.name,
  }));

  function onTmChange(value: number) {
    setTmId(value);
  }

  return { tmItems, tmId, onTmChange };
}
