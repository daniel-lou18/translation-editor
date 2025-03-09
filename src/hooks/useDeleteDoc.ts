import { useQueryClient } from "@tanstack/react-query";
import { useBaseMutation } from "./useBaseMutation";
import { documentService } from "@/services/documentService";
import { toast } from "sonner";
export function useDeleteDoc() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useBaseMutation({
    mutationFn: (docId: number) => documentService.deleteDoc(docId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Document deleted successfully");
    },
    onError: () => {
      toast.error("Could not delete document");
    },
  });

  return { deleteDoc: mutate, isDeleting: isPending };
}
