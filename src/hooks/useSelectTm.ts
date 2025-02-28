import { useTms } from "./useTms";
import { useState } from "react";
export function useSelectTm() {
  const { tms } = useTms();
  const [tm, setTm] = useState(0);

  const tmItems = tms.map((tm) => ({
    value: tm.id,
    label: tm.name,
  }));

  function onTmChange(value: number) {
    setTm(value);
  }

  return { tmItems, tm, onTmChange };
}
