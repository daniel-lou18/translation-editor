import { translationService } from "@/services/translationService";
import { LangCode } from "@/types";
import { useMutation } from "@tanstack/react-query";

export function useAddTranslation(documentId: string, language: LangCode) {
  const { mutate, isPaused, isError, error } = useMutation({
    mutationFn: () =>
      translationService.createTranslation(documentId, language),
  });

  return { mutate, isPaused, isError, error };
}
