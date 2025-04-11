import { EditorData } from "@/contexts/editorContextV1";
import { useEffect, useRef } from "react";

export function useInitializeEditor(
  data: EditorData | undefined,
  isLoading: boolean,
  isInitialized: boolean,
  initializeEditor: (data: EditorData) => void
) {
  const prevTranslationId = useRef<number | null>(null);

  useEffect(() => {
    if (!data?.translation || isLoading) return;

    const currentId = data.translation.id;

    if (!isInitialized) {
      initializeEditor(data);
      prevTranslationId.current = currentId;
    } else if (prevTranslationId.current !== currentId) {
      initializeEditor(data);
      prevTranslationId.current = currentId;
    }
  }, [data, isLoading, isInitialized, initializeEditor]);
}
