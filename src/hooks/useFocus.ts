import { MutableRefObject, useEffect } from "react";

export function useFocus(
  textAreaRef: MutableRefObject<HTMLTextAreaElement | null>,
  activeId: number,
  id: number
) {
  useEffect(() => {
    if (textAreaRef.current) {
      if (id === activeId) {
        textAreaRef.current.focus();
      }
    }
  }, [textAreaRef, activeId, id]);
}
