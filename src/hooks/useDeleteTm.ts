import { tmService } from "@/services/tmService";
import { useBaseMutation } from "./useBaseMutation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteTm() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useBaseMutation({
    mutationFn: (tmId: number) => tmService.deleteTm(tmId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tms"] });
      toast.success("TM deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete TM");
    },
  });

  return { deleteTm: mutate, isDeleting: isPending };
}
