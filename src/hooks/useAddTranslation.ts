import { translationService } from "@/services/translationService";
import { LangCode } from "@/types";
import { useMutation } from "@tanstack/react-query";

type AddTranslationVariables = { documentId: number; language: LangCode };

export function useAddTranslation() {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (variables: AddTranslationVariables) =>
      translationService.createTranslation(
        variables.documentId,
        variables.language
      ),
  });

  return { mutate, isLoading: isPending, isError, error };
}
