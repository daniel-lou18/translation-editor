import { translationService } from "@/services/translationService";
import { LangCode } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type AddTranslationVariables = { documentId: number; language: LangCode };

export function useAddTranslation() {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (variables: AddTranslationVariables) =>
      translationService.createTranslation(
        variables.documentId,
        variables.language
      ),
    onSuccess: handleSuccess,
    onError: handleError,
  });

  function handleSuccess() {
    queryClient.invalidateQueries({ queryKey: ["projects"] });
    toast.success("Translation has been added successfully", {
      classNames: {
        toast: "bg-green-100",
      },
    });
  }

  function handleError() {
    toast.error("Something went wrong. Could not add translation", {
      classNames: {
        toast: "bg-red-100",
      },
    });
  }

  return { mutate, isLoading: isPending, isError, error };
}
