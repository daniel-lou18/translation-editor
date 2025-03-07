import { useBaseMutation } from "./useBaseMutation";
import { tmService } from "@/services/tmService";
import { toast } from "sonner";
import { UpdateTmDto } from "@/types/Dtos";
import { useQueryClient } from "@tanstack/react-query";

export function useUpdateTm() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useBaseMutation({
    mutationFn: (tm: UpdateTmDto) => tmService.updateTm(tm),
    onSuccess: ({ name }) => {
      queryClient.invalidateQueries({ queryKey: ["tms"] });
      toast.success(`Tm "${name}" has been updated succesfully`);
    },
    onError: () => {
      toast.error("Could not update translation memory");
    },
  });

  return { updateTm: mutate, isSaving: isPending };
}
