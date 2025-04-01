import { useQueryClient } from "@tanstack/react-query";
import { useBaseMutation } from "./useBaseMutation";
import { documentService } from "@/services/documentService";
import { toast } from "sonner";

export function useDeleteDoc() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useBaseMutation({
    mutationFn: (docId: number) => documentService.deleteDoc(docId),
    onMutate: () => {
      const toastId = toast.loading("Deleting document...");
      return { toastId };
    },
    onSuccess: (_, __, context) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Document deleted successfully");
      toast.dismiss(context?.toastId);
    },
    onError: (_, __, context) => {
      toast.error("Could not delete document");
      toast.dismiss(context?.toastId);
    },
  });

  return { deleteDoc: mutate, isDeleting: isPending };
}
