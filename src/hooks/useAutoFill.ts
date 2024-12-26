import { MutableRefObject, useEffect } from "react";

export function useAutoFill(
  ref: MutableRefObject<HTMLTextAreaElement | null>,
  handleTab: () => void
) {
  useEffect(() => {
    const textAreaElement = ref.current;
    if (!textAreaElement) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Tab") {
        e.preventDefault();
        handleTab();
      }
    }

    textAreaElement.addEventListener("keydown", handleKeyDown);

    return () => textAreaElement.removeEventListener("keydown", handleKeyDown);
  }, [ref, handleTab]);
}
