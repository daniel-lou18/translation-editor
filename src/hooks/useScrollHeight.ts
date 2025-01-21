import { useCallback, useEffect, useRef } from "react";

export function useScrollHeight() {
  const sourceDivRef = useRef<HTMLDivElement | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const onInput = useCallback(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [textAreaRef]);

  useEffect(() => {
    if (sourceDivRef.current && textAreaRef.current) {
      textAreaRef.current.style.height = `${sourceDivRef.current.scrollHeight}px`;
    }
  }, [sourceDivRef, textAreaRef]);

  return { sourceDivRef, textAreaRef, onInput };
}
