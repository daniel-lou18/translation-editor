import { UpdateTranslationDto } from "@/types/Dtos";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { translationService } from "@/services/translationService";

export type UpdateTranslationVariables = {
  id: string;
  updates: UpdateTranslationDto;
};

export function useUpdateTranslation() {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: ({ id, updates }: UpdateTranslationVariables) =>
      translationService.updateTranslation(id, updates),
    onSuccess: ({ translationId }) => {
      queryClient.invalidateQueries({
        queryKey: ["segments", translationId],
      });
    },
  });

  return { mutate, isPending, isError, error };
}
