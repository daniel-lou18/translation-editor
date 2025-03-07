import { useBaseMutation } from "./useBaseMutation";
import { tmService } from "@/services/tmService";
import { toast } from "sonner";
import { UpdateTmDto } from "@/types/Dtos";

export function useUpdateTm() {
  const { mutate } = useBaseMutation({
    mutationFn: (tm: UpdateTmDto) => tmService.updateTm(tm),
    onSuccess: ({ tmId }) => {
      toast.success(`Tm with ID: ${tmId} has been updated succesfully`);
    },
    onError: () => {
      toast.error("Could not update translation memory");
    },
  });

  return { updateTm: mutate };
}
