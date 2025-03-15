import { FormEvent } from "react";
import { useRoute } from "@/hooks/useRoute";
import { toast } from "sonner";
import { useUploadSingle } from "./useUploadSingle";
import { uploadService } from "@/services/uploadService";
import { FileMetadata } from "@/types/Dtos";
import { getIdsFromTranslation } from "@/utils/helpers";
import { useBaseMutation } from "./useBaseMutation";
import { FullLangsDomain } from "@/types";
import { useRouteParams } from "./useRouteParams";

export type SubmitDocumentResult = {
  projectId: string;
  documentId: string;
  translationId: string;
};

type SubmitDocumentVariables = {
  file: File | null;
  fileMetadata: FileMetadata;
};

type DocumentUploadConfig = {
  mode: "ai" | "manual";
  tmId?: string;
} & FullLangsDomain;

export function useDocumentUpload(config: DocumentUploadConfig) {
  const { sourceLang, targetLang, domain, tmId, mode } = config;
  const { navigateToTranslation, projectId: urlProjectId } = useRoute();
  const { file, setFile, removeFile } = useUploadSingle();
  const { isDashboard } = useRouteParams();
  const projectId = isDashboard ? "1" : urlProjectId;

  const { mutate, isPending: isLoading } = useBaseMutation({
    mutationFn: submitDocument,
    onSuccess: (params: SubmitDocumentResult) => {
      return navigateToTranslation(params);
    },
    onError: (error: Error) => {
      toast.error(`Could not upload document: ${error}`, {
        classNames: {
          toast: "bg-red-200",
        },
      });
    },
  });

  async function submitDocument(
    variables: SubmitDocumentVariables
  ): Promise<SubmitDocumentResult> {
    const { file, fileMetadata } = variables;

    if (!file) {
      throw new Error("File is required");
    }

    const translation =
      mode === "manual"
        ? await uploadService.submitSourceText(file, fileMetadata)
        : await uploadService.submitDocumentFile(file, fileMetadata);

    return getIdsFromTranslation(translation);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutate({
      file,
      fileMetadata: { sourceLang, targetLang, domain, projectId, tmId },
    });
  }

  return {
    file,
    setFile,
    removeFile,
    isLoading,
    handleSubmit,
  };
}
