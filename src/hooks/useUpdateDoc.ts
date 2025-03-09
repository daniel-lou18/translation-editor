import { useBaseMutation } from "./useBaseMutation";
import { documentService } from "@/services/documentService";
import { toast } from "sonner";
import { Document } from "@/types/Document";
import { useQueryClient } from "@tanstack/react-query";

export function useUpdateDoc() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useBaseMutation({
    mutationFn: (doc: Document) => documentService.updateDoc(doc),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Document updated successfully");
    },
    onError: () => {
      toast.error("Could not update document");
    },
  });

  return { updateDoc: mutate, isSaving: isPending };
}
