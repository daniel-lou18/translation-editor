import { useQueryClient } from "@tanstack/react-query";
import { useBaseMutation } from "./useBaseMutation";
import { translationService } from "@/services/translationService";
import { TranslationStatus, UpdatedId } from "@/types";
import { toast } from "sonner";

type MutationContext = {
  toastId: string | number;
};

export function useUpdateTranslationStatus() {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useBaseMutation<
    UpdatedId,
    Error,
    { translationId: string; status: TranslationStatus },
    MutationContext
  >({
    mutationFn: ({ translationId, status }) =>
      translationService.updateTranslationStatus(translationId, status),
    onMutate: () => {
      const toastId = toast.loading("Updating translation status...");
      return { toastId };
    },
    onSuccess: (_, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({
        queryKey: ["segments", variables.translationId],
      });
      toast.success("Translation status updated successfully");
      toast.dismiss(context?.toastId);
    },
    onError: (_, __, context) => {
      toast.error("Failed to update translation status");
      toast.dismiss(context?.toastId);
    },
  });

  return {
    updateTranslationStatus: mutate,
    isUpdating: isPending,
    isError,
    error,
  };
}
