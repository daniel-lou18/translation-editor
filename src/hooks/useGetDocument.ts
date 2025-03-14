import { useQuery } from "@tanstack/react-query";
import { useTranslationRoute } from "./useTranslationRoute";
import { documentService } from "@/services/documentService";

export function useGetDocument(docId?: string | number) {
  const { documentId: urlDocId } = useTranslationRoute();

  const documentId = docId === undefined ? urlDocId : docId;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["document", documentId],
    queryFn: () => getDocumentData(documentId),
    enabled: documentId !== undefined,
  });

  return {
    document: data || null,
    isLoading,
    isError,
    error,
  };
}

async function getDocumentData(documentId: string | number | undefined) {
  if (!documentId) {
    throw new Error("Document id is missing");
  }

  return documentService.getDocument(documentId);
}
