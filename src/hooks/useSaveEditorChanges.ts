import { useCallback, useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Segment } from "@/types/Segment";
import { useSaveSegments } from "./useSaveSegments";
import { createDebouncedFunction } from "@/utils/helpers";

export function useSaveEditorChanges(
  translationId: number | null | undefined,
  segments: Segment[],
  pendingChanges: Set<number>
) {
  const queryClient = useQueryClient();
  const { mutate } = useSaveSegments();
  const pendingChangesRef = useRef(pendingChanges);
  const segmentsRef = useRef(segments);
  const translationIdRef = useRef(translationId);

  useEffect(() => {
    pendingChangesRef.current = pendingChanges;
    segmentsRef.current = segments;
    translationIdRef.current = translationId;
  }, [pendingChanges, segments, translationId]);

  const saveDebounced = useCallback(
    createDebouncedFunction(() => {
      if (!translationIdRef.current || pendingChangesRef.current.size === 0)
        return;

      const changedSegments = segmentsRef.current.filter((seg) =>
        pendingChangesRef.current.has(seg.id)
      );

      mutate(
        {
          translationId: translationIdRef.current,
          segmentUpdates: changedSegments,
        }
        // {
        //   onSuccess: () => {
        //     queryClient.invalidateQueries({
        //       queryKey: ["segments", translationIdRef.current],
        //       refetchType: "all",
        //     });
        //   },
        // }
      );
    }, 1000),
    []
  );

  useEffect(() => {
    if (pendingChanges.size > 0) {
      saveDebounced();
    }

    return () => {
      saveDebounced.flush();
    };
  }, [pendingChanges.size, saveDebounced]);

  // Force save on translation change (navigation)
  useEffect(() => {
    const prevTranslationId = translationIdRef.current;

    return () => {
      if (
        prevTranslationId &&
        pendingChangesRef.current.size > 0 &&
        prevTranslationId !== translationIdRef.current
      ) {
        // Immediate save before navigation completes
        saveDebounced.flush();
      }
    };
  }, [translationId, saveDebounced]);
}
